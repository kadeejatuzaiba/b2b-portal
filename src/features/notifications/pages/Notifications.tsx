import { useMemo, useState } from 'react';
import { Bell, Truck, Package, FileText, Check } from 'lucide-react';
import AppLayout from '../../../components/layout/AppLayout';
import type { NotificationItem, NotificationCategory } from '../types';

const ALL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 1,
    type: 'trips',
    title: 'Trip TRP-20481 started',
    body: 'Your driver started the trip from Bhiwandi Fulfillment Hub.',
    time: '14 min ago',
    unread: true,
  },
  {
    id: 2,
    type: 'orders',
    title: 'Order #ORD-10250 accepted',
    body: 'Your order has been accepted and trip is being created.',
    time: '2 hrs ago',
    unread: true,
  },
  {
    id: 3,
    type: 'orders',
    title: 'Order #ORD-10249 rejected',
    body: 'Reason: Vehicle not available for requested slot.',
    time: '3 hrs ago',
    unread: true,
  },
  {
    id: 4,
    type: 'trips',
    title: 'Trip TRP-20478 completed',
    body: 'Trip completed successfully and report is available.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 5,
    type: 'billing',
    title: 'September 2026 statement published',
    body: 'Your statement is now available for download.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 6,
    type: 'trips',
    title: 'Driver assigned to TRP-20475',
    body: 'Akshay More (verified) will depart Taloja MIDC in 5h 12m.',
    time: 'Yesterday',
    unread: false,
  },
  {
    id: 7,
    type: 'billing',
    title: 'Invoice INV-20460 paid',
    body: 'Payment of ₹15,400 has been reconciled against September billing.',
    time: '2 days ago',
    unread: false,
  },
];

const TABS: Array<{ key: 'all' | NotificationCategory; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'trips', label: 'Trips' },
  { key: 'orders', label: 'Orders' },
  { key: 'billing', label: 'Billing' },
];

const ICONS: Record<NotificationCategory, React.ComponentType<{ className?: string }>> = {
  trips: Truck,
  orders: Package,
  billing: FileText,
};

const TONES: Record<NotificationCategory, string> = {
  trips: 'bg-blue-50 text-blue-600 ring-blue-100',
  orders: 'bg-amber-50 text-amber-600 ring-amber-100',
  billing: 'bg-purple-50 text-purple-600 ring-purple-100',
};

export default function Notifications() {
  const [tab, setTab] = useState<'all' | NotificationCategory>('all');
  const [items, setItems] = useState<NotificationItem[]>(ALL_NOTIFICATIONS);

  const filtered = useMemo(
    () => (tab === 'all' ? items : items.filter((n) => n.type === tab)),
    [items, tab]
  );

  const unreadCount = items.filter((n) => n.unread).length;

  return (
    <AppLayout>
      <div className="space-y-5 pb-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
              Notifications & Updates
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Real-time alerts, driver arrival notifications, and monthly billing updates.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setItems((prev) => prev.map((n) => ({ ...n, unread: false })))}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            <Check className="h-3.5 w-3.5" />
            Mark all as read
          </button>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 pt-4">
            <div className="flex items-center gap-1 overflow-x-auto">
              {TABS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setTab(item.key)}
                  className={`rounded-t-lg px-4 py-2.5 text-sm font-semibold cursor-pointer ${
                    tab === item.key ? 'bg-[#4f46e5] text-white' : 'text-slate-500 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <span className="mb-2 hidden items-center gap-1 rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-semibold text-indigo-600 sm:inline-flex">
              <Bell className="h-3 w-3" />
              {unreadCount} unread
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {filtered.map((item) => {
              const Icon = ICONS[item.type];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setItems((prev) => prev.map((n) => (n.id === item.id ? { ...n, unread: false } : n)))
                  }
                  className={`flex w-full items-start gap-3 px-5 py-4 text-left hover:bg-slate-50 cursor-pointer ${
                    item.unread ? 'bg-indigo-50/40' : 'bg-white'
                  }`}
                >
                  <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-4 ${TONES[item.type]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      {item.unread && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-rose-500" />}
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{item.body}</p>
                    <span className="mt-1 block text-[11px] text-slate-400">{item.time}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
