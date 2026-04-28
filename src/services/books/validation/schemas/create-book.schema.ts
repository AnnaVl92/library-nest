import Joi from 'joi';

export const createBookSchema = Joi.object({
  title: Joi.string().trim().min(1).max(200).required(),
  description: Joi.string().trim().min(1).required(),
  authors: Joi.string().trim().min(1).required(),
  favorite: Joi.string().trim().optional(),
  fileCover: Joi.string().trim().optional(),
  fileName: Joi.string().trim().optional(),
  fileBook: Joi.string().trim().optional(),
});
