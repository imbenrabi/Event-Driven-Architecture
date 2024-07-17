import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import {
  DEV_SERVER_PORT,
  ROUTER_PREFIX,
} from "@event-driven-architecture/server";
import { AppRouter } from "@event-driven-architecture/server";

export const eventsServiceClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `http://localhost:${DEV_SERVER_PORT}${ROUTER_PREFIX}`,
    }),
  ],
});
