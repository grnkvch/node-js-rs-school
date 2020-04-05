const { users } = require('../memory.repository');
const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return [...users.values()];
};

const getById = async id => {
  return users.get(id);
};

const create = async data => {
  users.set(data.id, data);
  return data;
};

const update = async data => {
  const updatedData = {
    ...users.get(data.id),
    ...data
  };
  users.set(data.id, updatedData);
  return updatedData;
};

const deleteItem = async id => {
  return users.delete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteItem
};
