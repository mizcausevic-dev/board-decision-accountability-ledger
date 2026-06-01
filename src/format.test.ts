import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("renders the accountability summary lines", () => {
    const output = formatSummary({
      items: 6,
      constrainedLanes: 5,
      accountabilityFixLanes: 4,
      averageBoardConfidence: 58.7,
      valueAtStakeMillions: 141,
      leadingMessage: "Accountability continuity needs repair."
    });

    expect(output).toContain("Board Decision Accountability Ledger");
    expect(output).toContain("Accountability-fix lanes: 4");
    expect(output).toContain("Value at stake: $141M");
  });
});
