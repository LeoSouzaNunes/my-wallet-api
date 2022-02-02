import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import sanitizeData from "./util/sanitizer.js";
import bcrypt from "bcrypt";
import joi from "joi";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect(() => {
    db = mongoClient.db("mywallet-api");
});

const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
});

app.post("/sign-up", async (req, res) => {
    const validation = signUpSchema.validate(req.body);
    if (validation.error) {
        res.sendStatus(422);
        return;
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = {
        name: sanitizeData(req.body.name),
        email: sanitizeData(req.body.email),
        password: hashedPassword,
    };
    console.log(user);
    try {
        const checkUser = await db.collection("users").findOne({ email: user.email });
        if (checkUser) {
            res.sendStatus(409);
            return;
        }

        await db.collection("users").insertOne(user);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.listen(5000, () => console.log("Running at http://localhost:5000"));
