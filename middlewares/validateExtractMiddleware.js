import valueSchema from "../schemas/valueSchema.js";

export function validateExtractMiddleware(req, res, next) {
  const credit = req.body;
  const validation = valueSchema.validate(credit);
  if (validation.error) {
    res.sendStatus(422);
    return;
  }
  next();
}
