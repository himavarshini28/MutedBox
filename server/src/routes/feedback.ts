import express, { Router, Request, Response, NextFunction } from 'express';
import { 
  createFeedback, 
  getFeedback, 
  respondToFeedback, 
  getFeedbackResponses, 
  deactivateFeedback, 
  getAllFeedback,
  getUserFeedbacks,
  getUserFeedbackStats
} from '../controllers/feedbackController.js';
import { authMiddleware, optionalAuthMiddleware } from '../middleware/authMiddleware.js';

const router: Router = express.Router();

// Wrapper to handle async route handlers with proper type casting
const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction): void => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Create a new feedback link (with optional authentication)
router.post('/create', optionalAuthMiddleware, asyncHandler(createFeedback));

// Get all feedbacks created by the authenticated user
// @ts-ignore - Suppress TypeScript errors for Express route handler
router.get('/user/feedbacks', authMiddleware, asyncHandler(getUserFeedbacks));

// Get feedback statistics for the authenticated user
// @ts-ignore - Suppress TypeScript errors for Express route handler
router.get('/user/stats', authMiddleware, asyncHandler(getUserFeedbackStats));

// Get a specific feedback by uniqueId
router.get('/:uniqueId', asyncHandler(getFeedback));

// Submit a response to a feedback
router.post('/:uniqueId/respond', asyncHandler(respondToFeedback));

// Get all responses for a feedback
router.get('/:uniqueId/responses', asyncHandler(getFeedbackResponses));

// Deactivate a feedback link
router.put('/:uniqueId/deactivate', asyncHandler(deactivateFeedback));

// Get all feedback links (for admin purposes)
router.get('/', asyncHandler(getAllFeedback));

export const feedbackRoutes = router;
