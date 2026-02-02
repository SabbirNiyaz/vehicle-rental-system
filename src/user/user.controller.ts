import { Request, Response } from 'express';
import { userServices } from "./user.service"


const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "Data Inserted",
            data: result.rows[0]
        })
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            message: "Error creating user",
            error: err.message
        })
    }
}

const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getUser();
        res.status(200).json({
            success: true,
            data: result.rows
        })

    } catch (err: any) {
        console.log("Error get all user:", err);
        return res.status(500).json({
            success: false,
            message: "Error get all user",
            error: err.message
        })
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getSingleUser(req.params.id as string);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'User not found.'
            })
        } else {
            res.status(200).json({
                success: true,
                data: result.rows
            })
        }

    } catch (err: any) {
        console.log("Error get user:", err);
        return res.status(500).json({
            success: false,
            message: "Error get user",
            error: err.message
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.updateUser(req.body, req.params.id as string)
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: 'User not found.'
            })
        } else {
            res.status(200).json({
                success: true,
                data: result.rows
            })
        }


    } catch (err: any) {
        console.log("Error update user:", err);
        return res.status(400).json({
            success: false,
            message: "Error update user",
            error: err.message
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {

    try {
        const ex = await userServices.getSingleUser(req.params.id as string)
        if (ex.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            })
        }
        const result = await userServices.deleteUser(req.params.id as string)
        return res.status(200).json({
            success: true,
            message: 'User delete successfully.'
        })

    } catch (err: any) {
        console.log("Error delete user:", err);
        return res.status(400).json({
            success: false,
            message: "Error delete user",
            error: err.message
        })
    }
}

export const userController = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser
}