import { Router } from "express";
import { getUserData } from "../controllers/homeController.js";
import { postDeposit, postWithdraw } from "../controllers/tradeController.js";
import validateTradeSchema from "../middleware/validateTradeSchemaMiddleware.js";

const userRouter = Router();

userRouter.get("/home/:userId", getUserData);

userRouter.post("/deposit", validateTradeSchema, postDeposit);

userRouter.post("/withdraw", validateTradeSchema, postWithdraw);

export default userRouter;
