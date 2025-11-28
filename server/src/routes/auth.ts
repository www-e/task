import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import { JWT_CONFIG, AUTH_CONFIG } from '../config/auth';

const router = Router();

// Login
router.post('/login', (req: Request, res: Response) => {
  console.log('🔑 Login Attempt');

  // Extract potential credentials from request body (if provided)
  const { email: reqEmail } = req.body;

  try {
    // For demo purposes, using hardcoded user but with environment variables
    const userId = process.env.DEFAULT_USER_ID || "u_1";
    const userName = process.env.DEFAULT_USER_NAME || "Talia";
    const userRole = process.env.DEFAULT_USER_ROLE || "Student";
    const userEmail = reqEmail || process.env.DEFAULT_USER_EMAIL || "talia@example.com";

    // Generate JWT Token
    const token = jwt.sign(
      { userId: userId, name: userName, role: userRole, email: userEmail },
      JWT_CONFIG.secret,
      { expiresIn: JWT_CONFIG.expiresIn } as jwt.SignOptions
    );

    // Set HTTP-only cookie
    res.cookie(JWT_CONFIG.cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: JWT_CONFIG.cookieMaxAge
    });

    // Add security and performance headers
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store, must-revalidate'); // Prevent caching of login response
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.json({
      user: {
        id: userId,
        name: userName,
        role: userRole,
        email: userEmail,
        avatar: process.env.DEFAULT_AVATAR_URL || `https://i.pravatar.cc/150?u=${encodeURIComponent(userName)}`
      },
      token // Return token for immediate client-side use
    });
  } catch (error) {
    console.error('❌ JWT Sign Error:', error);
    res.status(500).json({ error: 'Failed to generate authentication token' });
  }
});

// Logout
router.post('/logout', (req: Request, res: Response) => {
  console.log('🚪 Logout Attempt');

  // Clear the cookie
  res.clearCookie(JWT_CONFIG.cookieName, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  res.json({ message: 'Logged out successfully' });
});

export default router;