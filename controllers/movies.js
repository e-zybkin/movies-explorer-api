const Movie = require('../models/movie');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorValidation = require('../errors/ErrorValidation');
const ErrorForbidden = require('../errors/ErrorForbidden');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send({ data: movies }))
    .catch((err) => {
      next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorValidation('Переданы невалидные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.delMovie = (req, res, next) => {
  const { _id } = req.params;
  Movie.findById(_id)
    .orFail(() => {
      throw new ErrorNotFound('Фильма с таким ID не существует');
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ErrorForbidden('Вы не можете удалять чужие фильмы');
      }
      return Movie.findByIdAndRemove(_id)
        .then(() => res.send({ data: movie }));
    })
    .catch((err) => {
      next(err);
    });
};
