const {
  celebrate,
  Joi,
  Segments,
} = require('celebrate');
const validator = require('validator');

const reg = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name:
      Joi
        .string()
        .min(2)
        .max(30)
        .messages({
          'string.min': 'Имя должно быть не короче 2 символов',
          'string.max': 'Имя должно быть не длиннее 30 символов',
        }),
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.notEmail');
      }
      return value;
    }).messages({
      'any.required': 'Email не указан',
      'string.notEmail': 'Email некорректен',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Пароль не указан',
    }),
  }),
});

const log = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.notEmail');
      }
      return value;
    }).messages({
      'any.required': 'Email не указан',
      'string.notEmail': 'Email некорректен',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Пароль не указан',
    }),
  }),
});

const updateProf = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name:
      Joi
        .string()
        .required()
        .min(2)
        .max(30)
        .messages({
          'any.required': 'Имя не указано',
          'string.min': 'Имя должно быть не короче 2 символов',
          'string.max': 'Имя должно быть не длиннее 30 символов',
        }),
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.notEmail');
      }
      return value;
    }).messages({
      'any.required': 'Email не указан',
      'string.notEmail': 'Email некорректен',
    }),
  }),
});

const makeMovie = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required().messages({
      'any.required': 'Страна не указана',
    }),
    director: Joi.string().required().message({
      'any.required': 'Режиссёр не указан',
    }),
    duration: Joi.number().required().message({
      'any.required': 'Длительность не указана',
    }),
    year: Joi.string().required().message({
      'any.required': 'Год выпуска не указан',
    }),
    description: Joi.string().required().message({
      'any.required': 'Описание не указано',
    }),
    image: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value)) {
        return helper.error('string.notURL');
      }
      return value;
    }).messages({
      'any.required': 'Ссылка на картинку не указана',
      'string.notURL': 'Ссылка некорректна',
    }),
    trailerLink: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value)) {
        return helper.error('string.notURL');
      }
      return value;
    }).messages({
      'any.required': 'Ссылка на трейлер не указана',
      'string.notURL': 'Ссылка некорректна',
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (!validator.isURL(value)) {
        return helper.error('string.notURL');
      }
      return value;
    }).messages({
      'any.required': 'Ссылка на картинку не указана',
      'string.notURL': 'Ссылка некорректна',
    }),
    nameRU: Joi.string().required().messages({
      'any.required': 'Имя карточки на русском не указано',
    }),
    nameEN: Joi.string().required().messages({
      'any.required': 'Имя карточки на английском не указано',
    }),
  }),
});

const checkMovieId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    movieId: Joi.string().length(24).hex().messages({
      'string.length': 'Неверно введён ID',
    }),
  }),
});

module.exports = {
  reg,
  log,
  updateProf,
  makeMovie,
  checkMovieId,
};
