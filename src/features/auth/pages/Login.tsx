import { useState, type FormEvent, type ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Clock3,
  Headphones,
  X,
} from 'lucide-react';
import { useAuth } from '../AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    if (!emailPattern.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }

    setError('');
    login(email.trim());
    navigate('/', { replace: true });
  };

  const handleReset = (e: FormEvent) => {
    e.preventDefault();

    if (!emailPattern.test(resetEmail.trim())) {
      return;
    }

    setResetSent(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white font-sans text-slate-900">

      {/* Decorative background circles */}
      <div className="pointer-events-none absolute -left-40 -top-32 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-blue-100/80 to-slate-50/40" />

      <div className="pointer-events-none absolute -bottom-56 -left-24 h-[420px] w-[420px] rounded-full border-[65px] border-blue-50/70" />

      {/* Main two-column layout */}
      <main className="relative grid min-h-screen grid-cols-1 lg:grid-cols-[50.6%_49.4%]">

        {/* LEFT: LOGIN FORM */}
        <section className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-10 lg:px-12 xl:px-16">

          <div className="w-full max-w-[512px]">

            {/* Logo */}
            <div className="mb-14">
              <img
                src="/logo.png"
                alt="HireD"
                className="h-[92px] w-auto max-w-[240px] object-contain object-left"
              />

              <p className="mt-1 text-[15px] font-medium tracking-wide text-slate-500">
                Smarter Logistics. Stronger Business.
              </p>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h1 className="font-heading text-[32px] font-bold leading-tight tracking-tight text-[#101c3d]">
                Welcome Back!
              </h1>

              <p className="mt-2 text-[15px] text-slate-500">
                Log in to your B2B partner account to continue.
              </p>
            </div>

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[15px] font-medium text-slate-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#20345f]" />

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white pl-14 pr-4 text-[14px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#5365ff] focus:ring-4 focus:ring-[#5365ff]/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-[15px] font-medium text-slate-700"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#20345f]" />

                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-[54px] w-full rounded-[16px] border border-slate-200 bg-white pl-14 pr-12 text-[14px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#5365ff] focus:ring-4 focus:ring-[#5365ff]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#20345f] hover:text-[#5365ff]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgot(true);
                      setResetSent(false);
                      setResetEmail(email);
                    }}
                    className="text-[14px] font-semibold text-[#405cff] hover:text-[#3046df]"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Validation error */}
              {error && (
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-600">
                  {error}
                </p>
              )}

              {/* Login button */}
              <button
                type="submit"
                className="flex h-[53px] w-full items-center justify-center gap-3 rounded-[15px] bg-gradient-to-r from-[#4055ff] to-[#405cff] text-[16px] font-semibold text-white transition hover:brightness-95"
              >
                Log In
                <ArrowRight className="h-5 w-5" />
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-300" />

              <span className="text-[12px] font-medium text-slate-400">
                OR
              </span>

              <div className="h-px flex-1 bg-slate-300" />
            </div>

            {/* Contact admin */}
            <p className="text-center text-[13px] text-slate-500">
              New to HireD?{' '}
              <a
                href="mailto:partners@hired.in"
                className="font-semibold text-[#405cff] hover:text-[#3046df]"
              >
                Contact your admin
              </a>
            </p>

          </div>
        </section>

        {/* RIGHT: LOGISTICS ILLUSTRATION */}
        <section className="relative hidden min-h-screen overflow-hidden rounded-l-[78px] bg-gradient-to-b from-[#b6d6ff] via-[#88b9fb] to-[#4c8ce9] lg:flex lg:flex-col">

          {/* Decorative circles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-16 top-[72%] h-64 w-64 rounded-full border-[35px] border-white/10" />

            <div className="absolute right-16 top-[26%] h-24 w-24 rounded-full bg-white/10" />
          </div>

          {/* Heading */}
          <div className="relative z-10 px-12 pt-12 xl:px-[9.5%] xl:pt-[12%]">
            <h2 className="font-heading max-w-[520px] text-[28px] font-bold leading-[1.3] tracking-tight text-[#091d65] xl:text-[32px]">
              Your Logistics Partner,
              <br />
              for a Smoother Tomorrow
            </h2>

            <p className="mt-4 max-w-[440px] text-[15px] leading-[1.8] text-[#40577f] xl:text-[16px]">
              Efficient transportation, trusted deliveries,
              <br className="hidden xl:block" />
              and seamless operations — all in one place.
            </p>
          </div>

          {/* Truck and car illustration */}
          <div className="pointer-events-none absolute inset-x-0 top-[30%] h-[43%]">
            <img
              src="/loginRightImg.png"
              alt="Blue logistics truck and white car on a highway"
              className="h-full w-full object-cover object-center"
            />
          </div>

          {/* Bottom feature section */}
          <div className="absolute inset-x-0 bottom-0 z-10 px-7 pb-[9%] pt-4 xl:px-10">

            <div className="grid grid-cols-3">

              {/* Safe and reliable */}
              <Feature
                icon={ShieldCheck}
                title="Safe & Reliable"
                subtitle="Your cargo, our priority."
              />

              {/* On-time delivery */}
              <Feature
                icon={Clock3}
                title="On-Time Delivery"
                subtitle="Because time matters."
              />

              {/* Dedicated support */}
              <Feature
                icon={Headphones}
                title="Dedicated Support"
                subtitle="Always here for you."
              />

            </div>
          </div>
        </section>

      </main>

      {/* Forgot password modal */}
      {showForgot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">

            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Reset your password
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Enter the email on your B2B partner account. We’ll send reset instructions.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForgot(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {resetSent ? (
              <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                If an account exists for {resetEmail}, a reset link has been sent.
              </p>
            ) : (
              <form onSubmit={handleReset} className="space-y-4">
                <input
                  type="email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="h-[50px] w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-[#5365ff] focus:ring-4 focus:ring-[#5365ff]/10"
                  required
                />

                <button
                  type="submit"
                  className="h-[50px] w-full rounded-xl bg-[#405cff] text-sm font-semibold text-white hover:bg-[#3046df]"
                >
                  Send reset link
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

interface FeatureProps {
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  subtitle: string;
}

function Feature({ icon: Icon, title, subtitle }: FeatureProps) {
  return (
    <div className="flex min-w-0 flex-col items-center px-2 text-center">

      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/25 text-white">
        <Icon className="h-7 w-7" strokeWidth={1.8} />
      </div>

      <p className="text-[13px] font-semibold text-white xl:text-[15px]">
        {title}
      </p>

      <p className="mt-1 text-[11px] text-white/80 xl:text-[12px]">
        {subtitle}
      </p>

    </div>
  );
}
