const Joi = require('@hapi/joi');

const columns = Joi.array().items(
  Joi.object({
    title: Joi.string().required(),
    order: Joi.number()
  })
);

module.exports = Joi.object({
  title: Joi.string().required(),
  columns
});
