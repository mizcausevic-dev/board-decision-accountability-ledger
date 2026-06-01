import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { sampleBoardDecisionAccountabilityLedger } from "../src/data/sampleVerticalBrief.js";

const fixturesDir = path.resolve("fixtures");
mkdirSync(fixturesDir, { recursive: true });

writeFileSync(
  path.join(fixturesDir, "board-decision-accountability-ledger.json"),
  JSON.stringify(sampleBoardDecisionAccountabilityLedger, null, 2)
);

writeFileSync(
  path.join(fixturesDir, "board-decision-accountability-ledger-clean.json"),
  JSON.stringify(
    sampleBoardDecisionAccountabilityLedger.map(({ narrative: _narrative, currentPosture: _currentPosture, ...item }) => item),
    null,
    2
  )
);
