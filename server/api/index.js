const router = require('express').Router();
const loginRouter = require('./loginRouter');
const signupRouter = require('./signupRouter');
const userRouter = require('./userRouter');

router.use('/login', loginRouter);
router.use('/signup', signupRouter);
router.use('/user', userRouter);

module.exports = router;
