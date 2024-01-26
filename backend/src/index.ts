import  cors from "cors";
import { connectDatabase } from "./utils/database";
import { auth } from "./router/User";
import { todoUrL } from "./router/Todo";
import { InProgress } from "./router/InProgress";
import express from "express";
import dotenv from "dotenv";
import bp from "body-parser";

dotenv.config()
const app = express()
app.use(bp.json())
app.use(cors())

const start = () => {

    connectDatabase();

    app.use('/auth', auth)
    app.use('/todoUrL', todoUrL)
    app.use('/InProgress', InProgress)

    const PORT = process.env.PORT || 8000

    // app.get('/', (_, res) => {
    //     res.status(200).send({ success: true, msg: "Hello Bro" })
    // })

    app.listen(PORT, () => {
        console.log(`server is listening on ${PORT}`);
    })
}

start()