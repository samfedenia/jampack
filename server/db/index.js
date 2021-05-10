/* eslint no-console: 'off' */
/* eslint comma-dangle: 'off' */
const {
  models: { User, Item },
} = require('./models/associations');
const db = require('./db');
const seed = require('./seed');

const initDB = async () => {
  try {
    await db.sync({ force: true });
    await seed();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { initDB, models: { User, Item } };
