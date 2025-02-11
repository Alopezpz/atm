import * as Joi from "joi";
import { TransactionType } from "../enums/transactions";

export const ClientSchema = Joi.object({
    body: Joi.object({
        transactionType: Joi.string().valid(TransactionType)
            .required(),
        amount: Joi.number().min(1).precision(2)
    }).unknown(true)
}).unknown(true)