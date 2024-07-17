import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { DEV_SERVER_PORT, ROUTER_PREFIX } from "@events-service/server/consts";
import { AppRouter } from "@events-service/server";

export const eventsServiceClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `http://localhost:${DEV_SERVER_PORT}${ROUTER_PREFIX}`,
    }),
  ],
});
