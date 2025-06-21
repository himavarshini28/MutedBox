import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { feedbackRoutes } from './routes/feedback.js';
import { authRoutes } from './routes/auth.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { requestLogger } from './middleware/loggerMiddleware.js';
import { validateEnv } from './utils/validateEnv.js';
import { connectDB } from './utils/db.js';

// Load environment variables
dotenv.config();
validateEnv();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(requestLogger);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('MutedBox API is running');
});

// Error middleware
app.use(errorHandler);

// Connect to MongoDB and start server
async function startServer(): Promise<void> {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
}

startServer();
