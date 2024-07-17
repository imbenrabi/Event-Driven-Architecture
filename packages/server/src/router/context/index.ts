import { inferAsyncReturnType } from "@trpc/server";
import { getUserFromAPIGateway } from "../utils";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  const server = req.server;
  const user = await getUserFromAPIGateway(req);

  return {
    fastify: server,
    req,
    res,
    user,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
