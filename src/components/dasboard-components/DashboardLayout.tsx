'use client';

import React, { useState, useEffect } from 'react';
import DashboardHeader from './DashboardHeader';
import Sidebar from './Sidebar';
import ProtectedRoute from '../ProtectedRoute';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

// Add a body-level class while the dashboard is mounted so we can hide
  // the site header that is rendered by the root layout.
  useEffect(() => {
    document.body.classList.add("hide-site-header")
    return () => document.body.classList.remove("hide-site-header")
  }, [])

  return (
    <ProtectedRoute requiredRoles={['user', 'admin', 'manager']}>
    <div className="flex h-screen flex-col bg-gray-50">
      {/* Header */}
      <DashboardHeader sidebarOpen={sidebarOpen} onSidebarToggle={toggleSidebar} />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar open={sidebarOpen} onClose={closeSidebar} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
    </ProtectedRoute>
  );
}
