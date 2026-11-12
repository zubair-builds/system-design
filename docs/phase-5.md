# Phase 5: Dashboard API

## Goal
Turn the query logic into a clean HTTP API the frontend can call.

## What this phase does
- Exposes endpoints like `GET /totals?range=24h`.
- Returns structured JSON with per-currency totals + base currency total + freshness info.

## Learning Checklist
- [ ] I can call the totals API for different ranges
- [ ] I understand the response shape
- [ ] I see how freshness / lag could be exposed
- [ ] I know this API is what the UI will consume

## How to visualize this phase
```
Aggregated Store → Dashboard API → JSON response
```

## Key idea
The API is the stable contract between the aggregation system and any UI or other consumers.
