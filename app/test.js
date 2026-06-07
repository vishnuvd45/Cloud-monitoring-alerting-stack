const http = require('http');
const url = 'http://localhost:3000/health';
http.get(url, (res) => {
  if (res.statusCode !== 200) process.exit(1);
  console.log('Health check passed');
}).on('error', () => process.exit(1));
