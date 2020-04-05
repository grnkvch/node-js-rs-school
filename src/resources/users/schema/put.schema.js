const Joi = require('@hapi/joi');

module.exports = Joi.object({
  name: Joi.string(),
  login: Joi.string(),
  password: Joi.string(),
  id: Joi.string()
});
