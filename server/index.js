/**
 * THIS FILE IS DEPRECATED
 * 
 * Please use the TypeScript version in src/index.ts
 * This file will be removed after TypeScript migration is complete.
 */

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { feedbackRoutes } from './routes/feedback.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/feedback', feedbackRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('MutedBox API is running');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('MongoDB connection error:', error);
  });
