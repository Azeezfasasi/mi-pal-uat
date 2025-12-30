'use client';

import DashboardLayout from '@/components/dasboard-components/DashboardLayout';
import React, { useState, useEffect } from 'react';
import { Search, Lock, Eye, EyeOff, Loader, AlertCircle, CheckCircle, ArrowLeft, RefreshCw, Copy } from 'lucide-react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default function ChangeUserPassword() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [useGeneratedPassword, setUseGeneratedPassword] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [copied, setCopied] = useState(false);
  
  const [resetLoading, setResetLoading] = useState(false);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Generate random password
  const generatePassword = (length = 12) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setSearching(true);
      const response = await fetch('/api/users?limit=1000');
      const data = await response.json();
      
      if (data.users) {
        setUsers(data.users);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setSearching(false);
    }
  };

  // Filter users based on search
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle user selection
  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setSearchQuery(`${user.firstName} ${user.lastName}`);
    setShowDropdown(false);
    setError('');
    setSuccess('');
  };

  // Generate new password
  const handleGeneratePassword = () => {
    const newPassword = generatePassword();
    setGeneratedPassword(newPassword);
    setPassword(newPassword);
  };

  // Copy password to clipboard
  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset user password
  const handleResetPassword = async () => {
    if (!selectedUser || !password) {
      setError('Please select a user and enter a password');
      return;
    }

    setResetLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/admin/reset-user-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUser._id,
          newPassword: password,
          sendEmail: true,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to reset password');
        return;
      }

      setSuccess(`Password reset successfully for ${selectedUser.firstName} ${selectedUser.lastName}`);
      
      // Reset form
      setSelectedUser(null);
      setSearchQuery('');
      setPassword('');
      setGeneratedPassword('');
      setUseGeneratedPassword(true);

      setTimeout(() => setSuccess(''), 4000);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <ProtectedRoute requiredRoles={['admin']}>
      <div className="min-h-screen bg-gray-50 px-4 md:px-10 pt-10 pb-10">
        {/* Back Button */}
        <Link
          href="/dashboard/all-users"
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium mb-8 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Users
        </Link>

        {/* Main Container */}
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Lock className="w-8 h-8 text-orange-600" />
              Reset User Password
            </h1>
            <p className="text-gray-600">
              Select a user and reset their password. They will receive an email notification.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            {/* Error Alert */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Error</p>
                  <p className="text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Success Alert */}
            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p>{success}</p>
              </div>
            )}

            {/* Step 1: Select User */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Step 1: Select User</h2>
              <p className="text-sm text-gray-600 mb-4">Search and select the user whose password you want to reset</p>

              {/* Search Input */}
              <div className="relative">
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowDropdown(true);
                      setSelectedUser(null);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                  />
                </div>

                {/* Dropdown */}
                {showDropdown && searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
                    {searching ? (
                      <div className="p-4 text-center text-gray-500">
                        <Loader className="w-5 h-5 animate-spin mx-auto" />
                      </div>
                    ) : filteredUsers.length > 0 ? (
                      filteredUsers.map((user) => (
                        <button
                          key={user._id}
                          onClick={() => handleSelectUser(user)}
                          className="w-full text-left px-4 py-3 hover:bg-orange-50 transition border-b border-gray-100 last:border-b-0"
                        >
                          <p className="font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        No users found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Selected User */}
              {selectedUser && (
                <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Selected User:</p>
                  <p className="font-semibold text-gray-900">
                    {selectedUser.firstName} {selectedUser.lastName}
                  </p>
                  <p className="text-sm text-gray-600">{selectedUser.email}</p>
                </div>
              )}
            </div>

            {selectedUser && (
              <>
                {/* Step 2: Password Options */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Step 2: Set New Password</h2>

                  {/* Toggle Options */}
                  <div className="flex gap-4 mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="passwordOption"
                        checked={useGeneratedPassword}
                        onChange={() => {
                          setUseGeneratedPassword(true);
                          setPassword('');
                          setGeneratedPassword('');
                        }}
                        className="w-4 h-4 text-orange-600"
                      />
                      <span className="text-sm font-medium text-gray-700">Generate Random Password</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="passwordOption"
                        checked={!useGeneratedPassword}
                        onChange={() => setUseGeneratedPassword(false)}
                        className="w-4 h-4 text-orange-600"
                      />
                      <span className="text-sm font-medium text-gray-700">Manual Password</span>
                    </label>
                  </div>

                  {useGeneratedPassword ? (
                    <>
                      {/* Generate Button */}
                      {!password && (
                        <button
                          onClick={handleGeneratePassword}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2 mb-4"
                        >
                          <RefreshCw className="w-5 h-5" />
                          Generate Secure Password
                        </button>
                      )}

                      {/* Generated Password Display */}
                      {password && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-sm text-gray-600 mb-2">Generated Password:</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                readOnly
                                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg font-mono text-sm focus:outline-none"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="p-2 hover:bg-gray-200 rounded-lg transition"
                            >
                              {showPassword ? (
                                <EyeOff className="w-5 h-5 text-gray-600" />
                              ) : (
                                <Eye className="w-5 h-5 text-gray-600" />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={handleCopyPassword}
                              className="p-2 hover:bg-gray-200 rounded-lg transition"
                              title="Copy to clipboard"
                            >
                              <Copy className="w-5 h-5 text-gray-600" />
                            </button>
                          </div>
                          {copied && (
                            <p className="text-sm text-green-600 mt-2">✓ Copied to clipboard</p>
                          )}
                          <button
                            onClick={handleGeneratePassword}
                            className="mt-3 text-sm text-orange-600 hover:text-orange-700 font-medium"
                          >
                            Generate Different Password
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    /* Manual Password Input */
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {password && password.length < 6 && (
                        <p className="text-sm text-red-600 mt-2">Password must be at least 6 characters</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Step 3: Confirmation */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Step 3: Confirm & Reset</h2>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-blue-800">
                      <strong>⚠️ Note:</strong> The user will receive an email with their new password. Make sure you&apos;ve shared the password securely before resetting.
                    </p>
                  </div>

                  <button
                    onClick={handleResetPassword}
                    disabled={resetLoading || !password}
                    className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {resetLoading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Resetting Password...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Reset Password
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Info Box */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 md:p-6">
            <h3 className="font-semibold text-blue-900 mb-3">Password Reset Information</h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>✓ The user will receive an email with their new password</li>
              <li>✓ Passwords must be at least 6 characters long</li>
              <li>✓ Generated passwords include letters, numbers, and special characters</li>
              <li>✓ The user can change their password after logging in</li>
            </ul>
          </div>
        </div>
      </div>
      </ProtectedRoute>
    </DashboardLayout>
  );
}
