const usersRouter = require('express').Router();
const {
  models: { User },
} = require('../db');

const requireToken = require('./utils/requireToken');

// usersRouter.get('/', async (req, res) => {
//   const users = await User.findAll();
//   res.status(200).send(users);
// });

usersRouter.get('/', requireToken, async (req, res) => {
  const { id } = req.user;
  const user = await User.findByPk(id);
  res.status(200).send(user);
});

module.exports = usersRouter;
