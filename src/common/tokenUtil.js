const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED, getStatusText } = require('http-status-codes');
const createError = require('http-errors');

const { JWT_SECRET_KEY } = require('./config');

const promisifiedSign = promisify(jwt.sign);
const promisifiedVerify = promisify(jwt.verify);

function sign(payload) {
  return promisifiedSign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
}
function verify(token) {
  return promisifiedVerify(token, JWT_SECRET_KEY);
}

async function checkTokenMiddleware(req, res, next) {
  try {
    const [, token] = /Bearer (.+)/.exec(req.headers.authorization) || [];
    await verify(token);
    return next();
  } catch (error) {
    return next(createError(UNAUTHORIZED, getStatusText(UNAUTHORIZED)));
  }
}

module.exports = {
  sign,
  verify,
  checkTokenMiddleware
};
