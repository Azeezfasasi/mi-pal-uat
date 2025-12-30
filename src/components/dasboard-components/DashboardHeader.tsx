'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Menu,
  X,
  Bell,
  MessageSquare,
  ChevronDown,
  Settings,
  LogOut,
  User,
  Home,
  FileText,
  BarChart3,
  Search,
} from 'lucide-react';

interface UserProfile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin' | 'manager';
}

interface DashboardHeaderProps {
  sidebarOpen?: boolean;
  onSidebarToggle?: () => void;
}

export default function DashboardHeader({ sidebarOpen = false, onSidebarToggle }: DashboardHeaderProps) {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [readNotifications, setReadNotifications] = useState<Set<string>>(new Set());
  const [userRole, setUserRole] = useState<'user' | 'admin' | 'manager'>('user');

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const userEmail = localStorage.getItem('userEmail');
        const userRoleFromStorage = localStorage.getItem('userRole') || 'user';

        // Update the userRole state with the value from localStorage
        setUserRole(userRoleFromStorage as 'user' | 'admin' | 'manager');

        if (!userEmail) {
          setLoading(false);
          return;
        }

        // Fetch user profile from backend
        const response = await fetch(`/api/users?search=${encodeURIComponent(userEmail)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        const currentUser = data.users?.[0];

        if (currentUser) {
          setUser({
            ...currentUser,
            role: (userRoleFromStorage as 'user' | 'admin' | 'manager') || 'user',
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch('/api/quote-requests', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        const quoteRequests = data.data?.quoteRequests || data.quoteRequests || [];

        // Transform quote requests into notifications (most recent first)
        const notificationList = quoteRequests
          .slice(0, 5) // Get top 5 most recent
          .map((req: any) => ({
            id: req._id,
            type: 'quote_request',
            title: 'New Quote Request',
            description: `From ${req.from_name || 'Unknown'} (${req.company_name || 'Unknown Company'})`,
            icon: 'FileText',
            iconBg: 'bg-blue-100',
            iconColor: 'text-blue-600',
            timestamp: req.createdAt,
          }));

        setNotifications(notificationList);

        // Load read notifications from localStorage
        const readIds = new Set(JSON.parse(localStorage.getItem('readNotifications') || '[]') as string[]);
        setReadNotifications(readIds);

        // Calculate unread count
        const unread = notificationList.filter((n: any) => !readIds.has(n.id)).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
    // Refresh notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);

    return () => clearInterval(interval);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  // Get user initials for avatar fallback
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  // Get user display name
  const displayName = user ? `${user.firstName} ${user.lastName}` : 'User';
  const initials = user ? getInitials(user.firstName, user.lastName) : 'U';

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'manager':
        return 'bg-purple-100 text-purple-800';
      case 'user':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get role icon
  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return '👑';
      case 'manager':
        return '📋';
      case 'user':
        return '👤';
      default:
        return '❓';
    }
  };

  // Mark notification as read
  const markNotificationAsRead = (notificationId: string) => {
    const updated = new Set(readNotifications);
    updated.add(notificationId);
    setReadNotifications(updated);
    localStorage.setItem('readNotifications', JSON.stringify(Array.from(updated)));
    setUnreadCount(Math.max(0, unreadCount - 1));
  };

  // Delete notification
  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter((n) => n.id !== notificationId));
    const updated = new Set(readNotifications);
    updated.add(notificationId);
    setReadNotifications(updated);
    localStorage.setItem('readNotifications', JSON.stringify(Array.from(updated)));
  };

  // Format timestamp
  const formatTimeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left Section - Logo & Menu Toggle */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu for Mobile */}
          <button
            onClick={onSidebarToggle}
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 xl:hidden"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-600 to-orange-700">
              <span className="text-lg font-bold text-white">M</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-lg font-bold text-gray-900">Mi-Pal</p>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Right Section - Actions & Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications */}
          {(userRole === 'admin' || userRole === 'manager') && (
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 max-w-[calc(100vw-1rem)] rounded-lg border border-gray-200 bg-white shadow-lg z-50">
                <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="text-xs font-medium text-blue-600">{unreadCount} new</span>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-4 py-8 text-gray-500">
                      <Bell size={32} className="mb-2 opacity-30" />
                      <p className="text-sm">No notifications yet</p>
                    </div>
                  ) : (
                    notifications.map((notification) => {
                      const isRead = readNotifications.has(notification.id);
                      return (
                        <div
                          key={notification.id}
                          className={`border-b border-gray-100 px-4 py-3 hover:bg-gray-50 transition ${
                            !isRead ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex gap-3">
                            {/* Icon */}
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 ${notification.iconBg}`}
                            >
                              <FileText
                                className={notification.iconColor}
                                size={18}
                              />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {notification.title}
                                  </p>
                                  <p className="text-xs text-gray-600 line-clamp-2">
                                    {notification.description}
                                  </p>
                                </div>
                                {!isRead && (
                                  <div className="h-2 w-2 rounded-full bg-blue-600 flex-shrink-0 mt-1"></div>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatTimeAgo(notification.timestamp)}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-1 flex-shrink-0">
                              {!isRead && (
                                <button
                                  onClick={() => markNotificationAsRead(notification.id)}
                                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-white rounded transition"
                                  title="Mark as read"
                                >
                                  <X size={14} />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                <div className="border-t border-gray-200 px-4 py-3">
                  <Link
                    href="/dashboard/quote-requests"
                    className="w-full inline-block rounded-lg bg-blue-50 px-4 py-2 text-center text-sm font-medium text-blue-600 hover:bg-blue-100 transition"
                  >
                    View All
                  </Link>
                </div>
              </div>
            )}
          </div>
          )}

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100 transition"
            >
              {/* User Avatar */}
              {user?.avatar ? (
                <Image
                  src={user.avatar}
                  alt={displayName}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{initials}</span>
                </div>
              )}
              <span className="hidden text-sm font-medium text-gray-900 sm:inline">{user?.firstName || 'Admin'}</span>
              <ChevronDown size={16} className="text-gray-600" />
            </button>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg">
                {/* User Info */}
                <div className="border-b border-gray-200 px-4 py-4">
                  <div className="flex items-center gap-3 mb-3">
                    {user?.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={displayName}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{initials}</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{displayName}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                  {user && (
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                      {getRoleIcon(user.role)} {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </div>
                  )}
                </div>

                {/* Menu Items */}
                <nav className="space-y-1 px-2 py-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                  >
                    <Home size={18} />
                    Dashboard
                  </Link>

                  {(user?.role === 'admin' || user?.role === 'manager') && (
                    <Link
                      href="/dashboard/quote-requests"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                    >
                      <FileText size={18} />
                      Quote Requests
                    </Link>
                  )}

                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                  >
                    <User size={18} />
                    Profile
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                  >
                    <Settings size={18} />
                    Settings
                  </Link>
                </nav>

                {/* Logout Button */}
                <div className="border-t border-gray-200 px-2 py-2">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchActive && (
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search quotes, clients..."
              autoFocus
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>
      )}
    </header>
  );
}

