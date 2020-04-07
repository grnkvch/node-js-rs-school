const users = require('./users');
const boards = require('./boards');
const tasks = require('./tasks');

module.exports = {
  ['/users']: users,
  ['/boards']: boards,
  ['/boards/:boardId/tasks']: tasks
};
