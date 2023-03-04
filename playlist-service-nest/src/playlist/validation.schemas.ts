import * as Joi from 'joi';
export const idRequestSchema = Joi.object({
  id: Joi.number().required(),
});

export const songRequestSchema = Joi.object({
  title: Joi.string().required(),
  duration: Joi.number().min(1).required(),
});

export const updateSongRequestSchema = Joi.object({
  id: Joi.number().required(),
  newSong: Joi.object({
    title: Joi.string().required(),
    duration: Joi.number().min(1).required(),
  }).required(),
});

export const addSongsRequestSchema = Joi.object({
  songs: Joi.array()
    .items({
      title: Joi.string().required(),
      duration: Joi.number().min(1).required(),
    })
    .min(1)
    .required(),
});
