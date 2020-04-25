const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const { create: createUser } = require('../resources/users/service');

async function addAdmin() {
  createUser(null, {
    name: 'Admin',
    login: 'admin',
    password: 'admin'
  });
}

const connectToDB = callback => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    db.dropDatabase();
    await addAdmin();

    console.log('DB conected');
    callback();
  });
};

module.exports = { connectToDB };
