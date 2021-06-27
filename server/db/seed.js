const {
  models: { User, Item },
} = require('./models/associations');

const seed = async () => {
  const user = await User.create({
    email: 'foo@bar.com',
    password: 'foobar',
  });
  const pack = await Item.create({
    name: 'Sealline 115L Boundary Pro Pack',
    weight: 1871.1,
    depth: 31.7,
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
    depth: 40.6,
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
    depth: 16,
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
    depth: 36,
    width: 25,
    height: 25,
    image_url:
      'https://cdn11.bigcommerce.com/s-japp2/images/stencil/1024x1024/products/1339/11161/EnigmaCharcoalBurnt__61973.1620338379.jpg?c=2',
    userId: user.id,
    itemId: pack.id,
    category: 'Shelter',
  });
  await Item.create({
    name: 'Bear Vault BV500 + Food',
    weight: 7672,
    depth: 23,
    width: 23,
    height: 34,
    image_url:
      'https://images-na.ssl-images-amazon.com/images/I/61FnfLMEnFL._AC_SL1200_.jpg',
    userId: user.id,
    itemId: pack.id,
    category: 'Food',
  });
  await Item.create({
    name: 'ENO Hammock',
    weight: 540,
    depth: 15,
    width: 14,
    height: 5.6,
    image_url:
      'https://images-na.ssl-images-amazon.com/images/I/61bcYZk2RKL._AC_SL1000_.jpg',
    userId: user.id,
    itemId: pack.id,
    category: 'Shelter',
  });
  await Item.create({
    name: 'GSI Dualist Cookset',
    weight: 672,
    depth: 15,
    width: 15,
    height: 16.3,
    image_url:
      'https://images-na.ssl-images-amazon.com/images/I/71JojbXJB9L._AC_SL1500_.jpg',
    userId: user.id,
    itemId: pack.id,
    category: 'Food',
  });
  await Item.create({
    name: 'Thermarest NeoAir Mattress',
    weight: 430,
    depth: 22.9,
    width: 11.7,
    height: 11.7,
    image_url:
      'https://images-na.ssl-images-amazon.com/images/I/61TKMCxBtwL._AC_SL1500_.jpg',
    userId: user.id,
    itemId: pack.id,
    category: 'Shelter',
  });
  await Item.create({
    name: 'Clothes',
    weight: 2400,
    depth: 30,
    width: 25,
    height: 25,
    image_url:
      'https://images-na.ssl-images-amazon.com/images/I/618cemG0X8L._AC_SL1200_.jpg',
    userId: user.id,
    itemId: pack.id,
    category: 'Shelter',
  });

  await Item.create({
    name: 'Big Agnes Chair',
    weight: 896,
    depth: 45.7,
    width: 10.2,
    height: 12.7,
    image_url:
      'https://images-na.ssl-images-amazon.com/images/I/817LZPJ4wrL._AC_SL1500_.jpg',
    userId: user.id,
    itemId: pack.id,
    category: 'Other',
  });
};

module.exports = seed;
