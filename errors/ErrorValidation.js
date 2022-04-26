class ErrorValidation extends Error {
  constructor(message = 'Ошибка валидации') {
    super(message);
    this.errorMessage = message;
    this.statusCode = 400;
  }
}

module.exports = ErrorValidation;
