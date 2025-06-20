import express, { Router, Request, Response, NextFunction } from 'express';
import { 
  createFeedback, 
  getFeedback, 
  respondToFeedback, 
  getFeedbackResponses, 
  deactivateFeedback, 
  getAllFeedback 
} from '../controllers/feedbackController.js';

const router: Router = express.Router();

// Wrapper to handle async route handlers
const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Create a new feedback link
router.post('/create', asyncHandler(createFeedback));

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
