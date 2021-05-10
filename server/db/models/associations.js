const User = require('./User');
const Item = require('./Item');

User.hasMany(Item);
Item.belongsTo(User);

Item.hasMany(Item, { as: 'SubItem' });

module.exports = { models: { User, Item } };
