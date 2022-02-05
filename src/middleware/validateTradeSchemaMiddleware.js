import tradeSchema from "../schemas/tradeSchema.js";

function validateTradeSchema(req, res, next) {
    const validation = tradeSchema.validate(req.body);
    if (validation.error) {
        res.sendStatus(422);
        return;
    }
    next();
}

export default validateTradeSchema;
