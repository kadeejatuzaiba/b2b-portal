import { useMemo, useState } from 'react';
import {
  Search,
  Download,
  FileText,
  IndianRupee,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import AppLayout from '../../../components/layout/AppLayout';
import { formatInr } from '@/utils/formatters';
import type { StatementItem, InvoiceItem, StatementStatus, InvoiceStatus } from '../types';

const STATEMENTS: StatementItem[] = [
  {
    id: 'STMT-2026-10',
    period: 'October 2026',
    status: 'In progress',
    trips: 32,
    amount: 482500,
    issued: '—',
    due: '15 Nov 2026',
  },
  {
    id: 'STMT-2026-09',
    period: 'September 2026',
    status: 'Published',
    trips: 30,
    amount: 451200,
    issued: '01 Oct 2026',
    due: '15 Oct 2026',
  },
  {
    id: 'STMT-2026-08',
    period: 'August 2026',
    status: 'Paid',
    trips: 28,
    amount: 418750,
    issued: '01 Sep 2026',
    due: '15 Sep 2026',
  },
  {
    id: 'STMT-2026-07',
    period: 'July 2026',
    status: 'Paid',
    trips: 25,
    amount: 392400,
    issued: '01 Aug 2026',
    due: '15 Aug 2026',
  },
];

const INVOICES: InvoiceItem[] = [
  { id: 'INV-20481', trip: 'TRP-20481', date: '03 Oct 2026', route: 'Bhiwandi → Andheri', amount: 18500, status: 'Open' },
  { id: 'INV-20479', trip: 'TRP-20479', date: '03 Oct 2026', route: 'Chakan → Panvel', amount: 24200, status: 'Open' },
  { id: 'INV-20478', trip: 'TRP-20478', date: '01 Oct 2026', route: 'Kurla → Wagholi', amount: 16800, status: 'Billed' },
  { id: 'INV-20475', trip: 'TRP-20475', date: '02 Oct 2026', route: 'Taloja → Nashik', amount: 22100, status: 'Billed' },
  { id: 'INV-20460', trip: 'TRP-20460', date: '01 Oct 2026', route: 'Marol → Bhiwandi', amount: 15400, status: 'Paid' },
  { id: 'INV-20455', trip: 'TRP-20455', date: '29 Sep 2026', route: 'JNPT → Nashik', amount: 27600, status: 'Paid' },
];

function StatusPill({ status }: { status: StatementStatus | InvoiceStatus }) {
  const map: Record<string, string> = {
    'In progress': 'bg-amber-50 text-amber-700 border-amber-200',
    Published: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Open: 'bg-blue-50 text-blue-700 border-blue-200',
    Billed: 'bg-slate-100 text-slate-700 border-slate-200',
  };
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${map[status] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
      {status}
    </span>
  );
}

export default function Statements() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'statements' | 'invoices'>('statements');
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const filteredInvoices = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return INVOICES;
    return INVOICES.filter(
      (row) =>
        row.id.toLowerCase().includes(q) ||
        row.trip.toLowerCase().includes(q) ||
        row.route.toLowerCase().includes(q)
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / rowsPerPage));
  const safePage = Math.min(page, totalPages);
  const pageRows = filteredInvoices.slice((safePage - 1) * rowsPerPage, safePage * rowsPerPage);

  return (
    <AppLayout>
      <div className="space-y-5 pb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
            Statements & Invoices
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            View consolidated monthly billing, itemized trip invoices, and payment receipts.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <IndianRupee className="h-5 w-5" />
            </div>
            <p className="mt-3 text-xs font-semibold text-slate-500">Current statement</p>
            <h3 className="mt-0.5 font-heading text-2xl font-bold text-slate-900">₹4,82,500</h3>
            <p className="mt-1 text-xs text-slate-400">October 2026 • 32 completed trips</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <p className="mt-3 text-xs font-semibold text-slate-500">Last published</p>
            <h3 className="mt-0.5 font-heading text-2xl font-bold text-slate-900">₹4,51,200</h3>
            <p className="mt-1 text-xs text-slate-400">September 2026 • due 15 Oct 2026</p>
          </div>
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Clock className="h-5 w-5" />
            </div>
            <p className="mt-3 text-xs font-semibold text-slate-500">Open invoices</p>
            <h3 className="mt-0.5 font-heading text-2xl font-bold text-slate-900">2</h3>
            <p className="mt-1 text-xs text-slate-400">₹42,700 pending consolidation</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="flex items-center gap-1 border-b border-slate-100 px-4 pt-4">
            {[
              { key: 'statements', label: 'Monthly statements' },
              { key: 'invoices', label: 'Trip invoices' },
            ].map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setTab(item.key as 'statements' | 'invoices')}
                className={`rounded-t-lg px-4 py-2.5 text-sm font-semibold cursor-pointer ${
                  tab === item.key ? 'bg-[#4f46e5] text-white' : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {tab === 'statements' ? (
            <div className="divide-y divide-slate-100">
              {STATEMENTS.map((row) => (
                <div key={row.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                      <FileText className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{row.period}</h4>
                        <StatusPill status={row.status} />
                      </div>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {row.id} • {row.trips} trips • Issued {row.issued} • Due {row.due}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <p className="font-heading text-base font-bold text-slate-900">{formatInr(row.amount)}</p>
                    <button
                      type="button"
                      onClick={() => alert(`Downloading ${row.id} PDF...`)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="px-4 py-4 border-b border-slate-100">
                <div className="relative max-w-md">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search invoice, trip, or route..."
                    className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead className="bg-slate-50/80 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-5 py-3 font-semibold">Invoice</th>
                      <th className="px-5 py-3 font-semibold">Trip</th>
                      <th className="px-5 py-3 font-semibold">Date</th>
                      <th className="px-5 py-3 font-semibold">Route</th>
                      <th className="px-5 py-3 font-semibold">Amount</th>
                      <th className="px-5 py-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pageRows.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-50/70">
                        <td className="px-5 py-3 font-semibold text-indigo-600">{row.id}</td>
                        <td className="px-5 py-3 text-slate-700">{row.trip}</td>
                        <td className="px-5 py-3 text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {row.date}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-slate-700">{row.route}</td>
                        <td className="px-5 py-3 font-semibold text-slate-900">{formatInr(row.amount)}</td>
                        <td className="px-5 py-3">
                          <StatusPill status={row.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-end gap-2 px-5 py-3 border-t border-slate-100">
                <button
                  type="button"
                  disabled={safePage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded-lg border border-slate-200 p-1.5 text-slate-500 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-xs text-slate-500">
                  Page {safePage} of {totalPages}
                </span>
                <button
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded-lg border border-slate-200 p-1.5 text-slate-500 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
