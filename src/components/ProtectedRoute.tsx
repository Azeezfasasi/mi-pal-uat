'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader, AlertCircle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: ('user' | 'admin' | 'manager')[];
  fallbackPath?: string;
  unauthorizedPath?: string;
}

/**
 * ProtectedRoute Component
 * 
 * Protects pages from unauthorized access by checking:
 * 1. Authentication (token exists)
 * 2. User role (if requiredRoles specified)
 * 
 * @param children - Content to render if authorized
 * @param requiredRoles - Array of roles allowed to access this route
 * @param fallbackPath - Path to redirect if not authenticated (default: '/login')
 * @param unauthorizedPath - Path to redirect if authorized but role doesn't match (default: '/unauthorized')
 * 
 * @example
 * // Protect a page with role check
 * <ProtectedRoute requiredRoles={['admin']}>
 *   <AdminDashboard />
 * </ProtectedRoute>
 * 
 * @example
 * // Protect a page for any authenticated user
 * <ProtectedRoute>
 *   <UserProfile />
 * </ProtectedRoute>
 */
export default function ProtectedRoute({
  children,
  requiredRoles = ['user', 'admin', 'manager'],
  fallbackPath = '/login',
  unauthorizedPath = '/unauthorized',
}: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Check if token exists in localStorage
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        if (!token) {
          // No token found, redirect to login
          console.warn('No authentication token found');
          setAuthError('Authentication required');
          setIsAuthorized(false);
          // Redirect after a brief delay to allow component to render
          setTimeout(() => router.push(fallbackPath), 1000);
          return;
        }

        // Get user role from localStorage
        const userRole = typeof window !== 'undefined' 
          ? (localStorage.getItem('userRole') as 'user' | 'admin' | 'manager' | null)
          : null;

        if (!userRole) {
          console.warn('No user role found');
          setAuthError('User role not found');
          setIsAuthorized(false);
          setTimeout(() => router.push(fallbackPath), 1000);
          return;
        }

        // Check if user has required role
        if (!requiredRoles.includes(userRole)) {
          console.warn(`User role '${userRole}' not in required roles:`, requiredRoles);
          setAuthError(`Access denied. Required roles: ${requiredRoles.join(', ')}`);
          setIsAuthorized(false);
          setTimeout(() => router.push(unauthorizedPath), 1000);
          return;
        }

        // All checks passed - authorize user based on localStorage
        setIsAuthorized(true);
        setAuthError(null);
      } catch (error) {
        console.error('Authentication check error:', error);
        setAuthError('Authentication failed');
        setIsAuthorized(false);
        setTimeout(() => router.push(fallbackPath), 1000);
      }
    };

    checkAuthentication();
  }, [requiredRoles, fallbackPath, unauthorizedPath, router]);

  // Loading state - show spinner while checking authentication
  if (isAuthorized === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Error state - show error message and redirect info
  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600 text-center mb-2">
            {authError || 'You do not have permission to access this page.'}
          </p>
          <p className="text-sm text-gray-500 text-center mb-6">
            Redirecting you to the appropriate page...
          </p>
          
          {/* Manual redirect button as fallback */}
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('userRole');
              localStorage.removeItem('userEmail');
              router.push(fallbackPath);
            }}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Authorized - render protected content
  return <>{children}</>;
}
