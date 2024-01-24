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

        const saltRounds = 10;

        bcrypt.hash(password, saltRounds, async function (err, hash) {
            try {
                const result = await UserModel.create({ username, passwrord: hash });
                console.log(result);
            } catch (error) {
                console.log('error at signUp', error);
            }
        })
        return res.status(201).send({ success: true, note: "New User is registered successfully"})
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

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } : { username: string; password: string } = req.body

        const desiredUser: UserType | null = await UserModel.findOne({ username })
        if (!desiredUser) {
            return res.status(400).send({success: false, note: "User cannot be found"})
        }
        bcrypt.compare(password, desiredUser.password, async function(isMAtch) {
            if (!isMAtch) {
                return res.status(400).send({
                    success: false, 
                    note: "Username or Password are mutually exclsuive"
                });
            } else {
                return res.send({
                    success:true,
                    desiredUser
                })
            }
        });
    } catch (error) {
        console.log("error at checking", error);
    }
}