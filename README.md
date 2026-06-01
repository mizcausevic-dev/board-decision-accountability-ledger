# Board Decision Accountability Ledger

Board-ready accountability-ledger surface for tracking final decision owners, approval continuity, and board-visible ownership discipline across the executive estate.

- Live: `https://accountability.kineticgain.com/`
- Repo: `mizcausevic-dev/board-decision-accountability-ledger`

## Why this matters

Leaders need more than one-time reset calls. They need one surface that shows who now owns the final decision, where accountability continuity is still weak, and how ownership discipline holds over time.

## What it includes

- TypeScript executive-intelligence surface for accountability ledgers with modeled owner-of-record lanes, continuity gaps, accountability repair, and board-safe intervention posture
- synthetic executive lanes across AI, identity, revenue, FinTech, biotech, procurement, and public-sector readiness
- reusable outputs for escalation lanes, handoff ledgers, intervention packets, and board-ready operating memos
- prerendered static site, JSON payloads, screenshots, and docs

## Routes

- `/`
- `/accountability-lane`
- `/ownership-ledger`
- `/intervention-posture`
- `/verification`
- `/docs`

## Local run

```bash
cd board-decision-accountability-ledger
npm install
npm run verify
npm run prerender
npm run render:assets
```

## CLI

```bash
npx board-decision-accountability-ledger fixtures/board-decision-accountability-ledger.json --format summary
npx board-decision-accountability-ledger fixtures/board-decision-accountability-ledger-clean.json --format json
```

## Docs

- [Architecture](docs/architecture.md)
- [Origin](docs/ORIGIN.md)
- [Kinetic Gain Embedded](docs/KINETIC_GAIN_EMBEDDED.md)

## Screenshots

![Overview](screenshots/01-overview-proof.png)
![Accountability lane](screenshots/02-accountability-lane-proof.png)
![Ownership ledger](screenshots/03-ownership-ledger-proof.png)
![Intervention posture](screenshots/04-intervention-posture-proof.png)
