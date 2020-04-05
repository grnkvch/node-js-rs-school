const Joi = require('@hapi/joi');

const columns = Joi.array().items(
  Joi.object({
    id: Joi.string(),
    title: Joi.string(),
    order: Joi.number()
  })
);

module.exports = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  columns
});
