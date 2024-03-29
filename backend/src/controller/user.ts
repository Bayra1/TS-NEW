import { Request, Response } from "express";
import { UserModel } from "../model/User";
import bcrypt from "bcrypt";

type ValidSign = {
    username: string,
    password: string,
    avaImg: string
}

type UserType = {
    _id: string,
    username: string,
    password: string,
    _v: number;
}

export const signUp = async (req: Request, res: Response) => {
    try {
        const { username, password }: Required<ValidSign> = req.body;
        console.log(password)
        const saltRounds = 10;

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            try {
                const result = await UserModel.create({ username, password: hash });
                console.log(result);
            } catch (error) {
                console.log('error at signUp', error);
            }
        })
        return res.status(201).send({ success: true, note: "New User is registered successfully" })
    } catch (error: any) {
        return res.status(400).send
    }
}

// In case All Users
export const getAllUsers = async function (_: Request, res: Response) {
    try {
        const allUsers = await UserModel.find();
        return res.status(200).send({ success: true, allUsers })
    } catch (error: any) {
        return res.status(400).send
    }
}

// Get One User 
export const getOneUser = async function (req: Request, res: Response) {
    const { username } = req.body
    try {
        const oneUser = await UserModel.find({ username })

        if (!oneUser) {
            res.status(400).send({ success: false, error: "user not found" })
        } else {
            return res.status(200).send({ success: true, oneUser })
        }
    } catch (error: unknown) {
        console.log(error);
        return res.status(400).send(error);
    }
}

// Checking user's information

export const login = async function (req: Request, res: Response) {
    const { username, password }: { username: string; password: string } = req.body

    const desireduser: UserType | null = await UserModel.findOne({ username })

    if (!desireduser) {
        return res.status(400).send({ success: false, note: "The DesiredUser cannot be found" })
    }

    bcrypt.compare(password, desireduser.password, async function (error, isMatch) {
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                note: "username or password are wrong"
            })
        } else {
            return res.send({
                success: true,
                desireduser
            })
        }
    })
}