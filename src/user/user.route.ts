import express from 'express';
import { userController } from './user.controller';
import logger from '../middleware/logger';
import auth from '../middleware/auth';

const router = express.Router();


// Get All user
router.get('/', logger, auth("admin", "customer"), userController.getUser)

// Get Single user
router.get('/:userId', logger, auth("admin"), userController.getSingleUser)

// Update user
router.put('/:userId', logger, auth("admin", "customer"), userController.updateUser)

// Delete user
router.delete('/:userId', logger, auth("admin"), userController.deleteUser)

export const userRoutes = router;