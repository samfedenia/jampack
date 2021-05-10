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
  try {
    if (req.errorMessage) throw new Error(req.errorMessage);
    const { id } = req.user;
    const user = await User.findByPk(id);
    res.status(200).send(user);
  } catch (ex) {
    console.log('Error in GET /users/: ', ex.message);
    res.status(404).json({ errorMessage: req.errorMessage });
  }
});

module.exports = usersRouter;
