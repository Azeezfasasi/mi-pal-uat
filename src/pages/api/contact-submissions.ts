import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import { requireRole, AuthenticatedRequest } from '@/server/middleware/authMiddleware';
import Contact from '@/server/model/Contact';

/**
 * GET - Fetch all contact submissions (admin/manager only)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    // Require admin or manager role
    if (!(await requireRole(req, res, ['admin', 'manager']))) return;

    await connectDB();

    // Get query parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const status = req.query.status as string;
    const skip = (page - 1) * limit;

    // Build filter query
    let filterQuery: any = {};

    if (search) {
      filterQuery.$or = [
        { from_name: { $regex: search, $options: 'i' } },
        { user_email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
        { from_contact: { $regex: search, $options: 'i' } },
      ];
    }

    if (status) {
      filterQuery.status = status;
    }

    // Fetch contact submissions with pagination
    const submissions = await Contact.find(filterQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Contact.countDocuments(filterQuery);

    // Count by status
    const statusCounts = {
      new: await Contact.countDocuments({ status: 'new' }),
      replied: await Contact.countDocuments({ status: 'replied' }),
      resolved: await Contact.countDocuments({ status: 'resolved' }),
      closed: await Contact.countDocuments({ status: 'closed' }),
    };

    return res.status(200).json({
      success: true,
      submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      statusCounts,
    });
  } catch (error) {
    console.error('Fetch contact submissions error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch contact submissions',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
