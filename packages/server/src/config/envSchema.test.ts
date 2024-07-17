import { expect } from "chai";
import { envSchema } from "./env";
import { DEV_SERVER_PORT } from "../consts";
import { ZodError } from "zod";

describe("envSchema", () => {
  it("should use default values when no environment variables are provided", () => {
    const result = envSchema.parse({});
    expect(result.PORT).to.equal(DEV_SERVER_PORT);
    expect(result.NODE_ENV).to.equal("development");
    expect(result.HOST).to.equal("localhost");
  });

  it("should use provided values when environment variables are set", () => {
    const env = {
      PORT: "5000",
      NODE_ENV: "production",
      HOST: "example.com",
    };

    const result = envSchema.parse(env);
    expect(result.PORT).to.equal(5000);
    expect(result.NODE_ENV).to.equal("production");
    expect(result.HOST).to.equal("example.com");
  });

  it("should throw a ZodError when an invalid PORT value is provided", () => {
    const env = {
      PORT: "invalid",
    };

    expect(() => envSchema.parse(env)).to.throw(ZodError);

    try {
      envSchema.parse(env);
    } catch (err) {
      expect(err).to.be.instanceof(ZodError);
      const issue = (err as ZodError).issues[0];
      expect(issue.code).to.equal("invalid_type");
      expect(issue.path).to.deep.equal(["PORT"]);
    }
  });
});
