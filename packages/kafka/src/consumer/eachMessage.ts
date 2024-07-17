import { EachMessagePayload, KafkaMessage } from "kafkajs";
import {
  fireErrorEvents,
  fireLogEvents,
  fireMetricEvents,
  fireTrackingEvents,
} from "@events-service/providers/src";

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
  fireErrorEvents();
  fireLogEvents();
  fireMetricEvents();
  fireTrackingEvents();
  console.log("Processing message:", message);
}
