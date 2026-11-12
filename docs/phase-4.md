# Phase 4: Aggregated Store + Query Logic

## Goal
Understand where the counters live and how we query “last 24 hours”.

## What this phase does
- Stores the time-bucketed counters (in-memory stand-in for Redis).
- Provides a way to sum the right buckets for a time range.
- Shows original-currency totals and base-currency total.

## Learning Checklist
- [ ] I can query the total for the last 24 hours
- [ ] I understand which buckets are summed
- [ ] I see both per-currency and base-currency results
- [ ] I know how longer ranges (7d, 1y) would use coarser buckets

## How to visualize this phase
```
Counters → Aggregated Store → Query: sum buckets in range
```

## Key idea
Pre-aggregation + bucket summing is what makes the dashboard fast even at high volume.
