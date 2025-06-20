import { Request, Response, NextFunction } from 'express';
import { ErrorWithMessage } from '../types/error.js';

// Error handling middleware
export const errorHandler = (
  err: Error | ErrorWithMessage,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
};
