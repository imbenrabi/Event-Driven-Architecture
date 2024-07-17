import { Producer, Transaction } from "kafkajs";

interface CreateTransactionProps {
  producer: Producer;
  retries?: number;
}

export async function createTransaction({
  producer,
  retries = 3,
}: CreateTransactionProps): Promise<Transaction> {
  for (let i = 0; i < retries; i++) {
    try {
      return await producer.transaction();
    } catch (error) {
      console.error(`Failed to create transaction (attempt ${i + 1}):`, error);
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
    }
  }
  throw new Error(`Failed to create transaction after ${retries} attempts`);
}
