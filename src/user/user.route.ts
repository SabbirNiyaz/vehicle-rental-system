import express from 'express';
import { userController } from './user.controller';
import logger from '../middleware/logger';
import auth from '../middleware/auth';
import authorizeOwnership from '../middleware/authorizeOwnership';

const router = express.Router();


// Get All user
router.get('/', logger, auth("admin"), userController.getUser)

// Get Single user
router.get('/:userId', logger, auth("admin"), userController.getSingleUser)

// Update user //todo> bug
router.put('/:userId', logger, authorizeOwnership, auth(), userController.updateUser)

// Delete user
router.delete('/:userId', logger, auth("admin"), userController.deleteUser)

export const userRoutes = router;