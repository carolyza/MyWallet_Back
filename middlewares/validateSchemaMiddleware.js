export function validateSchemaMiddleware(schema) {
  return (req, res, next) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      console.log("banana");
      res.sendStatus(422);
      return;
    }

    next();
  };
}
