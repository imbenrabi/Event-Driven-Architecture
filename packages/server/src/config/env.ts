import z from "zod";
import { DEV_SERVER_PORT } from "../consts";

export const envSchema = z.object({
  PORT: z.coerce.number().int().default(DEV_SERVER_PORT),
  NODE_ENV: z.string().default("development"),
  HOST: z.string().default("localhost"),
});

export const env = envSchema.parse(process.env);
