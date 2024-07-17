import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "../context";

const t = initTRPC.context<Context>().create({
  errorFormatter({ shape }) {
    return shape;
  },
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(
  //Authenticattion middleware
  async function isAuthorized({ ctx, next }) {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next({
      ctx: {
        // ✅ user value is known to be non-null now
        user: ctx.user,
      },
    });
  },
);
