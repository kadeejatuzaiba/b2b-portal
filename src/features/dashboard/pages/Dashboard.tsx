import { NavLink } from 'react-router-dom';
import DashboardLayout from '../../../components/layout/AppLayout';
import {
  Truck,
  Package,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Clock,
  MapPin,
  User,
  Zap,
  Hexagon,
  BarChart2,
  Headphones,
  Bell,
} from 'lucide-react';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-5 pb-8">
        {/* 1. Hero Greeting Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 rounded-2xl bg-white border border-slate-200/80 p-5 sm:p-6 shadow-2xs">
          <div className="space-y-1 max-w-xl">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
              Good morning, <br className="hidden sm:inline" />
              <span className="text-slate-900">B2B Partner 👋</span>
            </h1>
            <p className="text-sm text-slate-500 font-normal">
              Here's what's happening with your orders and trips today.
            </p>
          </div>

          {/* Right Vector Illustration Graphic */}
          <div className="w-full md:w-auto flex justify-end">
            <div className="relative h-20 sm:h-22 w-full sm:w-80 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-blue-50/80 border border-blue-100/60 flex items-center justify-center overflow-hidden px-4">
              {/* Skyline subtle shapes */}
              <div className="absolute inset-0 flex items-end justify-center opacity-10 pointer-events-none">
                <div className="h-14 w-8 bg-indigo-900 rounded-t-sm mx-1"></div>
                <div className="h-18 w-12 bg-indigo-900 rounded-t-sm mx-1"></div>
                <div className="h-10 w-10 bg-indigo-900 rounded-t-sm mx-1"></div>
                <div className="h-16 w-14 bg-indigo-900 rounded-t-sm mx-1"></div>
              </div>

              {/* Road line */}
              <div className="absolute bottom-3.5 left-6 right-6 h-0.5 bg-blue-300/80"></div>

              {/* Truck and Vehicle Graphic */}
              <div className="relative z-10 flex items-end gap-3 pb-1">
                {/* Blue Freight Truck */}
                <div className="flex items-end">
                  <div className="h-9 w-15 bg-[#3525cd] rounded-md shadow-xs relative flex items-center justify-center">
                    <span className="text-[8px] font-bold text-white tracking-widest uppercase opacity-80">HIRED</span>
                    <div className="absolute -bottom-1.5 left-2 h-3.5 w-3.5 rounded-full bg-slate-900 border-2 border-white"></div>
                    <div className="absolute -bottom-1.5 right-2 h-3.5 w-3.5 rounded-full bg-slate-900 border-2 border-white"></div>
                  </div>
                  <div className="h-7 w-5.5 bg-[#4f46e5] rounded-r-md -ml-0.5 relative">
                    <div className="h-2.5 w-2.5 bg-blue-200 rounded-tl-sm ml-1 mt-1"></div>
                    <div className="absolute -bottom-1.5 right-1 h-3.5 w-3.5 rounded-full bg-slate-900 border-2 border-white"></div>
                  </div>
                </div>

                {/* White/Blue Passenger Car */}
                <div className="h-4.5 w-9 bg-white border border-slate-300 rounded-t-md shadow-2xs relative mb-0.5">
                  <div className="h-1.5 w-4.5 bg-sky-200 rounded-t-xs mx-auto mt-0.5"></div>
                  <div className="absolute -bottom-1.5 left-1 h-2.5 w-2.5 rounded-full bg-slate-900 border border-white"></div>
                  <div className="absolute -bottom-1.5 right-1 h-2.5 w-2.5 rounded-full bg-slate-900 border border-white"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Top 4 Metric KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Active Trips */}
          <div className="group rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Truck className="h-5 w-5" />
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-500">Active Trips</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mt-0.5">3</h3>
                <p className="text-xs text-slate-400 mt-1">2 ongoing • 1 scheduled</p>
              </div>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-3">
              <NavLink to="/trips" className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                View trips →
              </NavLink>
            </div>
          </div>

          {/* Card 2: Pending Orders */}
          <div className="group rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Package className="h-5 w-5" />
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-500">Pending Orders</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mt-0.5">4</h3>
                <p className="text-xs text-slate-400 mt-1">Waiting for HireD confirmation</p>
              </div>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-3">
              <NavLink to="/orders" className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                View orders →
              </NavLink>
            </div>
          </div>

          {/* Card 3: Completed Trips */}
          <div className="group rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-500">Completed Trips</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mt-0.5">32</h3>
                <p className="text-xs text-slate-400 mt-1">This month (Oct 2026)</p>
              </div>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-3">
              <NavLink to="/trips" className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                View trips →
              </NavLink>
            </div>
          </div>

          {/* Card 4: Current Statement */}
          <div className="group rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <span className="text-lg font-bold font-heading">₹</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
              </div>

              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-500">Current Statement</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading mt-0.5">₹4,82,500</h3>
                <p className="text-xs text-slate-400 mt-1">October 2026</p>
              </div>
            </div>

            <div className="mt-4 border-t border-slate-100 pt-3">
              <NavLink to="/statements" className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                View statement →
              </NavLink>
            </div>
          </div>
        </div>

        {/* 3. Combined Middle & Ongoing Section (2 Columns Left vs 1 Column Right) */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 items-start">
          {/* LEFT SIDE (2 cols): Graphs Row + Ongoing Trips */}
          <div className="lg:col-span-2 space-y-5">
            {/* 2 Graphs Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Completed Trips Bar Chart */}
              <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <BarChart2 className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 font-heading">Completed Trips</h3>
                  </div>

                  <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-1 text-xs font-medium text-slate-600 cursor-pointer">
                    <span>Last 4 months</span>
                    <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                </div>

                <p className="text-xs text-slate-400 mt-1">Number of completed trips in the last 4 months</p>

                {/* Bar Chart Graphics */}
                <div className="mt-4 flex items-end gap-3 h-40 pb-1 pt-2 px-1">
                  {/* Y-axis Labels */}
                  <div className="flex flex-col justify-between h-full text-[11px] font-medium text-slate-400 pr-1">
                    <span>40</span>
                    <span>30</span>
                    <span>20</span>
                    <span>10</span>
                    <span>0</span>
                  </div>

                  {/* Bars Grid */}
                  <div className="flex-1 flex items-end justify-around h-full border-b border-slate-100 pb-1">
                    {/* Jul: 25 */}
                    <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                      <span className="text-[11px] font-bold text-slate-700">25</span>
                      <div className="w-8 sm:w-10 bg-indigo-500/80 rounded-t-lg" style={{ height: '62.5%' }}></div>
                      <span className="text-xs font-medium text-slate-500">Jul</span>
                    </div>

                    {/* Aug: 28 */}
                    <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                      <span className="text-[11px] font-bold text-slate-700">28</span>
                      <div className="w-8 sm:w-10 bg-indigo-500/80 rounded-t-lg" style={{ height: '70%' }}></div>
                      <span className="text-xs font-medium text-slate-500">Aug</span>
                    </div>

                    {/* Sep: 30 */}
                    <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                      <span className="text-[11px] font-bold text-slate-700">30</span>
                      <div className="w-8 sm:w-10 bg-indigo-500/80 rounded-t-lg" style={{ height: '75%' }}></div>
                      <span className="text-xs font-medium text-slate-500">Sep</span>
                    </div>

                    {/* Oct: 32 (Active bar with gradient) */}
                    <div className="flex flex-col items-center gap-1.5 h-full justify-end">
                      <span className="text-[11px] font-bold text-indigo-700">32</span>
                      <div className="w-8 sm:w-10 bg-gradient-to-t from-indigo-700 to-[#4f46e5] rounded-t-lg shadow-xs" style={{ height: '80%' }}></div>
                      <span className="text-xs font-bold text-indigo-700">Oct</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Status Donut Chart */}
              <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Hexagon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 font-heading">Order Status</h3>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                </div>

                <p className="text-xs text-slate-400 mt-1">Total orders this month</p>

                {/* Donut Chart and Legend */}
                <div className="mt-4 flex items-center justify-between gap-3 h-40">
                  {/* SVG Donut Visual */}
                  <div className="relative flex h-32 w-32 items-center justify-center shrink-0">
                    <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                      {/* Background Ring */}
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#f1f5f9" strokeWidth="4.5" />
                      
                      {/* Accepted 50% (Green) */}
                      <circle
                        cx="18" cy="18" r="14" fill="none" stroke="#10b981" strokeWidth="4.5"
                        strokeDasharray="44 88" strokeDashoffset="0"
                      />
                      {/* Completed 28% (Purple) */}
                      <circle
                        cx="18" cy="18" r="14" fill="none" stroke="#8b5cf6" strokeWidth="4.5"
                        strokeDasharray="25 88" strokeDashoffset="-44"
                      />
                      {/* Received 17% (Blue) */}
                      <circle
                        cx="18" cy="18" r="14" fill="none" stroke="#3b82f6" strokeWidth="4.5"
                        strokeDasharray="15 88" strokeDashoffset="-69"
                      />
                      {/* Rejected 6% (Red) */}
                      <circle
                        cx="18" cy="18" r="14" fill="none" stroke="#ef4444" strokeWidth="4.5"
                        strokeDasharray="5 88" strokeDashoffset="-84"
                      />
                    </svg>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-black text-slate-900 font-heading leading-none">36</span>
                      <span className="text-[10px] font-medium text-slate-400 mt-0.5">Total Orders</span>
                    </div>
                  </div>

                  {/* Legend List */}
                  <div className="space-y-1.5 text-xs flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0"></span>
                        <span className="text-slate-600 font-medium truncate">Accepted</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-bold text-slate-900">18</span>
                        <span className="text-[10px] text-slate-400 ml-1">50%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="h-2 w-2 rounded-full bg-blue-500 shrink-0"></span>
                        <span className="text-slate-600 font-medium truncate">Received</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-bold text-slate-900">6</span>
                        <span className="text-[10px] text-slate-400 ml-1">17%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="h-2 w-2 rounded-full bg-rose-500 shrink-0"></span>
                        <span className="text-slate-600 font-medium truncate">Rejected</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-bold text-slate-900">2</span>
                        <span className="text-[10px] text-slate-400 ml-1">6%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="h-2 w-2 rounded-full bg-purple-500 shrink-0"></span>
                        <span className="text-slate-600 font-medium truncate">Completed</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-bold text-slate-900">10</span>
                        <span className="text-[10px] text-slate-400 ml-1">28%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ongoing Trips Container */}
            <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Truck className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">Ongoing Trips</h3>
                    <p className="text-xs text-slate-400">Live trips currently in progress or scheduled.</p>
                  </div>
                </div>

                <NavLink to="/trips" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                  View all trips →
                </NavLink>
              </div>

              {/* Trips List */}
              <div className="mt-3.5 space-y-3">
                {/* Trip 1 */}
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/40 p-3.5 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200/60">
                        Ongoing
                      </span>
                      <span className="text-sm font-bold text-indigo-600">TRP-20481</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => alert('Tracking Trip TRP-20481 live on map...')}
                      className="self-start sm:self-auto rounded-lg bg-[#4f46e5] px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-[#4338ca] transition-colors cursor-pointer"
                    >
                      Track Trip →
                    </button>
                  </div>

                  {/* Route and Driver details */}
                  <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium">Bhiwandi Fulfillment Hub</span>
                      <span className="text-slate-400">➔</span>
                      <span className="font-medium">Andheri Central DC</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 sm:justify-end">
                      <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-800">Ramesh Yadav</span>
                      <span className="rounded bg-emerald-50 px-1 py-0.5 text-[10px] text-emerald-700 font-medium">Ongoing</span>
                      <span>•</span>
                      <span className="truncate">Tata Prima 40T • MH 04 GP 8821</span>
                    </div>
                  </div>

                  {/* Progress ETA Bar */}
                  <div className="mt-2.5 border-t border-slate-200/60 pt-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-semibold text-slate-700">ETA: 04:15 PM</span>
                        <span>•</span>
                        <span>18 km remaining</span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full rounded-full bg-[#4f46e5]" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Trip 2 */}
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/40 p-3.5 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 border border-emerald-200/60">
                        Ongoing
                      </span>
                      <span className="text-sm font-bold text-indigo-600">TRP-20479</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => alert('Tracking Trip TRP-20479 live on map...')}
                      className="self-start sm:self-auto rounded-lg bg-[#4f46e5] px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-[#4338ca] transition-colors cursor-pointer"
                    >
                      Track Trip →
                    </button>
                  </div>

                  {/* Route and Driver details */}
                  <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium">Chakan Industrial Area</span>
                      <span className="text-slate-400">➔</span>
                      <span className="font-medium">Panvel Logistics Park</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 sm:justify-end">
                      <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-800">Suresh Patil</span>
                      <span className="rounded bg-emerald-50 px-1 py-0.5 text-[10px] text-emerald-700 font-medium">Ongoing</span>
                      <span>•</span>
                      <span className="truncate">19ft Container • MH 12 QN 4492</span>
                    </div>
                  </div>

                  {/* Progress ETA Bar */}
                  <div className="mt-2.5 border-t border-slate-200/60 pt-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-semibold text-slate-700">ETA: 01:15 PM</span>
                        <span>•</span>
                        <span>92 km remaining</span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                      <div className="h-full rounded-full bg-[#4f46e5]" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Trip 3: Scheduled */}
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/40 p-3.5 hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 border border-indigo-200/60">
                        Scheduled
                      </span>
                      <span className="text-sm font-bold text-indigo-600">TRP-20475</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => alert('Viewing details for scheduled trip TRP-20475...')}
                      className="self-start sm:self-auto rounded-lg bg-[#4f46e5] px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-[#4338ca] transition-colors cursor-pointer"
                    >
                      View Details →
                    </button>
                  </div>

                  {/* Route and Driver details */}
                  <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium">Taloja MIDC</span>
                      <span className="text-slate-400">➔</span>
                      <span className="font-medium">Nashik Warehouse Hub</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 sm:justify-end">
                      <User className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-800">Akshay More</span>
                      <span className="rounded bg-emerald-50 px-1 py-0.5 text-[10px] text-emerald-700 font-medium">✔ Verified</span>
                      <span>•</span>
                      <span className="truncate">32ft Reefer • MH 03 CB 7714</span>
                    </div>
                  </div>

                  {/* Scheduled Info */}
                  <div className="mt-2.5 border-t border-slate-200/60 pt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>Scheduled • Departs in 5h 12m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (1 col): Recent Updates Feed + Need Help */}
          <div className="space-y-5">
            {/* Recent Updates Feed Card */}
            <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Bell className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">Recent Updates</h3>
                </div>
                <NavLink to="/notifications" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                  View all →
                </NavLink>
              </div>

              {/* Timeline Items */}
              <div className="mt-3.5 space-y-3.5 text-xs">
                {/* 1 */}
                <div className="relative flex gap-3">
                  <div className="relative z-10 mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-900">Trip TRP-20481 started</h4>
                    <p className="text-slate-500 mt-0.5 leading-relaxed">Your driver started the trip from Bhiwandi Fulfillment Hub.</p>
                    <span className="text-[11px] text-slate-400 mt-0.5 block">14 min ago</span>
                  </div>
                </div>

                {/* 2 */}
                <div className="relative flex gap-3">
                  <div className="relative z-10 mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-900">Order #ORD-10250 accepted</h4>
                    <p className="text-slate-500 mt-0.5 leading-relaxed">Your order has been accepted and trip is being created.</p>
                    <span className="text-[11px] text-slate-400 mt-0.5 block">2 hrs ago</span>
                  </div>
                </div>

                {/* 3 */}
                <div className="relative flex gap-3">
                  <div className="relative z-10 mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-rose-500 ring-4 ring-rose-50"></div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-900">Order #ORD-10249 <span className="text-rose-600">rejected</span></h4>
                    <p className="text-slate-500 mt-0.5 leading-relaxed">Reason: Vehicle not available for requested slot.</p>
                    <span className="text-[11px] text-slate-400 mt-0.5 block">3 hrs ago</span>
                  </div>
                </div>

                {/* 4 */}
                <div className="relative flex gap-3">
                  <div className="relative z-10 mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-900">Trip TRP-20478 completed</h4>
                    <p className="text-slate-500 mt-0.5 leading-relaxed">Trip completed successfully and report is available.</p>
                    <span className="text-[11px] text-slate-400 mt-0.5 block">Yesterday</span>
                  </div>
                </div>

                {/* 5 */}
                <div className="relative flex gap-3">
                  <div className="relative z-10 mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-purple-500 ring-4 ring-purple-50"></div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-900">September 2026 statement published</h4>
                    <p className="text-slate-500 mt-0.5 leading-relaxed">Your statement is now available for download.</p>
                    <span className="text-[11px] text-slate-400 mt-0.5 block">Yesterday</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help? Box */}
            <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs flex flex-col items-center justify-center text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-indigo-600 mb-2.5 shadow-2xs">
                <Headphones className="h-5 w-5" />
              </div>

              <h3 className="text-base font-bold text-slate-900 font-heading">Need Help?</h3>
              <p className="text-xs text-slate-500 mt-0.5">We're here to support you.</p>

              <button
                type="button"
                onClick={() => alert('Opening HireD Dedicated Partner Concierge Support...')}
                className="mt-4 w-full rounded-xl border border-slate-200 bg-white py-2 px-4 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Contact HireD Support →
              </button>
            </div>
          </div>
        </div>

        {/* 4. Quick Access Cards */}
        <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
          <div className="flex items-center gap-2.5 mb-3.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Zap className="h-4.5 w-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-heading">Quick Access</h3>
              <p className="text-xs text-slate-400">Find what you need, faster.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            {/* Card 1 */}
            <NavLink
              to="/orders"
              className="group rounded-xl border border-slate-200/80 bg-slate-50/40 p-4 hover:bg-slate-50 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                  <Hexagon className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-heading mt-3">My Orders</h4>
                <p className="text-xs text-slate-500 mt-0.5">View and track your orders</p>
              </div>
              <div className="mt-3.5 text-xs font-semibold text-purple-600 group-hover:translate-x-1 transition-transform">
                →
              </div>
            </NavLink>

            {/* Card 2 */}
            <NavLink
              to="/trips"
              className="group rounded-xl border border-slate-200/80 bg-slate-50/40 p-4 hover:bg-slate-50 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <MapPin className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-heading mt-3">My Trips</h4>
                <p className="text-xs text-slate-500 mt-0.5">Track your ongoing & past trips</p>
              </div>
              <div className="mt-3.5 text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                →
              </div>
            </NavLink>

            {/* Card 3 */}
            <NavLink
              to="/statements"
              className="group rounded-xl border border-slate-200/80 bg-slate-50/40 p-4 hover:bg-slate-50 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <span className="text-sm font-bold">₹</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-heading mt-3">Statements & Invoices</h4>
                <p className="text-xs text-slate-500 mt-0.5">View monthly statements</p>
              </div>
              <div className="mt-3.5 text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                →
              </div>
            </NavLink>

            {/* Card 4 */}
            <NavLink
              to="/reports"
              className="group rounded-xl border border-slate-200/80 bg-slate-50/40 p-4 hover:bg-slate-50 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <BarChart2 className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-heading mt-3">Reports</h4>
                <p className="text-xs text-slate-500 mt-0.5">View trip reports & history</p>
              </div>
              <div className="mt-3.5 text-xs font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
                →
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
