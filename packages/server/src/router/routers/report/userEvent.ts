import {
  fireErrorEvents,
  fireLogEvents,
  fireMetricEvents,
  fireTrackingEvents,
} from "@event-driven-architecture/providers/src/index";
import { protectedProcedure } from "../../utils";
import { ReportUserEventSchema } from "./schema";

// this implementation is just a placeholder for the actual implementation
export function createReportUserEventRoute() {
  return protectedProcedure
    .input(ReportUserEventSchema)
    .mutation(({ ctx, input }) => {
      switch (input.event.type) {
        case "error": {
          const errorEventsRes = fireErrorEvents();
          if (errorEventsRes) {
            ctx.req.log.info("Event fired successfully");
          }
          break;
        }
        case "log": {
          const logEventsRes = fireLogEvents();
          if (logEventsRes) {
            ctx.req.log.info("Event fired successfully");
          }
          break;
        }
        case "tracking": {
          const trackingEventsRes = fireTrackingEvents();
          if (trackingEventsRes) {
            ctx.req.log.info("Event fired successfully");
          }
          break;
        }
        case "metric": {
          const metricEventsRes = fireMetricEvents();
          if (metricEventsRes) {
            ctx.req.log.info("Event fired successfully");
          }
          break;
        }
        default:
          break;
      }
    });
}
