require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DATA_BASE, NODE_ENV } = process.env;

const app = express();

app.use(requestLogger);

app.use(express.json());

app.use(helmet());

app.use(cors({
  origin: [
    'http://my-movies.nomoredomains.work',
    'https://my-movies.nomoredomains.work',
    'http://localhost:3000',
  ],
  credentials: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errorHandler);

async function main() {
  await mongoose.connect(NODE_ENV === 'production' ? DATA_BASE : 'mongodb://localhost:27017/bitfilmsdb');

  app.listen(PORT);
}

main();
