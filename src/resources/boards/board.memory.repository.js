const { boards } = require('../memory.repository');

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return [...boards.values()];
};

const getById = async id => {
  return boards.get(id);
};

const create = async data => {
  boards.set(data.id, data);
  return data;
};

const update = async data => {
  const updatedData = {
    ...boards.get(data.id),
    ...data
  };
  boards.set(data.id, updatedData);
  return updatedData;
};

const deleteItem = async id => {
  return boards.delete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteItem
};
