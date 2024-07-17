import z from "zod";

export const envSchema = z.object({
  KAFKA_MESSAGE_BATCHING: z
    .string()
    .default("true")
    .transform((val) => {
      const lowercaseVal = val.toLowerCase();
      return lowercaseVal === "true" || lowercaseVal === "1";
    }), // coerce string to boolean ("example-string" does not return true in this coercion)
  KAFKA_BROKERS: z
    .string()
    .default("localhost:19092,localhost:29092,localhost:39092")
    .transform((val) => val.split(",")), // coerce string to array of strings
  NODE_ENV: z.string().default("development"),
  NUMBER_OF_PARTITIONS: z.coerce.number().default(5),
  PINO_LOG_LEVEL: z.string().default("info"),
  PRODUCER_POOL_SIZE: z.coerce.number().default(3),
});

export const env = envSchema.parse(process.env);
