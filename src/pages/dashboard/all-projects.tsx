'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Eye, EyeOff, Loader2, Search } from 'lucide-react';
import DashboardLayout from '@/components/dasboard-components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Project {
  _id: string;
  title: string;
  shortDescription?: string;
  description: string;
  thumbnailImage?: {
    url: string;
    publicId: string;
  };
  slides: Array<{
    url: string;
    publicId: string;
  }>;
  projectLink?: string;
  category?: string;
  status: 'active' | 'inactive' | 'draft';
  createdAt: string;
}

export default function AllProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/projects?limit=100');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch projects');
      }

      setProjects(data.data.projects);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      setDeleting(id);
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete project');
      }

      setProjects(prev => prev.filter(p => p._id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete project');
    } finally {
      setDeleting(null);
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
      const project = projects.find(p => p._id === id);
      if (!project) return;

      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...project,
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update status');
      }

      setProjects(prev =>
        prev.map(p => (p._id === id ? { ...p, status: newStatus as any } : p))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <DashboardLayout>
    <ProtectedRoute requiredRoles={['admin', 'manager']}>
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="mt-2 text-gray-600">Manage your portfolio projects</p>
          </div>
          <Link
            href="/dashboard/add-project"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-white font-medium hover:bg-blue-700 transition"
          >
            <Plus size={20} />
            Add Project
          </Link>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800 border border-red-200">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="rounded-lg bg-white p-12 text-center">
            <p className="text-gray-600 mb-4">No projects found</p>
            <Link
              href="/dashboard/add-project"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <Plus size={18} />
              Create your first project
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProjects.map(project => (
              <div
                key={project._id}
                className="rounded-lg bg-white shadow-sm hover:shadow-md transition overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-6">
                  {/* Thumbnail */}
                  <div className="flex-shrink-0 w-full sm:w-40 h-32">
                    {project.thumbnailImage?.url || project.slides[0]?.url ? (
                      <Image
                        src={project.thumbnailImage?.url || project.slides[0]?.url}
                        alt={project.title}
                        width={160}
                        height={128}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 truncate">
                          {project.title}
                        </h3>
                        {project.shortDescription && (
                          <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                            {project.shortDescription}
                          </p>
                        )}
                      </div>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(project.status)}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.category && (
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {project.category}
                        </span>
                      )}
                      <span className="inline-block px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {project.slides.length} slides
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => handleStatusToggle(project._id, project.status)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                          project.status === 'active'
                            ? 'bg-green-50 text-green-700 hover:bg-green-100'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {project.status === 'active' ? (
                          <>
                            <Eye size={16} />
                            Published
                          </>
                        ) : (
                          <>
                            <EyeOff size={16} />
                            Hidden
                          </>
                        )}
                      </button>

                      <Link
                        href={`/dashboard/edit-project/${project._id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition"
                      >
                        <Edit2 size={16} />
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(project._id)}
                        disabled={deleting === project._id}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-700 font-medium hover:bg-red-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {deleting === project._id ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Deleting...
                          </>
                        ) : (
                          <>
                            <Trash2 size={16} />
                            Delete
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {!loading && filteredProjects.length > 0 && (
          <div className="mt-8 text-center text-sm text-gray-600">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        )}
      </div>
    </div>
    </ProtectedRoute>
    </DashboardLayout>
  );
}
