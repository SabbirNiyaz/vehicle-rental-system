import initDb from './config/db.js';
import express, { Request, Response } from 'express'

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Initialize Database
initDb();

app.get('/', (req: Request, res: Response) => {
    res.send("Test OK!!!")
})

// //! users RESTful API
// app.use('/api/v1/users', )

// //! vehicles RESTful API
// app.use('/api/v1/vehicles', )

// //! bookings RESTful API
// app.use('/api/v1/bookings', )

// // //! auth RESTful API
// app.use('/api/v1/auth', )

//! Not Found Route Handler
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Route not found.',
        path: req.path
    })
});

export default app;