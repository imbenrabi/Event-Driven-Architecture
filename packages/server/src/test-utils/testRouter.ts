import { createHealthRouter } from "../router/routers";
import { testT } from "./testTrpc";

const _testRouter = testT.router;

export function createTestRouter() {
  return _testRouter({
    health: createHealthRouter(),
  });
}
