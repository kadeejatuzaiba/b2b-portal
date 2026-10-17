import { useState } from 'react';
import {
  X,
  Search,
  Calendar,
  Clock,
  Truck,
  Package,
  User,
  Phone,
  Hash,
  ChevronDown,
  ArrowRight,
  Info,
  CheckCircle2,
  FileText,
  Send,
} from 'lucide-react';
import type { VehicleOption } from '../types';

/* ─────────────────────────────────────────────
   Vehicle cards data
────────────────────────────────────────────── */
const VEHICLE_OPTIONS: VehicleOption[] = [
  {
    id: 'open-14ft',
    label: '14ft Open Body',
    capacity: '3.5 tonnes capacity',
    note: 'Ideal for local deliveries',
    popular: false,
  },
  {
    id: 'container-19ft',
    label: '19ft Container',
    capacity: '7.5 tonnes capacity',
    note: 'Recommended for retail goods',
    popular: true,
  },
  {
    id: 'multiaxle-32ft',
    label: '32ft Multi-Axle',
    capacity: '15+ tonnes capacity',
    note: 'Heavy freight & inter-city',
    popular: false,
  },
];

const CARGO_TYPES: string[] = [
  'Retail FMCG / Dry Goods',
  'Cold Chain / Perishables',
  'Industrial Equipment',
  'Pharma / Healthcare',
  'E-commerce Parcels',
  'Construction Materials',
  'Automotive Parts',
  'Electronics / White Goods',
];

/* ─────────────────────────────────────────────
   Section Header helper
────────────────────────────────────────────── */
interface SectionHeaderProps {
  number: number;
  title: string;
  subtitle: string;
}

function SectionHeader({ number, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#4f46e5] text-white text-sm font-bold shadow-sm">
        {number}
      </div>
      <div>
        <h3 className="text-base font-bold text-slate-900 leading-tight">{title}</h3>
        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Field label helper
────────────────────────────────────────────── */
interface FieldLabelProps {
  children: React.ReactNode;
}

function FieldLabel({ children }: FieldLabelProps) {
  return (
    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
      {children}
    </label>
  );
}

/* ─────────────────────────────────────────────
   Input with leading icon helper
────────────────────────────────────────────── */
interface IconInputProps {
  icon: React.ComponentType<{ className?: string }>;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function IconInput({ icon: Icon, placeholder, value, onChange, type = 'text' }: IconInputProps) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
        <Icon className="h-4 w-4" />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Route Preview SVG Map
────────────────────────────────────────────── */
function RoutePreview() {
  return (
    <div className="flex flex-col h-full">
      <p className="text-xs font-semibold text-slate-600 mb-2">Route Preview</p>
      <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden min-h-[160px] relative">
        <svg
          viewBox="0 0 220 170"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Map background */}
          <rect width="220" height="170" fill="#e8eef4" />

          {/* Road grid lines */}
          <line x1="0" y1="55" x2="220" y2="55" stroke="#d0dae5" strokeWidth="6" />
          <line x1="0" y1="110" x2="220" y2="110" stroke="#d0dae5" strokeWidth="4" />
          <line x1="70" y1="0" x2="70" y2="170" stroke="#d0dae5" strokeWidth="4" />
          <line x1="150" y1="0" x2="150" y2="170" stroke="#d0dae5" strokeWidth="3" />

          {/* Main route curve */}
          <path
            d="M 170 30 C 170 75 80 95 55 140"
            fill="none"
            stroke="#4f46e5"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Pickup dot - Bhiwandi */}
          <circle cx="170" cy="30" r="8" fill="#10b981" />
          <circle cx="170" cy="30" r="4" fill="white" />
          <text x="110" y="26" fontSize="9" fill="#1e293b" fontWeight="600">Bhiwandi</text>

          {/* Drop dot - Andheri */}
          <circle cx="55" cy="140" r="8" fill="#4f46e5" />
          <circle cx="55" cy="140" r="4" fill="white" />
          <text x="65" y="145" fontSize="9" fill="#1e293b" fontWeight="600">Andheri</text>

          {/* Distance badge */}
          <rect x="85" y="76" width="50" height="18" rx="9" fill="white" stroke="#e2e8f0" />
          <text x="110" y="88" fontSize="8.5" fill="#64748b" textAnchor="middle" fontWeight="500">~ 46 km</text>
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Modal Component
────────────────────────────────────────────── */
export interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateOrderModal({ isOpen, onClose }: CreateOrderModalProps) {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [scheduledDate, setScheduledDate] = useState('2026-10-02');
  const [pickupTime, setPickupTime] = useState('14:30');
  const [selectedVehicle, setSelectedVehicle] = useState('container-19ft');
  const [cargoType, setCargoType] = useState('Retail FMCG / Dry Goods');
  const [specialNotes, setSpecialNotes] = useState(
    'Dock gate 3 loading; palletized cargo, tarpaulin cover required if raining'
  );
  const [contactPerson, setContactPerson] = useState('Manoj Sawant');
  const [contactPhone, setContactPhone] = useState('+91 98702 32311');
  const [poNumber, setPoNumber] = useState('PO-2026-OCT-8102');

  if (!isOpen) return null;

  const handleSubmit = () => {
    const vehicleLabel = VEHICLE_OPTIONS.find((v) => v.id === selectedVehicle)?.label;
    alert(
      `Order submitted successfully!\n\nVehicle: ${vehicleLabel}\nRef: ${poNumber}\n\nHireD Operations will review and assign a driver shortly.`
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/50 backdrop-blur-sm p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Panel */}
      <div className="relative w-full max-w-3xl my-6 rounded-2xl bg-[#f6f7fb] border border-slate-200 shadow-2xl flex flex-col">

        {/* Modal Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-5">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
              Create New Order
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Provide your trip details and requirements. HireD will review and confirm your order.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 ml-4">
            <span className="rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              Step 1 of 3
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-4">

          {/* == SECTION 1: Trip & Route Details == */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs">
            <SectionHeader
              number={1}
              title="Trip & Route Details"
              subtitle="Tell us where and when the service is required."
            />

            {/* Route summary bar */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl bg-slate-50 border border-slate-200 p-3.5 mb-5">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-0.5">
                  ● PICKUP
                </p>
                <p className="text-sm font-bold text-slate-900 truncate">Bhiwandi Fulfillment H…</p>
                <p className="text-xs text-slate-500">Bhiwandi, Maharashtra</p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-500 shrink-0">
                <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                <span className="font-medium">~ 46 km</span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 mb-0.5">
                  ● DROP
                </p>
                <p className="text-sm font-bold text-slate-900 truncate">Andheri Central …</p>
                <p className="text-xs text-slate-500">Andheri East, Mumbai</p>
              </div>
            </div>

            {/* Location inputs + Route Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel>Pickup Location</FieldLabel>
                    <IconInput
                      icon={Search}
                      placeholder="Search pickup location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                    />
                  </div>
                  <div>
                    <FieldLabel>Drop Location</FieldLabel>
                    <IconInput
                      icon={Search}
                      placeholder="Search drop location"
                      value={drop}
                      onChange={(e) => setDrop(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <FieldLabel>Scheduled Pickup Date</FieldLabel>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        <Calendar className="h-4 w-4" />
                      </div>
                      <input
                        type="date"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all appearance-none"
                      />
                    </div>
                  </div>
                  <div>
                    <FieldLabel>Pickup Time</FieldLabel>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                        <Clock className="h-4 w-4" />
                      </div>
                      <input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all appearance-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="min-h-[180px]">
                <RoutePreview />
              </div>
            </div>
          </div>

          {/* == SECTION 2: Vehicle & Service == */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs">
            <SectionHeader
              number={2}
              title="Vehicle & Service Details"
              subtitle="Select the vehicle, cargo and service specifications."
            />

            {/* Vehicle cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              {VEHICLE_OPTIONS.map((vehicle) => {
                const isActive = selectedVehicle === vehicle.id;
                return (
                  <button
                    key={vehicle.id}
                    type="button"
                    onClick={() => setSelectedVehicle(vehicle.id)}
                    className={`relative rounded-xl border-2 p-4 text-left transition-all focus:outline-none ${
                      isActive
                        ? 'border-[#4f46e5] bg-indigo-50/60 shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                    }`}
                  >
                    {isActive && (
                      <span className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#4f46e5] text-white">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                    )}

                    {vehicle.popular && (
                      <span className="mb-2 inline-block rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                        Popular
                      </span>
                    )}

                    <div
                      className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl border ${
                        isActive ? 'border-indigo-200 bg-indigo-100' : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <Truck className={`h-5 w-5 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
                    </div>

                    <p className={`text-sm font-bold ${isActive ? 'text-indigo-800' : 'text-slate-900'}`}>
                      {vehicle.label}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">{vehicle.capacity}</p>
                    <p className={`mt-1.5 text-xs font-medium ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                      {vehicle.note}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Cargo Type */}
            <div className="mb-4">
              <FieldLabel>Cargo Type / Commodity</FieldLabel>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Package className="h-4 w-4" />
                </div>
                <select
                  value={cargoType}
                  onChange={(e) => setCargoType(e.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-10 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
                >
                  {CARGO_TYPES.map((ct) => (
                    <option key={ct} value={ct}>{ct}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Special Notes */}
            <div>
              <FieldLabel>Special Handling Notes / Dispatch Instructions</FieldLabel>
              <div className="relative">
                <div className="pointer-events-none absolute top-3 left-3 text-slate-400">
                  <FileText className="h-4 w-4" />
                </div>
                <textarea
                  rows={3}
                  maxLength={500}
                  placeholder="e.g. Dock gate 3 loading; palletized cargo, tarpaulin cover required if raining"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                />
                <span className="absolute bottom-2 right-3 text-[10px] text-slate-400">
                  {specialNotes.length} / 500
                </span>
              </div>
            </div>
          </div>

          {/* == SECTION 3: Contact & Reference == */}
          <div className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs">
            <SectionHeader
              number={3}
              title="Contact & Reference Details"
              subtitle="Personnel authorized for vehicle ingress and loading sign-off."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <FieldLabel>Site Supervisor / Contact Person</FieldLabel>
                <IconInput
                  icon={User}
                  placeholder="Full name"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                />
              </div>
              <div>
                <FieldLabel>Contact Phone Number</FieldLabel>
                <IconInput
                  icon={Phone}
                  placeholder="+91 XXXXX XXXXX"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  type="tel"
                />
              </div>
            </div>

            <div className="mb-4">
              <FieldLabel>Additional Internal Reference / PO Number</FieldLabel>
              <IconInput
                icon={Hash}
                placeholder="e.g. PO-2026-OCT-8102"
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
              />
              <p className="mt-1.5 text-xs text-slate-400">
                This reference will be indexed across your verified trip logs and monthly statements.
              </p>
            </div>

            {/* Automated Assignment Protocol info box */}
            <div className="flex gap-3 rounded-xl bg-indigo-50/70 border border-indigo-100 p-4">
              <div className="shrink-0 mt-0.5">
                <Info className="h-4 w-4 text-indigo-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-indigo-800">Automated Assignment Protocol</p>
                <p className="text-xs text-indigo-600 mt-0.5 leading-relaxed">
                  Once submitted, HireD Operations will review your order. If accepted, a driver
                  will be assigned by HireD Operations and you will receive an update.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-slate-200 bg-white px-6 py-4 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            Cancel / Save Draft
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 rounded-xl bg-[#4f46e5] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#4338ca] active:scale-[0.98] transition-all"
          >
            <Send className="h-4 w-4" />
            Submit Order to HireD
          </button>
        </div>
      </div>
    </div>
  );
}
