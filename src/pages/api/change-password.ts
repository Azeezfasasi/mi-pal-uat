import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import User from '@/server/model/User';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { currentPassword, newPassword } = req.body;
    const userEmail = req.headers['x-user-email'] as string;

    // Validation
    if (!userEmail) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated',
      });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters',
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: 'New password must be different from current password',
      });
    }

    // Find user by email
    const user = await User.findOne({ email: userEmail }).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Verify current password
    const isPasswordMatch = await (user as any).matchPassword(currentPassword);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    // Update password
    user.password = newPassword;
    user.passwordChangedAt = new Date();
    await (user as any).save();

    // Send confirmation email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #EB5017 0%, #ff6b35 100%); padding: 20px; color: white; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0;">Password Changed Successfully</h1>
        </div>
        <div style="padding: 20px; background: #f9fafb; border-radius: 0 0 8px 8px;">
          <p>Hello <strong>${user.firstName} ${user.lastName}</strong>,</p>
          
          <p>Your password has been successfully changed at ${new Date().toLocaleString()}.</p>
          
          <div style="background: #fff3cd; border-left: 4px solid #ff9800; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; color: #856404;"><strong>🔒 Security Notice:</strong></p>
            <p style="margin: 5px 0 0 0; color: #856404;">If you did not make this change, please contact support immediately.</p>
          </div>
          
          <p style="color: #666;">For security reasons:</p>
          <ul style="color: #666;">
            <li>You will be logged out of all other sessions</li>
            <li>Your previous password will no longer work</li>
            <li>Use your new password for future logins</li>
          </ul>
          
          <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 14px;">
            This is an automated security notification. Please do not reply to this email.
          </p>
        </div>
      </div>
    `;

    const emailText = `
Password Changed Successfully

Hello ${user.firstName} ${user.lastName},

Your password has been successfully changed at ${new Date().toLocaleString()}.

🔒 Security Notice:
If you did not make this change, please contact support immediately.

For security reasons:
- You will be logged out of all other sessions
- Your previous password will no longer work
- Use your new password for future logins

This is an automated security notification. Please do not reply to this email.
    `;

    try {
      await transporter.sendMail({
        to: user.email,
        subject: 'Password Changed - Mi-Pal Account Security',
        html: emailHtml,
        text: emailText,
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Continue even if email fails - password was changed successfully
    }

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully',
      user: {
        id: (user as any)._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to change password',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
