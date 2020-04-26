const bcrypt = require('bcrypt');

const { sign } = require('../../common/tokenUtil');
const usersService = require('../users/service');

const loginUser = async ({ login, password }) => {
  const user = await usersService.getByLogin(login);
  if (user) {
    const { id, password: passwordHash } = user;
    const match = await bcrypt.compare(password, passwordHash);
    if (match) {
      return sign({ id, login });
    }
  }

  return null;
};

module.exports = { loginUser };
