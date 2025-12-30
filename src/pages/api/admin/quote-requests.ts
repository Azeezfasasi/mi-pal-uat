import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import { requireAdmin, requireAuth, AuthenticatedRequest } from '@/server/middleware/authMiddleware';

/**
 * Quote Request Admin Endpoints
 * GET - Fetch all quote requests (admin only)
 * POST - Submit quote request (public)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectDB();

    if (req.method === 'GET') {
      // Get all quote requests - ADMIN ONLY
      if (!(await requireAdmin(req, res))) return;

      // Implement your quote fetching logic here
      return res.status(200).json({
        success: true,
        message: 'Fetching all quote requests (admin)',
        // Example response:
        // quotes: [{ id, company, email, status, createdAt, ... }]
      });
    } else if (req.method === 'POST') {
      // Submit new quote request - PUBLIC
      // No authentication required for submissions
      const { company, email, phone, message, scope } = req.body;

      if (!company || !email || !phone) {
        return res.status(400).json({
          success: false,
          message: 'company, email, and phone are required',
        });
      }

      // Implement your quote submission logic here
      return res.status(201).json({
        success: true,
        message: 'Quote request submitted successfully',
        // Example response:
        // quote: { id, company, email, phone, message, scope, status: 'pending', createdAt }
      });
    } else {
      return res.status(405).json({
        success: false,
        message: 'Method not allowed',
      });
    }
  } catch (error) {
    console.error('Quote request error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process request',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
