import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import { requireAdmin } from '@/server/middleware/authMiddleware';
import User from '@/server/model/User';

/**
 * GET - Fetch all users (admin only)
 * PATCH - Update user role or status (admin only)
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // All methods require admin authentication
    if (!(await requireAdmin(req, res))) return;

    await connectDB();

    if (req.method === 'GET') {
      // Get all users with pagination
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const skip = (page - 1) * limit;

      const users = await User.find()
        .select('-password -emailVerificationToken -passwordResetToken')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

      const total = await User.countDocuments();

      return res.status(200).json({
        success: true,
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } else if (req.method === 'PATCH') {
      // Update multiple users or perform bulk actions
      const { ids, update } = req.body;

      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'ids array is required',
        });
      }

      if (!update || typeof update !== 'object') {
        return res.status(400).json({
          success: false,
          message: 'update object is required',
        });
      }

      const updatedUsers = await User.updateMany(
        { _id: { $in: ids } },
        update
      );

      return res.status(200).json({
        success: true,
        message: 'Users updated successfully',
        modifiedCount: updatedUsers.modifiedCount,
      });
    } else {
      return res.status(405).json({
        success: false,
        message: 'Method not allowed',
      });
    }
  } catch (error) {
    console.error('Admin users error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process request',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
