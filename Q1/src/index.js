const express = require('express');
const config = require('./config/server');

const app = express();

app.use(express.json());

app.get('/ping', (req, res) => {
  res.json({ message: 'Average Calculator Microservice is running!' });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});