import express from 'express';
import { userController } from './user.controller';
import logger from '../middleware/logger';

const router = express.Router();

// Create user
router.post('/create', logger, userController.createUser)

// Get user
router.get('/', logger, userController.getUser)

// Get Single user
router.get('/:id', logger, userController.getSingleUser)

// Update user
router.put('/update/:id', logger, userController.updateUser)

// Delete user
router.delete('/delete/:id', logger, userController.deleteUser)

export const userRoutes = router;