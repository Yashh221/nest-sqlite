import * as Joi from '@hapi/joi';

export const CreateTodoDTO = Joi.object({
  title: Joi.string().trim().min(3).max(255).required(),
});
