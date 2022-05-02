const routes = require('express').Router();
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const validations = require('../middlewares/validations');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const ErrorNotFound = require('../errors/ErrorNotFound');

routes.post('/signin', validations.log, login);
routes.post('/signup', validations.reg, createUser);

routes.use(auth);

routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);

routes.use((req, res, next) => {
  next(new ErrorNotFound('Упс, а такого у нас нету!'));
});

module.exports = routes;
