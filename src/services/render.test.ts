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

  it("renders product depth and shared Kinetic Gain wayfinding", () => {
    const html = renderLedgerOverview();
    expect(html).toContain("Product depth");
    expect(html).toContain("What these repos have in common");
    expect(html).toContain("Risk, ownership, evidence, decision.");
    expect(html).toContain("https://github.com/mizcausevic-dev/board-decision-accountability-ledger");
    expect(html).toContain("https://portfolio.kineticgain.com/");
    expect(html).toContain("https://suite.kineticgain.com/");
  });

  it("keeps docs connected to the same proof pattern", () => {
    const html = renderDocs();
    expect(html).toContain("Product depth");
    expect(html).toContain("What these repos have in common");
    expect(html).toContain("portable proof");
  });
});
