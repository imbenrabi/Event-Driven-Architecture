export enum EventType {
  Tracking = "tracking",
  Metric = "metric",
}

type Provider = "beamer" | "grafana" | "segment" | "splunk";

interface BaseEventPayload {
  excludedProviders?: Array<Provider>;
}

interface TrackingEventPayload extends BaseEventPayload {
  someDimension: string;
}

interface TrackingEvent {
  type: EventType.Tracking;
  payload: TrackingEventPayload;
}

interface MetricEventPayload extends BaseEventPayload {
  someMetric: number;
}

interface MetricEvent {
  type: EventType.Metric;
  payload: MetricEventPayload;
}

export type IEvent = TrackingEvent | MetricEvent;
