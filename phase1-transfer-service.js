const http = require('http');
const { randomUUID } = require('crypto');

// In-memory list of generated transfers (just for this phase)
const transfers = [];

// Mock currencies
const CURRENCIES = ['USD', 'EUR', 'GBP', 'PKR', 'INR'];

function generateMockTransfer() {
  const currency = CURRENCIES[Math.floor(Math.random() * CURRENCIES.length)];
  const amount = parseFloat((Math.random() * 5000 + 10).toFixed(2));

  return {
    transfer_id: randomUUID(),
    amount,
    currency,
    timestamp: new Date().toISOString(),
    status: 'success',
    from_country: 'US',
    to_country: 'PK'
  };
}

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // POST /transfers → generate one transfer
  if (req.method === 'POST' && req.url === '/transfers') {
    const transfer = generateMockTransfer();
    transfers.push(transfer);
    console.log('[Transfer Service] Generated:', transfer.transfer_id, transfer.amount, transfer.currency);

    res.writeHead(201);
    res.end(JSON.stringify({ message: 'Transfer created (mock)', transfer }, null, 2));
    return;
  }

  // POST /transfers/batch?count=10 → generate many
  if (req.method === 'POST' && req.url.startsWith('/transfers/batch')) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const count = parseInt(url.searchParams.get('count') || '5', 10);
    const batch = [];

    for (let i = 0; i < count; i++) {
      const transfer = generateMockTransfer();
      transfers.push(transfer);
      batch.push(transfer);
    }

    console.log(`[Transfer Service] Generated batch of ${count}`);
    res.writeHead(201);
    res.end(JSON.stringify({ message: `Generated ${count} transfers`, transfers: batch }, null, 2));
    return;
  }

  // GET /transfers → see all so far
  if (req.method === 'GET' && req.url === '/transfers') {
    res.writeHead(200);
    res.end(JSON.stringify({ count: transfers.length, transfers }, null, 2));
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`\n=== Phase 1: Mock Transfer Service ===`);
  console.log(`Running on http://localhost:${PORT}`);
  console.log(`\nTry these commands in another terminal:`);
  console.log(`  curl -X POST http://localhost:${PORT}/transfers`);
  console.log(`  curl -X POST "http://localhost:${PORT}/transfers/batch?count=10"`);
  console.log(`  curl http://localhost:${PORT}/transfers`);
  console.log('');
});
