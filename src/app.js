const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
// const userRouter = require('./resources/users/router');
// const boardRouter = require('./resources/boards/router');
const bindRouter = require('./resources/bindRouter');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(...bindRouter('/users'));
app.use(...bindRouter('/boards'));

module.exports = app;
