const router = require('express').Router();
const { UNAUTHORIZED, getStatusText } = require('http-status-codes');
const createError = require('http-errors');
const { postSchema } = require('./schema');
const service = require('./service');
const { validateSchema } = require('../validateSchema');

router.route('/').post(validateSchema(postSchema), async (req, res, next) => {
  try {
    const { body } = req;
    const token = await service.loginUser(body);
    if (!token) throw createError(UNAUTHORIZED, getStatusText(getStatusText));
    res.json({ token });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
