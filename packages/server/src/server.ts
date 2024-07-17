import fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import sensible from "@fastify/sensible";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { createRouter } from "./router";
import { ROUTER_PREFIX } from "./consts";
import { config, env } from "./config";
import { createContext } from "./router/context";

export const startServer = async () => {
  const server = fastify({
    logger: config[env.NODE_ENV].logger,
  });

  await server.register(sensible); // adds sensible defaults

  await server.register(fastifyTRPCPlugin, {
    prefix: ROUTER_PREFIX,
    trpcOptions: { router: createRouter(), createContext },
  });

  await server.register(cors); // adds CORS headers

  await server.register(helmet); // adds security headers

  try {
    await server.listen({ port: env.PORT });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
