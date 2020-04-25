const service = require('./service');

const { postSchema } = require('./schema');
const router = require('./router');

module.exports = {
  service,
  postSchema,
  router
};
