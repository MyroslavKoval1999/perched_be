const { UNAUTHORIZED, BAD_REQUEST, NOT_FOUND } = require("../constants/statusCode");

module.exports = class ApiError extends Error {
  status;
  error;

  constructor(status, message, error) {
    super(message);
    this.status = status;
    this.error = error;
    Error.captureStackTrace(this, this.constructor);
  }

  static UnauthorizedError(
    message = "Unauthorized Error",
    error = "Unauthorized"
  ) {
    return new ApiError(UNAUTHORIZED, message, error);
  }

  static BadRequest(message, error = "Bad Request") {
    return new ApiError(BAD_REQUEST, message, error);
  }

  static notFound(message, error = 'Not found') {
    return new ApiError(NOT_FOUND, message, error);
  }
};
