import { Request, Response } from "express";
import { InProgressModal } from "../model/InProgress";

const getAllProgress = async (req:Request, res:Response) => {
    try {
        const fullProgresses = await InProgressModal.find()
        return res.status(200).send({
            success: true,
            fullProgresses
        })
    } catch (error) {
        console.log("error at getting AllProgresses", error);       
    }
}

const makeProgress = async (req:Request, res:Response) => {
    try {
        const InProgress = await InProgressModal.create(req.body)
        console.log(InProgress);
        return res.status(201).send({
            success: true,
            note: "promising Todo",
            InProgress
        })
    } catch (error) {
        console.log("error at making Todo", error);
    }
}

export {getAllProgress, makeProgress}