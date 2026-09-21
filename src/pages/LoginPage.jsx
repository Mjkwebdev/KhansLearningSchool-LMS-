import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  
  // Field values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Touched states (tracks if user has interacted with input)
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Live Validation Rules
  const validateEmail = (val) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!val) return 'Email address is required.';
    if (!emailRegex.test(val)) return 'Please enter a valid email address.';
    return '';
  };

  const validatePassword = (val) => {
    if (!val) return 'Password is required.';
    if (val.length < 6) return 'Password must be at least 6 characters.';
    return '';
  };

  // Dynamic live errors
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  // Form validity check
  const isFormValid = !emailError && !passwordError;

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    if (isFormValid) {
      console.log('Logging in with:', { email, password });
      alert('Login Successful!');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden font-sans">
      {/* Background Decorative Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-200/50 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-200/50 rounded-full blur-[128px] pointer-events-none" />
      
      {/* Container Card */}
      <div className="w-full max-w-md p-8 sm:p-10 mx-4 rounded-3xl bg-white/80 backdrop-blur-xl border border-slate-200 shadow-2xl shadow-slate-200/60 relative z-10">
        
        {/* Header / Branding */}
        <div className="flex flex-col items-center text-center mb-8">
          <img 
            src="/school_logo.png" 
            alt="Khan's Learning School Logo" 
            className="h-24 w-auto object-contain mb-3 drop-shadow-sm"
          />
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Khan's Learning School
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Portal Access & Management System
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          
          {/* Email Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className={`h-5 w-5 ${emailTouched && emailError ? 'text-rose-500' : ''}`} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (!emailTouched) setEmailTouched(true);
                }}
                onBlur={() => setEmailTouched(true)}
                placeholder="admin@khanslearning.edu"
                className={`w-full pl-11 pr-10 py-3 text-slate-900 placeholder-slate-400 rounded-xl border outline-none transition-all duration-200 text-sm ${
                  emailTouched && emailError
                    ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : emailTouched && !emailError
                    ? 'border-emerald-400 bg-emerald-50/20 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                    : 'bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white'
                }`}
              />
              {/* Validation Status Icon */}
              {emailTouched && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {emailError ? (
                    <AlertCircle className="h-5 w-5 text-rose-500" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  )}
                </div>
              )}
            </div>
            {/* Live Inline Error Message */}
            {emailTouched && emailError && (
              <p className="text-xs text-rose-500 mt-1.5 font-medium flex items-center gap-1">
                {emailError}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs text-indigo-600 hover:text-indigo-500 transition-colors">
                Forgot?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className={`h-5 w-5 ${passwordTouched && passwordError ? 'text-rose-500' : ''}`} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (!passwordTouched) setPasswordTouched(true);
                }}
                onBlur={() => setPasswordTouched(true)}
                placeholder="••••••••"
                className={`w-full pl-11 pr-16 py-3 text-slate-900 placeholder-slate-400 rounded-xl border outline-none transition-all duration-200 text-sm ${
                  passwordTouched && passwordError
                    ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
                    : passwordTouched && !passwordError
                    ? 'border-emerald-400 bg-emerald-50/20 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                    : 'bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white'
                }`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
                {/* Validation Status Icon */}
                {passwordTouched && (
                  passwordError ? (
                    <AlertCircle className="h-5 w-5 text-rose-500" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                  )
                )}
                {/* Password Toggle Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            {/* Live Inline Error Message */}
            {passwordTouched && passwordError && (
              <p className="text-xs text-rose-500 mt-1.5 font-medium flex items-center gap-1">
                {passwordError}
              </p>
            )}
          </div>

          {/* Remember Me Toggle */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 bg-slate-50 text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-0 cursor-pointer"
            />
            <label htmlFor="remember-me" className="ml-2.5 text-xs text-slate-600 cursor-pointer select-none">
              Remember me on this device
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={emailTouched && !isFormValid}
            className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 transition-all duration-150 flex items-center justify-center gap-2 group mt-2"
          >
            <span>Sign In to Portal</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-8">
          © {new Date().getFullYear()} Khan's Learning School. All rights reserved.
        </p>
      </div>
    </div>
  );
}