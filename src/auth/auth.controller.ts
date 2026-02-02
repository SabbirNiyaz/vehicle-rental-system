import { Request, Response } from 'express';
import { authServices } from "./auth.service";

const signUp = async (req: Request, res: Response) => {
    try {
        const result = await authServices.signUp(req.body);
        res.status(201).json({
            success: true,
            message: "Signup Successful",
            data: result.rows[0]
        })
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            message: "Invalid Information",
            error: err.message
        })
    }
}

const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await authServices.signIn(email, password);
        if (result === null || result === false) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Login Successful",
            user: result.user,
            token: result.token
        })

    } catch (err: any) {
        return res.status(500).json({
            success: false,
            error: err.message
        })
    }

}

export const authController = {
    signUp,
    signIn,
}