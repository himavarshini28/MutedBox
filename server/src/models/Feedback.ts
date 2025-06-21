import { Document, Schema, model, Types } from 'mongoose';
import crypto from 'crypto';

// Define interfaces for our model
export interface IResponse {
  content: string;
  submittedAt: Date;
}

export interface IFeedback extends Document {
  uniqueId: string;
  feedback: string;
  createdAt: Date;
  isActive: boolean;
  responses: IResponse[];
  user?: Types.ObjectId; // Reference to User
  isPublic: boolean; // Whether this feedback is public or requires authentication to access
}

// Define schema
const feedbackSchema = new Schema<IFeedback>({
  uniqueId: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomBytes(6).toString('hex')
  },
  feedback: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  responses: [
    {
      content: {
        type: String,
        required: true
      },
      submittedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

export const Feedback = model<IFeedback>('Feedback', feedbackSchema);
