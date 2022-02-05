import joi from "joi";

const tradeSchema = joi.object({
    value: joi.number().required(),
    type: joi.string().valid("deposit", "withdraw").required(),
    text: joi.string().max(30).required(),
});

export default tradeSchema;
