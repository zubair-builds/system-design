# Wise Aggregation Demo

Phase-wise implementation of a transfer aggregation pipeline (inspired by Wise system design interviews).

## Phase 1: Mock Transfer Service

Generates mock transfer events.

```bash
node phase1-transfer-service.js
```

Then in another terminal:

```bash
curl -X POST http://localhost:3001/transfers
curl -X POST "http://localhost:3001/transfers/batch?count=10"
curl http://localhost:3001/transfers
```

More phases coming...
