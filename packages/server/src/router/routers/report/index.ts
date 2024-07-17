import { router } from "../../utils";
import { createReportAnonymousEventRoute } from "./anonymousEvent";
import { createReportUserEventRoute } from "./userEvent";

export function createReportRouter() {
  return router({
    anonymousEvent: createReportAnonymousEventRoute(),
    userEvent: createReportUserEventRoute(),
  });
}
