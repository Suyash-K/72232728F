const express = require('express');
const config = require('./config/server');
const numbersController = require('./controllers/numbersController');
const responseTime = require('./utils/responseTime');

const app = express();

app.use(express.json());
app.use(responseTime);

app.get('/ping', (req, res) => {
  res.json({ 
    message: 'Average Calculator Microservice is running!',
    timestamp: new Date().toISOString(),
    windowSize: config.windowSize
  });
});

app.get('/numbers/:numberid', numbersController.getNumbers.bind(numbersController));
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(config.port, () => {
  console.log(`🚀 Average Calculator Microservice started on port ${config.port}`);
  console.log(`📊 Window size: ${config.windowSize}`);
  console.log(`⏱️  Request timeout: ${config.requestTimeout}ms`);
});