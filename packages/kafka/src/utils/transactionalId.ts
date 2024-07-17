interface TransactionProperties {
  topic: string;
  partition: number;
}

export function createTransactionalId({
  topic,
  partition,
}: TransactionProperties): string {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 10);
  return `events-service-producer-${topic}-${partition}-${timestamp}-${randomId}`;
}
