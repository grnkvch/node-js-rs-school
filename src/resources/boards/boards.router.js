const router = require('express').Router();
const validateSchema = require('../validateSchema');

const User = require('./boards.model');
const usersService = require('./boards.service');

const { postSchema, putSchema } = require('./schema');

router.route('/').get(async (req, res) => {
  const allItems = await usersService.getAll();

  res.json(allItems.map(User.toResponse));
});

router.route('/').post(validateSchema(postSchema), async (req, res) => {
  const { body } = req;
  try {
    const item = await usersService.create(body);
    res.json(User.toResponse(item));
  } catch (error) {
    res.status(500);
  }
});

router.route('/:id').get(async (req, res) => {
  const {
    params: { id }
  } = req;
  const item = await usersService.getById(id);

  res.json(User.toResponse(item));
});

router.route('/:id').put(validateSchema(putSchema), async (req, res) => {
  const {
    body,
    params: { id }
  } = req;
  try {
    const item = await usersService.update({ id, ...body });
    res.json(User.toResponse(item));
  } catch (error) {
    res.status(500);
  }
});

router.route('/:id').delete(async (req, res) => {
  const {
    params: { id }
  } = req;
  console.log(id);
  try {
    await usersService.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500);
  }
});

module.exports = router;
