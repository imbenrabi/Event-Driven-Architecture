import { publicProcedure } from "../../utils";
import { reportAnonymouseEventSchema } from "./schema";
import {
  sendMessage,
  sendBatchOfMessages,
} from "@event-driven-architecture/kafka/src";

// this implementation is just a placeholder for the actual implementation
export function createReportAnonymousEventRoute() {
  return publicProcedure
    .input(reportAnonymouseEventSchema)
    .mutation(async ({ ctx, input }) => {
      switch (input.event.type) {
        case "tracking": {
          const { success } = await sendMessage({
            message: { value: "Tracking event fired 0" },
            topic: "trpc-events-topic-a",
          });
          if (success) {
            ctx.req.log.info("Message sent to Kafka successfully");
          }
          const { success: batchSuccess } = await sendBatchOfMessages([
            {
              topic: "trpc-events-topic-b",
              messages: [
                {
                  value: "Tracking event fired 1",
                },
                { value: "Tracking event fired 2" },
              ],
            },
          ]);
          if (batchSuccess) {
            ctx.req.log.info("Batch sent to Kafka successfully");
          }

          break;
        }
        case "metric": {
          const { success } = await sendMessage({
            message: { value: "Metric event fired 0" },
            topic: "trpc-events-topic-a",
          });
          if (success) {
            ctx.req.log.info("Message sent to Kafka successfully");
          }
          const { success: batchSuccess } = await sendBatchOfMessages([
            {
              topic: "trpc-events-topic-b",
              messages: [
                {
                  value: "Metric event fired 1",
                },
                { value: "Metric event fired 2" },
              ],
            },
          ]);
          if (batchSuccess) {
            ctx.req.log.info("Batch sent to Kafka successfully");
          }

          break;
        }
        default:
          break;
      }
    });
}
