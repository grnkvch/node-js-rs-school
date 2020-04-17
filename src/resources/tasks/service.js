const dataRepo = require('./db.repository');

const getAll = () => dataRepo.getAll();
const getById = ({ id }) => dataRepo.getById(id);
const create = ({ boardId }, data) => dataRepo.create({ ...data, boardId });
const update = ({ id }, data) => dataRepo.update({ id, ...data });
const deleteItem = ({ id }) => dataRepo.delete(id);

module.exports = { getAll, getById, create, update, delete: deleteItem };
