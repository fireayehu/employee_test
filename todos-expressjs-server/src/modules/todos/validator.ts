import Joi from 'joi';
import { ITodoPayload, IOrderPayload } from './model';

export function validateTodoCreatePayload(
  payload: ITodoPayload,
): Joi.ValidationResult<any> {
  const schema = Joi.object({
    text: Joi.string().required(),
    completed: Joi.boolean().default(false),
  });

  return schema.validate(payload);
}

//TODO: implement edit payload validation
export function validateTodoEditPayload(
  payload: ITodoPayload,
): Joi.ValidationResult<any> {
  const schema = Joi.object({
    text: Joi.string().required(),
    completed: Joi.boolean().required(),
  });
  return schema.validate(payload);
}

//TODO: implement edit order payload validation
export function validateTodoEditOrderPayload(
  payload: IOrderPayload,
): Joi.ValidationResult<any> {
  const schema = Joi.object({
    source: Joi.number().required(),
    destination: Joi.number().required(),
  });
  return schema.validate(payload);
}
