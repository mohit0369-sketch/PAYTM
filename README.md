# KYC Chase Agent — Case Dashboard

A read-only React dashboard for the KYC Onboarding-Chase Agent hackathon demo.
It runs entirely on local mock data — it does **not** call your n8n workflow or
Cognee, so it won't interfere with anything you already have working.

## Run it

```
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## What's in it

- **Stat bar** — total / pending / complete / escalated, computed live from the case list.
- **Merchant case table** — 10 mock KYC cases with status, risk, missing documents,
  and SLA deadline. Click a row to expand the agent's note and submission date.
  Search by merchant name or case ID, and filter by status.
- **AI activity panel** — two demo buttons:
  - **Run normal-case demo** — plays out Detect → Chase → Verify → Close on
    `MCH-2065` (Copperline Coffee Co.), ending with the case marked Complete.
  - **Run risky-case demo** — plays out Detect → Assess → Escalate on
    `MCH-2044` (Orbit Freight Logistics), ending with the case routed to a
    human reviewer instead of being auto-approved.

Each demo streams timestamped log entries one at a time and highlights the
case row being acted on, so it reads clearly on a screen share or projector.

## Editing the demo data

All mock cases and the activity script live in `src/data/cases.js`. Edit the
`initialCases` array to change case details, or `activityScript` to change
what the AI activity panel narrates during each demo.

## Connecting it to n8n later (optional)

This version is intentionally disconnected so it's safe to demo without
touching your working workflow. If you want to wire it up afterwards:

1. Replace the static `initialCases` import in `src/App.jsx` with a `fetch`
   call to an n8n webhook that returns your case data as JSON.
2. Replace the `runDemo` function's local state updates with a call to an
   n8n webhook that triggers the real workflow, then poll or subscribe for
   the resulting status change.

Do this only if time permits — the thin UI already tells the full story on
its own.
