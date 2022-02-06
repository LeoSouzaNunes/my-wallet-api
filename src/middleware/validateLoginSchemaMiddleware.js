import loginSchema from "../schemas/loginSchema.js";

function validateLogin(req, res, next) {
    const validation = loginSchema.validate(req.body);
    if (validation.error) {
        res.status(422).send(validation.error.details[0].message);
        return;
    }
    next();
}

export default validateLogin;
