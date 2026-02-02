import express from 'express';
import logger from '../middleware/logger';
import { authController } from './auth.controller';

const router = express.Router();

// Signup
router.post('/api/v1/auth/signup', logger, authController.signUp)

// Signin
router.post('/api/v1/auth/signin', logger, authController.signIn)

export const userRoutes = router;