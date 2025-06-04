const express = require('express');
const config = require('./config/server');
const numbersController = require('./controllers/numbersController');

const app = express();

app.use(express.json());

app.get('/ping', (req, res) => {
  res.json({ message: 'Average Calculator Microservice is running!' });
});

app.get('/numbers/:numberid', numbersController.getNumbers.bind(numbersController));

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});