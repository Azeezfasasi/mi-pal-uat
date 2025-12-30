import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { connectDB } from '../db/connect';
import User from '../model/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface AuthenticatedRequest extends NextApiRequest {
  user?: {
    id: string;
    email: string;
    role: string;
    permissions: string[];
  };
}

/**
 * Verify JWT token and attach user to request
 * Usage: const user = await verifyAuth(req);
 */
export const verifyAuth = async (req: NextApiRequest): Promise<any> => {
  try {
    // Get token from Authorization header or cookies
    const token =
      req.headers.authorization?.replace('Bearer ', '') ||
      req.cookies?.token;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    await connectDB();

    const user = await User.findById(decoded.id);

    if (!user || !user.isActive) {
      return null;
    }

    return {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      permissions: user.permissions || [],
    };
  } catch (error) {
    console.error('Auth verification error:', error);
    return null;
  }
};

/**
 * Protect endpoint - requires authentication
 * Usage: if (!await requireAuth(req, res)) return;
 */
export const requireAuth = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<boolean> => {
  const user = await verifyAuth(req);

  if (!user) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized - No valid token provided',
    });
    return false;
  }

  (req as AuthenticatedRequest).user = user;
  return true;
};

/**
 * Protect endpoint - requires admin role
 * Usage: if (!await requireAdmin(req, res)) return;
 */
export const requireAdmin = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<boolean> => {
  const user = await verifyAuth(req);

  if (!user) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized - No valid token provided',
    });
    return false;
  }

  if (user.role !== 'admin') {
    res.status(403).json({
      success: false,
      message: 'Forbidden - Admin access required',
    });
    return false;
  }

  (req as AuthenticatedRequest).user = user;
  return true;
};

/**
 * Protect endpoint - requires specific role(s)
 * Usage: if (!await requireRole(req, res, ['admin', 'manager'])) return;
 */
export const requireRole = async (
  req: NextApiRequest,
  res: NextApiResponse,
  roles: string[]
): Promise<boolean> => {
  const user = await verifyAuth(req);

  if (!user) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized - No valid token provided',
    });
    return false;
  }

  if (!roles.includes(user.role)) {
    res.status(403).json({
      success: false,
      message: `Forbidden - Requires one of these roles: ${roles.join(', ')}`,
    });
    return false;
  }

  (req as AuthenticatedRequest).user = user;
  return true;
};

/**
 * Protect endpoint - requires specific permission(s)
 * Usage: if (!await requirePermission(req, res, ['edit-users', 'delete-posts'])) return;
 */
export const requirePermission = async (
  req: NextApiRequest,
  res: NextApiResponse,
  permissions: string[]
): Promise<boolean> => {
  const user = await verifyAuth(req);

  if (!user) {
    res.status(401).json({
      success: false,
      message: 'Unauthorized - No valid token provided',
    });
    return false;
  }

  const hasPermission = permissions.some((p) => user.permissions.includes(p));

  if (!hasPermission) {
    res.status(403).json({
      success: false,
      message: `Forbidden - Missing required permissions`,
    });
    return false;
  }

  (req as AuthenticatedRequest).user = user;
  return true;
};

export type { AuthenticatedRequest };
