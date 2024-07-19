import { Consumer, ConsumerRunConfig } from "kafkajs";
import { KafkaClient } from "../client";
import { consumerGroupId, topics as defaultTopics } from "../constants";
import { eachBatch } from "./eachBatch";
import { eachMessage } from "./eachMessage";

interface RunKafkaConsumerParams {
  withMessageBatching?: boolean;
  topics?: (string | RegExp)[];
}

interface ConnectConsumerParams {
  consumer: Consumer;
  topics: (string | RegExp)[];
}

export async function runKafkaConsumer({
  withMessageBatching = false,
  topics = defaultTopics,
}: RunKafkaConsumerParams) {
  const consumer = createConsumer();
  await connectConsumer({ consumer, topics });
  const runConfig: ConsumerRunConfig = withMessageBatching
    ? { eachBatchAutoResolve: false, eachBatch }
    : {
        eachMessage,
      };
  await consumer.run(runConfig);
}

function createConsumer(): Consumer {
  const kafka = KafkaClient.getInstance();
  const consumer = kafka.consumer({
    groupId: consumerGroupId,
  });

  return consumer;
}

async function connectConsumer({ consumer, topics }: ConnectConsumerParams) {
  await consumer.connect();
  await consumer.subscribe({ topics, fromBeginning: true });
  consumer.on("consumer.connect", () => {
    consumer.logger().info(`Consumer connected to ${topics.join(", ")}`);
  });
  consumer.on("consumer.disconnect", () => {
    consumer.logger().info(`Consumer disconnected from ${topics.join(", ")}`);
  });
}
