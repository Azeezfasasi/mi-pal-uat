import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import User from '@/server/model/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Find user and include password
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if account is locked
    if ((user as any).isAccountLocked()) {
      return res.status(423).json({
        success: false,
        message: 'Account locked due to multiple login attempts. Try again later.',
      });
    }

    // Check if account is active
    if (!user.isActive || user.accountStatus !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'Your account is inactive. Please contact support.',
      });
    }

    // Validate password
    const isPasswordValid = await (user as any).matchPassword(password);

    if (!isPasswordValid) {
      // Increment login attempts
      await (user as any).incrementLoginAttempts();
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Reset login attempts on successful login
    await (user as any).resetLoginAttempts();

    // Update last login
    user.lastLogin = new Date();
    await (user as any).save({ validateBeforeSave: false });

    // Generate JWT token
    const token = jwt.sign(
      { id: (user as any)._id },
      JWT_SECRET as jwt.Secret,
      { expiresIn: JWT_EXPIRE } as jwt.SignOptions
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: (user as any).getPublicProfile(),
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Login failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
