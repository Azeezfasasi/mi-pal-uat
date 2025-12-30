import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import { NewsletterSubscriber } from '@/server/model/Newsletter';
import User from '@/server/model/User';
import {
  newsletterSubscriptionUserTemplate,
  newsletterSubscriptionAdminTemplate,
} from '@/server/utils/emailTemplates';
import { sendEmailViaBrevo } from '@/server/utils/brevoEmailService';

/**
 * POST - Subscribe to newsletter
 * GET - Get all active subscribers (admin only)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    if (req.method === 'POST') {
      // Public endpoint - subscribe to newsletter
      const { email, name, phone, tags } = req.body;

      // Validate required fields
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email is required',
        });
      }

      // Validate email format
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format',
        });
      }

      try {
        // Check if subscriber already exists
        let subscriber = await NewsletterSubscriber.findOne({ email: email.toLowerCase() });
        let isNewSubscriber = !subscriber;

        if (subscriber) {
          if (subscriber.isSubscribed) {
            return res.status(200).json({
              success: true,
              message: 'You are already subscribed to our newsletter',
              data: subscriber,
            });
          } else {
            // Resubscribe
            subscriber.isSubscribed = true;
            subscriber.unsubscriptionDate = undefined;
            if (name) subscriber.name = name;
            if (phone) subscriber.phone = phone;
            if (tags && Array.isArray(tags)) {
              subscriber.tags = [...new Set([...subscriber.tags, ...tags])];
            }
            await subscriber.save();
            isNewSubscriber = false;
          }
        } else {
          // Create new subscriber
          subscriber = new NewsletterSubscriber({
            email: email.toLowerCase(),
            name: name || undefined,
            phone: phone || undefined,
            isSubscribed: true,
            source: 'website',
            tags: tags || [],
            subscriptionDate: new Date(),
          });

          await subscriber.save();
        }

        // Send confirmation email to subscriber
        try {
          const userEmailTemplate = newsletterSubscriptionUserTemplate(name || '', email);
          await sendEmailViaBrevo({
            to: email,
            subject: userEmailTemplate.subject,
            htmlContent: userEmailTemplate.html,
            textContent: userEmailTemplate.text,
            senderEmail: 'noreply@mi-pal.com',
            senderName: 'Mi-Pal Technologies',
            tags: ['newsletter-subscription'],
          });
        } catch (emailError) {
          console.error('Failed to send subscription confirmation email:', emailError);
          // Don't fail the subscription if email fails, just log it
        }

        // Send notification to admin users
        try {
          const adminUsers = await User.find({ role: { $in: ['admin', 'manager'] } }).select('email') as any[];

          if (adminUsers && adminUsers.length > 0) {
            const adminEmails = adminUsers.map(u => u.email).filter(email => email);

            if (adminEmails.length > 0) {
              const adminEmailTemplate = newsletterSubscriptionAdminTemplate(name || '', email, phone);

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

        return res.status(201).json({
          success: true,
          message: isNewSubscriber
            ? 'Successfully subscribed to newsletter'
            : 'Welcome back! You have been resubscribed to our newsletter',
          data: subscriber,
        });
      } catch (error: any) {
        if (error.code === 11000) {
          return res.status(200).json({
            success: true,
            message: 'You are already subscribed to our newsletter',
          });
        }
        throw error;
      }
    } else if (req.method === 'GET') {
      // Get all active subscribers (would need auth middleware)
      try {
        const subscribers = await NewsletterSubscriber.find({ isSubscribed: true })
          .select('-__v')
          .sort({ subscriptionDate: -1 });

        return res.status(200).json({
          success: true,
          count: subscribers.length,
          data: subscribers,
        });
      } catch (error) {
        throw error;
      }
    } else {
      res.setHeader('Allow', ['POST', 'GET']);
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Newsletter subscription error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error processing newsletter subscription',
    });
  }
}
