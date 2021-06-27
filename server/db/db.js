const Sequelize = require('sequelize');
const DATABASE_URL =
  process.env.DATABASE_URL || 'postgres://localhost/jampack_db';
const dbConfig = {
  logging: false,
};

const db = new Sequelize(DATABASE_URL, dbConfig);

module.exports = db;
