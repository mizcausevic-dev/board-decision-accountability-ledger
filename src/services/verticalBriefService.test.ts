import { describe, expect, it } from "vitest";
import { accountabilityLane, interventionPosture, ownershipLedger, payload, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the accountability summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the accountability lane view", () => {
    expect(accountabilityLane().length).toBeGreaterThan(0);
  });

  it("returns the ownership ledger view", () => {
    expect(ownershipLedger().length).toBeGreaterThan(0);
  });

  it("returns the intervention posture view", () => {
    expect(interventionPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.items).toBeGreaterThan(0);
  });
});
