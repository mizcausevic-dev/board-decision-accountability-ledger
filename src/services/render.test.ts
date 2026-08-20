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

describe("palette", () => {
  // Guards estate palette convergence. The rest of this suite asserts only text
  // markers, so a colour regression would otherwise ship green. See the token
  // block in render.ts: every colour on the page resolves from these nine.
  const canonicalTokens = [
    "--bg: #0B0C10",
    "--panel: #1F2833",
    "--panel-2: #161D26",
    "--border: #2B3A46",
    "--text: #C5C6C7",
    "--head: #EAF6F5",
    "--muted: #99A3AD",
    "--accent: #66FCF1",
    "--accent-2: #45A29E"
  ];

  // Each of these was present in the pre-convergence navy palette, so a match
  // here is real evidence of regression, not a vacuous negative assertion.
  const retiredLiterals = [
    "#07111d",
    "#0d1a2b",
    "#102032",
    "#edf2ff",
    "#9fb0cf",
    "#67e0be",
    "#7dc4ff",
    "#050c16",
    "rgba(103, 224, 190",
    "rgba(125, 196, 255",
    "rgba(14, 28, 45",
    "rgba(10, 19, 33",
    "rgba(2, 7, 16",
    "rgba(16, 32, 50",
    "rgba(7, 17, 29"
  ];

  const pages = (): [string, string][] => [
    ["overview", renderLedgerOverview()],
    ["accountability-lane", renderAccountabilityLane()],
    ["ownership-ledger", renderOwnershipLedger()],
    ["intervention-posture", renderInterventionPosture()],
    ["verification", renderVerification()],
    ["docs", renderDocs()]
  ];

  it("ships the canonical Kinetic Gain token block on every route", () => {
    for (const [route, html] of pages()) {
      for (const token of canonicalTokens) {
        expect(html, `${route} is missing ${token}`).toContain(token);
      }
    }
  });

  it("carries no retired navy-palette literal on any route", () => {
    for (const [route, html] of pages()) {
      const lower = html.toLowerCase();
      for (const literal of retiredLiterals) {
        expect(lower, `${route} still carries ${literal}`).not.toContain(literal.toLowerCase());
      }
    }
  });

  it("resolves every non-token colour from a token rather than a raw literal", () => {
    const html = renderLedgerOverview();
    const style = html.slice(html.indexOf("<style>"), html.indexOf("</style>"));
    const literals = style.match(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g) ?? [];
    // Nine token definitions plus one palette-neutral shadow. Anything else is
    // a colour that --bg/--accent/etc. would fail to repaint.
    const strays = literals.filter((value) => value !== "rgba(0, 0, 0, 0.45)");
    expect(strays).toHaveLength(canonicalTokens.length);
  });
});
