import { router } from "./utils";
import { createHealthRouter, createReportRouter } from "./routers";
import { API_VERSIONS } from "../consts";

function createV1Router() {
  return router({
    health: createHealthRouter(),
    report: createReportRouter(),
  });
}

function createV2Router() {
  return router({
    health: createHealthRouter(),
  });
}

export function createRouter() {
  return router({
    [API_VERSIONS.V1]: createV1Router(),
    [API_VERSIONS.V2]: createV2Router(),
  });
}
