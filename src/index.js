import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);
app.use(userRouter);

app.listen(5000, () => console.log("Running at http://localhost:5000"));
