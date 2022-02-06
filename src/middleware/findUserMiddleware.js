import db from "../database/db.js";

async function findUserMiddleware(req, res, next) {
    const token = req.headers.authorization?.replace("Bearer ", "");

    const session = await db.collection("sessions").findOne({ token });
    if (!session) {
        res.sendStatus(401);
        return;
    }

    const id = session.userId;

    const userTradeData = await db.collection("trades").findOne({ userId: id });

    res.locals.user = { userTradeData, id };

    next();
}

export default findUserMiddleware;
