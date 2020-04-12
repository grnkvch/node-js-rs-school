const errorLogger = require('./common/logger').get('errorLogger');
// uncaughtException handled by winston see common/logger/logger.js line 31
// https://github.com/winstonjs/winston#exceptions
process.on('unhandledRejection', ({ stack, message }) =>
  errorLogger.error({ stack, message })
);

const { PORT } = require('./common/config');

const app = require('./app');

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
