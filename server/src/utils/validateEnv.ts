/**
 * Environment variable validation
 */

export const validateEnv = (): void => {
  const requiredEnvVars = ['PORT', 'MONGO_URI', 'JWT_SECRET'];
  const missingEnvVars = requiredEnvVars.filter(env => !process.env[env]);

  if (missingEnvVars.length > 0) {
    console.warn(`⚠️ Missing required environment variables: ${missingEnvVars.join(', ')}`);
    
    if (missingEnvVars.includes('MONGO_URI')) {
      throw new Error('MONGO_URI is required to connect to the database');
    }
  }
};
