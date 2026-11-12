# Phase 2: In-memory Event Queue (Kafka simulation)

## Goal
See the producer publish events into a queue, and observe the queue independently.

## Visualizer
```bash
node phase2-visualizer-server.js
```
Open **http://localhost:3002**

## What changed from Phase 1
- Events are no longer just stored in a list.
- They are **published** into `eventQueue` with an offset.
- You can inspect the queue separately.

## Learning Checklist
- [ ] I published events and saw them appear in the queue with offsets
- [ ] I understand the queue is now the buffer between producer and future consumers
- [ ] I can refresh and see the current queue state
- [ ] I know nothing is consuming the events yet (queue only grows)

## How to visualize this phase
```
Transfer Service → publishes → [Event Queue / Topic: transfer-events]
```

## Key idea
This queue is the Kafka stand-in. In the real system the Transfer Service would produce to a Kafka topic, and consumers would read from it at their own pace.
