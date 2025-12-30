import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import User from '@/server/model/User';
import { sendEmailViaBrevo } from '@/server/utils/brevoEmailService';
import { passwordResetEmailTemplate } from '@/server/utils/emailTemplates';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required',
      });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal if email exists (security best practice)
      return res.status(200).json({
        success: true,
        message: 'If the email exists, a reset link has been sent.',
      });
    }

    // Generate reset token
    const resetToken = (user as any).getPasswordResetToken();
    await (user as any).save({ validateBeforeSave: false });

    // Send reset email
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
    const emailTemplate = passwordResetEmailTemplate(
      `${user.firstName} ${user.lastName}`,
      resetLink
    );

    try {
      await sendEmailViaBrevo({
        to: email,
        subject: emailTemplate.subject,
        htmlContent: emailTemplate.html,
        textContent: emailTemplate.text,
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Still return success to user
    }

    return res.status(200).json({
      success: true,
      message: 'If the email exists, a reset link has been sent.',
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process password reset',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
