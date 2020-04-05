const router = require('express').Router();
const validateSchema = require('../validateSchema');

const Board = require('./board.model');
const boardsService = require('./board.service');

const { postSchema, putSchema } = require('./schema');

router.route('/').get(async (req, res) => {
  const allItems = await boardsService.getAll();

  res.json(allItems.map(Board.toResponse));
});

router.route('/').post(validateSchema(postSchema), async (req, res) => {
  const { body } = req;
  try {
    const item = await boardsService.create(body);
    res.json(Board.toResponse(item));
  } catch (error) {
    res.status(500).send();
  }
});

router.route('/:id').get(async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const item = await boardsService.getById(id);
    if (item) res.json(Board.toResponse(item));
    res.status(404).send();
  } catch (error) {
    res.status(500).send();
  }
});

router.route('/:id').put(validateSchema(putSchema), async (req, res) => {
  const {
    body,
    params: { id }
  } = req;
  try {
    const item = await boardsService.update({ id, ...body });
    res.json(Board.toResponse(item));
  } catch (error) {
    res.status(500).send();
  }
});

router.route('/:id').delete(async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const success = await boardsService.delete(id);
    if (success) res.status(204).send();
    res.status(404).send();
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
