import { Router } from "express";
import { createUser, checkLogin } from "../controllers/authController.js";
import validateLogin from "../middleware/validateLoginSchemaMiddleware.js";
import validateSignUpSchema from "../middleware/validateSignUpSchemaMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSignUpSchema, createUser);
authRouter.post("/login", validateLogin, checkLogin);

export default authRouter;
