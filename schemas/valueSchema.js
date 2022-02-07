import joi from "joi";

const valueSchema = joi.object({
  value: joi.number().precision(2).required(),
  description: joi.string().required(),
  date: joi.string().required(),
});

export default valueSchema;
