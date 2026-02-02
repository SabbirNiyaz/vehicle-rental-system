import express from 'express';
import logger from '../middleware/logger';
import { authController } from './auth.controller';

const router = express.Router();

// Signup
router.post('/signup', logger, authController.signUp)

// Signin
router.post('/signin', logger, authController.signIn)

export const authRoutes = router;