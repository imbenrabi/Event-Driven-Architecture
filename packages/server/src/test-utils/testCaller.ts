import { createTestContext } from "./testContext";
import { createTestRouter } from "./testRouter";
import { testT } from "./testTrpc";

const createCaller = testT.createCallerFactory(createTestRouter());

export const createTestCaller = async () => {
  const ctx = await createTestContext();
  return createCaller(ctx);
};
