import * as Joi from 'joi'

export const JoiValidatonShema = Joi.object({
    MONGODB: Joi.required(),
    PORT: Joi.number().default(3000),
    DEFAULT_LIMIT: Joi.number().default(7)
})