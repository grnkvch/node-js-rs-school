const { Router } = require('express');
const { NOT_FOUND, NO_CONTENT, getStatusText } = require('http-status-codes');
const createError = require('http-errors');

const { validateSchema } = require('./validateSchema');
const config = require('./config');

module.exports = function bindRouter(route, options) {
  const router = Router(options);

  const { Model, service, postSchema, putSchema } = config[route];

  router.route('/').get(async (req, res, next) => {
    try {
      const { params } = req;
      const allItems = await service.getAll(params);
      res.json(allItems.map(Model.toResponse));
    } catch (error) {
      return next(error);
    }
  });

  router.route('/').post(validateSchema(postSchema), async (req, res, next) => {
    try {
      const { body, params } = req;
      const item = await service.create(params, body);
      res.json(Model.toResponse(item));
    } catch (error) {
      return next(error);
    }
  });

  router.route('/:id').get(async (req, res, next) => {
    try {
      const { params } = req;
      const item = await service.getById(params);
      if (item) {
        return res.json(Model.toResponse(item));
      }
      throw createError(NOT_FOUND, getStatusText(NOT_FOUND));
    } catch (error) {
      return next(error);
    }
  });

  router
    .route('/:id')
    .put(validateSchema(putSchema), async (req, res, next) => {
      try {
        const { body, params } = req;
        const item = await service.update(params, body);
        res.json(Model.toResponse(item));
      } catch (error) {
        return next(error);
      }
    });

  router.route('/:id').delete(async (req, res, next) => {
    try {
      const { params } = req;
      const success = await service.delete(params);
      if (success) {
        return res.status(NO_CONTENT).send();
      }
      throw createError(NOT_FOUND, getStatusText(NOT_FOUND));
    } catch (error) {
      return next(error);
    }
  });

  return router;
};
