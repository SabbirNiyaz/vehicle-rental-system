import { Request, Response } from 'express';
import { vehicleService } from './vehicle.service';

const createVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleService.createVehicle(req.body);
        res.status(201).json({
            success: true,
            data: result.rows[0]
        })

    } catch (err: any) {
        console.error("Error creating vehicle:", err);
        return res.status(500).json({
            success: false,
            message: "Error creating vehicle",
            error: err.message
        })
    }
}

const getVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleService.getVehicle();
        res.status(200).json({
            success: true,
            data: result.rows
        })

    } catch (err: any) {
        console.error("Error get all vehicle:", err);
        return res.status(500).json({
            success: false,
            message: "Error get all vehicle",
            error: err.message
        })
    }
}

const getSingleVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleService.getSingleVehicle(req.params.vehicleId as string);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found."
            })
        }
        return res.status(200).json({
            success: true,
            data: result.rows
        })

    } catch (err: any) {
        console.error("Error get vehicle:", err);
        return res.status(500).json({
            success: false,
            message: "Error get vehicle",
            error: err.message
        })
    }
}

const updateVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleService.updateVehicle(req.body, req.params.vehicleId as string);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            })
        } else {
            return res.status(200).json({
                success: true,
                message: "Update successful",
                data: result.rows
            })
        }
    }
    catch (err: any) {
        console.error("Error update vehicle:", err);
        return res.status(500).json({
            success: false,
            message: "Error update vehicle",
            error: err.message
        })
    }
}

const deleteVehicle = async (req: Request, res: Response) => {
    try {
        const ex = await vehicleService.getSingleVehicle(req.params.vehicleId as string);
        if (ex.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found"
            })
        }
        const result = await vehicleService.deleteVehicle(req.params.vehicleId as string);
        return res.status(200).json({
            success: true,
            message: "Vehicle deleted",
            data: null
        })

    } catch (err: any) {
        console.error("Error delete vehicle:", err);
        return res.status(500).json({
            success: false,
            message: "Error delete vehicle",
            error: err.message
        })
    }
}

export const vehicleController = {
    createVehicle,
    getVehicle,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
}