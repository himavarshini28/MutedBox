import { Document, Schema, model } from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

// Define interfaces for our model
export interface IUser extends Document {
  email: string;
  name?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  authToken?: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  generateAuthToken: () => string;
}

// Define schema
const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  name: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  authToken: {
    type: String
  }
});

// Pre-save hook to hash password
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    next(err as Error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate auth token
userSchema.methods.generateAuthToken = function(): string {
  const token = crypto.randomBytes(32).toString('hex');
  this.authToken = token;
  return token;
};

export const User = model<IUser>('User', userSchema);
