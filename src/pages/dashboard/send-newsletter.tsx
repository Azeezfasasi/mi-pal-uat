'use client';

import React, { useState } from 'react';
import { Mail, Send, Save, Loader, AlertCircle, CheckCircle, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardLayout from '@/components/dasboard-components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

interface FormData {
  title: string;
  subject: string;
  htmlContent: string;
  excerpt?: string;
  author: string;
  tags?: string[];
}

export default function SendNewsletter() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    subject: '',
    htmlContent: '',
    excerpt: '',
    author: '',
    tags: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'draft' | 'send' | 'schedule'>('draft');
  const [scheduledDate, setScheduledDate] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [subscriberCount, setSubscriberCount] = useState(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || [],
    }));
  };

  const fetchSubscriberCount = async () => {
    try {
      const response = await fetch('/api/newsletter/subscribers?limit=1&page=1&isSubscribed=true');
      const data = await response.json();
      if (data.success) {
        setSubscriberCount(data.totalCount);
      }
    } catch (error) {
      console.error('Error fetching subscriber count:', error);
    }
  };

  React.useEffect(() => {
    fetchSubscriberCount();
  }, []);

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return false;
    }
    if (!formData.subject.trim()) {
      toast.error('Subject is required');
      return false;
    }
    if (!formData.htmlContent.trim()) {
      toast.error('Newsletter content is required');
      return false;
    }
    if (!formData.author.trim()) {
      toast.error('Author name is required');
      return false;
    }
    if (selectedAction === 'schedule' && !scheduledDate) {
      toast.error('Please select a date and time for scheduling');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        action: selectedAction,
        scheduledFor: selectedAction === 'schedule' ? scheduledDate : undefined,
      };

      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || 'Newsletter processed successfully!');

        // Reset form
        setFormData({
          title: '',
          subject: '',
          htmlContent: '',
          excerpt: '',
          author: '',
          tags: [],
        });
        setScheduledDate('');
        setSelectedAction('draft');
      } else {
        toast.error(data.message || 'Failed to process newsletter');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while processing newsletter');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
    <ProtectedRoute requiredRoles={['admin', 'manager']}>
    <div className="w-full min-h-screen bg-gray-50 py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Send Newsletter</h1>
          </div>
          <p className="text-gray-600 text-sm sm:text-base">
            Create and send newsletters to your subscribers
          </p>
        </div>

        {/* Subscriber Count Alert */}
        {subscriberCount > 0 && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Ready to Send</h3>
              <p className="text-sm text-blue-800">
                You have <span className="font-bold">{subscriberCount}</span> active subscriber
                {subscriberCount !== 1 ? 's' : ''} who will receive this newsletter.
              </p>
            </div>
          </div>
        )}

        {subscriberCount === 0 && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">No Subscribers</h3>
              <p className="text-sm text-yellow-800">
                You currently have no active subscribers. Consider promoting your newsletter to build
                your subscriber base.
              </p>
            </div>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 sm:p-8 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-900 mb-2">
              Newsletter Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., April 2024 Product Updates"
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Internal reference for your records</p>
          </div>

          {/* Subject Line */}
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
              Email Subject Line <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="What should appear in subscriber inboxes?"
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Make it engaging to improve open rates</p>
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-semibold text-gray-900 mb-2">
              Author Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Your name or team name"
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-900 mb-2">
              Preview Text <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Brief summary of newsletter content (shown in preview)"
              rows={2}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
            />
          </div>

          {/* Newsletter Content */}
          <div>
            <label htmlFor="htmlContent" className="block text-sm font-semibold text-gray-900 mb-2">
              Newsletter Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="htmlContent"
              name="htmlContent"
              value={formData.htmlContent}
              onChange={handleChange}
              placeholder="Enter your newsletter content here. You can use HTML for formatting."
              rows={12}
              disabled={isLoading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-2">
              Tip: You can use HTML tags for formatting. Make sure your content is mobile-responsive.
            </p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Tags <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                placeholder="Add a tag and press Enter"
                disabled={isLoading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="button"
                onClick={handleAddTag}
                disabled={isLoading}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Add
              </button>
            </div>
            {formData.tags && formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-blue-600 hover:text-blue-900 font-bold"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Selection */}
          <div className="border-t pt-6">
            <p className="text-sm font-semibold text-gray-900 mb-4">What would you like to do?</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-blue-500"
                style={{ borderColor: selectedAction === 'draft' ? '#3b82f6' : '#e5e7eb' }}>
                <input
                  type="radio"
                  name="action"
                  value="draft"
                  checked={selectedAction === 'draft'}
                  onChange={e => setSelectedAction(e.target.value as any)}
                  disabled={isLoading}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="ml-3">
                  <span className="font-semibold text-gray-900">Save as Draft</span>
                  <p className="text-xs text-gray-600 mt-1">Edit and send later</p>
                </span>
              </label>

              {subscriberCount > 0 && (
                <>
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-green-500"
                    style={{ borderColor: selectedAction === 'send' ? '#10b981' : '#e5e7eb' }}>
                    <input
                      type="radio"
                      name="action"
                      value="send"
                      checked={selectedAction === 'send'}
                      onChange={e => setSelectedAction(e.target.value as any)}
                      disabled={isLoading}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="ml-3">
                      <span className="font-semibold text-gray-900">Send Now</span>
                      <p className="text-xs text-gray-600 mt-1">To all {subscriberCount} subscribers</p>
                    </span>
                  </label>

                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-purple-500"
                    style={{ borderColor: selectedAction === 'schedule' ? '#a855f7' : '#e5e7eb' }}>
                    <input
                      type="radio"
                      name="action"
                      value="schedule"
                      checked={selectedAction === 'schedule'}
                      onChange={e => setSelectedAction(e.target.value as any)}
                      disabled={isLoading}
                      className="w-4 h-4 cursor-pointer"
                    />
                    <span className="ml-3">
                      <span className="font-semibold text-gray-900">Schedule</span>
                      <p className="text-xs text-gray-600 mt-1">Send at specific time</p>
                    </span>
                  </label>
                </>
              )}
            </div>
          </div>

          {/* Schedule Input */}
          {selectedAction === 'schedule' && (
            <div>
              <label htmlFor="scheduledDate" className="block text-sm font-semibold text-gray-900 mb-2">
                Schedule Date & Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                id="scheduledDate"
                value={scheduledDate}
                onChange={e => setScheduledDate(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="border-t pt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-900 font-semibold transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              disabled={!formData.subject || !formData.htmlContent}
            >
              <Eye className="w-5 h-5" />
              Preview
            </button>
            <button
              type="submit"
              disabled={isLoading || subscriberCount === 0}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : selectedAction === 'send' ? (
                <>
                  <Send className="w-5 h-5" />
                  Send Newsletter
                </>
              ) : selectedAction === 'schedule' ? (
                <>
                  <Mail className="w-5 h-5" />
                  Schedule Newsletter
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Draft
                </>
              )}
            </button>
          </div>
        </form>

        {/* Preview Modal */}
        {showPreview && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Newsletter Preview</h2>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-white hover:text-gray-200 font-bold text-xl"
                >
                  ✕
                </button>
              </div>
              <div className="p-6 space-y-4 text-gray-900">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Subject:</h3>
                  <p className="p-3 bg-gray-100 rounded text-gray-900">{formData.subject}</p>
                </div>
                {formData.excerpt && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Preview Text:</h3>
                    <p className="p-3 bg-gray-100 rounded text-gray-900 text-sm">{formData.excerpt}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Content:</h3>
                  <div
                    className="p-3 bg-gray-100 rounded max-h-48 overflow-y-auto"
                    dangerouslySetInnerHTML={{
                      __html: formData.htmlContent.substring(0, 500),
                    }}
                  />
                  {formData.htmlContent.length > 500 && (
                    <p className="text-xs text-gray-600 mt-2">... (content preview truncated)</p>
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
