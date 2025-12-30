import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import Contact from '@/server/model/Contact';
import { sendEmailViaBrevo } from '@/server/utils/brevoEmailService';
import { contactSubmissionAcknowledgmentTemplate, contactAdminNotificationTemplate } from '@/server/utils/emailTemplates';
import User from '@/server/model/User';

/**
 * POST - Submit contact form (public)
 * GET - Fetch all contact submissions (would need admin middleware)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    if (req.method === 'POST') {
      // Public endpoint - submit contact form
      const { from_name, user_email, from_contact, message } = req.body;

      // Validate required fields
      if (!from_name || !user_email || !from_contact || !message) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required',
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(user_email)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid email format',
        });
      }

      // Create new contact submission
      const contact = new Contact({
        from_name,
        user_email,
        from_contact,
        message,
        status: 'new',
      });

      await contact.save();

      // Send acknowledgment email to user
      try {
        const emailTemplate = contactSubmissionAcknowledgmentTemplate(from_name);
        await sendEmailViaBrevo({
          to: user_email,
          subject: emailTemplate.subject,
          htmlContent: emailTemplate.html,
          textContent: emailTemplate.text,
          senderEmail: 'noreply@mi-pal.com',
          senderName: 'Mi-Pal Technologies',
          tags: ['contact-submission'],
        });
      } catch (emailError) {
        console.error('Failed to send acknowledgment email:', emailError);
        // Don't fail the submission if email fails, just log it
      }

      // Send admin notification to all admin/manager users
      try {
        const adminUsers = await User.find({ role: { $in: ['admin', 'manager'] } }).select('email');
        
        if (adminUsers && adminUsers.length > 0) {
          const adminEmails = adminUsers.map(u => u.email).filter(email => email);
          
          if (adminEmails.length > 0) {
            const adminEmailTemplate = contactAdminNotificationTemplate(
              from_name,
              user_email,
              from_contact,
              message,
              contact._id.toString()
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
                  tags: ['contact-new-submission'],
                });
              } catch (error) {
                console.error(`Failed to send admin notification to ${adminEmail}:`, error);
              }
            }
          }
        }
      } catch (adminError) {
        console.error('Failed to send admin notification:', adminError);
        // Don't fail the submission if admin notification fails
      }

      return res.status(201).json({
        success: true,
        message: 'Contact form submitted successfully',
        contact,
      });
    } else {
      return res.status(405).json({
        success: false,
        message: 'Method not allowed',
      });
    }
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit contact form',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
