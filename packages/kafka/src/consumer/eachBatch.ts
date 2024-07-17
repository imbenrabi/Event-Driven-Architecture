import { EachBatchPayload, KafkaMessage } from "kafkajs";
import {
  fireErrorEvents,
  fireLogEvents,
  fireMetricEvents,
  fireTrackingEvents,
} from "@event-driven-architecture/providers/src";

export async function eachBatch({
  batch,
  resolveOffset,
  heartbeat,
  isRunning,
  isStale,
  commitOffsetsIfNecessary,
}: EachBatchPayload) {
  try {
    for (const message of batch.messages) {
      if (!isRunning() || isStale()) break;

      try {
        processMessage(message);
        resolveOffset(message.offset);
      } catch (error) {
        console.error("Error processing message:", error);
      } finally {
        await heartbeat();
      }
    }
  } catch (error) {
    console.error("Error in eachBatch:", error);
  }
  await commitOffsetsIfNecessary();
}

function processMessage(message: KafkaMessage) {
  // TODO implement processing of different types of messages
  fireErrorEvents();
  fireLogEvents();
  fireMetricEvents();
  fireTrackingEvents();
  console.log("Processing message:", message);
}
