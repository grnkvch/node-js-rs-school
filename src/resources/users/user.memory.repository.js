const users = new Map(
  [
    {
      id: '01967cec-1e62-44a6-9dff-5a0b4f75f8e8',
      name: 'User 1',
      login: 'user1',
      password: '1resu'
    },
    {
      id: 'dc02a95b-3d23-496f-a11c-1e6c73e1ce05',
      name: 'User 2',
      login: 'user2',
      password: '2resu'
    },
    {
      id: '3faae206-bb01-4249-a5f3-1288eecd4400',
      name: 'User 3',
      login: 'user3',
      password: '3resu'
    }
  ].map(user => [user.id, user])
);

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
  console.log('deleteItem', id);
  return users.delete(id);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteItem
};
