import { Message, ProducerRecord } from "kafkajs";
import { KafkaPartitionManager } from "../partitions";
import { createProducer, createTransaction } from "../producer";
import { Topic } from "../types";
import { createMessageKey, createTransactionalId } from "../utils";

// ? implementation of producer pool usage is as an example, thus commented out
export async function sendMessage({
  message,
  topic,
}: {
  message: Message;
  topic: Topic;
}): Promise<{
  success: boolean;
}> {
  const key = createMessageKey();
  const partition = KafkaPartitionManager.getInstance().getPartition(key);
  const transactionalId = createTransactionalId({
    topic,
    partition,
  });
  // const producerPool = ProducerPool.getInstance();
  // const producer = await producerPool.getProducer(key);
  const producer = createProducer({
    transactionalId,
  });

  try {
    await producer.connect();
  } catch (connectionError) {
    console.error("Error connecting producer:", connectionError);
  }

  const transaction = await createTransaction({
    producer,
  });

  try {
    const messageToSend = createProducerRecord({
      message,
      topic,
      partition,
      key,
    });
    await transaction.send({
      acks: -1,
      ...messageToSend,
    });
    await transaction.commit();
    producer.logger().info("Message sent and committed successfully");
    // log("Message sent and committed successfully");
    return { success: true };
  } catch (error) {
    await transaction.abort();
    producer.logger().error("Error sending message:", {
      error,
    });
    return { success: false };
  } finally {
    // producerPool.releaseProducer(transactionalId);
    try {
      await producer.disconnect();
      producer.logger().info("Producer disconnected successfully");
    } catch (disconnectError) {
      producer.logger().error("Error disconnecting producer:", {
        error: disconnectError,
      });
    }
  }
}

function createProducerRecord({
  message,
  topic,
  partition,
  key,
}: {
  message: Message;
  topic: string;
  partition: number;
  key: string;
}): ProducerRecord {
  return {
    topic,
    messages: [{ key, value: message.value, partition }],
  };
}
