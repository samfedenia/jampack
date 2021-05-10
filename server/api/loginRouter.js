const loginRouter = require('express').Router();
const {
  models: { User },
} = require('../db');

const requireToken = require('./utils/requireToken');

loginRouter.post('/auth', async (req, res) => {
  try {
    const authResponse = await User.authenticate(req.body);

    if (!authResponse.errorMessage) {
      res.send({ token: await User.authenticate(req.body) });
    } else {
      throw new Error(authResponse.errorMessage);
    }
  } catch (ex) {
    res.status(401).json({ errorMessage: ex.message });
  }
});

loginRouter.get('/auth', requireToken, async (req, res) => {
  try {
    if (req.errorMessage) throw new Error(req.errorMessage);
    res.send(req.user);
  } catch (ex) {
    console.log('Error in GET /api/login/auth: ', ex.message);
    res.status(401).json({ errorMessage: ex.message });
  }
});

module.exports = loginRouter;
