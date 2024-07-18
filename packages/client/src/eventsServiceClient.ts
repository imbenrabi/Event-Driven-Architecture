import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "@event-driven-architecture/server";

const DEV_SERVER_PORT = 3000;
const ROUTER_PREFIX = "/api";
export const eventsServiceClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `http://localhost:${DEV_SERVER_PORT}${ROUTER_PREFIX}`,
    }),
  ],
});
