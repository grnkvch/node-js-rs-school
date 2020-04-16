const dataRepo = require('./memory.repository');

const getAll = () => dataRepo.getAll();
const getById = ({ id }) => dataRepo.getById(id);
const create = (params, data) => dataRepo.create(data);
const update = ({ id }, data) => dataRepo.update({ id, ...data });
const deleteItem = ({ id }) => dataRepo.delete(id);

module.exports = { getAll, getById, create, update, delete: deleteItem };
