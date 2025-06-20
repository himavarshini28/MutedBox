#!/usr/bin/env node
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Feedback } from '../models/Feedback.js';

// Load environment variables
dotenv.config();

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error('MongoDB connection string is not defined in environment variables.');
    }
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clean up existing data
    await Feedback.deleteMany({});
    console.log('Cleaned up existing data');

    // Create sample feedback
    const sampleFeedback = new Feedback({
      uniqueId: 'sample123',
      feedback: 'Sample feedback for testing purposes',
      responses: [
        { content: 'This is a sample response 1' },
        { content: 'This is a sample response 2' }
      ]
    });

    await sampleFeedback.save();
    console.log('Created sample feedback');

    console.log('Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
