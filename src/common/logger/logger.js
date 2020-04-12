const fs = require('fs');

// eslint-disable-next-line no-sync
if (!fs.existsSync('logs')) fs.mkdirSync('logs');

const { transports, Container } = require('winston');

const { NODE_ENV } = require('../../common/config');
const { requestLogFormat, errorLogFormat } = require('./formats');

const loggerContainer = new Container();

loggerContainer.add('requestLogger', {
  transports: [
    new transports.File({
      level: 'http',
      format: requestLogFormat,
      filename: 'logs/request.log'
    })
  ]
});

loggerContainer.add('errorLogger', {
  transports: [
    new transports.File({
      level: 'error',
      format: errorLogFormat,
      filename: 'logs/error.log'
    })
  ],
  exceptionHandlers: [new transports.File({ filename: 'logs/exceptions.log' })]
});

if (NODE_ENV !== 'production') {
  const requestLogger = loggerContainer.get('requestLogger');
  const errorLogger = loggerContainer.get('errorLogger');
  requestLogger.add(
    new transports.Console({ level: 'http', format: requestLogFormat })
  );
  errorLogger.add(
    new transports.Console({ level: 'error', format: errorLogFormat })
  );
}

module.exports = loggerContainer;
