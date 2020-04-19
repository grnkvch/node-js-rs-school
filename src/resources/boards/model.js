const uuid = require('uuid');
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
    alias: 'id'
  },
  title: String,
  order: Number
});

const boardSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
    alias: 'id'
  },
  title: String,
  columns: [columnSchema]
});

boardSchema.statics.toResponse = function toResponse(board) {
  const { id, title, columns } = board;
  return {
    id,
    title,
    // eslint-disable-next-line no-shadow
    columns: columns.map(({ id, title, order }) => ({
      id,
      title,
      order
    }))
  };
};

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
