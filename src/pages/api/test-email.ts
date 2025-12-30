import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmailViaBrevo } from '@/server/utils/brevoEmailService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    console.log('🧪 Testing Brevo email service...');
    console.log('📧 Sending test email to:', email);

    const result = await sendEmailViaBrevo({
      to: email,
      subject: 'Test Email from Mi-Pal',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
          <div style="background-color: white; padding: 30px; border-radius: 8px;">
            <h1 style="color: #EB5017;">Test Email</h1>
            <p>This is a test email to verify your Brevo email configuration is working correctly.</p>
            <p style="color: #666; font-size: 12px; margin-top: 30px;">
              If you received this email, your email service is configured properly!
            </p>
          </div>
        </div>
      `,
      textContent: 'This is a test email from Mi-Pal. If you received this, your email configuration is working!',
    });

    console.log('✅ Email test result:', result);

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Test email sent successfully!',
        messageId: result.messageId,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Failed to send test email',
        error: result.error,
        details: result.details,
      });
    }
  } catch (error) {
    console.error('❌ Test email error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error sending test email',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
