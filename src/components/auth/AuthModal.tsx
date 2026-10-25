import React, { useState, useEffect } from 'react';
import {
  X,
  LogIn,
  UserPlus,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  KeyRound,
  Repeat,
  Info
} from 'lucide-react';

export type AuthMode = 'login' | 'signup' | 'forgot-password';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: AuthMode;
  onClose: () => void;
}

interface ValidationErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Password Visibility Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validation & Submission States
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status Notice State (Explaining demo mode as per requirements 12 & 13)
  const [backendNotice, setBackendNotice] = useState<{
    type: 'login' | 'signup' | 'forgot-password';
    title: string;
    description: string;
    submittedEmail: string;
    submittedName?: string;
  } | null>(null);

  // Sync mode whenever initialMode changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrors({});
      setBackendNotice(null);
    }
  }, [isOpen, initialMode]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Validation Logic
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    // Forgot password only requires email
    if (mode === 'forgot-password') {
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long.';
    }

    // Sign Up specific validations
    if (mode === 'signup') {
      if (!fullName.trim()) {
        newErrors.fullName = 'Full name is required.';
      } else if (fullName.trim().length < 2) {
        newErrors.fullName = 'Name must be at least 2 characters long.';
      }

      if (!confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password.';
      } else if (confirmPassword !== password) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }

      if (!agreedToTerms) {
        newErrors.terms = 'You must agree to the Terms of Service and Privacy Policy to create an account.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate validation verification delay
    setTimeout(() => {
      setIsSubmitting(false);

      if (mode === 'login') {
        setBackendNotice({
          type: 'login',
          title: 'Client Validation Succeeded',
          description:
            'Your email format and password meet the security schema! Real backend authentication (Supabase / Firebase / Auth0) will be configured in the next phase. Per security guidelines, no database is connected yet and you will not be logged into a fake session.',
          submittedEmail: email,
        });
      } else if (mode === 'signup') {
        setBackendNotice({
          type: 'signup',
          title: 'Registration Validated',
          description:
            'All registration details, password requirements, and terms agreements are valid. Real user registration with encrypted credentials will be connected once the backend auth service is integrated. No fake user was created.',
          submittedEmail: email,
          submittedName: fullName,
        });
      } else if (mode === 'forgot-password') {
        setBackendNotice({
          type: 'forgot-password',
          title: 'Recovery Request Validated',
          description:
            'A valid password reset request was simulated. In production, a secure, time-sensitive reset link will be dispatched via an email service (such as Resend or SendGrid). No email was dispatched in this preview.',
          submittedEmail: email,
        });
      }
    }, 400);
  };

  const resetFormState = (newMode: AuthMode) => {
    setMode(newMode);
    setErrors({});
    setBackendNotice(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl p-6 sm:p-8 text-slate-100 my-auto transition-all animate-scale-in">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/20 mb-3">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Repeat className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <span className="text-xl font-black font-heading tracking-tight text-white flex items-center gap-1">
            Rent<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Buddy</span>
          </span>
          <p className="text-xs text-slate-400 mt-1">
            {mode === 'login' && 'Welcome back! Sign in to access your rentals and listings'}
            {mode === 'signup' && 'Create your RentBuddy account to start renting and lending'}
            {mode === 'forgot-password' && 'Reset your password with your verified email'}
          </p>
        </div>

        {/* Tab Switcher: Login / Sign Up */}
        {mode !== 'forgot-password' && (
          <div className="grid grid-cols-2 p-1 mb-6 bg-slate-950 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => resetFormState('login')}
              className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Log In</span>
            </button>
            <button
              type="button"
              onClick={() => resetFormState('signup')}
              className={`py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </button>
          </div>
        )}

        {/* Notice State (Displayed after valid submission to explain backend authentication is under construction) */}
        {backendNotice ? (
          <div className="space-y-4 py-2 animate-fade-in">
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-left">
              <div className="flex items-center gap-2.5 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <h4 className="text-sm font-bold text-white">{backendNotice.title}</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {backendNotice.description}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-emerald-300/90 space-y-1">
                <div>
                  <span className="font-semibold text-slate-400">Validated Email:</span>{' '}
                  <span className="font-mono text-emerald-300">{backendNotice.submittedEmail}</span>
                </div>
                {backendNotice.submittedName && (
                  <div>
                    <span className="font-semibold text-slate-400">Full Name:</span>{' '}
                    <span className="text-slate-200">{backendNotice.submittedName}</span>
                  </div>
                )}
                <div>
                  <span className="font-semibold text-slate-400">Status:</span>{' '}
                  <span className="text-amber-300 font-semibold">Backend Integration Pending</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
              <Info className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Real database authentication and sessions will be integrated without fake login states.</span>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setBackendNotice(null)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-700 hover:border-slate-600 bg-slate-800/80 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors"
              >
                Back to Form
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-400 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Main Interactive Form */
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            
            {/* Full Name (Sign Up only) */}
            {mode === 'signup' && (
              <div>
                <label
                  htmlFor="signup-fullname"
                  className="block text-xs font-semibold text-slate-300 mb-1"
                >
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="signup-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    placeholder="e.g. Adarsh Sharma"
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                      errors.fullName
                        ? 'border-rose-500 ring-1 ring-rose-500/50'
                        : 'border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50'
                    }`}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'fullname-error' : undefined}
                  />
                </div>
                {errors.fullName && (
                  <p id="fullname-error" className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.fullName}</span>
                  </p>
                )}
              </div>
            )}

            {/* Email Address */}
            <div>
              <label
                htmlFor="auth-email"
                className="block text-xs font-semibold text-slate-300 mb-1"
              >
                Email Address <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: undefined });
                  }}
                  placeholder="name@example.com"
                  autoComplete="email"
                  className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                    errors.email
                      ? 'border-rose-500 ring-1 ring-rose-500/50'
                      : 'border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50'
                  }`}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password (Login & Sign Up only) */}
            {mode !== 'forgot-password' && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="auth-password"
                    className="block text-xs font-semibold text-slate-300"
                  >
                    Password <span className="text-rose-400">*</span>
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => resetFormState('forgot-password')}
                      className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors font-medium cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: undefined });
                    }}
                    placeholder={mode === 'signup' ? 'At least 8 characters' : 'Enter your password'}
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    className={`w-full pl-10 pr-11 py-2.5 bg-slate-950 border rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                      errors.password
                        ? 'border-rose-500 ring-1 ring-rose-500/50'
                        : 'border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50'
                    }`}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
                    title={showPassword ? 'Hide password' : 'Show password'}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p id="password-error" className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.password}</span>
                  </p>
                )}
              </div>
            )}

            {/* Confirm Password (Sign Up only) */}
            {mode === 'signup' && (
              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="block text-xs font-semibold text-slate-300 mb-1"
                >
                  Confirm Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                    }}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    className={`w-full pl-10 pr-11 py-2.5 bg-slate-950 border rounded-xl text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
                      errors.confirmPassword
                        ? 'border-rose-500 ring-1 ring-rose-500/50'
                        : 'border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/50'
                    }`}
                    aria-invalid={Boolean(errors.confirmPassword)}
                    aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors p-1"
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p id="confirm-password-error" className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.confirmPassword}</span>
                  </p>
                )}
              </div>
            )}

            {/* Terms and Conditions Checkbox (Sign Up only) */}
            {mode === 'signup' && (
              <div>
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => {
                      setAgreedToTerms(e.target.checked);
                      if (errors.terms) setErrors({ ...errors, terms: undefined });
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-slate-700 text-emerald-500 bg-slate-950 focus:ring-emerald-500/30 cursor-pointer accent-emerald-500"
                  />
                  <span className="text-[11px] text-slate-300 leading-snug">
                    I agree to RentBuddy's{' '}
                    <span className="text-emerald-400 underline underline-offset-2">Terms of Service</span>,{' '}
                    <span className="text-emerald-400 underline underline-offset-2">Rental Policies</span>, and{' '}
                    <span className="text-emerald-400 underline underline-offset-2">Privacy Policy</span>.
                  </span>
                </label>
                {errors.terms && (
                  <p className="mt-1 text-[11px] text-rose-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>{errors.terms}</span>
                  </p>
                )}
              </div>
            )}

            {/* Submit CTA Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' && (
                    <>
                      <span>Log In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                  {mode === 'signup' && (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                  {mode === 'forgot-password' && (
                    <>
                      <span>Send Reset Instructions</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </>
              )}
            </button>

            {/* Switch between Login and Sign Up / Back to Login */}
            <div className="pt-2 text-center text-xs text-slate-400">
              {mode === 'login' && (
                <p>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => resetFormState('signup')}
                    className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline transition-colors cursor-pointer"
                  >
                    Sign Up
                  </button>
                </p>
              )}
              {mode === 'signup' && (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => resetFormState('login')}
                    className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline transition-colors cursor-pointer"
                  >
                    Log In
                  </button>
                </p>
              )}
              {mode === 'forgot-password' && (
                <button
                  type="button"
                  onClick={() => resetFormState('login')}
                  className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline transition-colors cursor-pointer"
                >
                  &larr; Back to Log In
                </button>
              )}
            </div>

            {/* Platform Guarantee Pill */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Verified Identity Escrow Protection • 100% Encrypted</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
