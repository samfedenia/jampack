const db = require('../db');
const { DataTypes } = require('sequelize');

const Item = db.define('item', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  // weight default grams
  weight: {
    type: DataTypes.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  weight_oz: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${Math.round((this.weight * 10) / 28.3495) / 10}`;
    },
    set() {
      return 'do not set this field directly - set weight instead';
    },
  },
  // default cm
  length: {
    type: DataTypes.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  length_in: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${Math.round((this.length * 10) / 2.54) / 10}`;
    },
    set() {
      return 'do not set this field directly - set length instead';
    },
  },
  // default cm
  width: {
    type: DataTypes.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  width_in: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${Math.round((this.width * 10) / 2.54) / 10}`;
    },
    set() {
      return 'do not set this field directly - set width instead';
    },
  },
  // default cm
  height: {
    type: DataTypes.DECIMAL(10, 1),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  height_in: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${Math.round((this.height * 10) / 2.54) / 10}`;
    },
    set() {
      return 'do not set this field directly - set height instead';
    },
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'https://dummyimage.com/400x400/999999/222222',
  },
});

module.exports = Item;
