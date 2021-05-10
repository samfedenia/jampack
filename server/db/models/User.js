const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');
const { DataTypes } = require('sequelize');

const User = db.define('user', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
      notNull: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
});

User.addHook('beforeCreate', async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 12);
  }
});

User.byToken = async (token) => {
  try {
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (user) return user;
    if (!user) throw new Error('token invalid');
  } catch (ex) {
    return { errorMessage: ex.message };
  }
};

User.authenticate = async ({ email, password }) => {
  try {
    if (!email) throw new Error('email required');
    if (!password) throw new Error('password required');
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) throw new Error('email not found');
    if (user && (await bcrypt.compare(password, user.password))) {
      return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    } else {
      throw new Error('invalid password');
    }
  } catch (ex) {
    console.log('Error in User.authenticate: ', ex.message);
    return { errorMessage: ex.message };
  }
};

User.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());

  delete values.password;
  return values;
};

module.exports = User;
