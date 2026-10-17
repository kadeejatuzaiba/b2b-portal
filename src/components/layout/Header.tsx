import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  HelpCircle,
  Bell,
  Plus,
  ChevronDown,
  X,
} from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';

export interface HeaderProps {
  onMenuClick: () => void;
  onCreateOrderClick: () => void;
}

interface HeaderNotification {
  id: number;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
}

/**
 * Reusable Header Component matching the B2B screenshot
 */
export default function Header({ onMenuClick, onCreateOrderClick }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const notifications: HeaderNotification[] = [
    {
      id: 1,
      title: 'Trip TRP-20481 started',
      desc: 'Driver started the trip from Bhiwandi Fulfillment Hub',
      time: '14 min ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Order #ORD-10250 accepted',
      desc: 'Your order has been accepted and trip is being created',
      time: '2 hrs ago',
      unread: true,
    },
    {
      id: 3,
      title: 'September 2026 statement published',
      desc: 'Your monthly consolidated statement is ready',
      time: 'Yesterday',
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white px-4 sm:px-6 lg:px-8">
      {/* Left side: Mobile menu toggle + Search Bar */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-2xl">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-hidden lg:hidden cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Global Search */}
        <div className="relative w-full max-w-lg">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search orders, trips, or invoices (e.g. #ORD-10248)..."
            className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* Right side: Help, Notification, + Create New Order, AP profile */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Help Circle */}
        <button
          type="button"
          onClick={() => alert('Opening HireD B2B Help Center...')}
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          title="Help & Documentation"
          aria-label="Help"
        >
          <HelpCircle className="h-5 w-5" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
          </button>

          {/* Notification dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
                <div className="flex items-center gap-2">
                  <Link
                    to="/notifications"
                    onClick={() => setShowNotifications(false)}
                    className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    View all
                  </Link>
                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="divide-y divide-slate-100 py-1 max-h-72 overflow-y-auto">
                {notifications.map((item) => (
                  <div key={item.id} className="p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                    <p className="text-xs font-bold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Create New Order Button */}
        <button
          type="button"
          onClick={onCreateOrderClick}
          className="inline-flex items-center gap-1.5 rounded-full bg-[#4f46e5] px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-xs hover:bg-[#4338ca] active:scale-98 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4 stroke-[2.5]" />
          <span>Create New Order</span>
        </button>

        {/* User AP Avatar Pill */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-1 rounded-full p-0.5 hover:ring-2 hover:ring-indigo-100 transition-all cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
              AP
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">ABC Logistics</p>
                <p className="text-[11px] text-slate-500">{user?.email || 'ops@abclogistics.in'}</p>
              </div>
              <div className="py-1 text-xs text-slate-700">
                <Link
                  to="/profile"
                  className="block px-3 py-1.5 rounded-lg hover:bg-slate-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Account Settings
                </Link>
                <Link
                  to="/statements"
                  className="block px-3 py-1.5 rounded-lg hover:bg-slate-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Billing & Invoices
                </Link>
                <Link
                  to="/notifications"
                  className="block px-3 py-1.5 rounded-lg hover:bg-slate-100"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Notifications
                </Link>
              </div>
              <div className="border-t border-slate-100 pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                    navigate('/login', { replace: true });
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-semibold cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
