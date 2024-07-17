export enum EventType {
  Tracking = "tracking",
  Metric = "metric",
  Error = "error",
  Log = "log",
}

type Provider =
  | "beamer"
  | "coralogix"
  | "fe-telemetry"
  | "fullstory"
  | "google-analytics"
  | "google-tag-manager"
  | "hubspot"
  | "segment"
  | "sentry"
  | "splunk";

interface BaseEventPayload {
  excludedProviders?: Array<Provider>;
}

interface TrackingEventPayload extends BaseEventPayload {
  // Tracking event specific fields
}

interface TrackingEvent {
  type: EventType.Tracking;
  payload: TrackingEventPayload;
}

interface MetricEventPayload extends BaseEventPayload {}

interface MetricEvent {
  type: EventType.Metric;
  payload: MetricEventPayload;
}

interface ErrorEventPayload extends BaseEventPayload {}

interface ErrorEvent {
  type: EventType.Error;
  payload: ErrorEventPayload;
}

interface LogEventPayload extends BaseEventPayload {}

interface LogEvent {
  type: EventType.Log;
  payload: LogEventPayload;
}

export type PlEvent = TrackingEvent | MetricEvent | ErrorEvent | LogEvent;
