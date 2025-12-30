import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import { requireAuth, requireAdmin, AuthenticatedRequest } from '@/server/middleware/authMiddleware';
import User from '@/server/model/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }

  try {
    await connectDB();

    if (req.method === 'GET') {
      // Get single user - requires authentication
      if (!(await requireAuth(req, res))) return;

      const user = await User.findById(id).select('-password -emailVerificationToken -passwordResetToken');

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      return res.status(200).json({ success: true, user });
    } else if (req.method === 'PATCH') {
      // Update user - requires admin authentication
      if (!(await requireAdmin(req, res))) return;

      const { firstName, lastName, phone, role, accountStatus } = req.body;

      const updateData: any = {};
      if (firstName) updateData.firstName = firstName;
      if (lastName) updateData.lastName = lastName;
      if (phone !== undefined) updateData.phone = phone;
      if (role) updateData.role = role;
      if (accountStatus) updateData.accountStatus = accountStatus;

      const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select(
        '-password -emailVerificationToken -passwordResetToken'
      );

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      return res.status(200).json({ success: true, message: 'User updated successfully', user });
    } else if (req.method === 'DELETE') {
      // Delete user - requires admin authentication
      if (!(await requireAdmin(req, res))) return;

      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      return res.status(200).json({ success: true, message: 'User deleted successfully' });
    } else {
      return res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('User operation error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process request',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
