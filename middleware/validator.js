import Joi from 'joi';

export const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  published_date: Joi.date().optional(),
  isbn: Joi.string().length(13).optional(),
  pages: Joi.number().integer().optional(),
  language: Joi.string().optional(),
  publisher: Joi.string().optional(),
});

export const validateBook = (req, res, next) => {
  const { error } = bookSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    next();
  }
};
