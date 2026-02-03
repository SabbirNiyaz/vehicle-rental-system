import { authRoutes } from './auth/auth.route.js';
import initDb from './config/db.js';
import express, { Request, Response } from 'express'
import { userRoutes } from './user/user.route.js';
import { vehicleRoutes } from './vehicle/vehicle.route.js';
import { bookingRoutes } from './booking/booking.route.js';

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize Database
initDb();

app.get('/api/v1', (req: Request, res: Response) => {
    res.send("Test OK!!!")
})

//! auth RESTful API
app.use('/api/v1/auth', authRoutes)

//! users RESTful API
app.use('/api/v1/users', userRoutes)

//! vehicles RESTful API
app.use('/api/v1/vehicles', vehicleRoutes)

//! bookings RESTful API
app.use('/api/v1/bookings', bookingRoutes)


//! Not Found Route Handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Route not found.',
        path: req.path
    })
});

export default app;