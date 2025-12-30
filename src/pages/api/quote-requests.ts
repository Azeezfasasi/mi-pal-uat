import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '@/server/db/connect';
import { requireRole } from '@/server/middleware/authMiddleware';
import Quote from '@/server/model/Quote';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Require admin or manager role
  if (!(await requireRole(req, res, ['admin', 'manager']))) return;

  try {
    await connectDB();

    // Fetch all quote requests
    const quoteRequests = await Quote.find({}).sort({ createdAt: -1 });
    // console.log('Fetched quote requests:', quoteRequests.length);
    // console.log('Quote requests:', quoteRequests);

    // Count by status
    const totalQuotes = quoteRequests.length;
    const newQuotes = quoteRequests.filter((q: any) => q.status === 'new').length;
    const completedQuotes = quoteRequests.filter((q: any) => q.status === 'completed').length;

    // console.log(`Total: ${totalQuotes}, New: ${newQuotes}, Completed: ${completedQuotes}`);

    return res.status(200).json({
      success: true,
      data: {
        totalQuoteRequests: totalQuotes,
        pendingQuoteRequests: newQuotes,
        completedQuoteRequests: completedQuotes,
        quoteRequests: quoteRequests,
      },
    });
  } catch (error) {
    console.error('Quote requests fetch error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch quote requests',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

