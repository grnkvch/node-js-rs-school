const Joi = require('@hapi/joi');

module.exports = Joi.object({
  login: Joi.string().required(),
  password: Joi.string().required()
});
