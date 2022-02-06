import sanitizeData from "../util/sanitizer.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../database/db.js";

async function createUser(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = {
        name: sanitizeData(req.body.name),
        email: sanitizeData(req.body.email),
        password: hashedPassword,
    };

    try {
        const checkUser = await db.collection("users").findOne({ email: user.email });
        if (checkUser) {
            res.status(409).send("Email já cadastrado");
            return;
        }

        await db.collection("users").insertOne(user);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function checkLogin(req, res) {
    try {
        const user = await db.collection("users").findOne({ email: req.body.email });

        if (user && bcrypt.compareSync(req.body.password, user.password)) {
            const token = uuid();
            await db.collection("sessions").insertOne({ userId: user._id, token });
            res.status(200).send({ token, userId: user._id });
            return;
        }

        res.status(401).send("Email ou senha inválida");
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { createUser, checkLogin };
