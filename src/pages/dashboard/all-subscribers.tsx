'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  ChevronDown,
  Mail,
  Trash2,
  Loader,
  AlertCircle,
  Download,
  Filter,
} from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardLayout from '@/components/dasboard-components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Subscriber {
  _id: string;
  email: string;
  name?: string;
  phone?: string;
  isSubscribed: boolean;
  subscriptionDate: string;
  tags?: string[];
}

export default function AllSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit] = useState(10);
  const [isUnsubscribing, setIsUnsubscribing] = useState<string | null>(null);

  const pages = Math.ceil(totalCount / limit);

  // Fetch subscribers
  useEffect(() => {
    const fetchSubscribers = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        params.append('limit', limit.toString());
        params.append('page', currentPage.toString());

        if (filterStatus !== 'all') {
          params.append('isSubscribed', (filterStatus === 'active').toString());
        }

        if (searchTerm) {
          params.append('search', searchTerm);
        }

        const response = await fetch(`/api/newsletter/subscribers?${params.toString()}`);
        const data = await response.json();

        if (data.success) {
          setSubscribers(data.data);
          setTotalCount(data.totalCount);
        } else {
          toast.error(data.message || 'Failed to fetch subscribers');
        }
      } catch (error) {
        console.error('Error fetching subscribers:', error);
        toast.error('Error loading subscribers');
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(() => {
      fetchSubscribers();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, filterStatus, currentPage, limit]);

  // Handle unsubscribe
  const handleUnsubscribe = async (email: string) => {
    if (!window.confirm(`Unsubscribe ${email}?`)) return;

    setIsUnsubscribing(email);
    try {
      const response = await fetch('/api/newsletter/subscribers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Subscriber unsubscribed');
        // Refresh the list
        setCurrentPage(1);
      } else {
        toast.error(data.message || 'Failed to unsubscribe');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error unsubscribing');
    } finally {
      setIsUnsubscribing(null);
    }
  };

  // Export subscribers
  const handleExport = () => {
    const csv = [
      ['Email', 'Name', 'Phone', 'Status', 'Subscription Date'],
      ...subscribers.map(s => [
        s.email,
        s.name || '-',
        s.phone || '-',
        s.isSubscribed ? 'Active' : 'Inactive',
        new Date(s.subscriptionDate).toLocaleDateString(),
      ]),
    ]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <DashboardLayout>
    <ProtectedRoute requiredRoles={['admin']}>
    <div className="w-full min-h-screen bg-gray-50 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Newsletter Subscribers</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Manage and view all your newsletter subscribers
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 border-l-4 border-blue-500">
            <div className="text-gray-600 text-sm font-medium mb-1">Total Subscribers</div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">{totalCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 border-l-4 border-green-500">
            <div className="text-gray-600 text-sm font-medium mb-1">Active</div>
            <div className="text-2xl sm:text-3xl font-bold text-green-600">
              {subscribers.filter(s => s.isSubscribed).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 border-l-4 border-red-500">
            <div className="text-gray-600 text-sm font-medium mb-1">Inactive</div>
            <div className="text-2xl sm:text-3xl font-bold text-red-600">
              {subscribers.filter(s => !s.isSubscribed).length}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {/* Search */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by email or name..."
                  value={searchTerm}
                  onChange={e => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={e => {
                    setFilterStatus(e.target.value as any);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Export Button */}
            <div className="flex items-end">
              <button
                onClick={handleExport}
                className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export CSV</span>
                <span className="sm:hidden">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : subscribers.length === 0 ? (
            <div className="py-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No subscribers found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search criteria' : 'Get started by promoting your newsletter'}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {subscribers.map(subscriber => (
                      <tr key={subscriber._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            {subscriber.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {subscriber.name || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              subscriber.isSubscribed
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {subscriber.isSubscribed ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(subscriber.subscriptionDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {subscriber.isSubscribed && (
                            <button
                              onClick={() => handleUnsubscribe(subscriber.email)}
                              disabled={isUnsubscribing === subscriber.email}
                              className="text-red-600 hover:text-red-900 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                            >
                              {isUnsubscribing === subscriber.email ? (
                                <Loader className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                              Unsubscribe
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="sm:hidden divide-y divide-gray-200">
                {subscribers.map(subscriber => (
                  <div key={subscriber._id} className="p-4 border-b border-gray-200 last:border-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 break-all">{subscriber.email}</p>
                        {subscriber.name && (
                          <p className="text-sm text-gray-600 mt-1">{subscriber.name}</p>
                        )}
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ml-2 ${
                          subscriber.isSubscribed
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {subscriber.isSubscribed ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      Joined: {new Date(subscriber.subscriptionDate).toLocaleDateString()}
                    </p>
                    {subscriber.isSubscribed && (
                      <button
                        onClick={() => handleUnsubscribe(subscriber.email)}
                        disabled={isUnsubscribing === subscriber.email}
                        className="w-full text-red-600 hover:bg-red-50 py-2 rounded text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isUnsubscribing === subscriber.email ? (
                          <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                        Unsubscribe
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {pages} ({totalCount} total)
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(Math.min(pages, currentPage + 1))}
                disabled={currentPage === pages}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
    </DashboardLayout>
  );
}
