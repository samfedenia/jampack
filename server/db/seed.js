const {
  models: { User, Item },
} = require('./models/associations');

const seed = async () => {
  const user = await User.create({
    email: 'test@test.com',
    password: '12345678',
  });

  const item = await Item.create({
    name: 'Tent',
    weight: 1344.0,
    length: 40.6,
    width: 15.2,
    height: 15.2,
    image_url: 'https://dummyimage.com/400x400/999999/222222',
    userId: user.id,
  });
  await Item.create({
    name: 'Tent Stakes',
    weight: 150,
    length: 16,
    width: 8,
    height: 8,
    image_url: 'https://dummyimage.com/400x400/999999/222222',
    userId: user.id,
    itemId: item.id,
  });
  const user2 = await User.create({
    email: 'test2@test.com',
    password: '12345678',
  });
  const item2 = await Item.create({
    name: 'Tent',
    weight: 1344.0,
    length: 40.6,
    width: 15.2,
    height: 15.2,
    image_url: 'https://dummyimage.com/400x400/999999/222222',
    userId: user2.id,
  });
  await Item.create({
    name: 'Tent Stakes',
    weight: 150,
    length: 16,
    width: 8,
    height: 8,
    image_url: 'https://dummyimage.com/400x400/999999/222222',
    userId: user.id,
    itemId: item2.id,
  });
};

module.exports = seed;
