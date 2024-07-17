import { expect } from "chai";
import { ProducerPool, ProducerWithSemaphore } from "./producerPool";
import { Kafka, Producer } from "kafkajs";
import { KafkaClient } from "../client";
import sinon from "sinon";

describe("ProducerPool", () => {
  let mockProducer: Producer;

  beforeEach(() => {
    mockProducer = {
      connect: sinon.stub().resolves(),
      disconnect: sinon.stub().resolves(),
      isIdempotent: sinon.stub().returns(true),
      events: {
        CONNECT: "producer.connect",
        DISCONNECT: "producer.disconnect",
        REQUEST: "producer.network.request",
        REQUEST_TIMEOUT: "producer.network.request_timeout",
        REQUEST_QUEUE_SIZE: "producer.network.request_queue_size",
      },
      on: sinon.stub(),
      send: sinon.stub().resolves(),
      sendBatch: sinon.stub().resolves(),
      transaction: sinon.stub().resolves(),
      logger: sinon.stub().returns({
        info: sinon.stub(),
        error: sinon.stub(),
      }),
    } as unknown as Producer;

    sinon.stub(KafkaClient, "getInstance").returns({
      producer: sinon.stub().returns(mockProducer),
    } as unknown as Kafka);
  });

  afterEach(() => {
    sinon.restore();
  });

  it("initializes producers correctly", async () => {
    const producerPool = new ProducerPool(3);
    await producerPool.initialize();

    expect(
      //casting since producers is private
      (
        producerPool as unknown as {
          producers: Map<string, ProducerWithSemaphore>;
        }
      ).producers.size,
    ).to.equal(3, "Should have 3 producers initialized");

    await producerPool.disconnect();
  });

  it("acquires and releases producer correctly", async () => {
    const producerPool = new ProducerPool(3);
    await producerPool.initialize();

    const key = "test-key";
    const producer = await producerPool.getProducer(key);
    expect(producer).to.equal(
      mockProducer,
      "Should acquire the correct producer",
    );

    producerPool.releaseProducer(key);
    // casting since getTransactionalId is private
    const transactionalId = (
      producerPool as unknown as {
        getTransactionalId: (key: string) => string;
      }
    ).getTransactionalId(key);
    // casting since producers is private
    const producerWithSemaphore = (
      producerPool as unknown as {
        producers: Map<string, ProducerWithSemaphore>;
      }
    ).producers.get(transactionalId);
    expect(producerWithSemaphore?.semaphore.isLocked()).to.be.false;

    await producerPool.disconnect();
  });

  it("handles producer contention", async () => {
    const producerPool = new ProducerPool(1);
    await producerPool.initialize();

    const key1 = "test-key-1";
    const key2 = "test-key-2";
    const producer1Promise = producerPool.getProducer(key1);
    const producer2Promise = producerPool.getProducer(key2);

    const producer1 = await producer1Promise;
    expect(producer1).to.equal(
      mockProducer,
      "First producer should be acquired",
    );

    setTimeout(() => {
      producerPool.releaseProducer(key1);
    }, 200);

    const producer2 = await producer2Promise;
    expect(producer2).to.equal(
      mockProducer,
      "Second producer should be acquired after first is released",
    );

    await producerPool.disconnect();
  });
});
