class ErrorUnauthorized extends Error {
  constructor(message = 'Неверные данные') {
    super(message);
    this.errorMessage = message;
    this.statusCode = 401;
  }
}

module.exports = ErrorUnauthorized;
