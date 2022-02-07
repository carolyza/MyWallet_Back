import joi from "joi";

const valueSchema = joi.object({
  value: joi
    .string()
    .pattern(/^[\d,.?!]+$/)
    .required(),
  description: joi.string().required(),
});

export default valueSchema;
