const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorConflict = require('../errors/ErrorConflict');
const ErrorValidation = require('../errors/ErrorValidation');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ErrorConflict('Пользователь с такой почтой уже зарегистрирован');
      }

      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorValidation('Переданы невалидные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
    });
};

module.exports.updUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findOne({ email })
    .then((result) => {
      if (result === null) {
        User.findByIdAndUpdate(
          req.user._id,
          { name, email },
          {
            new: true,
            runValidators: true,
          },
        )
          .orFail(() => {
            throw new ErrorNotFound('Пользователя с таким ID не существует');
          })
          .then((user) => res.send({ data: user }))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new ErrorValidation('Переданы невалидные данные'));
            } else {
              next(err);
            }
          });
      } else {
        next(new ErrorConflict('Для обновления данных нельзя использовать чужую почту'));
      }
    })
    .catch((err) => {
      next(err);
    });
};
