import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import { Newsletter, NewsletterSubscriber } from '@/server/model/Newsletter';
import { sendEmailViaBrevo } from '@/server/utils/brevoEmailService';
import { newsletterSentTemplate } from '@/server/utils/emailTemplates';

/**
 * GET - Get all newsletters with filters
 * POST - Create a new newsletter draft or send newsletter
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      // Get newsletters with optional filters
      const { status, tags, search, limit = 20, page = 1 } = req.query;

      const filter: any = {};

      // Apply filters
      if (status && typeof status === 'string') {
        filter.status = status;
      }

      if (tags && typeof tags === 'string') {
        filter.tags = { $in: [tags] };
      }

      if (search && typeof search === 'string') {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { subject: { $regex: search, $options: 'i' } },
          { excerpt: { $regex: search, $options: 'i' } },
        ];
      }

      const pageNum = parseInt(page as string) || 1;
      const limitNum = parseInt(limit as string) || 20;
      const skip = (pageNum - 1) * limitNum;

      const newsletters = await Newsletter.find(filter)
        .select('-htmlContent') // Don't send full HTML in list view
        .sort({ createdAt: -1 })
        .limit(limitNum)
        .skip(skip);

      const totalCount = await Newsletter.countDocuments(filter);

      return res.status(200).json({
        success: true,
        count: newsletters.length,
        totalCount,
        page: pageNum,
        limit: limitNum,
        pages: Math.ceil(totalCount / limitNum),
        data: newsletters,
      });
    } else if (req.method === 'POST') {
      const {
        title,
        subject,
        htmlContent,
        textContent,
        excerpt,
        featuredImage,
        author,
        status,
        tags,
        action,
        scheduledFor,
      } = req.body;

      // Validate required fields
      if (!title || !subject || !htmlContent || !author) {
        return res.status(400).json({
          success: false,
          message: 'Title, subject, content, and author are required',
        });
      }

      if (action === 'send' || action === 'schedule') {
        // Get all active subscribers
        const subscribers = await NewsletterSubscriber.find({ isSubscribed: true });

        if (subscribers.length === 0) {
          return res.status(400).json({
            success: false,
            message: 'No active subscribers to send newsletter to',
          });
        }

        const recipientEmails = subscribers.map(s => s.email);

        // Create newsletter
        const newsletter = new Newsletter({
          title,
          subject,
          htmlContent,
          textContent: textContent || htmlContent,
          excerpt,
          featuredImage,
          author,
          status: action === 'send' ? 'sent' : 'scheduled',
          tags: tags || [],
          recipients: recipientEmails,
          recipientCount: recipientEmails.length,
          sentAt: action === 'send' ? new Date() : undefined,
          scheduledFor: action === 'schedule' ? new Date(scheduledFor) : undefined,
        });

        await newsletter.save();

        // Send emails if action is 'send'
        if (action === 'send') {
          try {
            // Send to each subscriber with professional newsletter template
            const emailPromises = recipientEmails.map(email => {
              const emailTemplate = newsletterSentTemplate(
                title,
                subject,
                htmlContent,
                `${process.env.FRONTEND_URL || 'https://mi-pal.com'}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`
              );

              return sendEmailViaBrevo({
                to: email,
                subject: emailTemplate.subject,
                htmlContent: emailTemplate.html,
                textContent: emailTemplate.text,
                senderEmail: 'noreply@mi-pal.com',
                senderName: 'Mi-Pal Technologies',
                tags: ['newsletter', ...(tags || [])],
              }).catch(error => {
                console.error(`Failed to send newsletter to ${email}:`, error);
              });
            });

            await Promise.all(emailPromises);

            return res.status(201).json({
              success: true,
              message: `Newsletter sent successfully to ${recipientEmails.length} subscribers`,
              data: newsletter,
            });
          } catch (error: any) {
            console.error('Error sending newsletters:', error);
            return res.status(500).json({
              success: false,
              message: 'Newsletter created but failed to send emails',
              data: newsletter,
            });
          }
        } else {
          return res.status(201).json({
            success: true,
            message: 'Newsletter scheduled successfully',
            data: newsletter,
          });
        }
      } else {
        // Create draft
        const newsletter = new Newsletter({
          title,
          subject,
          htmlContent,
          textContent: textContent || htmlContent,
          excerpt,
          featuredImage,
          author,
          status: 'draft',
          tags: tags || [],
        });

        await newsletter.save();

        return res.status(201).json({
          success: true,
          message: 'Newsletter draft created successfully',
          data: newsletter,
        });
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Newsletter error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error managing newsletters',
    });
  }
}
