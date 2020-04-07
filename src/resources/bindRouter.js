const { Router } = require('express');
const validateSchema = require('./validateSchema');
const config = require('./config');

module.exports = function bindRouter(route, options) {
  const router = Router(options);

  const { Model, service, postSchema, putSchema } = config[route];

  router.route('/').get(async (req, res) => {
    const { params } = req;
    const allItems = await service.getAll(params);
    res.json(allItems.map(Model.toResponse));
  });

  router.route('/').post(validateSchema(postSchema), async (req, res) => {
    const { body, params } = req;
    try {
      const item = await service.create(params, body);
      res.json(Model.toResponse(item));
    } catch (error) {
      res.status(500).send();
    }
  });

  router.route('/:id').get(async (req, res) => {
    const { params } = req;
    try {
      const item = await service.getById(params);
      if (item) res.json(Model.toResponse(item));
      res.status(404).send();
    } catch (error) {
      res.status(500).send();
    }
  });

  router.route('/:id').put(validateSchema(putSchema), async (req, res) => {
    const { body, params } = req;
    try {
      const item = await service.update(params, body);
      res.json(Model.toResponse(item));
    } catch (error) {
      res.status(500).send();
    }
  });

  router.route('/:id').delete(async (req, res) => {
    const { params } = req;
    try {
      const success = await service.delete(params);
      if (success) res.status(204).send();
      res.status(404).send();
    } catch (error) {
      res.status(500).send();
    }
  });

  return router;
};
