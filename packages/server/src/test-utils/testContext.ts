import { inferAsyncReturnType } from "@trpc/server";
import { createMockContext } from "./testMocks";

export async function createTestContext() {
  return createMockContext();
}

export type InnerContext = inferAsyncReturnType<typeof createTestContext>;
