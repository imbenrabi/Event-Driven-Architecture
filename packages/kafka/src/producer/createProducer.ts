import { Producer } from "kafkajs";
import { customPartitioner } from "../partitions";
import { KafkaClient } from "../client";

interface CreateProducerProperties {
  transactionalId: string;
}

export function createProducer({
  transactionalId,
}: CreateProducerProperties): Producer {
  return KafkaClient.getInstance().producer({
    transactionalId,
    maxInFlightRequests: 1,
    idempotent: true,
    createPartitioner: customPartitioner,
  });
}
