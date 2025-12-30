import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import { requireRole, AuthenticatedRequest } from '@/server/middleware/authMiddleware';
import Contact from '@/server/model/Contact';
import { sendEmailViaBrevo } from '@/server/utils/brevoEmailService';
import { contactReplyTemplate, contactStatusUpdateTemplate } from '@/server/utils/emailTemplates';

/**
 * GET - Get single contact submission (admin/manager only)
 * PATCH - Update contact submission status/response (admin/manager only)
 * DELETE - Delete contact submission (admin only)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Contact ID is required',
      });
    }

    await connectDB();

    if (req.method === 'GET') {
      // Get single submission - admin/manager only
      if (!(await requireRole(req, res, ['admin', 'manager']))) return;

      const contact = await Contact.findById(id);

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact submission not found',
        });
      }

      return res.status(200).json({
        success: true,
        contact,
      });
    } else if (req.method === 'PATCH') {
      // Update submission - admin/manager only
      if (!(await requireRole(req, res, ['admin', 'manager']))) return;

      const authenticatedReq = req as AuthenticatedRequest;
      const { status, adminResponse } = req.body;

      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Status is required',
        });
      }

      // Get original contact to check if status changed
      const originalContact = await Contact.findById(id);
      if (!originalContact) {
        return res.status(404).json({
          success: false,
          message: 'Contact submission not found',
        });
      }

      const updateData: any = {
        status,
      };

      if (adminResponse) {
        updateData.adminResponse = adminResponse;
        updateData.adminName = authenticatedReq.user?.email;
        updateData.respondedAt = new Date();
      }

      const contact = await Contact.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact submission not found',
        });
      }

      // Send email reply if response was provided
      if (adminResponse) {
        try {
          const emailTemplate = contactReplyTemplate(contact.from_name, adminResponse);
          await sendEmailViaBrevo({
            to: contact.user_email,
            subject: emailTemplate.subject,
            htmlContent: emailTemplate.html,
            textContent: emailTemplate.text,
            senderEmail: 'noreply@mi-pal.com',
            senderName: 'Mi-Pal Technologies',
            tags: ['contact-reply'],
          });
        } catch (emailError) {
          console.error('Error sending reply email:', emailError);
          // Don't fail the request if email fails
        }
      }

      // Send status update email if status changed (even without a response)
      if (status !== originalContact.status) {
        try {
          const emailTemplate = contactStatusUpdateTemplate(
            contact.from_name,
            status,
            adminResponse // Include the response as notes if provided
          );
          await sendEmailViaBrevo({
            to: contact.user_email,
            subject: emailTemplate.subject,
            htmlContent: emailTemplate.html,
            textContent: emailTemplate.text,
            senderEmail: 'noreply@mi-pal.com',
            senderName: 'Mi-Pal Technologies',
            tags: ['contact-status-update'],
          });
        } catch (emailError) {
          console.error('Error sending status update email:', emailError);
          // Don't fail the request if email fails
        }
      }

      return res.status(200).json({
        success: true,
        message: 'Contact submission updated successfully',
        contact,
      });
    } else if (req.method === 'DELETE') {
      // Delete submission - admin only
      if (!(await requireRole(req, res, ['admin']))) return;

      const contact = await Contact.findByIdAndDelete(id);

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: 'Contact submission not found',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Contact submission deleted successfully',
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
      message: 'Failed to process request',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
