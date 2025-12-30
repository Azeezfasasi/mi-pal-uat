'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import DashboardLayout from '@/components/dasboard-components/DashboardLayout';
import { User, Mail, Phone, Lock, Camera, Loader, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  accountStatus: 'active' | 'inactive' | 'suspended';
  isEmailVerified: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        // Get email from token or stored user data
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          setAlert({ type: 'error', message: 'Please log in again' });
          return;
        }

        // Fetch current user profile
        const response = await fetch(`/api/users?search=${userEmail}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        const users = data.users || [];
        const currentUser = users.find((u: UserProfile) => u.email === userEmail);

        if (currentUser) {
          setProfile(currentUser);
          setFormData({
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            phone: currentUser.phone || '',
          });
        } else {
          setAlert({ type: 'error', message: 'User profile not found' });
        }
      } catch (error) {
        console.error('Fetch profile error:', error);
        setAlert({
          type: 'error',
          message: error instanceof Error ? error.message : 'Failed to load profile',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle password input change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update profile
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile) return;

    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setAlert({ type: 'error', message: 'First name and last name are required' });
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch(`/api/users/${profile._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          phone: formData.phone.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setProfile({
        ...profile,
        ...updatedUser.user,
      });
      setIsEditing(false);
      setAlert({ type: 'success', message: 'Profile updated successfully!' });

      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error('Update profile error:', error);
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to update profile',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Change password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!passwordData.currentPassword) {
      setAlert({ type: 'error', message: 'Current password is required' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setAlert({ type: 'error', message: 'New password must be at least 6 characters' });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlert({ type: 'error', message: 'New passwords do not match' });
      return;
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      setAlert({ type: 'error', message: 'New password must be different from current password' });
      return;
    }

    try {
      setIsSaving(true);
      const userEmail = localStorage.getItem('userEmail');
      
      if (!userEmail) {
        setAlert({ type: 'error', message: 'Please log in again' });
        return;
      }

      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-email': userEmail,
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to change password');
      }

      setAlert({ type: 'success', message: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsChangingPassword(false);

      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error('Change password error:', error);
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to change password',
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle avatar upload
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setAlert({ type: 'error', message: 'Please upload an image file' });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setAlert({ type: 'error', message: 'Image size must be less than 5MB' });
      return;
    }

    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch(`/api/users/${profile._id}/avatar`, {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to upload avatar');
      }

      const data = await response.json();
      setProfile({
        ...profile,
        avatar: data.avatar,
      });
      setAlert({ type: 'success', message: 'Avatar updated successfully!' });

      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error('Avatar upload error:', error);
      setAlert({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to upload avatar',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '✅';
      case 'inactive':
        return '⏸️';
      case 'suspended':
        return '🚫';
      default:
        return '❓';
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
            <p className="text-gray-600">Loading your profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <ProtectedRoute requiredRoles={['admin', 'user', 'manager']}>
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        {/* Alert Messages */}
        {alert && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            alert.type === 'success'
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}>
            {alert.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            )}
            <p className={alert.type === 'success' ? 'text-green-800' : 'text-red-800'}>
              {alert.message}
            </p>
          </div>
        )}

        {profile && (
          <div className="space-y-6">
            {/* Profile Header Section */}
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                {/* Avatar Section */}
                <div className="relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white shadow-lg">
                    {profile.avatar ? (
                      <Image
                        src={profile.avatar}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 sm:w-16 sm:h-16" />
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-full shadow-lg transition-colors"
                    title="Upload avatar"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {profile.firstName} {profile.lastName}
                  </h1>
                  <p className="text-gray-600 mb-4">{profile.email}</p>

                  {/* Status Badges */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 justify-center sm:justify-start">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(profile.accountStatus)}`}>
                      {getStatusIcon(profile.accountStatus)} {profile.accountStatus.charAt(0).toUpperCase() + profile.accountStatus.slice(1)}
                    </span>
                    {profile.isEmailVerified && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        ✅ Email Verified
                      </span>
                    )}
                  </div>

                  {/* Last Login */}
                  {profile.lastLogin && (
                    <p className="text-sm text-gray-500">
                      Last login: {new Date(profile.lastLogin).toLocaleDateString()} at{' '}
                      {new Date(profile.lastLogin).toLocaleTimeString()}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <User className="w-6 h-6 text-orange-500" />
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Personal Information</h2>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm sm:text-base"
                  >
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        placeholder="First name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                      placeholder="Phone number (optional)"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSaving && <Loader className="w-4 h-4 animate-spin" />}
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          firstName: profile.firstName,
                          lastName: profile.lastName,
                          phone: profile.phone || '',
                        });
                      }}
                      className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">First Name</p>
                      <p className="text-lg text-gray-900 font-medium">{profile.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Last Name</p>
                      <p className="text-lg text-gray-900 font-medium">{profile.lastName}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-1">Email Address</p>
                    <p className="text-lg text-gray-900 font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4 text-orange-500" />
                      {profile.email}
                    </p>
                  </div>

                  {profile.phone && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                      <p className="text-lg text-gray-900 font-medium flex items-center gap-2">
                        <Phone className="w-4 h-4 text-orange-500" />
                        {profile.phone}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Account Security Section */}
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-orange-500" />
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">Account Security</h2>
                </div>
                {!isChangingPassword && (
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors text-sm sm:text-base"
                  >
                    Change Password
                  </button>
                )}
              </div>

              {isChangingPassword ? (
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-800">
                      💡 For your security, you&apos;ll need to enter your current password before setting a new one.
                    </p>
                  </div>

                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        placeholder="Enter current password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                        className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-900"
                      >
                        {isPasswordVisible ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={isNewPasswordVisible ? 'text' : 'password'}
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        placeholder="Enter new password (min 6 characters)"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                        className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-900"
                      >
                        {isNewPasswordVisible ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters</p>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={isConfirmPasswordVisible ? 'text' : 'password'}
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                        placeholder="Confirm new password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                        className="absolute right-3 top-2.5 text-gray-600 hover:text-gray-900"
                      >
                        {isConfirmPasswordVisible ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Password Requirements:</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✓ At least 6 characters long</li>
                      <li>✓ Must be different from current password</li>
                      <li>✓ New and confirm password must match</li>
                    </ul>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSaving && <Loader className="w-4 h-4 animate-spin" />}
                      {isSaving ? 'Updating...' : 'Update Password'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordData({
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: '',
                        });
                      }}
                      className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Password Status</p>
                    <p className="text-base text-gray-900 font-medium">🔒 Password is set and secure</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Account Created</p>
                    <p className="text-base text-gray-900 font-medium">
                      {new Date(profile.createdAt).toLocaleDateString()} at{' '}
                      {new Date(profile.createdAt).toLocaleTimeString()}
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      🔐 Keep your password secure and change it regularly for better account protection.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Account Information Summary */}
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200 p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Account Status</p>
                  <p className="text-base font-medium text-gray-900 capitalize">{profile.accountStatus}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email Verification</p>
                  <p className="text-base font-medium text-gray-900">
                    {profile.isEmailVerified ? '✅ Verified' : '❌ Not Verified'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </ProtectedRoute>
    </DashboardLayout>
  );
}
