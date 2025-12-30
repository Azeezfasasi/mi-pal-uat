import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import { Newsletter } from '@/server/model/Newsletter';
import mongoose from 'mongoose';

/**
 * GET - Get a single newsletter by ID
 * PUT - Update a newsletter
 * DELETE - Delete a newsletter
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    const { id } = req.query;

    // Validate MongoDB ID
    if (!id || !mongoose.Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid newsletter ID',
      });
    }

    if (req.method === 'GET') {
      // Get a single newsletter
      const newsletter = await Newsletter.findById(id);

      if (!newsletter) {
        return res.status(404).json({
          success: false,
          message: 'Newsletter not found',
        });
      }

      return res.status(200).json({
        success: true,
        data: newsletter,
      });
    } else if (req.method === 'PUT') {
      // Update newsletter (only for draft status)
      const newsletter = await Newsletter.findById(id);

      if (!newsletter) {
        return res.status(404).json({
          success: false,
          message: 'Newsletter not found',
        });
      }

      if (newsletter.status !== 'draft') {
        return res.status(400).json({
          success: false,
          message: 'Only draft newsletters can be edited',
        });
      }

      const { title, subject, htmlContent, textContent, excerpt, featuredImage, tags } = req.body;

      // Update fields
      if (title) newsletter.title = title;
      if (subject) newsletter.subject = subject;
      if (htmlContent) newsletter.htmlContent = htmlContent;
      if (textContent) newsletter.textContent = textContent;
      if (excerpt !== undefined) newsletter.excerpt = excerpt;
      if (featuredImage !== undefined) newsletter.featuredImage = featuredImage;
      if (tags) newsletter.tags = tags;

      await newsletter.save();

      return res.status(200).json({
        success: true,
        message: 'Newsletter updated successfully',
        data: newsletter,
      });
    } else if (req.method === 'DELETE') {
      // Delete newsletter (only for draft status)
      const newsletter = await Newsletter.findById(id);

      if (!newsletter) {
        return res.status(404).json({
          success: false,
          message: 'Newsletter not found',
        });
      }

      if (newsletter.status !== 'draft') {
        return res.status(400).json({
          success: false,
          message: 'Only draft newsletters can be deleted',
        });
      }

      await Newsletter.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: 'Newsletter deleted successfully',
      });
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error: any) {
    console.error('Newsletter detail error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error managing newsletter',
    });
  }
}
