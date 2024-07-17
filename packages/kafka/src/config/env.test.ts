import { expect } from "chai";
import { envSchema } from "./env";
import { ZodError } from "zod";

describe("Environment variable parsing", () => {
  describe("Default values", () => {
    it("should use default values when no environment variables are provided", () => {
      const env = envSchema.parse({});
      expect(env.KAFKA_MESSAGE_BATCHING).to.be.true;
      expect(env.KAFKA_BROKERS).to.deep.equal([
        "localhost:19092",
        "localhost:29092",
        "localhost:39092",
      ]);
      expect(env.NODE_ENV).to.equal("development");
      expect(env.NUMBER_OF_PARTITIONS).to.equal(5);
      expect(env.PINO_LOG_LEVEL).to.equal("info");
      expect(env.PRODUCER_POOL_SIZE).to.equal(3);
    });
  });

  describe("Custom values", () => {
    it("should use custom values when provided", () => {
      const customEnv = {
        KAFKA_MESSAGE_BATCHING: "false",
        KAFKA_BROKERS: "broker1:9092,broker2:9092",
        NODE_ENV: "production",
        NUMBER_OF_PARTITIONS: "10",
        PINO_LOG_LEVEL: "debug",
        PRODUCER_POOL_SIZE: "5",
      };
      const env = envSchema.parse(customEnv);
      expect(env.KAFKA_MESSAGE_BATCHING).to.be.false;
      expect(env.KAFKA_BROKERS).to.deep.equal(["broker1:9092", "broker2:9092"]);
      expect(env.NODE_ENV).to.equal("production");
      expect(env.NUMBER_OF_PARTITIONS).to.equal(10);
      expect(env.PINO_LOG_LEVEL).to.equal("debug");
      expect(env.PRODUCER_POOL_SIZE).to.equal(5);
    });
  });

  describe("Boolean coercion", () => {
    const testCases = [
      { input: "string", expected: false },
      { input: "", expected: false },
      { input: "true", expected: true },
      { input: "True", expected: true },
      { input: "TRUE", expected: true },
      { input: "1", expected: true },
      { input: "false", expected: false },
      { input: "False", expected: false },
      { input: "FALSE", expected: false },
      { input: "0", expected: false },
    ];

    testCases.forEach(({ input, expected }) => {
      it(`should parse "${input}" as ${expected}`, () => {
        const result = envSchema.parse({ KAFKA_MESSAGE_BATCHING: input });
        expect(result.KAFKA_MESSAGE_BATCHING).to.equal(expected);
      });
    });
  });

  describe("Number coercion", () => {
    it("should coerce NUMBER_OF_PARTITIONS to a number", () => {
      const result = envSchema.parse({ NUMBER_OF_PARTITIONS: "15" });
      expect(result.NUMBER_OF_PARTITIONS).to.equal(15);
    });

    it("should coerce PRODUCER_POOL_SIZE to a number", () => {
      const result = envSchema.parse({ PRODUCER_POOL_SIZE: "7" });
      expect(result.PRODUCER_POOL_SIZE).to.equal(7);
    });
  });

  describe("Invalid values", () => {
    it("should throw a ZodError for invalid NUMBER_OF_PARTITIONS", () => {
      expect(() => envSchema.parse({ NUMBER_OF_PARTITIONS: "not-a-number" }))
        .to.throw(ZodError)
        .and.satisfy((err: ZodError) => {
          const issue = err.issues[0];
          return (
            issue.code === "invalid_type" &&
            issue.path[0] === "NUMBER_OF_PARTITIONS"
          );
        });
    });

    it("should throw a ZodError for invalid PRODUCER_POOL_SIZE", () => {
      expect(() => envSchema.parse({ PRODUCER_POOL_SIZE: "invalid" }))
        .to.throw(ZodError)
        .and.satisfy((err: ZodError) => {
          const issue = err.issues[0];
          return (
            issue.code === "invalid_type" &&
            issue.path[0] === "PRODUCER_POOL_SIZE"
          );
        });
    });
  });
});
