import db from "../database/db.js";
import dayjs from "dayjs";

async function postDeposit(req, res) {
    const depositData = { ...req.body, time: dayjs().format("DD/MM") };

    try {
        const userTradeData = res.locals.user.userTradeData;
        const id = res.locals.user.id;
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

    try {
        const userTradeData = res.locals.user.userTradeData;
        const id = res.locals.user.id;
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
