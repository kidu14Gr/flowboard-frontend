import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  Plus,
  Bell,
  HelpCircle,
  Kanban,
  User,
  LogOut,
  Settings,
  ChevronDown,
  CheckCircle2,
  Clock,
  Shield,
  Tag,
  ArrowRight
} from 'lucide-react';

// Sample indexed issues for Global Search (Section 19)
const searchableIssues = [
  { key: 'FLW-25', title: 'Login authentication failure on Safari', type: 'Bug', status: 'OPEN' },
  { key: 'FLW-10', title: 'Login page layout and form validation', type: 'Story', status: 'TO DO' },
  { key: 'FLW-11', title: 'User registration with email verification', type: 'Story', status: 'TO DO' },
  { key: 'FLW-4', title: 'Agile dashboard with project metrics and workload', type: 'Task', status: 'IN REVIEW' },
  { key: 'FLW-7', title: 'Backend REST API authentication endpoints', type: 'Task', status: 'IN PROGRESS' },
  { key: 'FLW-24', title: 'OAuth Google login integration', type: 'Story', status: 'BACKLOG' },
  { key: 'FLW-12', title: 'Forgot password reset email workflow', type: 'Bug', status: 'IN PROGRESS' },
];

// Sample Notifications (Section 21)
const initialNotifications = [
  {
    id: 'n1',
    icon: '🔔',
    title: 'You were assigned FLW-24',
    subtitle: 'Malefiya assigned you OAuth Google login integration',
    time: '10m ago',
    isRead: false,
    link: '/scrum',
  },
  {
    id: 'n2',
    icon: '💬',
    title: 'Sara commented on FLW-12',
    subtitle: '"The login validation needs fixing."',
    time: '35m ago',
    isRead: false,
    link: '/scrum',
  },
  {
    id: 'n3',
    icon: '🚀',
    title: 'Sprint 1 starts tomorrow',
    subtitle: 'Goal: Build authentication system',
    time: '1h ago',
    isRead: false,
    link: '/scrum',
  },
  {
    id: 'n4',
    icon: '⚠️',
    title: 'Due date approaching for FLW-10',
    subtitle: 'Login page is due in 2 days',
    time: '3h ago',
    isRead: true,
    link: '/scrum',
  },
];

const Navbar = ({ onToggleSidebar, isSidebarOpen }) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  // Global Search state (Section 19)
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef(null);

  const navigate = useNavigate();

  // Filter search results
  const searchResults = searchQuery.trim()
    ? searchableIssues.filter((item) => {
        const q = searchQuery.toLowerCase();
        return (
          item.key.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q)
        );
      })
    : [];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleSelectSearchResult = (issue) => {
    setSearchQuery('');
    setIsSearchOpen(false);
    navigate(`/issues?search=${issue.key}`);
  };

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-xs">
      {/* Left branding & mobile menu toggle */}
      <div className="flex items-center gap-4">
        <button
          className="md:hidden p-1.5 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link to="/dashboard" className="flex items-center gap-2.5 no-underline">
          <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-md flex items-center justify-center shadow-xs">
            <Kanban size={18} />
          </div>
          <span className="font-bold text-lg text-gray-900 tracking-tight">
            Flow<span className="text-blue-600">Board</span>
          </span>
        </Link>
      </div>

      {/* Center Global Search (Section 19) */}
      <div className="hidden md:flex flex-1 max-w-lg mx-6 relative" ref={searchContainerRef}>
        <div className="relative w-full flex items-center">
          <Search size={16} className="absolute left-3 text-gray-400 pointer-events-none" />
          <input
            type="text"
            className="w-full pl-9 pr-12 py-1.5 bg-gray-100 border border-gray-300 rounded-md text-sm text-gray-900 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="Search issues (e.g. FLW-25, login, bug, dashboard)..."
            value={searchQuery}
            onFocus={() => setIsSearchOpen(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
          />
          <span className="absolute right-2.5 text-xs text-gray-400 bg-white border border-gray-200 rounded px-1.5 py-0.5 pointer-events-none">
            ⌘K
          </span>
        </div>

        {/* Global Search Results Dropdown */}
        {isSearchOpen && searchQuery.trim() && (
          <div className="absolute left-0 top-full mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-2xl p-2 z-50 text-xs">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 py-1">
              Matching Issues:
            </div>
            {searchResults.length > 0 ? (
              <div className="space-y-1">
                {searchResults.map((issue) => (
                  <div
                    key={issue.key}
                    onClick={() => handleSelectSearchResult(issue)}
                    className="p-2.5 hover:bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded text-[11px]">
                        {issue.key}
                      </span>
                      <span className="font-semibold text-gray-800 truncate">{issue.title}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-gray-400">{issue.type}</span>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
                        {issue.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-400">
                No issues found matching "{searchQuery}"
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        <button
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-md font-semibold text-sm transition-colors cursor-pointer shadow-xs"
          onClick={() => navigate('/issues?create=true')}
          title="Create New Issue"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">Create</span>
        </button>

        {/* Notifications Dropdown (Section 21) */}
        <div className="relative">
          <button
            className="relative p-2 rounded-full text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors cursor-pointer"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-2xl p-3 z-50 space-y-2 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <span className="font-bold text-sm text-gray-900">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[11px] text-blue-600 hover:underline cursor-pointer font-medium"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="space-y-1.5 max-h-80 overflow-y-auto">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setShowNotifications(false);
                      navigate(n.link);
                    }}
                    className={`p-2.5 rounded-lg flex items-start gap-2.5 cursor-pointer transition-colors text-xs ${
                      n.isRead ? 'bg-white hover:bg-gray-50' : 'bg-blue-50/60 hover:bg-blue-50'
                    }`}
                  >
                    <span className="text-base shrink-0">{n.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900">{n.title}</div>
                      <div className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                        {n.subtitle}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1">{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu (Section 27 & 28) */}
        <div className="relative">
          <button
            className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            aria-expanded={showUserDropdown}
          >
            <div className="w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold text-xs">
              M
            </div>
            <ChevronDown size={14} className="text-gray-500" />
          </button>

          {showUserDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 text-xs">
              <div className="px-4 py-2 border-b border-gray-100">
                <div className="font-bold text-sm text-gray-900">Malefiya</div>
                <div className="text-[11px] text-gray-500">malefiya@flowboard.com</div>
                <span className="inline-block mt-1 font-bold text-[10px] text-red-700 bg-red-50 border border-red-200 px-1.5 py-0.5 rounded">
                  Admin
                </span>
              </div>

              {/* Section 27 Profile Link */}
              <Link
                to="/profile"
                className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setShowUserDropdown(false)}
              >
                <User size={15} />
                Profile & Stats
              </Link>

              {/* Section 28 Admin Dashboard Link */}
              <Link
                to="/admin"
                className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setShowUserDropdown(false)}
              >
                <Shield size={15} className="text-red-600" />
                Admin Dashboard
              </Link>

              {/* Section 24 Project Settings Link */}
              <Link
                to="/projects/settings"
                className="flex items-center gap-2.5 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => setShowUserDropdown(false)}
              >
                <Settings size={15} />
                Project Settings
              </Link>

              <div className="my-1 border-t border-gray-100" />

              <button
                className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                onClick={() => {
                  setShowUserDropdown(false);
                  navigate('/login');
                }}
              >
                <LogOut size={15} />
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
