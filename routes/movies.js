const moviesRoutes = require('express').Router();
const {
  getMovies,
  createMovie,
  delMovie,
} = require('../controllers/movies');
const validations = require('../middlewares/validations');

moviesRoutes.get('/', getMovies);
moviesRoutes.post('/', validations.makeMovie, createMovie);
moviesRoutes.delete('/_id', validations.checkMovieId, delMovie);

module.exports = moviesRoutes;
