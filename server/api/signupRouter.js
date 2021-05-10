const signupRouter = require('express').Router();
const {
  models: { User },
} = require('../db');

signupRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.create({ email, password });
    res.status(201).send(user);
  } catch (ex) {
    res.status(409).json({ errorMessage: ex.errors[0].message });
  }
});

module.exports = signupRouter;
