const { boards } = require('../memory.repository');
const Model = require('./model');

const getAll = async () => {
  // TODO: mock implementation. should be replaced during task development
  return [...boards.values()];
};

const getById = async id => {
  return boards.get(id);
};

const create = async data => {
  const newBoard = new Model(data);
  boards.set(newBoard.id, newBoard);
  return newBoard;
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
