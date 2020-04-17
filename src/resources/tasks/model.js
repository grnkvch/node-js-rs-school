const mongoose = require('mongoose');
const uuid = require('uuid');

const usersSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
    alias: 'id'
  },
  title: String,
  order: Number,
  description: {
    type: String,
    default: ''
  },
  userId: String,
  boardId: String,
  columnId: String
});

usersSchema.statics.toResponse = function toResponse(task) {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return {
    id,
    title,
    order,
    description,
    userId: userId || null,
    boardId: boardId || null,
    columnId: columnId || null
  };
};

const Task = mongoose.model('Task', usersSchema);

module.exports = Task;
