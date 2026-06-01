import express from "express";
import { accountabilityLane, interventionPosture, ownershipLedger, payload, riskMap, summary, verification } from "./services/verticalBriefService.js";
import {
  renderAccountabilityLane,
  renderDocs,
  renderInterventionPosture,
  renderLedgerOverview,
  renderOwnershipLedger,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderLedgerOverview()));
  app.get("/accountability-lane", (_req, res) => res.type("html").send(renderAccountabilityLane()));
  app.get("/ownership-ledger", (_req, res) => res.type("html").send(renderOwnershipLedger()));
  app.get("/intervention-posture", (_req, res) => res.type("html").send(renderInterventionPosture()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/accountability-lane", (_req, res) => res.json(accountabilityLane()));
  app.get("/api/ownership-ledger", (_req, res) => res.json(ownershipLedger()));
  app.get("/api/intervention-posture", (_req, res) => res.json(interventionPosture()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

/* c8 ignore next 5 */
if (import.meta.url === `file://${process.argv[1]?.replace(/\\/g, "/")}`) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, "127.0.0.1", () => {
    console.log(`board-decision-accountability-ledger listening on http://127.0.0.1:${port}`);
  });
}
