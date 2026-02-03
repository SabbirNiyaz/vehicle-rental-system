import { Request, Response } from 'express';
import { bookingService } from './booking.service';
import jwt, { JwtPayload } from "jsonwebtoken";
import config from '../config';


const createBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.createBooking(req.body);

        if (result === null) {
            res.status(404).json({
                success: null,
                message: "Vehicle is not found"
            });

        } else if (result === false)
            res.status(403).json({
                success: false,
                message: "Vehicle is already booked"
            });
        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result
        });

    } catch (err: any) {
        return res.status(400).json({
            success: false,
            message: "Invalid Information",
            error: err.message
        });
    }
}

const getBookings = async (req: Request, res: Response) => {
    try {
        const result = await bookingService.getBookings(req.user as any);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: null,
                message: "No booking found"
            });
        }

        return res.status(200).json({
            success: true,
            message:
                req.user!.role === "admin" ? "Bookings retrieved successfully"
                    : "Your bookings retrieved successfully",
            data: result.rows
        });
    }
    catch (err: any) {
        return res.status(400).json({
            success: false,
            message: "Invalid Information",
            error: err.message
        });
    }
}

export const bookingController = {
    createBooking,
    getBookings,
}