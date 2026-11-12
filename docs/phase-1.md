# Phase 1: Mock Transfer Service

## Goal
Understand how transfer events are created (the producer side).

## Visualizer (recommended)
```bash
node phase1-visualizer-server.js
```
Then open **http://localhost:3001** in your browser.

You will see a simple UI where you can generate transfers and watch them appear.

## Learning Checklist
- [ ] I opened the visualizer in the browser
- [ ] I generated single transfers and saw them appear
- [ ] I generated batches and watched the list grow
- [ ] I understand the fields: `transfer_id`, `amount`, `currency`, `timestamp`
- [ ] I know this is only the producer — nothing is consuming these events yet

## How to visualize this phase
```
[Browser UI] → Transfer Service → Events appear in the list
```

## Key idea
This is the **producer**. In later phases these events will be published to a queue instead of just stored in memory.
