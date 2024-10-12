import * as Joi from '@hapi/joi';

export const UpdateTodoDTO = Joi.object({
  id: Joi.number().required(),
  isCompleted: Joi.boolean().required(),
});
