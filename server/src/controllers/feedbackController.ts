import { Request, Response } from 'express';
import { Feedback } from '../models/Feedback.js';
import { generateUniqueId } from '../utils/helpers.js';
import { User } from '../models/User.js';

// Types for requests
interface CreateFeedbackRequest {
  feedback?: string;
}

interface RespondRequest {
  content: string;
}

/**
 * Create a new feedback link
 */
export const createFeedback = async (req: Request<{}, {}, CreateFeedbackRequest>, res: Response) => {
  try {
    const uniqueId = generateUniqueId();
    
    // Create the feedback with user reference if authenticated
    const newFeedback = new Feedback({
      uniqueId,
      feedback: req.body.feedback || 'Anonymous feedback',
      user: req.userId // Will be undefined if not authenticated
    });

    await newFeedback.save();
    
    res.status(201).json({
      success: true,
      uniqueId,
      message: 'Feedback link created successfully'
    });
  } catch (error: any) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating feedback link',
      error: error.message
    });
  }
};

/**
 * Get a specific feedback by uniqueId
 */
export const getFeedback = async (req: Request<{ uniqueId: string }>, res: Response) => {
  try {
    const feedback = await Feedback.findOne({ uniqueId: req.params.uniqueId });
    
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    if (!feedback.isActive) {
      return res.status(400).json({
        success: false,
        message: 'This feedback link is no longer active'
      });
    }

    res.status(200).json({
      success: true,
      feedback
    });
  } catch (error: any) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback',
      error: error.message
    });
  }
};

/**
 * Submit a response to a feedback
 */
export const respondToFeedback = async (req: Request<{ uniqueId: string }, {}, RespondRequest>, res: Response) => {
  try {
    const { uniqueId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Response content is required'
      });
    }

    const feedback = await Feedback.findOne({ uniqueId });

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    if (!feedback.isActive) {
      return res.status(400).json({
        success: false,
        message: 'This feedback link is no longer active'
      });
    }

    feedback.responses.push({ content, submittedAt: new Date() });
    await feedback.save();

    res.status(201).json({
      success: true,
      message: 'Response submitted successfully'
    });
  } catch (error: any) {
    console.error('Error submitting response:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting response',
      error: error.message
    });
  }
};

/**
 * Get all responses for a feedback
 */
export const getFeedbackResponses = async (req: Request<{ uniqueId: string }>, res: Response) => {
  try {
    const feedback = await Feedback.findOne({ uniqueId: req.params.uniqueId });
    
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    res.status(200).json({
      success: true,
      responses: feedback.responses
    });
  } catch (error: any) {
    console.error('Error fetching responses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching responses',
      error: error.message
    });
  }
};

/**
 * Deactivate a feedback link
 */
export const deactivateFeedback = async (req: Request<{ uniqueId: string }>, res: Response) => {
  try {
    const feedback = await Feedback.findOne({ uniqueId: req.params.uniqueId });
    
    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      });
    }

    feedback.isActive = false;
    await feedback.save();

    res.status(200).json({
      success: true,
      message: 'Feedback link deactivated successfully'
    });
  } catch (error: any) {
    console.error('Error deactivating feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Error deactivating feedback link',
      error: error.message
    });
  }
};

/**
 * Get all feedback links (for admin purposes)
 */
export const getAllFeedback = async (_req: Request, res: Response) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: feedbacks.length,
      feedbacks
    });
  } catch (error: any) {
    console.error('Error fetching all feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching all feedback',
      error: error.message
    });
  }
};

/**
 * Get all feedbacks created by the authenticated user
 */
export const getUserFeedbacks = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }
    
    const feedbacks = await Feedback.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .select('uniqueId feedback createdAt isActive responses');
    
    res.json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });
  } catch (err: any) {
    console.error('Error fetching user feedbacks:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Error fetching feedbacks'
    });
  }
};

/**
 * Get feedback analytics for the authenticated user
 */
export const getUserFeedbackStats = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }
    
    const feedbacks = await Feedback.find({ user: req.userId });
    
    // Calculate stats
    const totalFeedbackForms = feedbacks.length;
    let totalResponses = 0;
    let activeForms = 0;
    
    feedbacks.forEach(feedback => {
      totalResponses += feedback.responses.length;
      if (feedback.isActive) activeForms++;
    });
    
    res.json({
      success: true,
      stats: {
        totalFeedbackForms,
        totalResponses,
        activeForms,
        averageResponsesPerForm: totalFeedbackForms > 0 ? (totalResponses / totalFeedbackForms).toFixed(1) : 0
      }
    });
  } catch (err: any) {
    console.error('Error fetching user feedback stats:', err);
    res.status(500).json({
      success: false,
      message: err.message || 'Error fetching feedback stats'
    });
  }
};
