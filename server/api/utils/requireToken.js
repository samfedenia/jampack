const {
  models: { User },
} = require('../../db');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    let token;
    if (authorization) {
      token = authorization.split(' ')[1];
    } else throw new Error('no token sent');
    const user = await User.byToken(token);
    if (!user.errorMessage) {
      req.user = user;
      next();
    } else {
      req.errorMessage = user.errorMessage;
      next();
    }
  } catch (ex) {
    console.log('Error in requireToken middleware: ', ex.message);
  }
};
