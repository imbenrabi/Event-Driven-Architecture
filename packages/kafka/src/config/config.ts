import { KafkaConfig, logLevel } from "kafkajs";
import { PinoLoggerCreator } from "./logger";
import { env } from "./env";

export function createKafkaClientConfig(): KafkaConfig {
  return {
    clientId: "fastify-trpc-kafka-client",
    brokers: env.KAFKA_BROKERS,
    connectionTimeout: 15000,
    logLevel: logLevel.INFO,
    logCreator: PinoLoggerCreator,
  };
}
