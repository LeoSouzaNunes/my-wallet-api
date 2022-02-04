import { Router } from "express";
import { getUserData } from "../controllers/homeController.js";
import { postDeposit, postWithdraw } from "../controllers/tradeController.js";

const userRouter = Router();

userRouter.get("/home/:userId", getUserData);

userRouter.post("/deposit", postDeposit);

userRouter.post("/withdraw", postWithdraw);

export default userRouter;
