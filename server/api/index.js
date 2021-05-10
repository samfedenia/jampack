const router = require('express').Router();
const loginRouter = require('./loginRouter');
const signupRouter = require('./signupRouter');
const usersRouter = require('./usersRouter');

router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/users', usersRouter);

module.exports = router;
