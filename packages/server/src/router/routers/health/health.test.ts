import { expect } from "chai";
import { createTestCaller } from "../../../test-utils";

describe("health route", () => {
  describe("healthCheck", () => {
    it("should return a successful health check", async () => {
      const caller = await createTestCaller();
      const res = await caller.health.healthCheck();

      expect(res.status).to.exist;
      expect(res).to.deep.include({ status: "ok" });
    });
  });
});
