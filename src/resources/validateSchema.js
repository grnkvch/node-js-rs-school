function errorResponse(schemaErrors) {
  const errors = schemaErrors.map(error => {
    const { path, message } = error;
    return { path, message };
  });
  console.log('errors', errors);
  return {
    status: 'failed',
    errors
  };
}

function validateSchema(schema) {
  return (req, res, next) => {
    const { error = {} } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

    if (error.isJoi) {
      console.log(error.details.map);
      res.status(400).json(errorResponse(error.details));
    } else {
      return next();
    }
  };
}

module.exports = validateSchema;
