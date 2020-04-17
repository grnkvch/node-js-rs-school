const Model = require('./model');

const getAll = async () => {
  return Model.find({});
};

const getById = async id => {
  return Model.findById(id);
};

const create = async data => {
  return Model.create(data);
};

const update = async data => {
  return Model.findByIdAndUpdate(data.id, data);
};

const deleteItem = async id => {
  return Model.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteItem
};
