import { KafkaClient } from "../client";

export async function listTopics() {
  const kafka = KafkaClient.getInstance();
  const admin = kafka.admin();
  await admin.connect();
  const topics = await admin.listTopics();
  await admin.disconnect();
  return topics;
}
