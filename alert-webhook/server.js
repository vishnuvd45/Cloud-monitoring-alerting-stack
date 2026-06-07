const express = require('express');
const app = express();
app.use(express.json({ limit: '1mb' }));
app.post('/alerts', (req, res) => {
  const alerts = req.body.alerts || [];
  console.log('\n====== ALERT RECEIVED ======');
  alerts.forEach(a => console.log(`${a.status.toUpperCase()} | ${a.labels.alertname} | ${a.annotations.summary || ''}`));
  console.log('============================\n');
  res.sendStatus(200);
});
app.get('/health', (req, res) => res.json({ status: 'running' }));
app.listen(5001, () => console.log('Alert webhook listener running on port 5001'));
