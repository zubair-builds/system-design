const http = require('http');
const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');

const transfers = [];
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
  // Serve the visualization UI
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    const html = fs.readFileSync(path.join(__dirname, 'phase1-visualizer.html'), 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
    return;
  }

  // API: generate one transfer
  if (req.method === 'POST' && req.url === '/transfers') {
    const transfer = generateMockTransfer();
    transfers.push(transfer);
    console.log('[Phase 1] Generated:', transfer.amount, transfer.currency);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ transfer }));
    return;
  }

  // API: generate batch
  if (req.method === 'POST' && req.url.startsWith('/transfers/batch')) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const count = parseInt(url.searchParams.get('count') || '5', 10);
    const batch = [];
    for (let i = 0; i < count; i++) {
      const t = generateMockTransfer();
      transfers.push(t);
      batch.push(t);
    }
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ transfers: batch }));
    return;
  }

  // API: get all transfers
  if (req.method === 'GET' && req.url === '/transfers') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ count: transfers.length, transfers }));
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`\n=== Phase 1 Visualizer ===`);
  console.log(`Open http://localhost:${PORT} in your browser`);
  console.log('');
});
