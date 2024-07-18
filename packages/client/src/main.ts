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

// actual implementation will be to call API gateway here -> it will in turn pass the request to the service with/without user

async function triggerEvent(event: IEvent) {
  await eventsServiceClient.v1.report.anonymousEvent.mutate({ event });
  // Beacon implementation
  // const url = "API_GATEWAY_ENDPOINT"; // Replace with API Gateway endpoint
  // const data = JSON.stringify(event);
  // const blob = new Blob([data], { type: "application/json" });
  // const success = navigator.sendBeacon(url, blob);
  // if (!success) {
  //   // Handle the case where the browser couldn't queue the data for transfer
  //   console.error("Failed to send event via sendBeacon");
  // }
}

document.addEventListener("DOMContentLoaded", () => {
  eventButtons.forEach(({ id, type }) => {
    const button = document.getElementById(id);
    if (type === EventType.Metric) {
      button?.addEventListener("click", () => {
        triggerEvent({
          type,
          payload: {
            excludedProviders: ["segment", "grafana"],
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
            excludedProviders: ["segment", "grafana"],
            someDimension: "someDimension",
          },
        });
      });
    }
  });
});
