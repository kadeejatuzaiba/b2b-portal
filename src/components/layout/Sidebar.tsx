import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import {
  LayoutDashboard,
  Calendar,
  Truck,
  FileText,
  BarChart2,
  X,
} from 'lucide-react';

export interface NavigationItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string | null;
}

/**
 * Navigation items matching the HireD B2B design screenshot
 */
const navigationItems: NavigationItem[] = [
  {
    name: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: 'My Orders',
    path: '/orders',
    icon: Calendar,
    badge: '4',
  },
  {
    name: 'My Trips',
    path: '/trips',
    icon: Truck,
    badge: '8',
  },
  {
    name: 'Statements & Invoices',
    path: '/statements',
    icon: FileText,
    badge: null,
  },
  {
    name: 'Reports',
    path: '/reports',
    icon: BarChart2,
    badge: null,
  },
];

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Reusable Sidebar Component
 */
export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col bg-white border-r border-slate-200/90 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            {/* HireD Official Logo */}
            <img
              src="/logo.png"
              alt="HireD"
              className="h-15 w-auto object-contain"
            />
          </div>

          {/* Close button for mobile screen */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 lg:hidden cursor-pointer"
            aria-label="Close Sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => {
                  if (window.innerWidth < 1024 && onClose) {
                    onClose();
                  }
                }}
                className={({ isActive }) =>
                  `group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#4f46e5] text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`h-4.5 w-4.5 shrink-0 ${
                          isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'
                        }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-indigo-50 text-indigo-600'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* User Account / Partner Box at Bottom */}
        <div className="p-3.5 border-t border-slate-100">
          <div className="rounded-2xl bg-indigo-50/50 border border-indigo-100/70 p-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm">
                AP
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-bold text-slate-900 leading-tight">ABC Logistics</h4>
                <p className="text-xs text-slate-500">B2B Partner</p>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-indigo-100/60 pt-2 text-xs">
              <NavLink
                to="/profile"
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                Profile & Settings
              </NavLink>
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/login', { replace: true });
                }}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
