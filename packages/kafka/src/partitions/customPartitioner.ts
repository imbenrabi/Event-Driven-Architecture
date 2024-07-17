import { Message } from "kafkajs";
import { KafkaPartitionManager } from "./partitionManager";

export function customPartitioner() {
  const partiotionManager = KafkaPartitionManager.getInstance();

  return ({ message }: { message: Message }) => {
    const key = message.key ? message.key.toString() : "";
    const partition = partiotionManager.getPartition(key);
    return partition;
  };
}
