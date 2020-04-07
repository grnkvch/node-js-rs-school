const dataRepo = require('./memory.repository');
const Model = require('./model');

const getAll = () => dataRepo.getAll();
const getById = ({ id }) => dataRepo.getById(id);
const create = (params, data) => dataRepo.create(new Model(data));
const update = ({ id }, data) => dataRepo.update({ id, ...data });
const deleteItem = ({ id }) => dataRepo.delete(id);

module.exports = { getAll, getById, create, update, delete: deleteItem };
