import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  BookOpen, 
  User, 
  Users, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2,
  Sparkles,
  Award,
  BookOpenCheck,
  ShieldAlert,
  Check
} from 'lucide-react';

const roles = [
  { 
    id: 'admin', 
    label: 'Admin', 
    icon: ShieldCheck, 
    desc: 'Full System Control', 
    bgGradient: 'from-blue-500 to-indigo-600', 
    borderColor: 'border-blue-500'
  },
  { 
    id: 'teacher', 
    label: 'Teacher', 
    icon: BookOpen, 
    desc: 'Grades & Attendance', 
    bgGradient: 'from-indigo-500 to-violet-600', 
    borderColor: 'border-indigo-500'
  },
  { 
    id: 'student', 
    label: 'Student', 
    icon: User, 
    desc: 'Assignments & Portal', 
    bgGradient: 'from-violet-500 to-purple-600', 
    borderColor: 'border-violet-500'
  },
  { 
    id: 'parent', 
    label: 'Parent', 
    icon: Users, 
    desc: 'Fees & Progress', 
    bgGradient: 'from-purple-500 to-pink-600', 
    borderColor: 'border-purple-500'
  },
];

export default function LoginPage() {
  const navigate = useNavigate();
  
  const [selectedRole, setSelectedRole] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

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

  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  const isFormValid = !emailError && !passwordError;

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    if (isFormValid) {
      setIsLoading(true);
      setTimeout(() => {
        console.log(`Successfully authenticated as ${selectedRole}`, { email });
        navigate('/classes');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white text-slate-900 font-sans overflow-hidden selection:bg-indigo-600 selection:text-white animate-fade-in duration-500">
      
      {/* ================= LEFT FULL-HEIGHT BRANDING PANEL ================= */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-12 flex-col justify-between text-white relative overflow-hidden shadow-2xl animate-fade-in duration-700">
        
        {/* Dynamic Glowing Mesh Elements */}
        <div className="absolute -top-20 -left-20 w-[450px] h-[450px] rounded-full bg-white/10 blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] rounded-full bg-black/20 blur-[120px] pointer-events-none" />

        {/* Top Brand Tag with Custom school_logo.png */}
        <div className="flex items-center justify-between relative z-10 animate-fade-in-up duration-500">
          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-xl px-4 py-2.5 rounded-2xl border border-white/20 shadow-lg hover:bg-white/20 transition-all">
            <img 
              src="/school_logo.png" 
              alt="Khan's Learning Logo" 
              className="w-10 h-10 object-contain drop-shadow-sm"
            />
            <div>
              <h1 className="font-bold tracking-tight text-sm flex items-center gap-1.5 text-white">
                Khan's Learning <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              </h1>
              <p className="text-[10px] text-indigo-200 font-medium tracking-wide">Enterprise Ecosystem</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-100 text-[11px] font-semibold tracking-wider uppercase backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Secure Portal v3.5
          </span>
        </div>

        {/* Center Content with High-End Typography and Staggered Animations */}
        <div className="my-auto py-10 relative z-10 space-y-6">
          
          {/* Main Headline & Subtext Animation */}
          <div className="space-y-3 animate-fade-in-up duration-700 delay-100">
            <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
              Excellence in education, <span className="text-amber-300 inline-block animate-pulse">simplified.</span>
            </h2>
            <p className="text-indigo-100/90 text-sm leading-relaxed max-w-md pt-1">
              A lightning-fast, secure digital workspace built for high-performance administration, real-time grading, and seamless parent connectivity.
            </p>
          </div>

          {/* Interactive Feature Glass Cards Animation */}
          <div className="space-y-3 pt-2 animate-fade-in-up duration-700 delay-200">
            <div className="flex items-center gap-4 bg-white/10 hover:bg-white/15 transition-all backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-lg group">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <BookOpenCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-xs text-white">Real-Time Attendance & Grades</p>
                  <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-2 py-0.5 rounded-full">Synced</span>
                </div>
                <p className="text-[11px] text-indigo-200/80 truncate mt-0.5">Automated matrix calculation & instant gradebook entry</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 hover:bg-white/15 transition-all backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-lg group">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-amber-300 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-xs text-white">Automated Finance & Challans</p>
                  <span className="text-[10px] bg-purple-400/20 text-purple-200 px-2 py-0.5 rounded-full">Secure</span>
                </div>
                <p className="text-[11px] text-indigo-200/80 truncate mt-0.5">Instant fee verification, ledger generation & tracking</p>
              </div>
            </div>
          </div>

          {/* Live System Stats Bar Animation */}
          <div className="grid grid-cols-3 gap-3 pt-2 animate-fade-in-up duration-700 delay-300">
            <div className="bg-white/10 border border-white/15 p-3 rounded-xl backdrop-blur-md shadow-sm hover:bg-white/15 transition-all">
              <p className="text-base font-extrabold text-white">99.9%</p>
              <p className="text-[10px] text-indigo-200 font-medium">Uptime SLA</p>
            </div>
            <div className="bg-white/10 border border-white/15 p-3 rounded-xl backdrop-blur-md shadow-sm hover:bg-white/15 transition-all">
              <p className="text-base font-extrabold text-white">4.9/5</p>
              <p className="text-[10px] text-indigo-200 font-medium">User Rating</p>
            </div>
            <div className="bg-white/10 border border-white/15 p-3 rounded-xl backdrop-blur-md shadow-sm hover:bg-white/15 transition-all">
              <p className="text-base font-extrabold text-white">256-bit</p>
              <p className="text-[10px] text-indigo-200 font-medium">Encrypted</p>
            </div>
          </div>
        </div>

        {/* Footer Copyright Animation */}
        <div className="text-xs text-indigo-200 font-medium relative z-10 flex items-center justify-between border-t border-white/15 pt-4 animate-fade-in duration-700 delay-400">
          <span>© {new Date().getFullYear()} Khan's Learning. All rights reserved.</span>
          <span className="flex items-center gap-1 text-[10px] bg-white/10 px-2 py-1 rounded-md text-emerald-300">
            <ShieldAlert className="w-3 h-3" /> Secure Node Active
          </span>
        </div>
      </div>

      {/* ================= RIGHT FULL-HEIGHT INTERACTIVE FORM PANEL ================= */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-16 overflow-y-auto bg-slate-50/50 relative">
        
        {/* Subtle Student Vector Illustration Background (Black-Light Glowing Silhouette) */}
        <div className="absolute right-6 bottom-6 pointer-events-none opacity-[0.035] select-none z-0">
          <svg width="340" height="340" viewBox="0 0 24 24" fill="currentColor" className="text-slate-900">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
          </svg>
        </div>

        <div className="w-full max-w-md space-y-6 transform transition-all relative z-10">
          
          {/* Header */}
          <div className="animate-fade-in-up duration-500">
            <div className="lg:hidden flex items-center gap-2.5 mb-4">
              <img 
                src="/school_logo.png" 
                alt="Khan's Learning Logo" 
                className="w-10 h-10 object-contain drop-shadow-sm"
              />
              <span className="font-bold text-base text-slate-900">Khan's Learning</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Sign in to portal
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select your role and type your credentials below
            </p>
          </div>

          {/* Role Selector Tabs Grid with Colorful Icons & Top-Right Selection Circle */}
          <div className="animate-fade-in-up duration-500 delay-100">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
              SELECT ROLE
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {roles.map((role) => {
                const IconComponent = role.icon;
                const isSelected = selectedRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`flex items-center gap-3 p-3 rounded-2xl border text-left transition-all duration-300 relative group overflow-hidden cursor-pointer ${
                      isSelected
                        ? `${role.borderColor} bg-white shadow-lg shadow-indigo-600/10 ring-2 ring-indigo-600/20 scale-[1.02]`
                        : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    {/* Top-Right Selection Checkmark Circle */}
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm z-20">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}

                    {/* Colorful Icon Container */}
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all shadow-md text-white bg-gradient-to-tr ${role.bgGradient} ${isSelected ? 'scale-110 shadow-lg' : 'opacity-90 group-hover:scale-105'}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    <div className="min-w-0 flex-1 pr-4">
                      <p className={`text-xs font-bold truncate ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                        {role.label}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate mt-0.5">
                        {role.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-1 animate-fade-in-up duration-500 delay-200" noValidate>
            
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className={`h-4 w-4 transition-colors ${emailTouched && emailError ? 'text-rose-500' : 'group-focus-within:text-indigo-600'}`} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!emailTouched) setEmailTouched(true);
                  }}
                  onBlur={() => setEmailTouched(true)}
                  placeholder={`${selectedRole}@khanslearning.edu`}
                  className={`w-full pl-10 pr-10 py-3.5 text-slate-900 placeholder-slate-400 rounded-2xl border outline-none transition-all duration-200 text-sm shadow-2xs cursor-text ${
                    emailTouched && emailError
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-500/20'
                      : emailTouched && !emailError
                      ? 'border-emerald-400 bg-emerald-50/20 focus:ring-2 focus:ring-emerald-500/20'
                      : 'bg-white border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20'
                  }`}
                />
                {emailTouched && (
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                    {emailError ? <AlertCircle className="h-4 w-4 text-rose-500" /> : <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                  </div>
                )}
              </div>
              {emailTouched && emailError && (
                <p className="text-xs text-rose-500 font-medium pl-1">{emailError}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Password
                </label>
                <a href="#forgot" className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 transition-colors cursor-pointer">
                  Forgot password?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className={`h-4 w-4 transition-colors ${passwordTouched && passwordError ? 'text-rose-500' : 'group-focus-within:text-indigo-600'}`} />
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
                  className={`w-full pl-10 pr-16 py-3.5 text-slate-900 placeholder-slate-400 rounded-2xl border outline-none transition-all duration-200 text-sm shadow-2xs cursor-text ${
                    passwordTouched && passwordError
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-2 focus:ring-rose-500/20'
                      : passwordTouched && !passwordError
                      ? 'border-emerald-400 bg-emerald-50/20 focus:ring-2 focus:ring-emerald-500/20'
                      : 'bg-white border-slate-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20'
                  }`}
                />
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center gap-1.5">
                  {passwordTouched && (
                    passwordError ? <AlertCircle className="h-4 w-4 text-rose-500" /> : <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-600 transition-colors p-1 focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {passwordTouched && passwordError && (
                <p className="text-xs text-rose-500 font-medium pl-1">{passwordError}</p>
              )}
            </div>

            {/* Active Target Banner */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl text-xs text-indigo-900 shadow-xs">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse shadow-sm shadow-indigo-600" />
                <span className="font-medium">Active Security Context:</span>
              </span>
              <span className="font-extrabold uppercase tracking-wider bg-white px-3 py-1 rounded-xl border border-indigo-200 text-indigo-700 shadow-2xs flex items-center gap-1.5">
                <Check className="w-3 h-3 text-emerald-600" /> {selectedRole}
              </span>
            </div>

            {/* High-End Submit Button with Loading State */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/25 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition-all transform active:scale-[0.99] group mt-2 disabled:opacity-75 disabled:cursor-wait cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating Session...</span>
                </div>
              ) : (
                <>
                  <span>Sign In as {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>

    </div>
  );
}