const router = require('express').Router();

const validateSchema = require('../validateSchema');

const service = require('./service');
const Model = require('./model');
const { postSchema, putSchema } = require('./schema');

router.route('/:boardId/tasks').get(async (req, res) => {
  const { params } = req;
  const allItems = await service.getAll(params);
  res.json(allItems.map(Model.toResponse));
});

router
  .route('/:boardId/tasks')
  .post(validateSchema(postSchema), async (req, res) => {
    const { body, params } = req;
    try {
      const item = await service.create(params, body);
      res.json(Model.toResponse(item));
    } catch (error) {
      res.status(500).send();
    }
  });

router.route('/:boardId/tasks/:id').get(async (req, res) => {
  const { params } = req;
  try {
    const item = await service.getById(params);
    if (item) res.json(Model.toResponse(item));
    res.status(404).send();
  } catch (error) {
    res.status(500).send();
  }
});

router
  .route('/:boardId/tasks/:id')
  .put(validateSchema(putSchema), async (req, res) => {
    const { body, params } = req;
    try {
      const item = await service.update(params, body);
      res.json(Model.toResponse(item));
    } catch (error) {
      res.status(500).send();
    }
  });

router.route('/:boardId/tasks/:id').delete(async (req, res) => {
  const { params } = req;
  try {
    const success = await service.delete(params);
    if (success) res.status(204).send();
    res.status(404).send();
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
