import type {
  AccountabilityAssessment,
  AccountabilitySeverity,
  BoardDecisionAccountabilityLedgerExport,
  BoardDecisionAccountabilityLedgerItem,
  BoardDecisionAccountabilityLedgerReportItem
} from "./types.js";

function assessDelay(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): AccountabilityAssessment {
  let severity: AccountabilitySeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

function assessStrength(
  score: number,
  strong: number,
  watch: number,
  strongMessage: string,
  watchMessage: string,
  weakMessage: string
): AccountabilityAssessment {
  let severity: AccountabilitySeverity = "HIGH";
  let ok = false;
  let message = weakMessage;

  if (score >= strong) {
    severity = "LOW";
    ok = true;
    message = strongMessage;
  } else if (score >= watch) {
    severity = "MEDIUM";
    message = watchMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: BoardDecisionAccountabilityLedgerItem[],
  options: { now?: string } = {}
): BoardDecisionAccountabilityLedgerExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: BoardDecisionAccountabilityLedgerReportItem[] = items.map((item) => {
    const handoffAssessment = assessDelay(
      item.decisionHandoffs,
      2,
      4,
      "Decision handoffs remain short enough to preserve the current owner ledger.",
      "Decision handoffs are stretching and may soon weaken owner continuity.",
      "Decision handoffs are now too long to trust the current owner ledger."
    );

    const ownershipGapAssessment = assessDelay(
      item.ownershipGaps,
      0,
      1,
      "Ownership gaps are closed tightly enough to keep the board packet coherent.",
      "Ownership gaps are accumulating and will soon need explicit repair.",
      "Ownership gaps are now too numerous to trust the owner-of-record chain."
    );

    const overrideAssessment = assessDelay(
      item.overrideEvents,
      0,
      1,
      "Override activity is low enough to keep the ledger stable.",
      "Override activity is starting to thin the accountability story.",
      "Override activity is now overwhelming the intended owner continuity."
    );

    const coverageAssessment = assessStrength(
      item.ledgerCoverageScore,
      78,
      62,
      "Ledger coverage is strong enough to back the current ownership chain.",
      "Ledger coverage is uneven and may soon hide owner continuity gaps.",
      "Ledger coverage is too weak to support the current accountability story."
    );

    const clarityAssessment = assessStrength(
      item.decisionClarityScore,
      78,
      62,
      "Decision clarity remains strong enough to keep accountability legible.",
      "Decision clarity is getting patchy and may soon weaken the owner ledger.",
      "Decision clarity is too weak to support the current accountability chain."
    );

    const confidenceAssessment = assessStrength(
      item.boardConfidenceScore,
      78,
      62,
      "Board confidence remains strong enough to trust the current accountability story.",
      "Board confidence is becoming dependent on extra continuity explanation.",
      "Board confidence is too thin to trust the current accountability chain."
    );

    const compositeAccountabilityRiskScore =
      Math.round(
        ((item.decisionHandoffs * 10 +
          item.ownershipGaps * 15 +
          item.overrideEvents * 12 +
          (100 - item.ledgerCoverageScore) +
          (100 - item.decisionClarityScore) +
          (100 - item.boardConfidenceScore)) /
          7) *
          10
      ) / 10;

    return {
      ...item,
      handoffAssessment,
      ownershipGapAssessment,
      overrideAssessment,
      coverageAssessment,
      clarityAssessment,
      confidenceAssessment,
      compositeAccountabilityRiskScore
    };
  });

  const constrainedLanes = reportItems.filter(
    (item) =>
      item.handoffAssessment.severity === "HIGH" ||
      item.ownershipGapAssessment.severity === "HIGH" ||
      item.overrideAssessment.severity === "HIGH" ||
      item.coverageAssessment.severity === "HIGH" ||
      item.clarityAssessment.severity === "HIGH" ||
      item.confidenceAssessment.severity === "HIGH"
  ).length;

  const accountabilityFixLanes = reportItems.filter(
    (item) => item.action === "LOCK_OWNER" || item.action === "PATCH_GAP"
  ).length;

  const averageBoardConfidence =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.boardConfidenceScore, 0) / reportItems.length) * 10) / 10;

  const valueAtStakeMillions = reportItems.reduce((sum, item) => sum + item.valueAtStakeMillions, 0);

  const leadingMessage =
    constrainedLanes === 0
      ? "Accountability continuity remains strong enough to keep the current board packet stable."
      : constrainedLanes <= 2
        ? "A few lanes need owner-ledger repair before the next board cycle compounds accountability drift."
        : "Accountability continuity is now a shared operating constraint and should be repaired across multiple board-facing lanes.";

  return {
    generatedAt,
    summary: {
      items: reportItems.length,
      constrainedLanes,
      accountabilityFixLanes,
      averageBoardConfidence,
      valueAtStakeMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: BoardDecisionAccountabilityLedgerItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
