/* eslint-disable no-shadow */
const { format } = require('winston');
const { combine, timestamp, errors, printf } = format;

const requestLogFormat = combine(
  timestamp(),
  printf(({ timestamp, message = {} }) => {
    const { method, url, statusCode, duration, body, query } = message;
    const jsonBody = JSON.stringify(body);
    const jsonQuery = JSON.stringify(query);
    return `[${timestamp}] ${method} ${url} ${jsonBody} ${jsonQuery} ${statusCode} [${duration}ms]`;
  })
);

const errorLogFormat = combine(
  timestamp(),
  errors(),
  printf(({ timestamp, [Symbol.for('message')]: message }) => {
    return `[${timestamp}] ${message}`;
  })
);

module.exports = { requestLogFormat, errorLogFormat };
