import { Request, Response } from "express";
import { UserModel } from "../model/User";
import bcrypt from "bcrypt";

type ValidSign = {
    username: string,
    password: string,
    avaImg: string
}

export const signUp = async (req: Request, res: Response) => {
    try {
        const { username, password }: Required<ValidSign> = req.body;

        const saltRounds = 10;

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            try {
                const result = await UserModel.create({ username, passwrord: hash });
                console.log(result);
            } catch (error) {
                console.log('error at signUp', error);
            }
        })
        return res.status(201).send({ success: true })
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
        return res.status(400).send(error);
    }
}

// Checking user's information

export const login = async function (req: Request, res: Response) {
    const { username, password }: { username: String, password: String } = req.body
    try {
        const desiredUser = await UserModel.findOne({ username })
        if (!desiredUser) {
            return res.status(400).send({ success: false, note: "user cannot be found" })
        }
        console.log(password, 'this is password');

        bcrypt.compare(password, desiredUser.password, async function (err, isMatch) {
            if (!isMatch) {
                return res.send({ success: false, note: 'username or password dont match' })
            } else {
                return res.send({ success: true, desiredUser })
            }
        })

    } catch (error: unknown) {
        // return res.status(400).send(error)
        console.log(error);

    }
}