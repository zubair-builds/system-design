# Phase 3: Aggregation Consumer

## Goal
Understand how a consumer reads events and turns them into time-bucketed counters.

## What this phase does
- A consumer reads from the event queue.
- For each successful transfer it increments a counter for `(time-bucket, currency)`.
- You can see the counters grow as events are processed.

## Learning Checklist
- [ ] I can start the consumer and see it process events
- [ ] I understand time buckets (e.g. 1-minute windows)
- [ ] I see counters increasing per currency
- [ ] I know what happens if the consumer is stopped and restarted

## How to visualize this phase
```
Event Queue → Aggregation Consumer → Time-bucketed counters
```

## Key idea
This is where raw events become **pre-aggregated data** that is fast to query.
