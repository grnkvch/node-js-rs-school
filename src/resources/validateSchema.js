function validationErrorResponse(schemaErrors) {
  const errors = schemaErrors.map(error => {
    const { path, message } = error;
    return { path, message };
  });
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

    if (error.isJoi) return next(error);
    return next();
  };
}

module.exports = { validateSchema, validationErrorResponse };
