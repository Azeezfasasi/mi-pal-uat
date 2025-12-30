'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Upload, X, Plus, Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/dasboard-components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

interface ProjectFormData {
  title: string;
  description: string;
  shortDescription: string;
  projectLink: string;
  category: string;
  status: 'active' | 'inactive' | 'draft';
  logoImage: File | null;
  thumbnailImage: File | null;
  slides: File[];
}

interface ImagePreview {
  file: File;
  preview: string;
}

export default function AddProject() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    shortDescription: '',
    projectLink: '',
    category: 'Other',
    status: 'draft',
    logoImage: null,
    thumbnailImage: null,
    slides: [],
  });

  const [logoPreview, setLogoPreview] = useState<ImagePreview | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<ImagePreview | null>(null);
  const [slidePreviews, setSlidePreviews] = useState<ImagePreview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const logoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const slidesInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleImageChange = (file: File | null, type: 'logo' | 'thumbnail') => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const preview: ImagePreview = {
        file,
        preview: reader.result as string,
      };

      if (type === 'logo') {
        setLogoPreview(preview);
        setFormData(prev => ({
          ...prev,
          logoImage: file,
        }));
      } else {
        setThumbnailPreview(preview);
        setFormData(prev => ({
          ...prev,
          thumbnailImage: file,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSlidesChange = (files: FileList | null) => {
    if (!files) return;

    const newSlides = Array.from(files);
    const newPreviews: ImagePreview[] = [];

    newSlides.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push({
          file,
          preview: reader.result as string,
        });

        if (newPreviews.length === newSlides.length) {
          setSlidePreviews(prev => [...prev, ...newPreviews]);
          setFormData(prev => ({
            ...prev,
            slides: [...prev.slides, ...newSlides],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeSlide = (index: number) => {
    setSlidePreviews(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      slides: prev.slides.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.title.trim()) {
      setError('Project title is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Project description is required');
      return;
    }
    if (formData.slides.length === 0) {
      setError('At least one slide image is required');
      return;
    }

    setLoading(true);

    try {
      // In a real application, you would upload images to Cloudinary or another service
      // For now, we'll send the form data with image URLs from previews
      const projectData = {
        title: formData.title,
        description: formData.description,
        shortDescription: formData.shortDescription,
        projectLink: formData.projectLink,
        category: formData.category,
        status: formData.status,
        logoImage: logoPreview ? { url: logoPreview.preview, publicId: '' } : null,
        thumbnailImage: thumbnailPreview ? { url: thumbnailPreview.preview, publicId: '' } : null,
        slides: slidePreviews.map(slide => ({
          url: slide.preview,
          publicId: '',
        })),
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create project');
      }

      setSuccess('Project created successfully!');
      setTimeout(() => {
        router.push('/dashboard/all-projects');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
    <ProtectedRoute requiredRoles={['admin', 'manager']}>
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Project</h1>
          <p className="mt-2 text-gray-600">Create a new portfolio project</p>
        </div>

        {/* Alert Messages */}
        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800 border border-red-200">
            <p className="font-medium">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800 border border-green-200">
            <p className="font-medium">{success}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-sm p-6 sm:p-8">
          {/* Project Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-900">
              Project Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., MyPal, OG Weddings"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Short Description */}
          <div>
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-900">
              Short Description
            </label>
            <input
              type="text"
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              placeholder="Brief one-line description for preview"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Full Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-900">
              Project Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              placeholder="Detailed description of the project..."
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-900">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Other">Other</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile App">Mobile App</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="SaaS">SaaS</option>
                <option value="Corporate">Corporate</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-900">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Project Link */}
          <div>
            <label htmlFor="projectLink" className="block text-sm font-medium text-gray-900">
              Project Link (Optional)
            </label>
            <input
              type="url"
              id="projectLink"
              name="projectLink"
              value={formData.projectLink}
              onChange={handleInputChange}
              placeholder="https://example.com"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Logo Image */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Project Logo (Optional)
            </label>
            <div
              onClick={() => logoInputRef.current?.click()}
              className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 cursor-pointer transition"
            >
              {logoPreview ? (
                <div className="relative h-32 w-full">
                  <Image
                    src={logoPreview.preview}
                    alt="Logo preview"
                    fill
                    className="object-contain"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLogoPreview(null);
                      setFormData(prev => ({ ...prev, logoImage: null }));
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Click to upload logo</p>
                </div>
              )}
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files?.[0] || null, 'logo')}
                className="hidden"
              />
            </div>
          </div>

          {/* Thumbnail Image */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Thumbnail Image (Optional)
            </label>
            <div
              onClick={() => thumbnailInputRef.current?.click()}
              className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 cursor-pointer transition"
            >
              {thumbnailPreview ? (
                <div className="relative h-40 w-full">
                  <Image
                    src={thumbnailPreview.preview}
                    alt="Thumbnail preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setThumbnailPreview(null);
                      setFormData(prev => ({ ...prev, thumbnailImage: null }));
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Click to upload thumbnail</p>
                </div>
              )}
              <input
                ref={thumbnailInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e.target.files?.[0] || null, 'thumbnail')}
                className="hidden"
              />
            </div>
          </div>

          {/* Slides */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Project Slides *
            </label>
            <div
              onClick={() => slidesInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 cursor-pointer transition"
            >
              <div className="text-center">
                <Plus className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to add slide images</p>
                <p className="text-xs text-gray-500 mt-1">You can add multiple images</p>
              </div>
              <input
                ref={slidesInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleSlidesChange(e.target.files)}
                className="hidden"
              />
            </div>

            {/* Slide Previews */}
            {slidePreviews.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Slide Previews ({slidePreviews.length})
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {slidePreviews.map((slide, index) => (
                    <div key={index} className="relative group">
                      <div className="relative h-24 w-full bg-gray-200 rounded-lg overflow-hidden">
                        <Image
                          src={slide.preview}
                          alt={`Slide ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSlide(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={14} />
                      </button>
                      <p className="text-xs text-gray-600 mt-1 text-center">Slide {index + 1}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-blue-600 px-6 py-2.5 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? 'Creating...' : 'Create Project'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/dashboard/all-projects')}
              className="flex-1 rounded-lg border border-gray-300 px-6 py-2.5 text-gray-900 font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    </ProtectedRoute>
    </DashboardLayout>
  );
}
