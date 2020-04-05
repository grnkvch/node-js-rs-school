const usersRepo = require('./boards.memory.repository');
const User = require('./boards.model');

const getAll = () => usersRepo.getAll();
const getById = id => usersRepo.getById(id);
const create = data => usersRepo.create(new User(data));
const update = data => usersRepo.update(data);
const deleteItem = id => usersRepo.delete(id);

module.exports = { getAll, getById, create, update, delete: deleteItem };
