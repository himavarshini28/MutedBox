import crypto from 'crypto';

// Generate a unique ID for feedback links
export const generateUniqueId = (length: number = 6): string => {
  return crypto.randomBytes(length).toString('hex');
};

// Validate MongoDB ID
export const isValidMongoId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};
