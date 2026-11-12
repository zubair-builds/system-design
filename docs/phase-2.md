# Phase 2: In-memory Event Queue (Kafka simulation)

## Goal
Understand decoupling: the Transfer Service publishes events, and a queue holds them until consumers are ready.

## What this phase does
- Adds a simple in-memory queue that acts like a Kafka topic.
- Transfer Service publishes events into the queue instead of just storing them.
- You can inspect the queue.

## Learning Checklist
- [ ] I can see events being published to the queue
- [ ] I understand that the producer and consumer are now decoupled
- [ ] I can inspect what is currently in the queue
- [ ] I know that multiple consumers could read from this queue later

## How to visualize this phase
```
Transfer Service → [Event Queue] → (waiting for consumers)
```

## Key idea
The queue is the **buffer and contract** between producer and consumers. This is the role Kafka plays in the real system.
