import loginSchema from "../schemas/loginSchema.js";

function validateLogin(req, res, next) {
    const validation = loginSchema.validate(req.body);
    if (validation.error) {
        res.sendStatus(422);
        return;
    }
    next();
}

export default validateLogin;
