import express from "express";
import { makeProgress } from "../controller/inProgress";

const InProgress = express.Router()

InProgress.route('/')
    .post(makeProgress)

export { InProgress }