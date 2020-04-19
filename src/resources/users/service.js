const dataRepo = require('./db.repository');
const tasksService = require('../tasks/service');

const getAll = () => dataRepo.getAll();
const getById = ({ id }) => dataRepo.getById(id);
const create = (params, data) => dataRepo.create(data);
const update = ({ id }, data) => dataRepo.update({ id, ...data });
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

module.exports = { getAll, getById, create, update, delete: deleteItem };
