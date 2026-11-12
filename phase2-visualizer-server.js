const http = require('http');
const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');

// ===== Phase 2: In-memory Event Queue (Kafka stand-in) =====
const eventQueue = [];          // the "topic"
const transfers = [];           // still keep raw list for reference

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

function publishToQueue(transfer) {
  // Simulate publishing to Kafka topic "transfer-events"
  eventQueue.push({
    offset: eventQueue.length,
    event: transfer,
    published_at: new Date().toISOString()
  });
  console.log(`[Queue] Published offset=${eventQueue.length - 1} | ${transfer.amount} ${transfer.currency}`);
}

const server = http.createServer((req, res) => {
  // Serve visualizer
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    const html = fs.readFileSync(path.join(__dirname, 'phase2-visualizer.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  // Generate + publish one transfer
  if (req.method === 'POST' && req.url === '/transfers') {
    const transfer = generateMockTransfer();
    transfers.push(transfer);
    publishToQueue(transfer);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ transfer, queue_size: eventQueue.length }));
    return;
  }

  // Generate + publish batch
  if (req.method === 'POST' && req.url.startsWith('/transfers/batch')) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const count = parseInt(url.searchParams.get('count') || '5', 10);
    const batch = [];
    for (let i = 0; i < count; i++) {
      const t = generateMockTransfer();
      transfers.push(t);
      publishToQueue(t);
      batch.push(t);
    }
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ transfers: batch, queue_size: eventQueue.length }));
    return;
  }

  // Inspect the queue
  if (req.method === 'GET' && req.url === '/queue') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      topic: 'transfer-events',
      size: eventQueue.length,
      events: eventQueue
    }));
    return;
  }

  // Raw transfers list (optional)
  if (req.method === 'GET' && req.url === '/transfers') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ count: transfers.length, transfers }));
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`\n=== Phase 2: Event Queue Visualizer ===`);
  console.log(`Open http://localhost:${PORT}`);
  console.log(`Queue topic: transfer-events\n`);
});
