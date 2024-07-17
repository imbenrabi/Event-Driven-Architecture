import { z } from "zod";

const Provider = z.union([
  z.literal("beamer"),
  z.literal("coralogix"),
  z.literal("fe-telemetry"),
  z.literal("fullstory"),
  z.literal("google-analytics"),
  z.literal("google-tag-manager"),
  z.literal("hubspot"),
  z.literal("segment"),
  z.literal("sentry"),
  z.literal("splunk"),
]);

const BaseEventPayload = z.object({
  excludedProviders: z.array(Provider).optional(),
});

const TrackingEventPayload = BaseEventPayload;

const TrackingEvent = z.object({
  type: z.literal("tracking"),
  payload: TrackingEventPayload,
});

const MetricEventPayload = BaseEventPayload;

const MetricEvent = z.object({
  type: z.literal("metric"),
  payload: MetricEventPayload,
});

const ErrorEventPayload = BaseEventPayload;

const ErrorEvent = z.object({
  type: z.literal("error"),
  payload: ErrorEventPayload,
});

const LogEventPayload = BaseEventPayload;

const LogEvent = z.object({
  type: z.literal("log"),
  payload: LogEventPayload,
});

const User = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});

const PlEvent = z.union([TrackingEvent, MetricEvent, ErrorEvent, LogEvent]);

export const reportAnonymouseEventSchema = z.object({
  event: PlEvent,
});

export const ReportUserEventSchema = z.object({
  event: PlEvent,
  user: User,
});
