import * as Joi from "joi";

export const ClientSchema = Joi.object({
    body: Joi.object({
        username: Joi.string()
            .required(),
        password: Joi.number().min(0).max(9999)
    }).unknown(true)
}).unknown(true)