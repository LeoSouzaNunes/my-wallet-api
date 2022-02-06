import signUpSchema from "../schemas/signUpSchema.js";

function validateSignUpSchema(req, res, next) {
    const validation = signUpSchema.validate(req.body);
    if (validation.error) {
        res.status(422).send(validation.error.details[0].message);
        return;
    }

    next();
}

export default validateSignUpSchema;
