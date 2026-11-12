# Phase 6: Simple Next.js UI

## Goal
See the end-to-end flow with a visual dashboard.

## What this phase does
- A minimal Next.js page that calls the Dashboard API.
- Displays total transferred (last 24h, 7d, etc.) per currency and in base currency.
- Auto-refreshes so you can watch numbers update as new transfers arrive.

## Learning Checklist
- [ ] I can open the UI and see live totals
- [ ] I understand the full path: Transfer → Queue → Consumer → Store → API → UI
- [ ] I can generate new transfers and watch the dashboard update
- [ ] I can explain each box in the architecture

## How to visualize this phase
```
Transfer Service → Queue → Consumer → Store → API → Next.js Dashboard
```

## Key idea
You now have a complete, understandable version of the system design we discussed.
