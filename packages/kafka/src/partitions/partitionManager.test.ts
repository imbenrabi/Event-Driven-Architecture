import { expect } from "chai";
import { KafkaPartitionManager } from "./partitionManager";
import { env } from "../config";

describe("KafkaPartitionManager", () => {
  beforeEach(() => {
    //@ts-expect-error - resetting static instance
    KafkaPartitionManager.instance = undefined;
  });

  it("getInstance returns a singleton instance", () => {
    const instance1 = KafkaPartitionManager.getInstance();
    const instance2 = KafkaPartitionManager.getInstance();
    expect(instance1).to.equal(
      instance2,
      "getInstance should return the same instance",
    );
  });

  it("getPartition returns consistent results for the same key", () => {
    const manager = KafkaPartitionManager.getInstance();
    const key = "test-key";
    const partition1 = manager.getPartition(key);
    const partition2 = manager.getPartition(key);
    expect(partition1).to.equal(
      partition2,
      "Same key should result in the same partition",
    );
  });

  it("getPartition returns different results for different keys", () => {
    const manager = KafkaPartitionManager.getInstance();
    const key1 = "test-key-1";
    const key2 = "test-key-2";
    const partition1 = manager.getPartition(key1);
    const partition2 = manager.getPartition(key2);
    expect(partition1).to.not.equal(
      partition2,
      "Different keys should result in different partitions",
    );
  });

  it("getPartition returns values within the correct range", () => {
    const manager = KafkaPartitionManager.getInstance();
    const key = "test-key";
    const partition = manager.getPartition(key);
    expect(partition)
      .to.be.at.least(0)
      .and.below(env.NUMBER_OF_PARTITIONS, "Partition should be within range");
  });

  it("getPartition handles empty string key", () => {
    const manager = KafkaPartitionManager.getInstance();
    const partition = manager.getPartition("");
    expect(partition)
      .to.be.at.least(0)
      .and.below(
        env.NUMBER_OF_PARTITIONS,
        "Empty string should result in a valid partition",
      );
  });

  it("getPartition handles very long keys", () => {
    const manager = KafkaPartitionManager.getInstance();
    const longKey = "a".repeat(10000);
    const partition = manager.getPartition(longKey);
    expect(partition)
      .to.be.at.least(0)
      .and.below(
        env.NUMBER_OF_PARTITIONS,
        "Long key should result in a valid partition",
      );
  });

  it("getPartition handles special characters", () => {
    const manager = KafkaPartitionManager.getInstance();
    const specialKey = "!@#$%^&*()_+{}[]|\\:;\"'<>,.?/~`";
    const partition = manager.getPartition(specialKey);
    expect(partition)
      .to.be.at.least(0)
      .and.below(
        env.NUMBER_OF_PARTITIONS,
        "Key with special characters should result in a valid partition",
      );
  });
});
