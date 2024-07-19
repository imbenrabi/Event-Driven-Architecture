import { eventsServiceClient } from "./eventsServiceClient";
import { EventType, IEvent } from "./types";

interface EventButton {
  id: string;
  type: EventType;
}

const eventButtons: EventButton[] = [
  { id: "triggerMetricEvent", type: EventType.Metric },
  { id: "triggerTrackingEvent", type: EventType.Tracking },
];

async function triggerEvent(event: IEvent) {
  await eventsServiceClient.v1.report.anonymousEvent.mutate({ event });
}

document.addEventListener("DOMContentLoaded", () => {
  eventButtons.forEach(({ id, type }) => {
    const button = document.getElementById(id);
    if (type === EventType.Metric) {
      button?.addEventListener("click", () => {
        triggerEvent({
          type,
          payload: {
            excludedProviders: ["beamer", "segment"],
            someMetric: Math.random(),
          },
        });
      });
    }
    if (type === EventType.Tracking) {
      button?.addEventListener("click", () => {
        triggerEvent({
          type,
          payload: {
            excludedProviders: ["grafana"],
            someDimension: "someDimension",
          },
        });
      });
    }
  });
});
