import express, { Router, Request, Response, NextFunction } from 'express';
import * as authController from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

// Wrapper to handle async route handlers with proper type casting
const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction): void => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const authRoutes: Router = express.Router();

// Register new user
// @ts-ignore - Suppress TypeScript errors for Express route handler
authRoutes.post('/register', asyncHandler(authController.register));

// Login user
// @ts-ignore - Suppress TypeScript errors for Express route handler
authRoutes.post('/login', asyncHandler(authController.login));

// Get current user profile
// @ts-ignore - Suppress TypeScript errors for Express route handler
authRoutes.get('/profile', authMiddleware, asyncHandler(authController.getProfile));
