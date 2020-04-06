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

const boards = new Map(
  [
    {
      id: '2486f896-cd91-4ad2-966d-4e25118b4f30',
      title: 'BOARD_TITLE',
      columns: [
        {
          id: '59b05d90-fb5c-4691-8255-f200449cc6be',
          title: 'COLUMN_TITLE',
          order: 0
        }
      ]
    }
  ].map(board => [board.id, board])
);

const tasks = new Map(
  [
    {
      id: 'c3ae6e04-6ccb-4ec6-9c42-2d0e8d6fef21',
      title: 'TASK_TITLE',
      order: 0,
      description: 'TASK_DESCRIPTION',
      userId: '01967cec-1e62-44a6-9dff-5a0b4f75f8e8',
      boardId: '2486f896-cd91-4ad2-966d-4e25118b4f30',
      columnId: '59b05d90-fb5c-4691-8255-f200449cc6be'
    }
  ].map(task => [task.id, task])
);

module.exports = {
  users,
  boards,
  tasks
};
