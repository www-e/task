import dotenv from 'dotenv';

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.error('❌ ERROR: JWT_SECRET environment variable is required but not set.');
  process.exit(1);
}

export const JWT_CONFIG = {
  secret: jwtSecret,
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  cookieName: process.env.JWT_COOKIE_NAME || 'token',
  cookieMaxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
} as const;

export const AUTH_CONFIG = {
  rateLimitWindowMs: 15 * 60 * 1000, // 15 minutes
  rateLimitMaxRequests: 5, // 5 requests per window
  loginAttemptsLimit: 5,
  loginAttemptsWindowMs: 15 * 60 * 1000, // 15 minutes
} as const;