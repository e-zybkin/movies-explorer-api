const routes = require('express').Router();
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

routes.use('/users', usersRoutes);
routes.use('/movies', moviesRoutes);

module.exports = routes;
