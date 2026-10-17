import { useState, useMemo } from 'react';
import {
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Truck,
  Package,
  Thermometer,
  Container,
} from 'lucide-react';
import AppLayout from '../../../components/layout/AppLayout';
import type { OrderItem, OrderStatus, VehicleIconType } from '../types';

/* ──────────────────────────────────────────────────────────
   DUMMY DATA
────────────────────────────────────────────────────────── */
const ALL_ORDERS: OrderItem[] = [
  {
    id: '#ORD-10250',
    po: 'PO-2026-9041',
    createdDate: 'Today',
    createdTime: '11:20 AM',
    origin: 'Taloja MIDC Chemical Zone, Navi Mumbai',
    destination: 'Bhosari Industrial Area, Pune',
    scheduledDate: '05 Oct 2026',
    scheduledSlot: '06:00 AM Slot',
    vehicle: '32ft Multi-Axle',
    vehicleIcon: 'truck',
    status: 'Received / Pending',
    tripRef: null,
    rejectionReason: null,
  },
  {
    id: '#ORD-10248',
    po: 'PO-2026-8994',
    createdDate: 'Today',
    createdTime: '09:15 AM',
    origin: 'Bhiwandi Fulfillment Hub, Thane',
    destination: 'Andheri Central DC, Mumbai',
    scheduledDate: '03 Oct 2026',
    scheduledSlot: '02:30 PM Slot',
    vehicle: '19ft Container',
    vehicleIcon: 'container',
    status: 'Accepted',
    tripRef: 'Trip #TRP-20481',
    rejectionReason: null,
  },
  {
    id: '#ORD-10245',
    po: 'PO-2026-8711',
    createdDate: '01 Oct 2026',
    createdTime: '02:15 PM',
    origin: 'Vashi Cold Storage, Navi Mumbai',
    destination: 'Thane West Hypermarket',
    scheduledDate: '02 Oct 2026',
    scheduledSlot: '11:00 AM Slot',
    vehicle: '32ft Reefer',
    vehicleIcon: 'reefer',
    status: 'Rejected',
    tripRef: null,
    rejectionReason: '32ft Container unavailable',
  },
  {
    id: '#ORD-10244',
    po: 'PO-2026-8632',
    createdDate: '30 Sep 2026',
    createdTime: '10:00 AM',
    origin: 'Kurla West Central Warehouse',
    destination: 'Pune Wagholi DC',
    scheduledDate: '01 Oct 2026',
    scheduledSlot: '04:00 AM Slot',
    vehicle: '19ft Container',
    vehicleIcon: 'container',
    status: 'Accepted',
    tripRef: 'Trip #TRP-20478',
    rejectionReason: null,
  },
  {
    id: '#ORD-10241',
    po: 'PO-2026-8512',
    createdDate: '29 Sep 2026',
    createdTime: '04:15 PM',
    origin: 'JNPT Port Buffer Terminal, Nhava Sheva',
    destination: 'Nashik Ambad Industrial Estate',
    scheduledDate: '30 Sep 2026',
    scheduledSlot: '07:30 AM Slot',
    vehicle: '14ft Closed',
    vehicleIcon: 'package',
    status: 'Completed',
    tripRef: null,
    rejectionReason: null,
  },
  {
    id: '#ORD-10239',
    po: 'PO-2026-8490',
    createdDate: '28 Sep 2026',
    createdTime: '03:40 PM',
    origin: 'Chakan Plant 2, Pune',
    destination: 'Panvel Port Buffer Yard',
    scheduledDate: '29 Sep 2026',
    scheduledSlot: '09:00 AM Slot',
    vehicle: '24ft High Cube',
    vehicleIcon: 'truck',
    status: 'Completed',
    tripRef: null,
    rejectionReason: null,
  },
  {
    id: '#ORD-10235',
    po: 'PO-2026-8401',
    createdDate: '25 Sep 2026',
    createdTime: '08:45 AM',
    origin: 'Marol SEEPZ, Andheri East',
    destination: 'Bhiwandi Mega Warehouse',
    scheduledDate: '26 Sep 2026',
    scheduledSlot: '10:00 AM Slot',
    vehicle: '19ft Container',
    vehicleIcon: 'container',
    status: 'Accepted',
    tripRef: 'Trip #TRP-20460',
    rejectionReason: null,
  },
  {
    id: '#ORD-10231',
    po: 'PO-2026-8370',
    createdDate: '22 Sep 2026',
    createdTime: '01:10 PM',
    origin: 'Thane Industrial Estate',
    destination: 'Aurangabad Waluj MIDC',
    scheduledDate: '23 Sep 2026',
    scheduledSlot: '05:00 AM Slot',
    vehicle: '32ft Multi-Axle',
    vehicleIcon: 'truck',
    status: 'Completed',
    tripRef: null,
    rejectionReason: null,
  },
  {
    id: '#ORD-10228',
    po: 'PO-2026-8312',
    createdDate: '20 Sep 2026',
    createdTime: '11:30 AM',
    origin: 'Kalyan Distribution Hub',
    destination: 'Nagpur Butibori Industrial Zone',
    scheduledDate: '21 Sep 2026',
    scheduledSlot: '08:00 AM Slot',
    vehicle: '32ft Reefer',
    vehicleIcon: 'reefer',
    status: 'Rejected',
    tripRef: null,
    rejectionReason: 'Route not serviceable',
  },
  {
    id: '#ORD-10224',
    po: 'PO-2026-8201',
    createdDate: '18 Sep 2026',
    createdTime: '03:00 PM',
    origin: 'Turbhe MIDC, Navi Mumbai',
    destination: 'Nashik Wine Park Industrial Area',
    scheduledDate: '19 Sep 2026',
    scheduledSlot: '11:00 AM Slot',
    vehicle: '14ft Closed',
    vehicleIcon: 'package',
    status: 'Completed',
    tripRef: null,
    rejectionReason: null,
  },
  {
    id: '#ORD-10220',
    po: 'PO-2026-8150',
    createdDate: '15 Sep 2026',
    createdTime: '09:00 AM',
    origin: 'Pune Camp Depot',
    destination: 'Lonavala Cold Chain Hub',
    scheduledDate: '16 Sep 2026',
    scheduledSlot: '06:00 AM Slot',
    vehicle: '19ft Container',
    vehicleIcon: 'container',
    status: 'Accepted',
    tripRef: 'Trip #TRP-20441',
    rejectionReason: null,
  },
  {
    id: '#ORD-10215',
    po: 'PO-2026-8090',
    createdDate: '12 Sep 2026',
    createdTime: '02:45 PM',
    origin: 'Dombivli East Industrial Area',
    destination: 'Amravati Goods Yard',
    scheduledDate: '13 Sep 2026',
    scheduledSlot: '07:00 AM Slot',
    vehicle: '32ft Multi-Axle',
    vehicleIcon: 'truck',
    status: 'Completed',
    tripRef: null,
    rejectionReason: null,
  },
];

/* Tab definitions */
const TABS: Array<{ key: 'all' | OrderStatus; label: string }> = [
  { key: 'all', label: 'All Orders' },
  { key: 'Received / Pending', label: 'Received / Pending' },
  { key: 'Accepted', label: 'Accepted' },
  { key: 'Rejected', label: 'Rejected' },
  { key: 'Completed', label: 'Completed' },
];

const DATE_FILTERS = ['Last 30 Days', 'Last 7 Days', 'This Month', 'Last 3 Months', 'Custom Range'];

const ROWS_PER_PAGE = 6;

/* ──────────────────────────────────────────────────────────
   STATUS BADGE
────────────────────────────────────────────────────────── */
interface StatusBadgeProps {
  status: OrderStatus;
  rejectionReason?: string | null;
}

function StatusBadge({ status, rejectionReason }: StatusBadgeProps) {
  const cfg = {
    'Received / Pending': {
      dot: 'bg-slate-400',
      bg: 'bg-slate-100',
      text: 'text-slate-600',
      label: 'Received / Pending',
    },
    Accepted: {
      dot: 'bg-emerald-500',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
      label: 'Accepted',
    },
    Rejected: {
      dot: 'bg-rose-500',
      bg: 'bg-rose-50',
      text: 'text-rose-700',
      label: 'Rejected',
    },
    Completed: {
      dot: 'bg-slate-400',
      bg: 'bg-slate-100',
      text: 'text-slate-600',
      label: 'Completed',
    },
  }[status] ?? {
    dot: 'bg-slate-400',
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    label: status,
  };

  return (
    <div className="flex flex-col gap-1">
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${cfg.bg} ${cfg.text}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
        {cfg.label}
      </span>
      {rejectionReason && (
        <span className="text-[11px] text-rose-600 font-medium leading-tight pl-1">
          {rejectionReason}
        </span>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   VEHICLE ICON
────────────────────────────────────────────────────────── */
function VehicleIcon({ type }: { type: VehicleIconType }) {
  const cls = 'h-4 w-4 text-slate-500';
  if (type === 'reefer') return <Thermometer className={cls} />;
  if (type === 'container') return <Container className={cls} />;
  if (type === 'package') return <Package className={cls} />;
  return <Truck className={cls} />;
}

/* ──────────────────────────────────────────────────────────
   MAIN PAGE
────────────────────────────────────────────────────────── */
export default function MyOrders() {
  const [activeTab, setActiveTab] = useState<'all' | OrderStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('Last 30 Days');
  const [currentPage, setCurrentPage] = useState(1);

  /* Tab counts */
  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = { all: ALL_ORDERS.length };
    TABS.forEach((t) => {
      if (t.key !== 'all') {
        counts[t.key] = ALL_ORDERS.filter((o) => o.status === t.key).length;
      }
    });
    return counts;
  }, []);

  /* Filtered orders */
  const filtered = useMemo(() => {
    let list = ALL_ORDERS;

    /* Tab filter */
    if (activeTab !== 'all') {
      list = list.filter((o) => o.status === activeTab);
    }

    /* Search filter */
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.po.toLowerCase().includes(q) ||
          o.origin.toLowerCase().includes(q) ||
          o.destination.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeTab, searchQuery]);

  /* Pagination */
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * ROWS_PER_PAGE;
  const pageRows = filtered.slice(pageStart, pageStart + ROWS_PER_PAGE);

  /* Reset to page 1 when filters change */
  const handleTabChange = (key: 'all' | OrderStatus) => {
    setActiveTab(key);
    setCurrentPage(1);
  };
  const handleSearch = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  /* Page number buttons */
  const buildPageNumbers = (): Array<number | string> => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: Array<number | string> = [1];
    if (safePage > 3) pages.push('…');
    for (let p = Math.max(2, safePage - 1); p <= Math.min(totalPages - 1, safePage + 1); p++) {
      pages.push(p);
    }
    if (safePage < totalPages - 2) pages.push('…');
    pages.push(totalPages);
    return pages;
  };

  return (
    <AppLayout>
      <div className="space-y-5 pb-8">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
              My Orders
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              View and track all transportation orders submitted by your company.
            </p>
          </div>
          {/* No "Create New Order" button here — it lives in the Header */}
        </div>

        {/* ── Main Card ── */}
        <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">

          {/* Status Tabs */}
          <div className="flex items-center gap-1 border-b border-slate-100 px-4 pt-4 pb-0 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleTabChange(tab.key)}
                  className={`relative flex shrink-0 items-center gap-2 rounded-t-lg px-4 py-2.5 text-sm font-semibold transition-colors focus:outline-none ${
                    isActive
                      ? 'bg-[#4f46e5] text-white shadow-sm'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                  {tabCounts[tab.key] !== undefined && (
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold leading-none ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-indigo-50 text-indigo-600'
                      }`}
                    >
                      {tabCounts[tab.key]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search & Date Filter */}
          <div className="flex flex-col sm:flex-row gap-3 px-4 py-4 border-b border-slate-100">
            {/* Search */}
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by Order ID, pickup, drop, or PO number..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
              />
            </div>

            {/* Date Filter */}
            <div className="relative sm:w-48">
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm text-slate-700 font-medium focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
              >
                {DATE_FILTERS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                <Calendar className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* ── Table (desktop) ── */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    Created Date
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Route (Origin → Destination)
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    Scheduled Pickup
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    Vehicle / Service Type
                  </th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pageRows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-16 text-center text-sm text-slate-400">
                      No orders found matching your search.
                    </td>
                  </tr>
                ) : (
                  pageRows.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      {/* Order ID */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`text-sm font-bold ${
                            order.status === 'Rejected' ? 'text-rose-600' : 'text-indigo-600'
                          }`}
                        >
                          {order.id}
                        </span>
                        <p className="text-[11px] text-slate-400 mt-0.5">{order.po}</p>
                      </td>

                      {/* Created Date */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-slate-800">{order.createdDate}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{order.createdTime}</p>
                      </td>

                      {/* Route */}
                      <td className="px-4 py-4 min-w-[220px]">
                        <div className="flex items-start gap-2">
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                          <p className="text-sm font-semibold text-slate-800 leading-snug">
                            {order.origin}
                          </p>
                        </div>
                        <div className="flex items-start gap-2 mt-1.5">
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                          <p className="text-sm text-slate-500 leading-snug">{order.destination}</p>
                        </div>
                      </td>

                      {/* Scheduled Pickup */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <p className="text-sm font-medium text-slate-800">{order.scheduledDate}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{order.scheduledSlot}</p>
                      </td>

                      {/* Vehicle */}
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                            <VehicleIcon type={order.vehicleIcon} />
                          </div>
                          <span className="text-sm font-semibold text-slate-800">
                            {order.vehicle}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-4">
                        <StatusBadge
                          status={order.status}
                          rejectionReason={order.rejectionReason}
                        />
                        {order.tripRef && (
                          <p className="mt-1 text-[11px] font-semibold text-indigo-600 pl-1">
                            {order.tripRef}
                          </p>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Mobile Cards ── */}
          <div className="md:hidden divide-y divide-slate-100">
            {pageRows.length === 0 ? (
              <div className="px-4 py-16 text-center text-sm text-slate-400">
                No orders found matching your search.
              </div>
            ) : (
              pageRows.map((order) => (
                <div key={order.id} className="px-4 py-4 space-y-3">
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span
                        className={`text-sm font-bold ${
                          order.status === 'Rejected' ? 'text-rose-600' : 'text-indigo-600'
                        }`}
                      >
                        {order.id}
                      </span>
                      <p className="text-[11px] text-slate-400">{order.po}</p>
                    </div>
                    <StatusBadge
                      status={order.status}
                      rejectionReason={order.rejectionReason}
                    />
                  </div>

                  {/* Route */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                      <p className="text-xs font-semibold text-slate-800 leading-snug">
                        {order.origin}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                      <p className="text-xs text-slate-500 leading-snug">{order.destination}</p>
                    </div>
                  </div>

                  {/* Meta row */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                    <span>
                      <span className="font-medium text-slate-700">Created:</span>{' '}
                      {order.createdDate} {order.createdTime}
                    </span>
                    <span>
                      <span className="font-medium text-slate-700">Pickup:</span>{' '}
                      {order.scheduledDate}
                    </span>
                  </div>

                  {/* Vehicle */}
                  <div className="flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100">
                      <VehicleIcon type={order.vehicleIcon} />
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{order.vehicle}</span>
                    {order.tripRef && (
                      <span className="text-[11px] font-semibold text-indigo-600 ml-1">
                        • {order.tripRef}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ── Pagination ── */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 px-4 py-3.5">
            {/* Count label */}
            <p className="text-xs text-slate-500">
              Showing{' '}
              <span className="font-semibold text-slate-800">
                {filtered.length === 0 ? 0 : pageStart + 1} to{' '}
                {Math.min(pageStart + ROWS_PER_PAGE, filtered.length)}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-slate-800">{filtered.length}</span> orders
              {totalPages > 1 && (
                <>
                  {' '}
                  | Page{' '}
                  <span className="font-semibold text-slate-800">{safePage} of {totalPages}</span>
                </>
              )}
            </p>

            {/* Page controls */}
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                {/* Previous */}
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Previous
                </button>

                {/* Page numbers */}
                <div className="flex items-center gap-1 mx-1">
                  {buildPageNumbers().map((p, idx) =>
                    p === '…' ? (
                      <span key={`ellipsis-${idx}`} className="px-1.5 text-xs text-slate-400">
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setCurrentPage(Number(p))}
                        className={`h-7 w-7 rounded-lg text-xs font-semibold transition-colors ${
                          safePage === p
                            ? 'bg-[#4f46e5] text-white shadow-sm'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>

                {/* Next */}
                <button
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
