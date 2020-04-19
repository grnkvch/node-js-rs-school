const mongoose = require('mongoose');
const uuid = require('uuid');

const usersSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid,
    alias: 'id'
  },
  name: String,
  login: String,
  password: String
});

usersSchema.statics.toResponse = function toResponse(user) {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', usersSchema);

module.exports = User;
