import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import { requireRole, AuthenticatedRequest } from '@/server/middleware/authMiddleware';
import Quote from '@/server/model/Quote';
import { sendEmailViaBrevo } from '@/server/utils/brevoEmailService';

/**
 * POST - Send a reply to a quote request (admin/manager only)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    // Require admin or manager role
    if (!(await requireRole(req, res, ['admin', 'manager']))) return;

    const authenticatedReq = req as AuthenticatedRequest;
    const { quoteId, to, subject, message, clientName } = req.body;

    // Validate required fields
    if (!quoteId || !to || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'quoteId, to, subject, and message are required',
      });
    }

    await connectDB();

    // Find and update the quote with the reply
    const quote = await Quote.findByIdAndUpdate(
      quoteId,
      {
        $push: {
          replies: {
            message,
            sender: authenticatedReq.user?.email,
            senderName: authenticatedReq.user?.id,
            createdAt: new Date(),
          },
        },
        status: 'in-progress',
        lastUpdated: new Date(),
      },
      { new: true }
    );

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote request not found',
      });
    }

    // Send email to client
    try {
      await sendEmailViaBrevo({
        to: to,
        subject: subject,
        htmlContent: `
          <h2>Re: Your Quote Request</h2>
          <p>Hi ${clientName || 'there'},</p>
          <p>${message}</p>
          <p>Thank you for your inquiry.</p>
          <hr />
          <p><em>This is an automated message. Please do not reply to this email.</em></p>
        `,
        tags: ['quote-reply'],
      });
    } catch (emailError) {
      console.error('Error sending reply email:', emailError);
      // Don't fail the request if email fails, but log the error
    }

    return res.status(200).json({
      success: true,
      message: 'Reply sent successfully',
      quote,
    });
  } catch (error) {
    console.error('Quote reply error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send reply',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
