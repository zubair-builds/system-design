# Wise Aggregation Demo

Phase-wise implementation of a transfer aggregation pipeline (inspired by Wise system design interviews).

This repo helps you understand an event-driven aggregation system step by step.

## Architecture Overview

```
Transfer Service → Event Queue (Kafka-like) → Aggregation Consumer → Aggregated Store → Dashboard API → UI
```

## Phases

| Phase | What you learn | Status |
|-------|----------------|--------|
| [Phase 1](./docs/phase-1.md) | Mock Transfer Service (event producer) | Done |
| [Phase 2](./docs/phase-2.md) | In-memory Event Queue (Kafka simulation) | Next |
| [Phase 3](./docs/phase-3.md) | Aggregation Consumer (time-bucketed counters) | Planned |
| [Phase 4](./docs/phase-4.md) | Aggregated Store + query logic | Planned |
| [Phase 5](./docs/phase-5.md) | Dashboard API | Planned |
| [Phase 6](./docs/phase-6.md) | Simple Next.js UI | Planned |

## How to use this repo

1. Read the phase guide (`docs/phase-X.md`).
2. Run the corresponding code.
3. Complete the checklist.
4. Visualize the flow before moving to the next phase.

Start with [Phase 1](./docs/phase-1.md).
