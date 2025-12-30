'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  FileText,
  Users,
  Settings,
  BarChart3,
  LogOut,
  X,
  ChevronDown,
  LayoutDashboard,
  Calculator,
  MessageSquareText,
  UserRoundPlus,
  Briefcase,
  Mails,
  MailCheck,
  UserRound,
  type LucideIcon,
} from 'lucide-react';

interface MenuItem {
  label: string;
  href?: string;
  icon: LucideIcon;
  badge?: number | null;
  submenu?: MenuItem[];
  roles?: ('user' | 'admin' | 'manager')[]; // Roles that can see this menu
}

interface SidebarProps {
  open: boolean;
  onClose?: () => void;
}

// Define menus for different roles
const getMenuItems = (role: 'user' | 'admin' | 'manager' = 'user', contactCount: number = 0, quoteCount: number = 0): MenuItem[] => {
  const baseMenuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      badge: null,
      roles: ['user', 'admin', 'manager'],
    },
    {
      label: 'Request Quote',
      href: '/request-quote',
      icon: Calculator,
      badge: null,
      roles: ['user'],
    },
    {
      label: 'Send Us a Message',
      href: '/contact',
      icon: MessageSquareText,
      badge: null,
      roles: ['user'],
    },
    {
      label: 'Quote Requests',
      href: '/dashboard/quote-requests',
      icon: Calculator,
      badge: quoteCount > 0 ? quoteCount : null,
      roles: ['admin', 'manager'],
    },
    {
      label: 'Contact Form Submissions',
      href: '/dashboard/contact-form-submissions',
      icon: MessageSquareText,
      badge: contactCount > 0 ? contactCount : null,
      roles: ['admin', 'manager'],
    },
    {
      label: 'Manage Users',
      href: '/dashboard/all-user',
      icon: Users,
      badge: null,
      roles: ['admin'],
      submenu: [
        {
          label: 'All Users',
          href: '/dashboard/all-users',
          icon: Users,
          roles: ['admin'],
        },
        {
          label: 'Add Users',
          href: '/dashboard/add-user',
          icon: UserRoundPlus,
          roles: ['admin'],
        },
        {
          label: 'Change User Password',
          href: '/dashboard/change-user-password',
          icon: Users,
          roles: ['admin'],
        },
      ],
    },
    {
      label: 'Completed Projects',
      href: '/dashboard/projects',
      icon: Briefcase,
      badge: null,
      roles: ['admin', 'manager'],
      submenu: [
        {
          label: 'All Projects',
          href: '/dashboard/all-projects',
          icon: Briefcase,
          roles: ['admin', 'manager'],
        },
        {
          label: 'Add Projects',
          href: '/dashboard/add-project',
          icon: Briefcase,
          roles: ['admin', 'manager'],
        },
      ],
    },
    {
      label: 'Newsletter',
      href: '/dashboard/newsletter',
      icon: Mails,
      badge: null,
      roles: ['admin'],
      submenu: [
        {
          label: 'Send Newsletter',
          href: '/dashboard/send-newsletter',
          icon: Mails,
          roles: ['admin'],
        },
        {
          label: 'Sent Newsletters',
          href: '/dashboard/all-newsletter',
          icon: Mails,
          roles: ['admin'],
        },
        {
          label: 'All Subscribers',
          href: '/dashboard/all-subscribers',
          icon: MailCheck,
          roles: ['admin'],
        },
      ],
    },
    {
      label: 'Profile Settings',
      href: '/dashboard/profile',
      icon: UserRound,
      badge: null,
      roles: ['user', 'admin', 'manager'],
    },
  ];

  // Filter menu items based on user role
  return baseMenuItems.filter((item) => {
    // Check if item has role restrictions
    if (item.roles && !item.roles.includes(role)) {
      return false;
    }

    // Filter submenu items by role
    if (item.submenu) {
      item.submenu = item.submenu.filter((subitem) => {
        if (subitem.roles && !subitem.roles.includes(role)) {
          return false;
        }
        return true;
      });
    }

    return true;
  });
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'user' | 'admin' | 'manager'>('user');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [contactCount, setContactCount] = useState(0);
  const [quoteCount, setQuoteCount] = useState(0);
  const [rolesLoaded, setRolesLoaded] = useState(false);
  const [userData, setUserData] = useState<{ name?: string; email?: string; role?: string }>({});
  const [userDataLoading, setUserDataLoading] = useState(false);

  // Get user role from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('userRole') as 'user' | 'admin' | 'manager' | null;
      const role = storedRole || 'user';
      const email = localStorage.getItem('userEmail') || '';
      
      setUserRole(role);
      setUserData((prev) => ({ ...prev, email, role }));
      setRolesLoaded(true);
      
      // Fetch full user profile from backend
      fetchUserProfile(email);
    }
  }, []);

  // Fetch user profile data from backend
  const fetchUserProfile = async (email: string) => {
    try {
      setUserDataLoading(true);
      const token = localStorage.getItem('token');
      
      // Try to fetch from users API
      const response = await fetch(`/api/users?email=${encodeURIComponent(email)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        
        // Handle different API response formats
        if (data.users && Array.isArray(data.users) && data.users.length > 0) {
          const user = data.users[0];
          setUserData((prev) => ({
            ...prev,
            name: user.name || user.firstName || email,
            email: user.email || email,
            role: user.role || prev.role,
          }));
        } else if (data.user) {
          setUserData((prev) => ({
            ...prev,
            name: data.user.name || data.user.firstName || email,
            email: data.user.email || email,
            role: data.user.role || prev.role,
          }));
        }
      } else {
        // Fallback: use email and role from localStorage
        setUserData((prev) => ({
          ...prev,
          name: email.split('@')[0], // Use part of email as name
        }));
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      // Fallback to localStorage values
      setUserData((prev) => ({
        ...prev,
        name: prev.email?.split('@')[0] || 'User',
      }));
    } finally {
      setUserDataLoading(false);
    }
  };

  // Fetch contact submission and quote counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Fetch contact submission counts
        const contactResponse = await fetch('/api/contact-submissions?page=1&limit=1', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (contactResponse.ok) {
          const contactData = await contactResponse.json();
          const newCount = contactData.statusCounts?.new || 0;
          setContactCount(newCount);
        }

        // Fetch quote requests count
        const quoteResponse = await fetch('/api/quote-requests?page=1&limit=100', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (quoteResponse.ok) {
          const quoteData = await quoteResponse.json();
          
          let newQuoteCount = 0;
          
          // The API returns data.quoteRequests as an array
          if (quoteData.data?.quoteRequests && Array.isArray(quoteData.data.quoteRequests)) {
            newQuoteCount = quoteData.data.quoteRequests.filter((q: any) => q.status === 'new').length;
          } else if (Array.isArray(quoteData.quoteRequests)) {
            newQuoteCount = quoteData.quoteRequests.filter((q: any) => q.status === 'new').length;
          }
          setQuoteCount(newQuoteCount);
        }
      } catch (error) {
        console.error('Failed to fetch counts:', error);
      }
    };

    // Only fetch if role is loaded and user is admin/manager
    if (rolesLoaded && (userRole === 'admin' || userRole === 'manager')) {
      fetchCounts();
      // Refresh counts every 30 seconds
      const interval = setInterval(fetchCounts, 30000);
      return () => clearInterval(interval);
    }
  }, [rolesLoaded, userRole]);

  // Update menu items when counts change
  useEffect(() => {
    setMenuItems(getMenuItems(userRole, contactCount, quoteCount));
  }, [userRole, contactCount, quoteCount]);

  // Auto-expand parent menu if child is active
  useEffect(() => {
    menuItems.forEach((item) => {
      if (item.submenu) {
        const isChildActive = item.submenu.some(
          (subitem) => subitem.href && (pathname === subitem.href || pathname.startsWith(subitem.href + '/'))
        );
        if (isChildActive) {
          setExpandedMenu(item.label);
        }
      }
    });
  }, [pathname, menuItems]);

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  // Helper function to check if any child menu is active
  const isParentMenuActive = (item: MenuItem): boolean => {
    if (item.href) {
      // For items without submenu, only match exact path (not starting with)
      // This prevents Dashboard from staying active on /dashboard/profile, etc.
      if (!item.submenu || item.submenu.length === 0) {
        return pathname === item.href;
      }
      // For items with submenu, check both exact match and parent path
      return pathname === item.href || pathname.startsWith(item.href + '/');
    }
    if (item.submenu) {
      return item.submenu.some(
        (subitem) => subitem.href && (pathname === subitem.href || pathname.startsWith(subitem.href + '/'))
      );
    }
    return false;
  };

  const renderMenuItems = (items: MenuItem[], isMobile = false) => (
    <ul className="space-y-2 flex-1">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = isParentMenuActive(item);
        const hasSubmenu = item.submenu && item.submenu.length > 0;
        const isExpanded = expandedMenu === item.label;

        return (
          <li key={item.label}>
            {hasSubmenu ? (
              <>
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className={`w-full flex items-center justify-between rounded-lg px-4 py-3 font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>
                {isExpanded && (
                  <ul className="ml-4 mt-2 space-y-2 border-l border-gray-700 pl-4">
                    {item.submenu?.map((subitem) => {
                      const SubIcon = subitem.icon;
                      const isSubActive = subitem.href && (pathname === subitem.href || pathname.startsWith(subitem.href + '/'));

                      return (
                        <li key={subitem.label}>
                          <Link
                            href={subitem.href || '#'}
                            onClick={isMobile ? onClose : undefined}
                            className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                              isSubActive
                                ? 'bg-blue-500 text-white shadow-lg border-l-2 border-blue-400'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                            }`}
                          >
                            <SubIcon size={18} />
                            <span>{subitem.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            ) : (
              <Link
                href={item.href || '#'}
                onClick={isMobile ? onClose : undefined}
                className={`flex items-center justify-between rounded-lg px-4 py-3 font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Desktop Sidebar - Always visible on lg screens */}
      <nav className="hidden lg:flex h-full w-[300px] bg-gray-900 border-r border-gray-800 flex-col flex-shrink-0">
        <div className="h-full overflow-y-auto py-6 px-4 flex flex-col">
          {/* Logo Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-600 to-orange-700">
                <span className="text-lg font-bold text-white">M</span>
              </div>
              <div>
                <p className="text-lg font-bold text-white">Mi-Pal</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          {renderMenuItems(menuItems)}

          {/* Logout Section */}
          <div className="border-t border-gray-800 pt-4">
            <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
              <LogOut size={20} />
              <span>Logout</span>
            </button>

            {/* User Info */}
            <div className="mt-4 rounded-lg bg-gray-800 p-3">
              <p className="text-sm font-medium text-white">
                {userDataLoading ? 'Loading...' : userData.name || 'User'}
              </p>
              <p className="text-xs text-gray-400">
                {userData.role ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1) : 'User'}
              </p>
              {userData.email && (
                <p className="text-xs text-gray-500 mt-1 truncate">{userData.email}</p>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar - Overlay modal on mobile when open */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50" onClick={onClose} />

          {/* Mobile Sidebar */}
          <nav className="relative z-50 h-full w-[80%] bg-gray-900 border-r border-gray-800 flex flex-col flex-shrink-0 overflow-y-auto">
            <div className="py-6 px-4 flex flex-col h-full">
              {/* Header with Close Button */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700">
                    <span className="text-lg font-bold text-white">M</span>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">Mi-Pal</p>
                    <p className="text-xs text-gray-400">Admin</p>
                  </div>
                </div>
                <button
                  aria-label="Close menu"
                  onClick={onClose}
                  className="p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Menu Items */}
              {renderMenuItems(menuItems, true)}

              {/* Logout Section */}
              <div className="border-t border-gray-800 pt-4">
                <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-4 py-3 font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>

                {/* User Info */}
                <div className="mt-4 rounded-lg bg-gray-800 p-3">
                  <p className="text-sm font-medium text-white">
                    {userDataLoading ? 'Loading...' : userData.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {userData.role ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1) : 'User'}
                  </p>
                  {userData.email && (
                    <p className="text-xs text-gray-500 mt-1 truncate">{userData.email}</p>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
