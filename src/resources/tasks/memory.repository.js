const { tasks } = require('../memory.repository');
const Model = require('./model');

const getAll = async () => {
  return [...tasks.values()];
};

const getById = async id => {
  return tasks.get(id);
};

const create = async data => {
  const newTask = new Model(data);
  tasks.set(newTask.id, newTask);
  return newTask;
};

const update = async data => {
  const updatedData = {
    ...tasks.get(data.id),
    ...data
  };
  tasks.set(data.id, updatedData);
  return updatedData;
};

const deleteItem = async id => {
  return tasks.delete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteItem
};
