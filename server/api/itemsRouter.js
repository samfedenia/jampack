const itemsRouter = require('express').Router();
const {
  models: { User, Item },
} = require('../db');

const requireToken = require('./utils/requireToken');

// usersRouter.get('/', async (req, res) => {
//   const users = await User.findAll();
//   res.status(200).send(users);
// });

itemsRouter.get('/', requireToken, async (req, res) => {
  try {
    if (req.errorMessage) throw new Error(req.errorMessage);
    const { id } = req.user;
    const userWithItems = await User.findByPk(id, {
      include: [{ model: Item }],
    });
    res.status(200).send(userWithItems);
  } catch (ex) {
    console.log('Error in GET /users/items: ', ex.message);
    res.status(404).json({ errorMessage: req.errorMessage });
  }
});

itemsRouter.post('/', requireToken, async (req, res) => {
  try {
    if (req.errorMessage) throw new Error(req.errorMessage);
    const { id } = req.user;
    const { name, category, weight, depth, width, height, image_url, itemId } =
      req.body;
    const item = await Item.create({
      name,
      category,
      weight,
      depth,
      width,
      height,
      image_url,
      userId: id,
      itemId: itemId || null,
    });

    res.status(200).send(item);
  } catch (ex) {
    console.log('Error in POST /users/items: ', ex.message);
    res.status(404).json({ errorMessage: req.errorMessage });
  }
});

itemsRouter.get('/packs', requireToken, async (req, res) => {
  try {
    if (req.errorMessage) throw new Error(req.errorMessage);
    const { id } = req.user;
    const packs = await Item.findAll({
      where: {
        userId: id,
        category: 'Pack',
      },
      include: [{ model: Item, as: 'SubItem' }],
    });

    res.status(200).send(packs);
  } catch (ex) {
    console.log('Error in PUT /users/items/:itemId/addToPack ', ex.message);
    res.status(404).json({ errorMessage: req.errorMessage });
  }
});

itemsRouter.get('/:itemId', requireToken, async (req, res) => {
  try {
    if (req.errorMessage) throw new Error(req.errorMessage);
    const { id } = req.user;
    const { itemId } = req.params;
    const item = await Item.findByPk(itemId, {
      include: { model: Item, as: 'SubItem' },
    });
    res.status(200).send(item);
  } catch (ex) {
    console.log('Error in GET /users/items/:itemId: ', ex.message);
    res.status(404).json({ errorMessage: req.errorMessage });
  }
});
itemsRouter.put('/:itemId', requireToken, async (req, res) => {
  try {
    if (req.errorMessage) throw new Error(req.errorMessage);
    const { id } = req.user;
    const { itemId } = req.params;
    const { name, category, weight, depth, width, height, image_url } =
      req.body;
    const parentItemId = req.body.itemId;
    const item = await Item.findByPk(itemId);
    const updatedItem = await item.update({
      name,
      category,
      weight,
      depth,
      width,
      height,
      image_url,
      userId: id,
      itemId: parentItemId || null,
    });
    res.status(200).send(updatedItem);
  } catch (ex) {
    console.log('Error in PUT /users/items/:itemId: ', ex.message);
    res.status(404).json({ errorMessage: req.errorMessage });
  }
});

itemsRouter.delete('/:itemId', requireToken, async (req, res) => {
  try {
    if (req.errorMessage) throw new Error(req.errorMessage);
    const { itemId } = req.params;
    const item = await Item.findByPk(itemId);
    await item.destroy();
    res.sendStatus(204);
  } catch (ex) {
    console.log('Error in DELETE /users/items/:itemId: ', ex.message);
    res.status(404).json({ errorMessage: req.errorMessage });
  }
});

itemsRouter.put('/:itemId/addToPack', requireToken, async (req, res) => {
  try {
    if (req.errorMessage) throw new Error(req.errorMessage);

    const { itemId } = req.params;
    const { parentItemId } = req.body;
    const item = await Item.findByPk(itemId);
    const updatedItem = await item.update({
      itemId: parentItemId || null,
    });
    res.status(200).send(updatedItem);
  } catch (ex) {
    console.log('Error in PUT /users/items/:itemId/addToPack ', ex.message);
    res.status(404).json({ errorMessage: req.errorMessage });
  }
});

module.exports = itemsRouter;
