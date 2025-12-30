import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FileText, Users, Clock, CheckCircle, Loader, AlertCircle } from 'lucide-react'
import DashboardLayout from '@/components/dasboard-components/DashboardLayout'
import QuoteChart from '@/components/dasboard-components/QuoteChart';

interface DashboardStats {
  userName: string;
  totalQuoteRequests: number;
  totalUsers: number;
  pendingQuoteRequests: number;
  completedQuoteRequests: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    userName: 'User',
    totalQuoteRequests: 0,
    totalUsers: 0,
    pendingQuoteRequests: 0,
    completedQuoteRequests: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState<'user' | 'admin' | 'manager'>('user');
  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError('');

        // Check if localStorage is available (client-side only)
        if (typeof window === 'undefined') {
          return;
        }

        // Get user role from localStorage
        const role = localStorage.getItem('userRole') as 'user' | 'admin' | 'manager' | null;
        setUserRole(role || 'user');

        const userEmail = localStorage.getItem('userEmail');
        console.log('User email from localStorage:', userEmail);

        if (!userEmail) {
          setError('Please log in to view the dashboard');
          setLoading(false);
          return;
        }

        // Get token from localStorage
        const token = localStorage.getItem('token');
        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        // Only fetch stats for admin and manager users
        if (role === 'admin' || role === 'manager') {
          // Fetch quote requests
          console.log('Fetching quote requests...');
          const quotesResponse = await fetch('/api/quote-requests', { headers });
          
          if (!quotesResponse.ok) {
            console.error('Quote requests response error:', quotesResponse.status);
            throw new Error('Failed to fetch quote requests');
          }

          const quotesData = await quotesResponse.json();
          console.log('Quote requests data:', quotesData);

          // Fetch all users
          console.log('Fetching users...');
          const usersResponse = await fetch('/api/users?limit=1000', { headers });
          
          if (!usersResponse.ok) {
            console.error('Users response error:', usersResponse.status);
            throw new Error('Failed to fetch users');
          }

          const usersData = await usersResponse.json();
          console.log('Users data:', usersData);

          const totalUsers = usersData.totalUsers || usersData.users?.length || 0;

          // Fetch current user profile
          console.log('Fetching user profile for:', userEmail);
          const userResponse = await fetch(`/api/users?search=${encodeURIComponent(userEmail)}`, { headers });
          
          if (!userResponse.ok) {
            console.error('User response error:', userResponse.status);
            throw new Error('Failed to fetch user profile');
          }

          const userData = await userResponse.json();
          console.log('User data:', userData);

          const currentUser = userData.users?.[0];
          const userName = currentUser 
            ? `${currentUser.firstName} ${currentUser.lastName}` 
            : 'User';

          // Set stats with fetched data
          setStats({
            userName: userName,
            totalQuoteRequests: quotesData.data?.totalQuoteRequests || 0,
            totalUsers: totalUsers,
            pendingQuoteRequests: quotesData.data?.pendingQuoteRequests || 0,
            completedQuoteRequests: quotesData.data?.completedQuoteRequests || 0,
          });
        } else {
          // For regular users, just fetch their name
          const userResponse = await fetch(`/api/users?search=${encodeURIComponent(userEmail)}`, { headers });
          
          if (userResponse.ok) {
            const userData = await userResponse.json();
            const currentUser = userData.users?.[0];
            const userName = currentUser 
              ? `${currentUser.firstName} ${currentUser.lastName}` 
              : 'User';
            
            setStats((prev) => ({ ...prev, userName }));
          }
        }

        setError('');
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load dashboard data';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    // Small delay to ensure localStorage is ready
    const timer = setTimeout(fetchDashboardData, 100);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <div>
              <p className="text-red-800 font-medium">Error loading dashboard</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hi {stats.userName}!</h1>
          <p className="mt-2 text-gray-600">Welcome back! Here&apos;s your business overview.</p>
        </div>

        {/* Main Stats - 4 Cards (Admin & Manager Only) */}
        {(userRole === 'admin' || userRole === 'manager') && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {/* Quote Requests Card */}
          <div className="rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-lg bg-blue-50 p-3">
                <FileText className="text-blue-600" size={32} />
              </div>
              <span className="text-sm font-semibold text-gray-600">Total</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Quote Requests</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalQuoteRequests}</p>
          </div>

          {/* Users Card */}
          <div className="rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-lg bg-green-50 p-3">
                <Users className="text-green-600" size={32} />
              </div>
              <span className="text-sm font-semibold text-gray-600">Active</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Users</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
          </div>

          {/* Pending Quote Requests Card */}
          <div className="rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-lg bg-orange-50 p-3">
                <Clock className="text-orange-600" size={32} />
              </div>
              <span className="text-sm font-semibold text-gray-600">Awaiting</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Pending Requests</p>
            <p className="text-3xl font-bold text-gray-900">{stats.pendingQuoteRequests}</p>
          </div>

          {/* Completed Quote Requests Card */}
          <div className="rounded-lg bg-white p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-lg bg-purple-50 p-3">
                <CheckCircle className="text-purple-600" size={32} />
              </div>
              <span className="text-sm font-semibold text-gray-600">Done</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">Completed Requests</p>
            <p className="text-3xl font-bold text-gray-900">{stats.completedQuoteRequests}</p>
          </div>
        </div>
        )}

        {/* Quick Links */}
        {(userRole === 'admin' || userRole === 'manager') && (
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Link
              href="/dashboard/quote-requests"
              className="block rounded-lg bg-blue-50 px-4 py-3 text-blue-700 hover:bg-blue-100 transition font-medium text-center"
            >
              → Manage quote Requests
            </Link>
            <Link
              href="/dashboard/all-users"
              className="block rounded-lg bg-orange-50 px-4 py-3 text-orange-700 hover:bg-orange-100 transition font-medium text-center"
            >
              → Manage Users
            </Link>
          </div>
        </div>
        )}

        {/* Quote Requests Chart */}
        {(userRole === 'admin' || userRole === 'manager') && (
        <div className="mt-8">
          <QuoteChart />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
