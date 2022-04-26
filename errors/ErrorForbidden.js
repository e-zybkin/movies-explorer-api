class ErrorForbidden extends Error {
  constructor(message = 'Ошибка авторизации') {
    super(message);
    this.errorMessage = message;
    this.statusCode = 403;
  }
}

module.exports = ErrorForbidden;
