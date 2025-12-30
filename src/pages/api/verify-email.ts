import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import { verifyEmail } from '@/server/controller/authController';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const response = await verifyEmail(
      {
        json: async () => req.body,
      } as any
    );

    const data = await response.json();
    const status = response.status;

    return res.status(status).json(data);
  } catch (error) {
    console.error('Email verification error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to verify email',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
