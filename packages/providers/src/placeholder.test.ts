import { expect } from "chai";
import {
  fireErrorEvents,
  fireLogEvents,
  fireTrackingEvents,
  fireMetricEvents,
} from "./index";

describe("Event firing functions", function () {
  it("fireErrorEvents should return correct string", function () {
    expect(fireErrorEvents()).to.equal("fireErrorEvents");
  });

  it("fireLogEvents should return correct string", function () {
    expect(fireLogEvents()).to.equal("fireLogEvents");
  });

  it("fireTrackingEvents should return correct string", function () {
    expect(fireTrackingEvents()).to.equal("fireTrackingEvents");
  });

  it("fireMetricEvents should return correct string", function () {
    expect(fireMetricEvents()).to.equal("fireMetricEvents");
  });
});
