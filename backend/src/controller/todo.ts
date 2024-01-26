import { Request, Response } from "express";
import { TodoModel } from "../model/Todo";

const getAllTodo = async (req:Request, res:Response) => {
    try {
        const fullTodo = await TodoModel.find()
        return res.status(200).send({
            success: true,
            fullTodo
        })
    } catch (error) {
        console.log("error at getting AllToDo", error);       
    }
}

const makeTodo = async (req:Request, res:Response) => {
    try {
        const todo = await TodoModel.create(req.body)
        console.log(todo);
        return res.status(201).send({
            success: true,
            note: "promising Todo",
            todo
        })
    } catch (error) {
        console.log("error at making Todo", error);
    }
}

export {getAllTodo, makeTodo}