# Phase 1: Mock Transfer Service

## Goal
Understand how transfer events are created (the producer side).

## What this phase does
- Generates realistic mock transfer events.
- Exposes simple HTTP endpoints so you can create events on demand.
- Stores them in memory (for now).

## Run it
```bash
node phase1-transfer-service.js
```

## Try these commands
```bash
# One transfer
curl -X POST http://localhost:3001/transfers

# 10 transfers
curl -X POST "http://localhost:3001/transfers/batch?count=10"

# See all generated events
curl http://localhost:3001/transfers
```

## Learning Checklist
- [ ] I can generate a single transfer event
- [ ] I understand the fields: `transfer_id`, `amount`, `currency`, `timestamp`, `status`
- [ ] I can generate a batch of events
- [ ] I know that right now nothing is consuming these events

## How to visualize this phase
```
[You / curl] → Transfer Service → (events sitting in memory)
```

Think of this as the **source of truth** for transfers. In the real system these events would be published to Kafka.

## Key idea
This is the **producer**. Everything downstream depends on these events.
