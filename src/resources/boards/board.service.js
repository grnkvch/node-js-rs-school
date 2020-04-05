const boardRepo = require('./board.memory.repository');
const Board = require('./board.model');

const getAll = () => boardRepo.getAll();
const getById = id => boardRepo.getById(id);
const create = data => boardRepo.create(new Board(data));
const update = data => boardRepo.update(data);
const deleteItem = id => boardRepo.delete(id);

module.exports = { getAll, getById, create, update, delete: deleteItem };
