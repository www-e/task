import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/auth';

// JWT Authentication Middleware
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // Try to get token from cookie first
  let token = req.cookies?.token;

  // If no cookie, try to get from Authorization header
  if (!token) {
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
    token = bearerToken;
  }

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