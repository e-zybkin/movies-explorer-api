const { isCelebrateError } = require('celebrate');

const errorHandler = (err, req, res, next) => {
  console.log(err.stack || err);
  const { statusCode = 500, message } = err;

  if (isCelebrateError(err)) {
    const [error] = err.details.values();
    return res.status(400).send({ message: error.message });
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  return next();
};

module.exports = errorHandler;
