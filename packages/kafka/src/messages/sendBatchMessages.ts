import { TopicMessages } from "kafkajs";
import { KafkaPartitionManager } from "../partitions";
import { createProducer, createTransaction } from "../producer";
import { createMessageKey, createTransactionalId } from "../utils";

//currently implemented to send single topic per call
export async function sendBatchOfMessages(
  topicMessages: Array<TopicMessages>,
): Promise<{
  success: boolean;
}> {
  const key = createMessageKey();
  const partition = KafkaPartitionManager.getInstance().getPartition(key);
  const transactionalId = createTransactionalId({
    topic: topicMessages[0].topic,
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
    producer.logger().error("Error connecting producer:", {
      error: connectionError,
    });
  }

  const transaction = await createTransaction({
    producer,
  });

  try {
    const messagesToSend = createTopicMessages({
      topicMessages,
      partition,
    });
    await transaction.sendBatch({
      acks: -1,
      topicMessages: messagesToSend,
    });
    await transaction.commit();
    producer.logger().info("Batch sent and committed successfully");

    return { success: true };
  } catch (error) {
    await transaction.abort();
    producer.logger().error("Error sending batch:", {
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

function createTopicMessages({
  topicMessages,
  partition,
}: {
  topicMessages: Array<TopicMessages>;
  partition: number;
}): TopicMessages[] {
  return topicMessages.map(({ topic, messages }) => ({
    topic,
    messages: messages.map((message) => ({
      ...message,
      key: createMessageKey(),
      partition,
    })),
  }));
}
