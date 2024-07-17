import { createHash } from "crypto";
import { env } from "../config";

export class KafkaPartitionManager {
  private readonly numPartitions: number;
  private readonly FALLBACK_PARTITION: number;
  private static instance: KafkaPartitionManager;

  private constructor(numPartitions: number = env.NUMBER_OF_PARTITIONS) {
    this.numPartitions = numPartitions;
    this.FALLBACK_PARTITION = 0;
  }

  public getPartition(key: string): number {
    const hash = this.hashKey(key);
    return hash % this.numPartitions;
  }

  private hashKey(key: string): number {
    try {
      const hash = createHash("md5").update(key).digest("hex");
      return parseInt(hash.substring(0, 8), 16); // convert first 8 characters of hash to integer
    } catch (error) {
      console.error("Error hashing key:", error);
      return this.FALLBACK_PARTITION;
    }
  }

  public static getInstance(): KafkaPartitionManager {
    if (!KafkaPartitionManager.instance) {
      KafkaPartitionManager.instance = new KafkaPartitionManager();
    }
    return KafkaPartitionManager.instance;
  }
}
