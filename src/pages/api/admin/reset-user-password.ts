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

    const { userId, newPassword, sendEmail } = req.body;

    // Validation
    if (!userId || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'User ID and new password are required',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update password
    user.password = newPassword;
    user.passwordChangedAt = new Date();
    await (user as any).save();

    // Send email notification if requested
    if (sendEmail) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #EB5017 0%, #ff6b35 100%); padding: 20px; color: white; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">Password Reset Notification</h1>
          </div>
          <div style="padding: 20px; background: #f9fafb; border-radius: 0 0 8px 8px;">
            <p>Hello <strong>${user.firstName} ${user.lastName}</strong>,</p>
            
            <p>Your password has been reset by an administrator. Your new temporary password is:</p>
            
            <div style="background: white; padding: 15px; border: 2px solid #EB5017; border-radius: 6px; margin: 20px 0; text-align: center;">
              <code style="font-size: 18px; font-weight: bold; letter-spacing: 2px;">${newPassword}</code>
            </div>
            
            <p style="color: #ef4444;"><strong>⚠️ Important:</strong></p>
            <ul style="color: #666;">
              <li>Please save this password in a secure location</li>
              <li>Use this password to log in to your account</li>
              <li>We recommend changing your password after your first login</li>
              <li>Never share this password with anyone</li>
            </ul>
            
            <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #666; font-size: 14px;">
              If you did not request this password reset or have any concerns, please contact support immediately.
            </p>
            
            <p style="color: #999; font-size: 12px; margin-top: 20px;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        </div>
      `;

      const emailText = `
Password Reset Notification

Hello ${user.firstName} ${user.lastName},

Your password has been reset by an administrator. Your new temporary password is:

${newPassword}

⚠️ Important:
- Please save this password in a secure location
- Use this password to log in to your account
- We recommend changing your password after your first login
- Never share this password with anyone

If you did not request this password reset or have any concerns, please contact support immediately.

This is an automated message. Please do not reply to this email.
      `;

      try {
        await transporter.sendMail({
          to: user.email,
          subject: 'Password Reset Notification - Mi-Pal',
          html: emailHtml,
          text: emailText,
        });
      } catch (emailError) {
        console.error('Email sending error:', emailError);
        // Continue even if email fails
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Password reset successfully',
      user: {
        id: (user as any)._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to reset password',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
