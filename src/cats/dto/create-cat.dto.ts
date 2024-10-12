import * as Joi from '@hapi/joi';

export const CreateCatDTO = Joi.object({
  name: Joi.string().min(1).max(50).required(),
  age: Joi.number().integer().min(0).max(30).required(),
  breed: Joi.string().min(1).max(50).required(),
});
