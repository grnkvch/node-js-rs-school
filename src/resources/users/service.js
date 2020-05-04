const bcrypt = require('bcrypt');
const dataRepo = require('./db.repository');
const tasksService = require('../tasks/service');

const getAll = () => dataRepo.getAll();
const getById = ({ id }) => dataRepo.getById(id);
const create = async (params, data) => {
  const passwordHash = await bcrypt.hash(data.password, 10);
  return dataRepo.create({ ...data, password: passwordHash });
};
const update = async ({ id }, { password, ...data }) => {
  if (password) data.password = await bcrypt.hash(password, 10);
  return dataRepo.update({ id, ...data });
};
const deleteItem = async ({ id }) => {
  const deletedUser = await dataRepo.delete(id);
  const allTasks = await tasksService.getAll();
  await Promise.all(
    allTasks.reduce((acc, task) => {
      if (task.userId === id) {
        acc.push(tasksService.update({ id: task.id }, { userId: null }));
      }
      return acc;
    }, [])
  );
  return deletedUser;
};
const getByLogin = login => dataRepo.getByLogin(login);

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteItem,
  getByLogin
};
