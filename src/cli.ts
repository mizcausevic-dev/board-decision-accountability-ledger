import { readFileSync } from "node:fs";
import { analyze } from "./analyze.js";
import { formatSummary } from "./format.js";
import type { BoardDecisionAccountabilityLedgerItem } from "./types.js";

function usage() {
  console.error("Usage: board-decision-accountability-ledger <input.json> [--format summary|json]");
}

const args = process.argv.slice(2);
const inputPath = args[0] ?? "fixtures/board-decision-accountability-ledger.json";
const format = args.includes("--format")
  ? args[args.indexOf("--format") + 1]
  : "summary";

if (!inputPath) {
  usage();
  process.exit(1);
}

const raw = readFileSync(inputPath, "utf8");
const items = JSON.parse(raw) as BoardDecisionAccountabilityLedgerItem[];
const report = analyze(items);

if (format === "json") {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(formatSummary(report.summary, "Board Decision Accountability Ledger"));
}
