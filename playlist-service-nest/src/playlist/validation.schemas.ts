import * as Joi from 'joi';
export const idRequestSchema = Joi.object({
  id: Joi.number().required(),
});

export const songRequestSchema = Joi.object({
  title: Joi.string().required(),
  duration: Joi.number().required(),
});

export const updateSongRequestSchema = Joi.object({
  id: Joi.number().required(),
  song: Joi.object({
    title: Joi.string().required(),
    duration: Joi.number().required(),
  }),
});

export const addSongsRequestSchema = Joi.object({
  songs: Joi.array().items({
    title: Joi.string().required(),
    duration: Joi.number().required(),
  }),
});
