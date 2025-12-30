import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import User from '@/server/model/User';
import crypto from 'crypto';
import { sendEmailViaBrevo } from '@/server/utils/brevoEmailService';
import { welcomeEmailTemplate } from '@/server/utils/emailTemplates';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
      role,
      accountStatus,
    } = req.body;

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

    // Validate role
    if (!['user', 'admin', 'manager'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role specified',
      });
    }

    // Validate status
    if (!['active', 'inactive', 'suspended'].includes(accountStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid account status',
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
      role: role || 'user',
      accountStatus: accountStatus || 'active',
      isEmailVerified: true, // Admin-created users are auto-verified
      isActive: accountStatus === 'active',
      permissions: role === 'admin' ? ['*'] : [],
    });

    // Save user
    await (user as any).save();

    // Send welcome email
    const emailTemplate = welcomeEmailTemplate(`${firstName} ${lastName}`);

    try {
      await sendEmailViaBrevo({
        to: email,
        subject: emailTemplate.subject,
        htmlContent: emailTemplate.html,
        textContent: emailTemplate.text,
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Continue even if email fails
    }

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: (user as any)._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        accountStatus: user.accountStatus,
      },
    });
  } catch (error) {
    console.error('Add user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
