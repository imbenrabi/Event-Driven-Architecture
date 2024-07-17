import { env } from "./config";
import { runKafkaConsumer } from "./consumer";

interface StartKafkaParams {
  withMessageBatching: boolean;
}

async function startKafka({ withMessageBatching }: StartKafkaParams) {
  runKafkaConsumer({
    withMessageBatching,
  }).catch(console.error);
}

export const start = async () => {
  const withMessageBatching = env.KAFKA_MESSAGE_BATCHING;

  try {
    await startKafka({ withMessageBatching });
    console.log(
      `Kafka consumer started successfully (batching: ${withMessageBatching})`,
    );
  } catch (error) {
    console.error("Failed to start Kafka consumer:", error);
    process.exit(1);
  }
};

(async () => {
  await start();
})();
