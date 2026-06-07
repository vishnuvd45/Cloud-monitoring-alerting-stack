const express = require('express');
const client = require('prom-client');

const app = express();
const port = process.env.PORT || 3000;
client.collectDefaultMetrics({ timeout: 5000 });

const httpRequests = new client.Counter({
  name: 'app_http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});
const httpDuration = new client.Histogram({
  name: 'app_http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.05, 0.1, 0.3, 0.5, 1, 2, 5]
});
const simulatedErrors = new client.Counter({
  name: 'app_simulated_errors_total',
  help: 'Number of simulated error responses'
});
const healthGauge = new client.Gauge({
  name: 'app_health_status',
  help: 'Application health status. 1 healthy, 0 unhealthy'
});
healthGauge.set(1);

function observe(routeName, handler) {
  return async (req, res) => {
    const start = process.hrtime();
    res.on('finish', () => {
      const diff = process.hrtime(start);
      const seconds = diff[0] + diff[1] / 1e9;
      httpRequests.inc({ method: req.method, route: routeName, status_code: String(res.statusCode) });
      httpDuration.observe({ method: req.method, route: routeName, status_code: String(res.statusCode) }, seconds);
    });
    try { await handler(req, res); } catch (e) { res.status(500).json({ error: e.message }); }
  };
}

app.get('/', observe('/', (req, res) => {
  res.json({ service: 'sample-monitored-service', status: 'running', version: '2.0.0' });
}));
app.get('/health', observe('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
}));
app.get('/simulate-error', observe('/simulate-error', (req, res) => {
  simulatedErrors.inc();
  res.status(500).json({ error: 'Simulated application error' });
}));
app.get('/simulate-latency', observe('/simulate-latency', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 2500));
  res.json({ status: 'slow response simulated' });
}));
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => console.log(`Sample monitored service running on port ${port}`));
