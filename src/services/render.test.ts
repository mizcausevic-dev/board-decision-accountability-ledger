import { describe, expect, it } from "vitest";
import {
  renderAccountabilityLane,
  renderDocs,
  renderInterventionPosture,
  renderLedgerOverview,
  renderOwnershipLedger,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderLedgerOverview()).toContain("Board Decision Accountability Ledger");
  });

  it("renders the accountability lane route", () => {
    expect(renderAccountabilityLane()).toContain("/accountability-lane");
  });

  it("renders the ownership ledger route", () => {
    expect(renderOwnershipLedger()).toContain("/ownership-ledger");
  });

  it("renders the intervention posture route", () => {
    expect(renderInterventionPosture()).toContain("Composite accountability risk");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic accountability-ledger data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
