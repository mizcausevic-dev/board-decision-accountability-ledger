export type DecisionAccountabilityTrack =
  | "AI_GOVERNANCE"
  | "IDENTITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "PROCUREMENT"
  | "BIOTECH";

export type AccountabilityAction = "LOCK_OWNER" | "RECORD_OVERRIDE" | "PATCH_GAP" | "REVIEW_DRIFT";

export type AccountabilitySeverity = "LOW" | "MEDIUM" | "HIGH";

export interface BoardDecisionAccountabilityLedgerItem {
  id: string;
  lane: string;
  track: DecisionAccountabilityTrack;
  action: AccountabilityAction;
  accountabilityTheme: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  accountabilityHeadline: string;
  accountabilitySignal: string;
  ownerOfRecord: string;
  requiredEvidence: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  decisionHandoffs: number;
  ownershipGaps: number;
  overrideEvents: number;
  ledgerCoverageScore: number;
  decisionClarityScore: number;
  boardConfidenceScore: number;
  valueAtStakeMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface AccountabilityAssessment {
  severity: AccountabilitySeverity;
  ok: boolean;
  message: string;
}

export interface BoardDecisionAccountabilityLedgerReportItem extends BoardDecisionAccountabilityLedgerItem {
  handoffAssessment: AccountabilityAssessment;
  ownershipGapAssessment: AccountabilityAssessment;
  overrideAssessment: AccountabilityAssessment;
  coverageAssessment: AccountabilityAssessment;
  clarityAssessment: AccountabilityAssessment;
  confidenceAssessment: AccountabilityAssessment;
  compositeAccountabilityRiskScore: number;
}

export interface BoardDecisionAccountabilityLedgerSummary {
  items: number;
  constrainedLanes: number;
  accountabilityFixLanes: number;
  averageBoardConfidence: number;
  valueAtStakeMillions: number;
  leadingMessage: string;
}

export interface BoardDecisionAccountabilityLedgerExport {
  generatedAt: string;
  summary: BoardDecisionAccountabilityLedgerSummary;
  items: BoardDecisionAccountabilityLedgerReportItem[];
}

export interface BoardDecisionAccountabilityLedgerPayload {
  report: BoardDecisionAccountabilityLedgerExport;
  accountabilityLane: ReturnType<typeof import("./services/verticalBriefService.js").accountabilityLane>;
  ownershipLedger: ReturnType<typeof import("./services/verticalBriefService.js").ownershipLedger>;
  interventionPosture: ReturnType<typeof import("./services/verticalBriefService.js").interventionPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: BoardDecisionAccountabilityLedgerItem[];
}
