'use client';

import React, { useState, useEffect } from 'react';
import {
  Mail,
  Search,
  ChevronDown,
  Eye,
  Trash2,
  Loader,
  AlertCircle,
  Calendar,
  Users,
  FileText,
} from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardLayout from '@/components/dasboard-components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Newsletter {
  _id: string;
  title: string;
  subject: string;
  excerpt?: string;
  status: 'draft' | 'scheduled' | 'sent' | 'paused';
  author: string;
  recipientCount?: number;
  sentAt?: string;
  scheduledFor?: string;
  openRate?: number;
  createdAt: string;
}

export default function AllNewsletter() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'sent' | 'scheduled'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit] = useState(10);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const pages = Math.ceil(totalCount / limit);

  // Fetch newsletters
  useEffect(() => {
    const fetchNewsletters = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        params.append('limit', limit.toString());
        params.append('page', currentPage.toString());

        if (filterStatus !== 'all') {
          params.append('status', filterStatus);
        }

        if (searchTerm) {
          params.append('search', searchTerm);
        }

        const response = await fetch(`/api/newsletter?${params.toString()}`);
        const data = await response.json();

        if (data.success) {
          setNewsletters(data.data);
          setTotalCount(data.totalCount);
        } else {
          toast.error(data.message || 'Failed to fetch newsletters');
        }
      } catch (error) {
        console.error('Error fetching newsletters:', error);
        toast.error('Error loading newsletters');
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchNewsletters();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, filterStatus, currentPage, limit]);

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this newsletter?')) return;

    setIsDeleting(id);
    try {
      const response = await fetch(`/api/newsletter/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Newsletter deleted');
        setCurrentPage(1);
      } else {
        toast.error(data.message || 'Failed to delete');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error deleting newsletter');
    } finally {
      setIsDeleting(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
    <ProtectedRoute requiredRoles={['admin', 'manager']}>
    <div className="w-full min-h-screen bg-gray-50 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Newsletters</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            View and manage all your newsletters
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 border-l-4 border-blue-500">
            <div className="text-gray-600 text-sm font-medium mb-1">Total</div>
            <div className="text-2xl sm:text-3xl font-bold text-gray-900">{totalCount}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 border-l-4 border-green-500">
            <div className="text-gray-600 text-sm font-medium mb-1">Sent</div>
            <div className="text-2xl sm:text-3xl font-bold text-green-600">
              {newsletters.filter(n => n.status === 'sent').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 border-l-4 border-yellow-500">
            <div className="text-gray-600 text-sm font-medium mb-1">Drafts</div>
            <div className="text-2xl sm:text-3xl font-bold text-yellow-600">
              {newsletters.filter(n => n.status === 'draft').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 border-l-4 border-blue-400">
            <div className="text-gray-600 text-sm font-medium mb-1">Scheduled</div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">
              {newsletters.filter(n => n.status === 'scheduled').length}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Search */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by title or subject..."
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
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="scheduled">Scheduled</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Newsletters Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : newsletters.length === 0 ? (
            <div className="py-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No newsletters found</h3>
              <p className="text-gray-600">
                {searchTerm ? 'Try adjusting your search criteria' : 'Create your first newsletter'}
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
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Recipients
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {newsletters.map(newsletter => (
                      <tr key={newsletter._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm">
                          <div>
                            <div className="font-medium text-gray-900">{newsletter.title}</div>
                            <div className="text-xs text-gray-500 mt-1">{newsletter.subject}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                              newsletter.status
                            )}`}
                          >
                            {newsletter.status.charAt(0).toUpperCase() + newsletter.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {newsletter.recipientCount || 0}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {newsletter.status === 'sent' && newsletter.sentAt
                              ? new Date(newsletter.sentAt).toLocaleDateString()
                              : new Date(newsletter.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedNewsletter(newsletter);
                                setShowPreview(true);
                              }}
                              className="text-blue-600 hover:text-blue-900 font-medium transition-colors flex items-center gap-1"
                            >
                              <Eye className="w-4 h-4" />
                              Preview
                            </button>
                            {newsletter.status === 'draft' && (
                              <button
                                onClick={() => handleDelete(newsletter._id)}
                                disabled={isDeleting === newsletter._id}
                                className="text-red-600 hover:text-red-900 font-medium transition-colors disabled:opacity-50 flex items-center gap-1"
                              >
                                {isDeleting === newsletter._id ? (
                                  <Loader className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="sm:hidden divide-y divide-gray-200">
                {newsletters.map(newsletter => (
                  <div key={newsletter._id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{newsletter.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{newsletter.subject}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ml-2 ${getStatusColor(
                          newsletter.status
                        )}`}
                      >
                        {newsletter.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1 mb-3">
                      <p>Recipients: {newsletter.recipientCount || 0}</p>
                      <p>
                        {newsletter.status === 'sent' && newsletter.sentAt
                          ? `Sent: ${new Date(newsletter.sentAt).toLocaleDateString()}`
                          : `Created: ${new Date(newsletter.createdAt).toLocaleDateString()}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedNewsletter(newsletter);
                          setShowPreview(true);
                        }}
                        className="flex-1 text-blue-600 hover:bg-blue-50 py-2 rounded text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      {newsletter.status === 'draft' && (
                        <button
                          onClick={() => handleDelete(newsletter._id)}
                          disabled={isDeleting === newsletter._id}
                          className="flex-1 text-red-600 hover:bg-red-50 py-2 rounded text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {isDeleting === newsletter._id ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        {pages > 1 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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

        {/* Preview Modal */}
        {showPreview && selectedNewsletter && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="sticky top-0 bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{selectedNewsletter.title}</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-500 hover:text-gray-700 font-bold"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Subject:</h3>
                  <p className="text-gray-900">{selectedNewsletter.subject}</p>
                </div>
                {selectedNewsletter.excerpt && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Preview:</h3>
                    <p className="text-gray-600">{selectedNewsletter.excerpt}</p>
                  </div>
                )}
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Author: {selectedNewsletter.author}</p>
                  <p>Recipients: {selectedNewsletter.recipientCount || 0}</p>
                  {selectedNewsletter.openRate && (
                    <p>Open Rate: {selectedNewsletter.openRate}%</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
    </DashboardLayout>
  );
}
