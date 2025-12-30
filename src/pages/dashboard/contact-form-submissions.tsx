'use client';

import React, { useCallback, useEffect, useState } from 'react';
import DashboardLayout from '@/components/dasboard-components/DashboardLayout';
import toast from 'react-hot-toast';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  Clock,
  Loader,
  Edit2,
  Trash2,
  X,
  AlertCircle,
  CheckCircle,
  MessageCircle,
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface ContactSubmission {
  _id: string;
  from_name: string;
  user_email: string;
  from_contact: string;
  message: string;
  status: 'new' | 'pending' | 'in-progress' | 'replied' | 'resolved' | 'closed';
  adminResponse?: string;
  adminName?: string;
  respondedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface StatusCounts {
  new: number;
  pending: number;
  'in-progress': number;
  replied: number;
  resolved: number;
  closed: number;
}

const STATUSES = ['new', 'pending', 'in-progress', 'replied', 'resolved', 'closed'];
const ITEMS_PER_PAGE = 10;

export default function ContactFormSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    new: 0,
    pending: 0,
    'in-progress': 0,
    replied: 0,
    resolved: 0,
    closed: 0,
  });

  // Modals
  const [viewingSubmission, setViewingSubmission] = useState<ContactSubmission | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);

  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch submissions
  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: ITEMS_PER_PAGE.toString(),
      });

      if (searchQuery) params.append('search', searchQuery);
      if (statusFilter) params.append('status', statusFilter);

      const response = await fetch(`/api/contact-submissions?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch submissions');
      }

      setSubmissions(data.submissions || []);
      setTotalPages(data.pagination.pages);
      setStatusCounts(data.statusCounts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, statusFilter]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  // Handle reply
  const handleReply = async () => {
    if (!viewingSubmission || !replyText.trim()) {
      toast.error('Please enter a response');
      return;
    }

    setReplyLoading(true);
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`/api/contact/${viewingSubmission._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'replied',
          adminResponse: replyText,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send reply');
      }

      setSuccess('Reply sent successfully!');
      setShowReplyModal(false);
      setReplyText('');
      setViewingSubmission(null);
      setShowViewModal(false);
      fetchSubmissions();

      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reply');
    } finally {
      setReplyLoading(false);
    }
  };

  // Handle status change
  const handleStatusChange = async (submissionId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`/api/contact/${submissionId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update status');
      }

      setSuccess('Status updated successfully!');
      fetchSubmissions();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  // Handle delete
  const handleDelete = async (submissionId: string) => {
    setDeleteLoading(true);
    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`/api/contact/${submissionId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete submission');
      }

      setSuccess('Submission deleted successfully!');
      setDeleteConfirm(null);
      fetchSubmissions();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete submission');
    } finally {
      setDeleteLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-purple-100 text-purple-800';
      case 'in-progress':
        return 'bg-orange-100 text-orange-800';
      case 'replied':
        return 'bg-yellow-100 text-yellow-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
            <p className="text-gray-600">Loading submissions...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ProtectedRoute requiredRoles={['admin', 'manager']}>
      <div className="space-y-6 px-6 md:px-10 pt-10 pb-10">
        {/* Header */}
        <div className="md:flex md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="text-gray-600 text-sm md:text-base mt-2 md:mt-0">
            Total: <span className="font-semibold text-orange-600">{statusCounts.new + statusCounts.replied + statusCounts.resolved + statusCounts.closed}</span>
          </p>
        </div>

        {/* Status Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">New</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.new}</p>
              </div>
              <Mail className="w-8 h-8 text-blue-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Replied</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.replied}</p>
              </div>
              <MessageCircle className="w-8 h-8 text-yellow-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.resolved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-gray-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Closed</p>
                <p className="text-2xl font-bold text-gray-900">{statusCounts.closed}</p>
              </div>
              <Clock className="w-8 h-8 text-gray-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p>{success}</p>
          </div>
        )}

        {/* Filters Section */}
        <div className="bg-white rounded-lg shadow p-4 md:p-6 space-y-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or message..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="">All Status</option>
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {(searchQuery || statusFilter) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('');
                setCurrentPage(1);
              }}
              className="text-orange-600 hover:text-orange-700 text-sm font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Submissions Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {submissions.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 text-lg">No submissions found</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {submissions.map((submission) => (
                      <tr key={submission._id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{submission.from_name}</p>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{submission.user_email}</td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{submission.from_contact}</td>
                        <td className="px-6 py-4">
                          <select
                            value={submission.status}
                            onChange={(e) => handleStatusChange(submission._id, e.target.value)}
                            className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${getStatusColor(submission.status)}`}
                          >
                            {STATUSES.map((status) => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{formatDate(submission.createdAt)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setViewingSubmission(submission);
                                setShowViewModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition"
                              title="View details"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(submission._id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-4 p-4">
                {submissions.map((submission) => (
                  <div key={submission._id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{submission.from_name}</p>
                        <p className="text-sm text-gray-600">{submission.user_email}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(submission.createdAt)}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setViewingSubmission(submission);
                            setShowViewModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-700 p-2"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(submission._id)}
                          className="text-red-600 hover:text-red-700 p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-600">Phone</p>
                        <p className="font-medium text-gray-900">{submission.from_contact}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Status</p>
                        <select
                          value={submission.status}
                          onChange={(e) => handleStatusChange(submission._id, e.target.value)}
                          className={`w-full px-2 py-1 rounded text-xs font-semibold border-0 cursor-pointer ${getStatusColor(submission.status)}`}
                        >
                          {STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-gray-50 px-4 md:px-6 py-4 flex items-center justify-between border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    Page <span className="font-semibold">{currentPage}</span> of{' '}
                    <span className="font-semibold">{totalPages}</span>
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="p-2 hover:bg-gray-200 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 hover:bg-gray-200 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* View Details Modal */}
      {showViewModal && viewingSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Submission Details</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Name</p>
                  <p className="font-semibold text-gray-900">{viewingSubmission.from_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="font-semibold text-gray-900">{viewingSubmission.user_email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Phone</p>
                  <p className="font-semibold text-gray-900">{viewingSubmission.from_contact}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <select
                    value={viewingSubmission.status}
                    onChange={(e) => {
                      setViewingSubmission({
                        ...viewingSubmission,
                        status: e.target.value as any,
                      });
                      handleStatusChange(viewingSubmission._id, e.target.value);
                    }}
                    className={`w-full px-3 py-2 rounded-lg text-sm font-semibold border-0 cursor-pointer ${getStatusColor(viewingSubmission.status)}`}
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <p className="text-sm text-gray-600 mb-2 font-semibold">Message</p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-900 whitespace-pre-wrap">{viewingSubmission.message}</p>
                </div>
              </div>

              {/* Admin Response */}
              {viewingSubmission.adminResponse && (
                <div>
                  <p className="text-sm text-gray-600 mb-2 font-semibold">Our Response</p>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <p className="text-gray-900 whitespace-pre-wrap">{viewingSubmission.adminResponse}</p>
                    {viewingSubmission.adminName && (
                      <p className="text-xs text-gray-600 mt-3">
                        Responded by: {viewingSubmission.adminName} on{' '}
                        {viewingSubmission.respondedAt && formatDate(viewingSubmission.respondedAt)}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div className="text-xs text-gray-600 space-y-1 pt-4 border-t border-gray-200">
                <p>Submitted: {formatDate(viewingSubmission.createdAt)}</p>
                <p>Last Updated: {formatDate(viewingSubmission.updatedAt)}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
              <button
                onClick={() => setShowViewModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition"
              >
                Close
              </button>
              {!viewingSubmission.adminResponse && (
                <button
                  onClick={() => setShowReplyModal(true)}
                  className="flex-1 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Reply
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && viewingSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-xl w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Reply to {viewingSubmission.from_name}</h2>
              <button
                onClick={() => setShowReplyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Response</label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your response here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows={6}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowReplyModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleReply}
                disabled={replyLoading || !replyText.trim()}
                className="flex-1 px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {replyLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    Send Reply
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Delete Submission</h2>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">
                    Are you sure you want to delete this submission?
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleteLoading}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {deleteLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      </ProtectedRoute>
    </DashboardLayout>
  );
}
