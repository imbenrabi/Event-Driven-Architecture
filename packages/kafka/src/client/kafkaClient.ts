import { Kafka } from "kafkajs";
import { createKafkaClientConfig } from "../config";

export class KafkaClient {
  private static instance: Kafka;

  private constructor() {}

  public static getInstance(): Kafka {
    if (!KafkaClient.instance) {
      KafkaClient.instance = new Kafka(createKafkaClientConfig());
    }
    return KafkaClient.instance;
  }
}
