const Joi = require('@hapi/joi');

module.exports = Joi.object({
  title: Joi.string().required(),
  order: Joi.number(),
  description: Joi.string().required(),
  userId: [Joi.string().required(), Joi.allow(null)],
  boardId: [Joi.string().required(), Joi.allow(null)],
  columnId: [Joi.string().required(), Joi.allow(null)]
});
