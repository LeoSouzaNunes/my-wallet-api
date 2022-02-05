import { ObjectId } from "mongodb";
import db from "../database/db.js";

async function getUserData(req, res) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const userId = req.params.userId;

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            res.sendStatus(401);
            return;
        }

        const id = session.userId.toString();

        if (userId !== id) {
            res.sendStatus(401);
            return;
        }

        const userData = await db
            .collection("users")
            .findOne({ _id: new ObjectId(userId) });

        const userTrades = await db
            .collection("trades")
            .findOne({ userId: new ObjectId(userId) });

        const dataToSend = {
            name: userData.name,
            history: userTrades?.history,
        };
        res.status(200).send(dataToSend);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { getUserData };
