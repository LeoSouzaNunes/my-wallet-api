import db from "../database/db.js";
import joi from "joi";
import dayjs from "dayjs";

async function postDeposit(req, res) {
    const depositData = { ...req.body, time: dayjs().format("DD/MM") };

    const token = req.headers.authorization?.replace("Bearer ", "");

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            res.sendStatus(401);
            return;
        }

        const id = session.userId;

        const userTradeData = await db.collection("trades").findOne({ userId: id });
        if (!userTradeData) {
            await db.collection("trades").insertOne({
                userId: id,
                history: [depositData],
            });
            res.sendStatus(201);
            return;
        }

        await db.collection("trades").updateOne(
            {
                userId: id,
            },
            {
                $set: {
                    ...userTradeData,
                    history: [...userTradeData.history, depositData],
                },
            }
        );

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function postWithdraw(req, res) {
    const withdrawData = { ...req.body, time: dayjs().format("DD/MM") };

    const token = req.headers.authorization?.replace("Bearer ", "");

    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            res.sendStatus(401);
            return;
        }

        const id = session.userId;

        const userTradeData = await db.collection("trades").findOne({ userId: id });
        if (!userTradeData) {
            await db.collection("trades").insertOne({
                userId: id,
                history: [withdrawData],
            });
            res.sendStatus(201);
            return;
        }

        await db.collection("trades").updateOne(
            {
                userId: id,
            },
            {
                $set: {
                    ...userTradeData,
                    history: [...userTradeData.history, withdrawData],
                },
            }
        );

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { postDeposit, postWithdraw };
