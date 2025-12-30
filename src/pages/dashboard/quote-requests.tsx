'use client';

import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import DashboardLayout from '@/components/dasboard-components/DashboardLayout';
import {
  Trash2,
  Eye,
  Mail,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  Zap,
} from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Quote {
  _id: string;
  from_name: string;
  user_email: string;
  from_contact: string;
  company_name: string;
  service_type: string;
  project_description: string;
  budget_range: string;
  timeline: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface ReplyData {
  quoteId: string;
  message: string;
  subject: string;
}

const statusOptions = ['new', 'reviewed', 'in-progress', 'quoted', 'completed'];

const statusColors: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
  new: { bg: 'bg-blue-100', text: 'text-blue-800', icon: <AlertCircle size={16} /> },
  reviewed: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: <Eye size={16} /> },
  'in-progress': { bg: 'bg-purple-100', text: 'text-purple-800', icon: <Clock size={16} /> },
  quoted: { bg: 'bg-orange-100', text: 'text-orange-800', icon: <Mail size={16} /> },
  completed: { bg: 'bg-green-100', text: 'text-green-800', icon: <CheckCircle size={16} /> },
};

export default function QuoteRequests() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyData, setReplyData] = useState<ReplyData>({
    quoteId: '',
    message: '',
    subject: '',
  });
  const [replyLoading, setReplyLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [statusUpdate, setStatusUpdate] = useState<{ id: string; status: string } | null>(null);

  // Fetch quotes
  const fetchQuotes = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/quote-request', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      if (data.success) {
        setQuotes(data.data || []);
      } else {
        toast.error('Failed to fetch quote requests');
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
      toast.error('Error fetching quote requests');
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter and search
  useEffect(() => {
    let filtered = quotes;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (quote) =>
          quote.from_name.toLowerCase().includes(term) ||
          quote.user_email.toLowerCase().includes(term) ||
          quote.company_name.toLowerCase().includes(term) ||
          quote.from_contact.includes(term)
      );
    }

    // Status filter
    if (statusFilter) {
      filtered = filtered.filter((quote) => quote.status === statusFilter);
    }

    setFilteredQuotes(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, quotes]);

  useEffect(() => {
    fetchQuotes();
  }, [fetchQuotes]);

  // Pagination
  const totalPages = Math.ceil(filteredQuotes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuotes = filteredQuotes.slice(startIndex, startIndex + itemsPerPage);

  // Handle status update
  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      setStatusUpdate({ id, status: newStatus });
      const token = localStorage.getItem('token');
      
      const response = await fetch(`/api/quote-request/${id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        setQuotes(quotes.map((q) => (q._id === id ? { ...q, status: newStatus } : q)));
        toast.success('Status updated successfully');
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Error updating status');
    } finally {
      setStatusUpdate(null);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`/api/quote-request/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();

      if (data.success) {
        setQuotes(quotes.filter((q) => q._id !== id));
        toast.success('Quote request deleted successfully');
        setDeleteConfirm(null);
      } else {
        toast.error('Failed to delete quote request');
      }
    } catch (error) {
      console.error('Error deleting quote:', error);
      toast.error('Error deleting quote request');
    }
  };

  // Handle reply
  const handleReply = async () => {
    if (!replyData.subject.trim() || !replyData.message.trim()) {
      toast.error('Please fill in subject and message');
      return;
    }

    try {
      setReplyLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/quote-reply', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          quoteId: replyData.quoteId,
          to: selectedQuote?.user_email,
          subject: replyData.subject,
          message: replyData.message,
          clientName: selectedQuote?.from_name,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Reply sent successfully');
        setShowReplyModal(false);
        setReplyData({ quoteId: '', message: '', subject: '' });
        setShowDetailsModal(false);
      } else {
        toast.error(data.message || 'Failed to send reply');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      toast.error('Error sending reply');
    } finally {
      setReplyLoading(false);
    }
  };

  const openDetailsModal = (quote: Quote) => {
    setSelectedQuote(quote);
    setShowDetailsModal(true);
  };

  const openReplyModal = (quote: Quote) => {
    setSelectedQuote(quote);
    setReplyData({
      quoteId: quote._id,
      message: '',
      subject: `Re: Quote Request - ${quote.company_name}`,
    });
    setShowReplyModal(true);
  };

  return (
    <DashboardLayout>
      <ProtectedRoute requiredRoles={['admin', 'manager']}>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-2xl">Quote Requests</h1>
          <p className="mt-2 text-gray-600">Manage and respond to client quote requests</p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="Total" value={quotes.length} />
        <StatCard label="New" value={quotes.filter((q) => q.status === 'new').length} />
        <StatCard label="In Progress" value={quotes.filter((q) => q.status === 'in-progress').length} />
        <StatCard label="Quoted" value={quotes.filter((q) => q.status === 'quoted').length} />
        <StatCard label="Completed" value={quotes.filter((q) => q.status === 'completed').length} />
      </div>

      {/* Filters and Search */}
      <div className="mb-6 space-y-4 rounded-lg bg-white p-4 shadow-sm sm:flex sm:gap-4 sm:space-y-0">
        <div className="flex flex-1 items-center rounded-lg border border-gray-300 bg-white px-4 py-2">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-2 flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 sm:min-w-[150px]"
        >
          <option value="">All Status</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>

        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 sm:min-w-[120px]"
        >
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg bg-white shadow">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Zap className="mx-auto mb-4 animate-spin text-blue-600" size={32} />
              <p className="text-gray-600">Loading quote requests...</p>
            </div>
          </div>
        ) : paginatedQuotes.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Mail size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">No quote requests found</p>
            </div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Client</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Company</th>
                    <th className="hidden px-4 py-3 text-left font-semibold text-gray-900 md:table-cell">Service</th>
                    <th className="hidden px-4 py-3 text-left font-semibold text-gray-900 lg:table-cell">Budget</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedQuotes.map((quote) => (
                    <tr key={quote._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900">{quote.from_name}</p>
                          <p className="text-xs text-gray-500">{quote.user_email}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{quote.company_name}</td>
                      <td className="hidden px-4 py-3 text-gray-700 md:table-cell">
                        <span className="inline-block rounded bg-blue-50 px-2 py-1 text-xs">
                          {quote.service_type}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 text-gray-700 lg:table-cell">{quote.budget_range}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {statusColors[quote.status]?.icon && (
                            <span className="text-gray-600">{statusColors[quote.status].icon}</span>
                          )}
                          <select
                            value={quote.status}
                            onChange={(e) => handleStatusUpdate(quote._id, e.target.value)}
                            disabled={statusUpdate?.id === quote._id}
                            className={`rounded px-2 py-1 text-xs font-medium outline-none transition ${
                              statusColors[quote.status]?.bg
                            } ${statusColors[quote.status]?.text} disabled:opacity-50`}
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700 text-xs">
                        {new Date(quote.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => openDetailsModal(quote)}
                            className="rounded p-1.5 text-blue-600 hover:bg-blue-50 transition"
                            title="View details"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => openReplyModal(quote)}
                            className="rounded p-1.5 text-green-600 hover:bg-green-50 transition"
                            title="Reply"
                          >
                            <Mail size={18} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(quote._id)}
                            className="rounded p-1.5 text-red-600 hover:bg-red-50 transition"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                <p className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredQuotes.length)} of{' '}
                  {filteredQuotes.length} results
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={18} />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`rounded px-3 py-2 text-sm font-medium transition ${
                        currentPage === page
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedQuote && (
        <Modal onClose={() => setShowDetailsModal(false)}>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Quote Request Details</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Client Name</label>
                <p className="mt-1 text-gray-900">{selectedQuote.from_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-gray-900 break-all">{selectedQuote.user_email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company</label>
                <p className="mt-1 text-gray-900">{selectedQuote.company_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="mt-1 text-gray-900">{selectedQuote.from_contact}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Service Type</label>
                <p className="mt-1 text-gray-900">{selectedQuote.service_type}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Budget Range</label>
                <p className="mt-1 text-gray-900">{selectedQuote.budget_range}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Timeline</label>
                <p className="mt-1 text-gray-900">{selectedQuote.timeline}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="mt-1">
                  <span
                    className={`inline-block rounded px-3 py-1 text-sm font-medium ${
                      statusColors[selectedQuote.status]?.bg
                    } ${statusColors[selectedQuote.status]?.text}`}
                  >
                    {selectedQuote.status.charAt(0).toUpperCase() + selectedQuote.status.slice(1).replace('-', ' ')}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Project Description</label>
              <p className="mt-2 whitespace-pre-wrap rounded bg-gray-50 p-3 text-gray-900">
                {selectedQuote.project_description}
              </p>
            </div>

            {selectedQuote.notes && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <p className="mt-2 whitespace-pre-wrap rounded bg-gray-50 p-3 text-gray-900">
                  {selectedQuote.notes}
                </p>
              </div>
            )}

            <div className="flex gap-2 pt-4">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  openReplyModal(selectedQuote);
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 transition"
              >
                <Mail size={18} />
                Send Reply
              </button>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedQuote && (
        <Modal onClose={() => setShowReplyModal(false)}>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Reply to {selectedQuote.from_name}</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700">To</label>
              <p className="mt-1 rounded bg-gray-100 px-3 py-2 text-gray-900">{selectedQuote.user_email}</p>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                value={replyData.subject}
                onChange={(e) => setReplyData({ ...replyData, subject: e.target.value })}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                placeholder="Reply subject"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                value={replyData.message}
                onChange={(e) => setReplyData({ ...replyData, message: e.target.value })}
                className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                placeholder="Your reply message..."
                rows={8}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <button
                onClick={handleReply}
                disabled={replyLoading}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 disabled:opacity-50 transition"
              >
                <Mail size={18} />
                {replyLoading ? 'Sending...' : 'Send Reply'}
              </button>
              <button
                onClick={() => setShowReplyModal(false)}
                disabled={replyLoading}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <Modal onClose={() => setDeleteConfirm(null)}>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Delete Quote Request?</h2>
            <p className="text-gray-600">
              Are you sure you want to delete this quote request? This action cannot be undone.
            </p>
            <div className="flex gap-2 pt-4">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
      </div>
      </ProtectedRoute>
    </DashboardLayout>
  );
}

// Stat Card Component
function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="mt-2 text-3xl font-bold text-gray-900 sm:text-2xl">{value}</p>
    </div>
  );
}

// Modal Component
function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
