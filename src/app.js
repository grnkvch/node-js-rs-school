const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const { NOT_FOUND } = require('http-status-codes');
const createError = require('http-errors');

const { router: loginRouter } = require('./resources/login');
const bindRouter = require('./resources/bindRouter');

const errorHandler = require('./common/errorHandler');
const requestLogMiddleware = require('./common/requestLogMiddleware');
const { checkTokenMiddleware } = require('./common/tokenUtil');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(requestLogMiddleware);

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);

app.use('/boards', checkTokenMiddleware, bindRouter('/boards'));
app.use('/users', checkTokenMiddleware, bindRouter('/users'));
app.use(
  '/boards/:boardId/tasks',
  checkTokenMiddleware,
  bindRouter('/boards/:boardId/tasks', { mergeParams: true })
);

app.use('*', (req, res, next) => next(createError(NOT_FOUND)));
app.use(errorHandler);

module.exports = app;
