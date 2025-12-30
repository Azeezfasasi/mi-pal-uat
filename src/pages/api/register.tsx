import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import User from '@/server/model/User';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sendEmailViaBrevo } from '@/server/utils/brevoEmailService';
import { verificationEmailTemplate } from '@/server/utils/emailTemplates';
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

    const { firstName, lastName, email, password, confirmPassword, phone } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be filled',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password,
      phone: phone || undefined,
      role: 'user',
      isEmailVerified: false,
    });

    // Generate verification token
    const token = crypto.randomBytes(32).toString('hex');
    user.emailVerificationToken = crypto.createHash('sha256').update(token).digest('hex');
    user.emailVerificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    // Save user
    await (user as any).save();

    // Send verification email
    const verificationLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${token}`;
    const emailTemplate = verificationEmailTemplate(`${firstName} ${lastName}`, verificationLink);

    try {
      await sendEmailViaBrevo({
        to: email,
        subject: emailTemplate.subject,
        htmlContent: emailTemplate.html,
        textContent: emailTemplate.text,
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      { id: (user as any)._id },
      JWT_SECRET as jwt.Secret,
      { expiresIn: JWT_EXPIRE } as jwt.SignOptions
    );

    return res.status(201).json({
      success: true,
      message: 'Registration successful! Please verify your email.',
      token: jwtToken,
      user: {
        id: (user as any)._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
