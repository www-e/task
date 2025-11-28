import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/auth';

// JWT Authentication Middleware
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, JWT_CONFIG.secret) as { userId: string; name: string; role: string };
    req.user = verified;
    next();
  } catch (error) {
    console.error('❌ Token verification error:', error);
    return res.status(403).json({ error: 'Invalid token.' });
  }
};

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; name: string; role: string };
    }
  }
}