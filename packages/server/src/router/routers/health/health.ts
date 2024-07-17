import { publicProcedure, router } from "../../utils";

export function createHealthRouter() {
  return router({
    healthCheck: publicProcedure.query(() => {
      return { status: "ok" };
    }),
  });
}
