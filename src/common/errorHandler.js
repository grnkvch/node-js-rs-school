const { ValidationError } = require('@hapi/joi');
const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('http-status-codes');

const errorLogger = require('./logger').get('errorLogger');
const { validationErrorResponse } = require('../resources/validateSchema');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const { statusCode, status } = err;
  errorLogger.error(err);
  if (err instanceof ValidationError) {
    res.status(BAD_REQUEST).json(validationErrorResponse(err.details));
    return;
  }
  res.status(statusCode || status || INTERNAL_SERVER_ERROR).send();
}

module.exports = errorHandler;
