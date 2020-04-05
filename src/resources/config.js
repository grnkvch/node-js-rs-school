const users = require('./users');
const boards = require('./boards');

module.exports = {
  ['/users']: users,
  ['/boards']: boards
};
