import { z } from "zod";

const Provider = z.union([
  z.literal("beamer"),
  z.literal("grafana"),
  z.literal("segment"),
  z.literal("splunk"),
]);

const BaseEventPayload = z.object({
  excludedProviders: z.array(Provider).optional(),
});

const TrackingEventPayload = BaseEventPayload.extend({
  someDimension: z.string(),
});

const TrackingEvent = z.object({
  type: z.literal("tracking"),
  payload: TrackingEventPayload,
});

const TelemetryEventPayload = BaseEventPayload.extend({
  someMetric: z.number(),
});

const TelemetryEvent = z.object({
  type: z.literal("metric"),
  payload: TelemetryEventPayload,
});

const User = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
});

const PlEvent = z.union([TrackingEvent, TelemetryEvent]);

export const reportAnonymouseEventSchema = z.object({
  event: PlEvent,
});

export const ReportUserEventSchema = z.object({
  event: PlEvent,
  user: User,
});
