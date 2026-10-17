import { useState, useMemo } from 'react';
import {
  Search,
  Calendar,
  Filter,
  ArrowUpDown,
  Download,
  ChevronLeft,
  ChevronRight,
  MapPin,
  User,
  Truck,
  Clock,
  CheckCircle2,
  Circle,
  FileText,
  Receipt,
  Navigation,
} from 'lucide-react';
import AppLayout from '../../../components/layout/AppLayout';
import type { TripItem, TripStatus } from '../types';

/* ─────────────────────────────────────────────────────────
   DUMMY TRIP DATA
───────────────────────────────────────────────────────── */
const ALL_TRIPS: TripItem[] = [
  {
    id: '#TRP-20481',
    orderId: '#ORD-10248',
    serviceType: 'Express Parcel',
    status: 'Ongoing',
    origin: 'Bhiwandi Logistics Hub, Gate 2',
    destination: 'Andheri Central DC, Bay 9',
    eta: 'Today, 04:15 PM',
    progress: 65,
    driver: 'Ramesh Yadav',
    vehicle: 'Tata Prima 40T',
    dispatchedAt: 'Today, 01:45 PM',
    scheduledPickup: null,
    completedAt: null,
    duration: null,
    estTransit: null,
  },
  {
    id: '#TRP-20479',
    orderId: '#ORD-10246',
    serviceType: 'Heavy Haulage',
    status: 'Ongoing',
    origin: 'Chakan Industrial Area, Phase II, Pune',
    destination: 'Panvel Logistics Park, Navi Mumbai',
    eta: 'Today, 05:30 PM',
    progress: 45,
    driver: 'Suresh Patil',
    vehicle: 'BharatBenz 2823C',
    dispatchedAt: 'Today, 11:30 AM',
    scheduledPickup: null,
    completedAt: null,
    duration: null,
    estTransit: null,
  },
  {
    id: '#TRP-20482',
    orderId: '#ORD-10249',
    serviceType: 'Port Movement',
    status: 'Upcoming',
    origin: 'JNPT Container Terminal Gate 4, Nhava Sheva',
    destination: 'Chakan Plant 2 Raw Storage, Pune',
    eta: null,
    progress: 0,
    driver: 'Balwant Singh',
    vehicle: 'Ashok Leyland 3118',
    dispatchedAt: null,
    scheduledPickup: 'Tomorrow, 08:00 AM',
    completedAt: null,
    duration: null,
    estTransit: '4h 30m',
  },
  {
    id: '#TRP-20475',
    orderId: '#ORD-10238',
    serviceType: 'Standard Truckload',
    status: 'Completed',
    origin: 'Taloja MIDC Chemical Zone, Navi Mumbai',
    destination: 'Nashik Warehouse Hub, Ambad',
    eta: null,
    progress: 100,
    driver: 'Mahesh Shinde',
    vehicle: 'Eicher Pro 3019',
    dispatchedAt: null,
    scheduledPickup: null,
    completedAt: '02 Oct 2026, 06:15 PM',
    duration: '5h 45m',
    estTransit: null,
  },
  {
    id: '#TRP-20470',
    orderId: '#ORD-10232',
    serviceType: 'Cold Chain',
    status: 'Ongoing',
    origin: 'Vashi Cold Storage, Navi Mumbai',
    destination: 'Thane West Retail Hub',
    eta: 'Today, 03:45 PM',
    progress: 80,
    driver: 'Arvind Kadam',
    vehicle: 'Reefer 19ft Container',
    dispatchedAt: 'Today, 12:10 PM',
    scheduledPickup: null,
    completedAt: null,
    duration: null,
    estTransit: null,
  },
  {
    id: '#TRP-20467',
    orderId: '#ORD-10228',
    serviceType: 'Express Parcel',
    status: 'Upcoming',
    origin: 'Kurla West Central Warehouse',
    destination: 'Pune Wagholi Distribution Centre',
    eta: null,
    progress: 0,
    driver: 'Deepak Mhatre',
    vehicle: 'Tata Ace Gold',
    dispatchedAt: null,
    scheduledPickup: 'Tomorrow, 06:00 AM',
    completedAt: null,
    duration: null,
    estTransit: '3h 15m',
  },
  {
    id: '#TRP-20460',
    orderId: '#ORD-10220',
    serviceType: 'Standard Truckload',
    status: 'Completed',
    origin: 'Marol SEEPZ, Andheri East',
    destination: 'Bhiwandi Mega Warehouse',
    eta: null,
    progress: 100,
    driver: 'Kiran Jadhav',
    vehicle: 'Mahindra Blazo 25',
    dispatchedAt: null,
    scheduledPickup: null,
    completedAt: '01 Oct 2026, 03:30 PM',
    duration: '4h 20m',
    estTransit: null,
  },
  {
    id: '#TRP-20455',
    orderId: '#ORD-10215',
    serviceType: 'Heavy Haulage',
    status: 'Completed',
    origin: 'JNPT Port Buffer Terminal, Nhava Sheva',
    destination: 'Nashik Ambad Industrial Estate',
    eta: null,
    progress: 100,
    driver: 'Prakash Salve',
    vehicle: 'BharatBenz 3143S',
    dispatchedAt: null,
    scheduledPickup: null,
    completedAt: '29 Sep 2026, 11:00 AM',
    duration: '6h 10m',
    estTransit: null,
  },
];

/* Tab configs */
const TABS: Array<{ key: 'all' | TripStatus; label: string }> = [
  { key: 'all', label: 'All Trips' },
  { key: 'Ongoing', label: 'Ongoing' },
  { key: 'Upcoming', label: 'Upcoming' },
  { key: 'Completed', label: 'Completed' },
];

const STATUS_FILTER_OPTIONS = ['All Statuses', 'Ongoing', 'Upcoming', 'Completed'];
const SORT_OPTIONS = ['Latest', 'Oldest', 'ETA: Soonest'];
const ROWS_PER_PAGE = 4;

/* ─────────────────────────────────────────────────────────
   HELPER: STATUS BADGE
───────────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: TripStatus }) {
  const styles: Record<TripStatus, string> = {
    Ongoing: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Upcoming: 'bg-blue-50 text-blue-700 border border-blue-200',
    Completed: 'bg-slate-100 text-slate-600 border border-slate-200',
  };
  const dots: Record<TripStatus, string> = {
    Ongoing: 'bg-emerald-500',
    Upcoming: 'bg-blue-500',
    Completed: 'bg-slate-400',
  };
  const icons: Partial<Record<TripStatus, React.ReactNode>> = {
    Completed: <CheckCircle2 className="h-3.5 w-3.5 text-slate-500" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${styles[status] ?? 'bg-slate-100 text-slate-600'}`}
    >
      {icons[status] ? (
        icons[status]
      ) : (
        <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      )}
      {status}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   HELPER: SERVICE TYPE TAG
───────────────────────────────────────────────────────── */
function ServiceTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600">
      {label}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────
   HELPER: PROGRESS BAR
───────────────────────────────────────────────────────── */
function ProgressBar({ value, status }: { value: number; status: TripStatus }) {
  const barColor =
    status === 'Completed'
      ? 'bg-slate-400'
      : value >= 75
      ? 'bg-emerald-500'
      : value >= 40
      ? 'bg-emerald-500'
      : 'bg-blue-400';

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-[11px] font-bold text-slate-600 whitespace-nowrap">
        {value}% Completed
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   TRIP CARD — matches the screenshot card layout
───────────────────────────────────────────────────────── */
function TripCard({ trip }: { trip: TripItem }) {
  const isOngoing = trip.status === 'Ongoing';
  const isUpcoming = trip.status === 'Upcoming';
  const isCompleted = trip.status === 'Completed';

  return (
    <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs hover:shadow-sm transition-shadow flex flex-col gap-4">

      {/* Top row: Trip ID + Order ID + Status badge */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-bold text-[#4f46e5]">{trip.id}</span>
          <span className="text-slate-300 text-sm">•</span>
          <span className="text-xs text-slate-500 font-medium">Order {trip.orderId}</span>
          <ServiceTag label={trip.serviceType} />
        </div>
        <StatusBadge status={trip.status} />
      </div>

      {/* Route: Origin → Destination */}
      <div className="flex gap-3">
        {/* Vertical timeline line */}
        <div className="flex flex-col items-center pt-1 shrink-0">
          <Circle className="h-4 w-4 text-emerald-500 fill-emerald-500" />
          <div className="flex-1 w-px bg-slate-200 my-1 min-h-[20px]" />
          <MapPin className="h-4 w-4 text-slate-400" />
        </div>

        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              Origin
            </p>
            <p className="text-sm font-semibold text-slate-800 leading-snug">{trip.origin}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              {isCompleted ? 'Destination (Delivered)' : 'Destination'}
            </p>
            <p className="text-sm font-semibold text-slate-800 leading-snug flex items-center gap-1.5">
              {isCompleted && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />}
              {trip.destination}
            </p>
          </div>
        </div>
      </div>

      {/* ETA / Schedule / Completion row */}
      {isOngoing && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-700">
              Current ETA: {trip.eta}
            </span>
          </div>
          <ProgressBar value={trip.progress} status={trip.status} />
        </div>
      )}

      {isUpcoming && (
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span className="font-semibold">Scheduled Pickup: {trip.scheduledPickup}</span>
          {trip.estTransit && (
            <span className="text-slate-400">
              &nbsp;&nbsp;Est. Transit: {trip.estTransit}
            </span>
          )}
        </div>
      )}

      {isCompleted && (
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span className="font-semibold">Completed: {trip.completedAt}</span>
          {trip.duration && (
            <span className="text-slate-400 ml-2">Duration: {trip.duration}</span>
          )}
        </div>
      )}

      {/* Driver + Vehicle row */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span>
            Driver: <span className="font-semibold text-slate-800">{trip.driver}</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Truck className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <span>
            Vehicle: <span className="font-semibold text-slate-800">{trip.vehicle}</span>
          </span>
        </div>
      </div>

      {/* Footer row: dispatch info + action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-slate-100 pt-3 mt-1">
        <p className="text-[11px] text-slate-400">
          {isOngoing && `Dispatched: ${trip.dispatchedAt}`}
          {isUpcoming && `Dispatch scheduled for ${trip.scheduledPickup?.split(',')[0]}`}
          {isCompleted && `Trip ID: ${trip.id}`}
        </p>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <>
              <button
                type="button"
                onClick={() => alert(`Opening invoice for ${trip.id}...`)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <Receipt className="h-3.5 w-3.5" />
                View Invoice
              </button>
              <button
                type="button"
                onClick={() => alert(`Opening report for ${trip.id}...`)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
              >
                <FileText className="h-3.5 w-3.5" />
                View Trip Report
              </button>
            </>
          ) : isUpcoming ? (
            <button
              type="button"
              onClick={() => alert(`Viewing trip details for ${trip.id}...`)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              View Trip →
            </button>
          ) : (
            <button
              type="button"
              onClick={() => alert(`Tracking ${trip.id} live on map...`)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#4f46e5] px-4 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-[#4338ca] transition-all"
            >
              <Navigation className="h-3.5 w-3.5" />
              Track Trip
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────── */
export default function MyTrips() {
  const [activeTab, setActiveTab] = useState<'all' | TripStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [sortBy, setSortBy] = useState('Latest');
  const [currentPage, setCurrentPage] = useState(1);

  /* Counts per tab */
  const tabCounts = useMemo(() => ({
    all: ALL_TRIPS.length,
    Ongoing: ALL_TRIPS.filter((t) => t.status === 'Ongoing').length,
    Upcoming: ALL_TRIPS.filter((t) => t.status === 'Upcoming').length,
    Completed: ALL_TRIPS.filter((t) => t.status === 'Completed').length,
  }), []);

  /* Filtered + sorted list */
  const filtered = useMemo(() => {
    let list = [...ALL_TRIPS];

    /* Tab filter */
    if (activeTab !== 'all') {
      list = list.filter((t) => t.status === activeTab);
    }

    /* Dropdown status filter */
    if (statusFilter !== 'All Statuses') {
      list = list.filter((t) => t.status === statusFilter);
    }

    /* Search */
    const q = searchQuery.toLowerCase().trim();
    if (q) {
      list = list.filter(
        (t) =>
          t.id.toLowerCase().includes(q) ||
          t.orderId.toLowerCase().includes(q) ||
          t.origin.toLowerCase().includes(q) ||
          t.destination.toLowerCase().includes(q) ||
          t.driver.toLowerCase().includes(q)
      );
    }

    /* Sort */
    if (sortBy === 'Oldest') list = list.reverse();

    return list;
  }, [activeTab, statusFilter, searchQuery, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * ROWS_PER_PAGE;
  const pageRows = filtered.slice(pageStart, pageStart + ROWS_PER_PAGE);

  const resetPage = () => setCurrentPage(1);

  /* Stats for the header summary */
  const activeCount = tabCounts.Ongoing;
  const upcomingCount = tabCounts.Upcoming;
  const completedCount = tabCounts.Completed;

  return (
    <AppLayout>
      <div className="space-y-5 pb-8">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
              My Trips
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Track your ongoing, upcoming, and completed transportation trips.
            </p>
          </div>

          {/* Summary stats */}
          <div className="flex items-center gap-4 sm:gap-5 text-xs flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-slate-500">Active Trips:</span>
              <span className="font-bold text-slate-900">{activeCount}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-slate-500">Upcoming:</span>
              <span className="font-bold text-slate-900">{upcomingCount}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-slate-400" />
              <span className="text-slate-500">Completed:</span>
              <span className="font-bold text-slate-900">{completedCount}</span>
            </div>
          </div>
        </div>

        {/* ── Filters Bar ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); resetPage(); }}
              placeholder="Search by Trip ID or Order ID..."
              className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>

          {/* Date badge (display-only) */}
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all whitespace-nowrap"
          >
            <Calendar className="h-4 w-4 text-slate-400" />
            Today, 03 Oct
          </button>

          {/* Status filter */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Filter className="h-3.5 w-3.5" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); resetPage(); }}
              className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-8 pr-8 text-sm font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
            >
              {STATUS_FILTER_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <ArrowUpDown className="h-3.5 w-3.5" />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-8 pr-8 text-sm font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s} value={s}>Sort by: {s}</option>
              ))}
            </select>
          </div>

          {/* Export */}
          <button
            type="button"
            onClick={() => alert('Exporting trips...')}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all whitespace-nowrap"
          >
            <Download className="h-4 w-4 text-slate-400" />
            Export
          </button>
        </div>

        {/* ── Status Tabs ── */}
        <div className="flex items-center gap-2 flex-wrap">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            const count = tabCounts[tab.key];
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => { setActiveTab(tab.key); resetPage(); }}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all focus:outline-none ${
                  isActive
                    ? 'bg-[#4f46e5] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {tab.label}
                {count !== undefined && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold leading-none ${
                      isActive ? 'bg-white/25 text-white' : 'bg-indigo-50 text-indigo-600'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Trip Cards Grid ── */}
        {pageRows.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white border border-slate-200/80 py-20 text-center">
            <Truck className="h-10 w-10 text-slate-200 mb-3" />
            <p className="text-sm font-semibold text-slate-500">No trips found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pageRows.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        )}

        {/* ── Pagination ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <p className="text-xs text-slate-500">
            Showing{' '}
            <span className="font-semibold text-slate-800">
              {filtered.length === 0 ? 0 : pageStart + 1}–{Math.min(pageStart + ROWS_PER_PAGE, filtered.length)}
            </span>{' '}
            of{' '}
            <span className="font-semibold text-slate-800">{filtered.length}</span> trips
            &nbsp;•&nbsp;
            <span className="text-slate-400">Need trip adjustment support?&nbsp;</span>
            <button
              type="button"
              onClick={() => alert('Opening Partner Helpdesk...')}
              className="text-[#4f46e5] font-semibold hover:underline"
            >
              Contact Partner Helpdesk
            </button>
          </p>

          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setCurrentPage(p)}
                  className={`h-8 w-8 rounded-lg text-xs font-semibold transition-colors ${
                    safePage === p
                      ? 'bg-[#4f46e5] text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                type="button"
                disabled={safePage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
