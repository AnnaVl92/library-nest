import Joi from 'joi';

export const updateBookSchema = Joi.object({
  title: Joi.string().trim().min(1).max(200).optional(),
  description: Joi.string().trim().min(1).optional(),
  authors: Joi.string().trim().min(1).optional(),
  favorite: Joi.string().trim().optional(),
  fileCover: Joi.string().trim().optional(),
  fileName: Joi.string().trim().optional(),
  fileBook: Joi.string().trim().optional(),
}).min(1);
