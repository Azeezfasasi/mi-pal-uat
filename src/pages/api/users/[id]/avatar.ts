import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import { requireAuth, AuthenticatedRequest } from '@/server/middleware/authMiddleware';
import User from '@/server/model/User';
import { uploadToCloudinary, deleteFromCloudinary } from '@/server/utils/cloudinaryService';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'PATCH' && req.method !== 'PUT') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Require authentication
    if (!(await requireAuth(req, res))) return;

    const { id } = req.query;
    const authenticatedReq = req as AuthenticatedRequest;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    await connectDB();

    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify user is updating their own avatar or is admin
    if (authenticatedReq.user?.id !== id && authenticatedReq.user?.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'You can only update your own avatar' 
      });
    }

    // Parse the form data
    const form = formidable({ multiples: false });
    const [fields, files] = await form.parse(req);

    const avatarFile = Array.isArray(files.avatar) ? files.avatar[0] : files.avatar;

    if (!avatarFile) {
      return res.status(400).json({ success: false, message: 'No file provided' });
    }

    // Read file and convert to base64
    const fileBuffer = fs.readFileSync(avatarFile.filepath);
    const base64String = `data:${avatarFile.mimetype};base64,${fileBuffer.toString('base64')}`;

    // Delete old avatar from Cloudinary if it exists
    if (user.avatar && user.avatarPublicId) {
      try {
        await deleteFromCloudinary(user.avatarPublicId);
      } catch (error) {
        console.error('Error deleting old avatar:', error);
        // Continue even if delete fails
      }
    }

    // Upload new avatar to Cloudinary
    const uploadResult = await uploadToCloudinary(base64String, 'mipi-avatars');

    // Update user with new avatar
    user.avatar = uploadResult.url;
    user.avatarPublicId = uploadResult.publicId;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Avatar uploaded successfully',
      avatar: user.avatar,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error('Avatar upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to upload avatar',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
