import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import { NewsletterSubscriber } from '@/server/model/Newsletter';
import User from '@/server/model/User';
import {
  newsletterUnsubscriptionUserTemplate,
  newsletterUnsubscriptionAdminTemplate,
} from '@/server/utils/emailTemplates';
import { sendEmailViaBrevo } from '@/server/utils/brevoEmailService';

/**
 * GET - Get all subscribers (with filters)
 * DELETE - Unsubscribe from newsletter
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      // Get subscribers with optional filters
      const { isSubscribed, tags, search, limit = 50, page = 1 } = req.query;

      const filter: any = {};

      // Apply filters
      if (isSubscribed !== undefined) {
        filter.isSubscribed = isSubscribed === 'true';
      }

      if (tags && typeof tags === 'string') {
        filter.tags = { $in: [tags] };
      }

      if (search && typeof search === 'string') {
        filter.$or = [
          { email: { $regex: search, $options: 'i' } },
          { name: { $regex: search, $options: 'i' } },
        ];
      }

      const pageNum = parseInt(page as string) || 1;
      const limitNum = parseInt(limit as string) || 50;
      const skip = (pageNum - 1) * limitNum;

      const subscribers = await NewsletterSubscriber.find(filter)
        .select('-__v')
        .sort({ subscriptionDate: -1 })
        .limit(limitNum)
        .skip(skip);

      const totalCount = await NewsletterSubscriber.countDocuments(filter);

      return res.status(200).json({
        success: true,
        count: subscribers.length,
        totalCount,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(totalCount / limitNum),
        data: subscribers,
      });
    } else if (req.method === 'DELETE') {
      // Unsubscribe from newsletter
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required',
        });
      }

      const subscriber = await NewsletterSubscriber.findOneAndUpdate(
        { email: email.toLowerCase() },
        {
          isSubscribed: false,
          unsubscriptionDate: new Date(),
        },
        { new: true }
      );

      if (!subscriber) {
        return res.status(404).json({
          success: false,
          message: 'Subscriber not found',
        });
      }

      // Send unsubscription confirmation to user
      try {
        const resubscribeLink = `${process.env.FRONTEND_URL || 'https://mi-pal.com'}/newsletter/subscribe`;
        const userEmailTemplate = newsletterUnsubscriptionUserTemplate(
          subscriber.name || '',
          email,
          resubscribeLink
        );
        await sendEmailViaBrevo({
          to: email,
          subject: userEmailTemplate.subject,
          htmlContent: userEmailTemplate.html,
          textContent: userEmailTemplate.text,
          senderEmail: 'noreply@mi-pal.com',
          senderName: 'Mi-Pal Technologies',
          tags: ['newsletter-unsubscription'],
        });
      } catch (emailError) {
        console.error('Failed to send unsubscription confirmation email:', emailError);
        // Don't fail the unsubscription if email fails, just log it
      }

      // Send notification to admin users
      try {
        const adminUsers = await User.find({ role: { $in: ['admin', 'manager'] } }).select('email') as any[];

        if (adminUsers && adminUsers.length > 0) {
          const adminEmails = adminUsers.map(u => u.email).filter(adminEmail => adminEmail);

          if (adminEmails.length > 0) {
            const adminEmailTemplate = newsletterUnsubscriptionAdminTemplate(
              subscriber.name || '',
              email
            );

            // Send to each admin
            for (const adminEmail of adminEmails) {
              try {
                await sendEmailViaBrevo({
                  to: adminEmail,
                  subject: adminEmailTemplate.subject,
                  htmlContent: adminEmailTemplate.html,
                  textContent: adminEmailTemplate.text,
                  senderEmail: 'noreply@mi-pal.com',
                  senderName: 'Mi-Pal Technologies',
                  tags: ['newsletter-admin-notification'],
                });
              } catch (error) {
                console.error(`Failed to send admin notification to ${adminEmail}:`, error);
              }
            }
          }
        }
      } catch (error) {
        console.error('Failed to send admin notifications:', error);
      }

      return res.status(200).json({
        success: true,
        message: 'Successfully unsubscribed from newsletter',
        data: subscriber,
      });
    } else {
      res.setHeader('Allow', ['GET', 'DELETE']);
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Newsletter subscribers error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error managing newsletter subscribers',
    });
  }
}
