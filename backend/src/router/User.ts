import express from "express";
import { getAllUsers, getOneUser, login, signUp } from "../controller/user";

const auth = express.Router()

auth.route('/')
    .get(getAllUsers)

auth.route('/user')
    .get(getOneUser)

auth.route('/login')
    .post(login)

auth.route('/signup')
    .post(signUp)

export { auth }