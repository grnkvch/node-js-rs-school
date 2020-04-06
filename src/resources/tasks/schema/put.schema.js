const Joi = require('@hapi/joi');

module.exports = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  order: Joi.number(),
  description: Joi.string(),
  userId: [Joi.string().required(), Joi.allow(null)],
  boardId: [Joi.string().required(), Joi.allow(null)],
  columnId: [Joi.string().required(), Joi.allow(null)]
});
