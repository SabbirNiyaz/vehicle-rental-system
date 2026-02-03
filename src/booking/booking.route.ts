import express from 'express';
import logger from '../middleware/logger';
import { bookingController } from './booking.controller';
import auth from '../middleware/auth';

const router = express.Router();

//! Create Booking
router.post('/', logger, auth("admin", "customer"), bookingController.createBooking)

//! Get Booking by role
router.get('/', logger, auth("admin", "customer"), bookingController.getBookings)

//! Update Booking by role
router.put('/:bookingId', logger, auth("admin", "customer"), bookingController.getBookings)


export const bookingRoutes = router;