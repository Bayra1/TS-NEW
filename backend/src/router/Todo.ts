import express from "express";
import { makeTodo } from "../controller/todo";

const todoUrL = express.Router()

todoUrL.route('/')
    .post(makeTodo)

export { todoUrL }