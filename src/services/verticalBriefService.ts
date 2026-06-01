import { analyze } from "../analyze.js";
import { sampleBoardDecisionAccountabilityLedger } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardDecisionAccountabilityLedger, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Lock the AI and biotech owner ledgers first, record identity overrides second, patch revenue accountability gaps third, and review FinTech drift before it compounds."
  };
}

export function accountabilityLane() {
  return sampleBoardDecisionAccountabilityLedger.map((item) => ({
    lane: item.lane,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    accountabilityTheme: item.accountabilityTheme,
    boardConfidenceScore: item.boardConfidenceScore,
    nextMove: item.nextMove,
    decisionHandoffs: item.decisionHandoffs,
    ownershipGaps: item.ownershipGaps
  }));
}

export function ownershipLedger() {
  return sampleBoardDecisionAccountabilityLedger.map((item) => ({
    lane: item.lane,
    accountabilityHeadline: item.accountabilityHeadline,
    accountabilitySignal: item.accountabilitySignal,
    ownerOfRecord: item.ownerOfRecord,
    requiredEvidence: item.requiredEvidence,
    decisionHandoffs: item.decisionHandoffs,
    overrideEvents: item.overrideEvents
  }));
}

export function interventionPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    compositeAccountabilityRiskScore: item.compositeAccountabilityRiskScore,
    handoffs: item.handoffAssessment,
    ownershipGaps: item.ownershipGapAssessment,
    overrides: item.overrideAssessment,
    coverage: item.coverageAssessment,
    clarity: item.clarityAssessment,
    boardConfidence: item.confidenceAssessment
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    track: item.track,
    valueAtStakeMillions: item.valueAtStakeMillions,
    compositeAccountabilityRiskScore: item.compositeAccountabilityRiskScore,
    boardConfidenceScore: item.boardConfidenceScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic accountability-ledger data only - no live board packets, actual owner ledgers, or real override histories are included.",
    "Scores are modeled to show how Kinetic Gain can turn owner continuity gaps, override drift, and ledger weakness into board-readable accountability repairs.",
    "All routes are read-only and demonstrate accountability-ledger packaging, not production workflow automation."
  ];
}

export function payload() {
  return {
    report,
    accountabilityLane: accountabilityLane(),
    ownershipLedger: ownershipLedger(),
    interventionPosture: interventionPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardDecisionAccountabilityLedger
  };
}
