const bcrypt = require('bcrypt');

const userRouter = require('express').Router();
const {
  models: { User },
} = require('../db');

const requireToken = require('./utils/requireToken');
const itemsRouter = require('./itemsRouter');

// usersRouter.get('/', async (req, res) => {
//   const users = await User.findAll();
//   res.status(200).send(users);
// });

userRouter.get('/', requireToken, async (req, res) => {
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

userRouter.delete('/', requireToken, async (req, res) => {
  try {
    if (req.errorMessage) throw new Error(req.errorMessage);
    const { id } = req.user;
    const user = await User.findByPk(id);
    await user.destroy();
    res.sendStatus(204);
  } catch (ex) {
    console.log('Error in GET /users/: ', ex.message);
    res.status(404).json({ errorMessage: req.errorMessage });
  }
});

userRouter.put('/', requireToken, async (req, res) => {
  try {
    const { id } = req.user;
    const { email, password } = req.body;
    const hashedPass = await bcrypt.hash(JSON.stringify(password), 12);
    const user = await User.findByPk(id);
    const updatedUser = await user.update({ email, password: hashedPass });
    res.status(200).send(updatedUser);
  } catch (ex) {
    console.log(ex);
    res.status(409).json({ errorMessage: ex.errors[0].message });
  }
});

userRouter.use('/items', requireToken, itemsRouter);

module.exports = userRouter;
