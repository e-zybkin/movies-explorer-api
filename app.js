require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const usersRoutes = require('./routes/users');
const moviesRoutes = require('./routes/movies');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const validations = require('./middlewares/validations');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const ErrorNotFound = require('./errors/ErrorNotFound');

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);

app.use(express.json());

app.use(cors({
  origin: [
    '',
  ],
  credentials: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validations.log, login);
app.post('/signup', validations.reg, createUser);

app.use(auth);

app.use('/users', usersRoutes);
app.use('/movies', moviesRoutes);

app.use((req, res, next) => {
  next(new ErrorNotFound('Упс, а такого у нас нету!'));
});

app.use(errorLogger);

app.use(errorHandler);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/bitfilmsdb');

  app.listen(PORT);
}

main();
