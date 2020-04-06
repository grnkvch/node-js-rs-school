const Model = require('./model');
const service = require('./service');

const { postSchema, putSchema } = require('./schema');

module.exports = {
  Model,
  service,
  postSchema,
  putSchema
};
