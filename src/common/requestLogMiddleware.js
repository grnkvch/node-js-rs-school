const { finished } = require('stream');

const requestLogger = require('./logger').get('requestLogger');

function requestLogMiddleware(req, res, next) {
  const start = Date.now();
  finished(res, () => {
    const { method, originalUrl, body, query } = req;
    const { statusCode } = res;
    requestLogger.http({
      method,
      url: originalUrl,
      statusCode,
      body,
      query,
      duration: Date.now() - start
    });
  });
  return next();
}

module.exports = requestLogMiddleware;
