const {
  models: { User, Item },
} = require('./models/associations');

const seed = async () => {
  const user = await User.create({
    email: 'test@test.com',
    password: '1',
  });
  const pack = await Item.create({
    name: 'Sealline 115L Boundary Pro Pack',
    weight: 1871.1,
    length: 31.7,
    width: 47,
    height: 76.2,
    image_url:
      'https://content.backcountry.com/images/items/900/CAS/CAS00ED/OV.jpg',
    userId: user.id,
    category: 'Pack',
  });
  const item = await Item.create({
    name: 'Tent',
    weight: 1344.0,
    length: 40.6,
    width: 15.2,
    height: 15.2,
    image_url:
      'https://content.backcountry.com/images/items/900/CAS/CAS00F7/RD.jpg',
    userId: user.id,
    itemId: pack.id,
    category: 'Shelter',
  });
  await Item.create({
    name: 'Tent Stakes',
    weight: 150,
    length: 16,
    width: 8,
    height: 8,
    image_url:
      'https://content.backcountry.com/images/items/900/CAS/CAS007O/RD.jpg',
    userId: user.id,
    itemId: pack.id,
    category: 'Shelter',
  });
  await Item.create({
    name: 'Sleeping Bag',
    weight: 1400,
    length: 36,
    width: 25,
    height: 25,
    image_url:
      'https://cdn11.bigcommerce.com/s-japp2/images/stencil/1024x1024/products/1339/11161/EnigmaCharcoalBurnt__61973.1620338379.jpg?c=2',
    userId: user.id,
    itemId: pack.id,
    category: 'Shelter',
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
    category: 'Shelter',
  });
  await Item.create({
    name: 'Tent Stakes',
    weight: 150,
    length: 16,
    width: 8,
    height: 8,
    image_url: 'https://dummyimage.com/400x400/999999/222222',
    userId: user2.id,
    itemId: item2.id,
    category: 'Shelter',
  });
};

module.exports = seed;
