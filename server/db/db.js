const Sequelize = require('sequelize');
const DATABASE_URL =
  process.env.DATABASE_URL || 'postgres://localhost/packplanner_db';
const db = new Sequelize(DATABASE_URL);

module.exports = db;
