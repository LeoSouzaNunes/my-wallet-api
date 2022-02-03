import express from "express";
import cors from "cors";
import { createUser, checkLogin } from "./controllers/authController.js";
import { getUserData } from "./controllers/homeController.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", createUser);

app.post("/login", checkLogin);

app.get("/home/:userId", getUserData);

app.listen(5000, () => console.log("Running at http://localhost:5000"));
