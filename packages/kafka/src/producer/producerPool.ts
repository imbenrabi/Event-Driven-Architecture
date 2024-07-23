import { Producer } from "kafkajs";
import { createHash } from "crypto";
import { customPartitioner } from "../partitions";
import { Semaphore } from "async-mutex";
import { KafkaClient } from "../client";
import { env } from "../config";

export interface ProducerWithSemaphore {
  producer: Producer;
  semaphore: Semaphore;
}

// This implementation is not complete but an example of how to use a producer pool with Semaphore - KafkaJS which in some cases can be useful for high throughput scenarios.
export class ProducerPool {
  private producers: Map<string, ProducerWithSemaphore> = new Map();
  private poolSize: number;
  private readonly DEFAULT_RETRY_INTERVAL_MS: number;
  private static instance: ProducerPool;

  private constructor(poolSize: number) {
    this.poolSize = poolSize;
    this.DEFAULT_RETRY_INTERVAL_MS = 100;
  }

  async initialize() {
    console.log("Initializing producer pool");
    for (let i = 0; i < this.poolSize; i++) {
      const transactionalId = `unique-producer-id-${i}`;
      const producer = await this.initializeProducer(transactionalId);

      this.producers.set(transactionalId, {
        producer,
        semaphore: new Semaphore(1),
      });
      console.log(`Producer ${transactionalId} initialized successfully`);
    }
    console.log("Producer pool initialized successfully");
  }

  private async initializeProducer(transactionalId: string): Promise<Producer> {
    const kafka = KafkaClient.getInstance();
    const producer = kafka.producer({
      transactionalId,
      maxInFlightRequests: 1,
      idempotent: true,
      createPartitioner: customPartitioner,
    });
    try {
      await producer.connect();
    } catch (error) {
      console.error(`Failed to initialize producer ${transactionalId}:`, error);
      throw error;
    }

    return producer;
  }

  async getProducer(key: string): Promise<Producer> {
    const transactionalId = this.getTransactionalId(key);
    const producerWithSemaphore = this.producers.get(transactionalId)!;

    return this.acquireProducer(producerWithSemaphore);
  }

  releaseProducer(key: string) {
    const transactionalId = this.getTransactionalId(key);
    const producerWithSemaphore = this.producers.get(transactionalId)!;

    // Release the semaphore
    producerWithSemaphore.semaphore.release();
  }

  private getTransactionalId(key: string): string {
    const hash = createHash("md5").update(key).digest("hex");
    const index = parseInt(hash, 16) % this.poolSize;
    return `unique-producer-id-${index}`;
  }

  private async acquireProducer(
    producerWithSemaphore: ProducerWithSemaphore,
  ): Promise<Producer> {
    if (!producerWithSemaphore.semaphore.isLocked()) {
      await producerWithSemaphore.semaphore.acquire();
      return producerWithSemaphore.producer;
    } else {
      await this.sleep(this.DEFAULT_RETRY_INTERVAL_MS);
      return this.acquireProducer(producerWithSemaphore);
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async disconnect() {
    await Promise.all(
      [...this.producers.values()].map(({ producer }) => producer.disconnect()),
    );
  }

  public static getInstance(): ProducerPool {
    if (!ProducerPool.instance) {
      ProducerPool.instance = new ProducerPool(env.PRODUCER_POOL_SIZE);
    }
    return ProducerPool.instance;
  }
}
