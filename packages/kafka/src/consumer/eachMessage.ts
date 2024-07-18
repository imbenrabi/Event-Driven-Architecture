import { EachMessagePayload, KafkaMessage } from "kafkajs";
import { triggerProcess } from "@event-driven-architecture/providers/src";

export async function eachMessage({ message, heartbeat }: EachMessagePayload) {
  try {
    processMessage(message);
  } catch (error) {
    console.error("Error processing message:", error);
  } finally {
    await heartbeat();
  }
}

function processMessage(message: KafkaMessage) {
  // TODO implement processing of different types of messages
  console.log("Processing message:", message);
  triggerProcess();
}
