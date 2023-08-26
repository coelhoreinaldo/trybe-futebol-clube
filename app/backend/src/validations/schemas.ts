import Joi = require('joi');

export const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).messages({
  'any.required': 'All fields must be filled',
  'string.empty': 'All fields must be filled',
});

export const matchSchema = 'to make export possible';
