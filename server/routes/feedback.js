import express from 'express';
import { Feedback } from '../models/Feedback.js';
import crypto from 'crypto';

const router = express.Router();

// Create a new feedback link
router.post('/create', async (req, res) => {
  try {
    const uniqueId = crypto.randomBytes(6).toString('hex');
    const newFeedback = new Feedback({
      uniqueId,
      feedback: req.body.feedback || 'Anonymous feedback'
    });

    await newFeedback.save();
    
    res.status(201).json({
      success: true,
      uniqueId,
      message: 'Feedback link created successfully'
    });
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating feedback link',
      error: error.message
    });
  }
});

// Get a specific feedback by uniqueId
router.get('/:uniqueId', async (req, res) => {
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
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching feedback',
      error: error.message
    });
  }
});

// Submit a response to a feedback
router.post('/:uniqueId/respond', async (req, res) => {
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

    feedback.responses.push({ content });
    await feedback.save();

    res.status(201).json({
      success: true,
      message: 'Response submitted successfully'
    });
  } catch (error) {
    console.error('Error submitting response:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting response',
      error: error.message
    });
  }
});

// Get all responses for a feedback
router.get('/:uniqueId/responses', async (req, res) => {
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
  } catch (error) {
    console.error('Error fetching responses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching responses',
      error: error.message
    });
  }
});

// Deactivate a feedback link
router.put('/:uniqueId/deactivate', async (req, res) => {
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
  } catch (error) {
    console.error('Error deactivating feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Error deactivating feedback link',
      error: error.message
    });
  }
});

// Get all feedback links (for admin purposes)
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: feedbacks.length,
      feedbacks
    });
  } catch (error) {
    console.error('Error fetching all feedback:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching all feedback',
      error: error.message
    });
  }
});

export const feedbackRoutes = router;
