import { useMemo, useState } from 'react';
import {
  BarChart2,
  Download,
  MapPin,
  Clock,
  CheckCircle2,
  Truck,
  Filter,
} from 'lucide-react';
import AppLayout from '../../../components/layout/AppLayout';
import type { TripReportRow, SlaStatus, MonthData } from '../types';

const MONTHS: MonthData[] = [
  { label: 'Jul', value: 25 },
  { label: 'Aug', value: 28 },
  { label: 'Sep', value: 30 },
  { label: 'Oct', value: 32 },
];

const TRIP_REPORTS: TripReportRow[] = [
  { id: 'TRP-20481', date: '03 Oct 2026', route: 'Bhiwandi → Andheri', sla: 'On time', duration: '2h 30m', score: 98 },
  { id: 'TRP-20479', date: '03 Oct 2026', route: 'Chakan → Panvel', sla: 'In transit', duration: '—', score: 91 },
  { id: 'TRP-20478', date: '01 Oct 2026', route: 'Kurla → Wagholi', sla: 'On time', duration: '4h 10m', score: 96 },
  { id: 'TRP-20475', date: '02 Oct 2026', route: 'Taloja → Nashik', sla: 'Scheduled', duration: '—', score: 94 },
  { id: 'TRP-20460', date: '01 Oct 2026', route: 'Marol → Bhiwandi', sla: 'On time', duration: '4h 20m', score: 97 },
  { id: 'TRP-20455', date: '29 Sep 2026', route: 'JNPT → Nashik', sla: 'Delayed', duration: '6h 10m', score: 82 },
];

function SlaPill({ sla }: { sla: SlaStatus }) {
  const map: Record<SlaStatus, string> = {
    'On time': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Delayed: 'bg-rose-50 text-rose-700 border-rose-200',
    'In transit': 'bg-blue-50 text-blue-700 border-blue-200',
    Scheduled: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  };
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${map[sla]}`}>
      {sla}
    </span>
  );
}

export default function Reports() {
  const [range, setRange] = useState('Last 4 months');
  const [slaFilter, setSlaFilter] = useState<'All' | SlaStatus>('All');

  const rows = useMemo(() => {
    if (slaFilter === 'All') return TRIP_REPORTS;
    return TRIP_REPORTS.filter((r) => r.sla === slaFilter);
  }, [slaFilter]);

  return (
    <AppLayout>
      <div className="space-y-5 pb-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
              Reports & Analytics
            </h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Detailed trip history, fulfillment performance, and route optimization analysis.
            </p>
          </div>
          <button
            type="button"
            onClick={() => alert('Exporting performance report CSV...')}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#4f46e5] px-4 py-2 text-xs font-semibold text-white hover:bg-[#4338ca] cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            Export report
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'On-time rate', value: '94%', hint: 'Oct 2026', icon: CheckCircle2, tone: 'bg-emerald-50 text-emerald-600' },
            { label: 'Avg transit time', value: '4h 18m', hint: 'Across 32 trips', icon: Clock, tone: 'bg-blue-50 text-blue-600' },
            { label: 'Trips completed', value: '32', hint: 'This month', icon: Truck, tone: 'bg-indigo-50 text-indigo-600' },
            { label: 'Top corridor', value: 'Bhiwandi–Andheri', hint: '8 trips this month', icon: MapPin, tone: 'bg-purple-50 text-purple-600' },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.label} className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-xs font-semibold text-slate-500">{card.label}</p>
                <h3 className="mt-0.5 font-heading text-xl font-bold text-slate-900">{card.value}</h3>
                <p className="mt-1 text-xs text-slate-400">{card.hint}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <BarChart2 className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-heading">Completed trips</h3>
              </div>
              <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-1 text-xs font-medium text-slate-600 cursor-pointer"
              >
                <option>Last 4 months</option>
                <option>This quarter</option>
                <option>This year</option>
              </select>
            </div>
            <p className="text-xs text-slate-400 mt-1">Number of completed trips in the last 4 months</p>
            <div className="mt-4 flex h-44 items-end gap-3 px-1 pb-1 pt-2">
              <div className="flex h-full flex-col justify-between pr-1 text-[11px] font-medium text-slate-400">
                <span>40</span>
                <span>30</span>
                <span>20</span>
                <span>10</span>
                <span>0</span>
              </div>
              <div className="flex h-full flex-1 items-end justify-around border-b border-slate-100 pb-1">
                {MONTHS.map((m) => (
                  <div key={m.label} className="flex h-full flex-col items-center justify-end gap-1.5">
                    <span className="text-[11px] font-bold text-slate-700">{m.value}</span>
                    <div
                      className={`w-10 rounded-t-lg ${m.label === 'Oct' ? 'bg-gradient-to-t from-indigo-700 to-[#4f46e5]' : 'bg-indigo-500/80'}`}
                      style={{ height: `${(m.value / 40) * 100}%` }}
                    />
                    <span className="text-xs font-medium text-slate-500">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 font-heading">Fulfillment mix</h3>
            <p className="text-xs text-slate-400 mt-1">Share of completed trips by service type</p>
            <div className="mt-5 space-y-3">
              {[
                { label: 'Standard Truckload', pct: 42, color: 'bg-[#4f46e5]' },
                { label: 'Express Parcel', pct: 28, color: 'bg-blue-500' },
                { label: 'Cold Chain', pct: 18, color: 'bg-emerald-500' },
                { label: 'Heavy Haulage', pct: 12, color: 'bg-amber-500' },
              ].map((row) => (
                <div key={row.label}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-600">{row.label}</span>
                    <span className="font-bold text-slate-900">{row.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-heading">Trip performance history</h3>
              <p className="text-xs text-slate-400">SLA outcome and duration for recent trips</p>
            </div>
            <div className="relative">
              <Filter className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <select
                value={slaFilter}
                onChange={(e) => setSlaFilter(e.target.value as 'All' | SlaStatus)}
                className="appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-8 pr-8 text-xs font-medium text-slate-700 cursor-pointer"
              >
                {['All', 'On time', 'Delayed', 'In transit', 'Scheduled'].map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50/80 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Trip</th>
                  <th className="px-5 py-3 font-semibold">Date</th>
                  <th className="px-5 py-3 font-semibold">Route</th>
                  <th className="px-5 py-3 font-semibold">SLA</th>
                  <th className="px-5 py-3 font-semibold">Duration</th>
                  <th className="px-5 py-3 font-semibold">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-3 font-semibold text-indigo-600">{row.id}</td>
                    <td className="px-5 py-3 text-slate-500">{row.date}</td>
                    <td className="px-5 py-3 text-slate-700">{row.route}</td>
                    <td className="px-5 py-3">
                      <SlaPill sla={row.sla} />
                    </td>
                    <td className="px-5 py-3 text-slate-700">{row.duration}</td>
                    <td className="px-5 py-3 font-bold text-slate-900">{row.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
