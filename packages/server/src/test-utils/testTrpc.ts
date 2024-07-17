import { initTRPC } from "@trpc/server";
import { InnerContext } from "./testContext";

export const testT = initTRPC.context<InnerContext>().create({
  errorFormatter({ shape }) {
    return shape;
  },
});
