import { LogEntry, logLevel as KafkaLogLevel } from "kafkajs";
import pino from "pino";
import { env } from "./env";

export const PinoLoggerCreator = () => {
  return ({ level, log }: LogEntry) => {
    const { message, ...extra } = log;
    const pinoLevel = mapLogLevel(level);
    const logger = createPinoLogger();
    logger[pinoLevel]({ message, extra });
  };
};

function mapLogLevel(level: KafkaLogLevel): pino.Level {
  switch (level) {
    case KafkaLogLevel.ERROR:
    case KafkaLogLevel.NOTHING:
      return "error";
    case KafkaLogLevel.WARN:
      return "warn";
    case KafkaLogLevel.INFO:
      return "info";
    case KafkaLogLevel.DEBUG:
      return "debug";
  }
}

function createPinoLogger(): pino.Logger {
  return pino({
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "yyyy-mm-dd HH:MM:ss.l",
        messageKey: "message",
      },
      level: env.PINO_LOG_LEVEL,
    },
  });
}
