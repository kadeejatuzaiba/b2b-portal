import { useState } from 'react';
import { Building2, User, Shield, Bell, Save } from 'lucide-react';
import AppLayout from '../../../components/layout/AppLayout';
import { useAuth } from '@/features/auth/AuthContext';
import type { CompanyProfile } from '@/types/company';

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

function Field({ label, value, onChange }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </label>
  );
}

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label className="flex items-center justify-between gap-3 text-sm text-slate-700 cursor-pointer">
      <span className="font-medium">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition cursor-pointer ${checked ? 'bg-[#4f46e5]' : 'bg-slate-200'}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition ${
            checked ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </button>
    </label>
  );
}

export default function Profile() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState<CompanyProfile>({
    company: 'ABC Logistics',
    gstin: '27AABCU9603R1ZM',
    billingEmail: user?.email || 'ops@abclogistics.in',
    phone: '+91 22 4156 2200',
    address: 'Plot 14, Bhiwandi Fulfillment Hub, Thane, Maharashtra 421302',
    dispatcherName: 'Ananya Patel',
    dispatcherRole: 'Head of Operations',
    notifyTrips: true,
    notifyBilling: true,
    notifyOrders: true,
  });

  const update = <K extends keyof CompanyProfile>(key: K, value: CompanyProfile[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <AppLayout>
      <div className="space-y-5 pb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 font-heading">
            Profile & Settings
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage company details, GST/billing info, authorized dispatchers, and preferences.
          </p>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-5">
            <section className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Building2 className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-bold text-slate-900 font-heading">Company details</h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Legal name" value={form.company} onChange={(v) => update('company', v)} />
                <Field label="GSTIN" value={form.gstin} onChange={(v) => update('gstin', v)} />
                <Field label="Billing email" value={form.billingEmail} onChange={(v) => update('billingEmail', v)} />
                <Field label="Phone" value={form.phone} onChange={(v) => update('phone', v)} />
                <div className="sm:col-span-2">
                  <Field label="Registered address" value={form.address} onChange={(v) => update('address', v)} />
                </div>
              </div>
            </section>

            <section className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <User className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-bold text-slate-900 font-heading">Authorized dispatcher</h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name" value={form.dispatcherName} onChange={(v) => update('dispatcherName', v)} />
                <Field label="Role" value={form.dispatcherRole} onChange={(v) => update('dispatcherRole', v)} />
              </div>
            </section>
          </div>

          <div className="space-y-5">
            <section className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Bell className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-bold text-slate-900 font-heading">Preferences</h2>
              </div>
              <div className="space-y-3">
                <Toggle
                  label="Trip live updates"
                  checked={form.notifyTrips}
                  onChange={(v) => update('notifyTrips', v)}
                />
                <Toggle
                  label="Order status emails"
                  checked={form.notifyOrders}
                  onChange={(v) => update('notifyOrders', v)}
                />
                <Toggle
                  label="Monthly statement alerts"
                  checked={form.notifyBilling}
                  onChange={(v) => update('notifyBilling', v)}
                />
              </div>
            </section>

            <section className="rounded-2xl bg-white border border-slate-200/80 p-5 shadow-2xs">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <Shield className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-bold text-slate-900 font-heading">Account</h2>
              </div>
              <p className="text-xs text-slate-500">
                Signed in as <span className="font-semibold text-slate-800">{form.billingEmail}</span> for ABC Logistics.
              </p>
              <button
                type="submit"
                className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#4f46e5] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4338ca] cursor-pointer"
              >
                <Save className="h-4 w-4" />
                Save changes
              </button>
              {saved && (
                <p className="mt-2 text-center text-xs font-medium text-emerald-600">Preferences saved.</p>
              )}
            </section>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
