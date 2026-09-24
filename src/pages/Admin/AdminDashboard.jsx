import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  DollarSign, 
  CalendarCheck, 
  TrendingUp, 
  ArrowUpRight, 
  UserPlus, 
  FileText, 
  BookOpen, 
  ShieldCheck,
  Clock,
  CheckCircle2,
  TrendingDown,
  UserCheck,
  CreditCard,
  FileText as ExamIcon,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const stats = [
  { 
    title: 'Total Students', 
    value: '2,845', 
    change: '+12% this month', 
    isPositive: true, 
    icon: GraduationCap, 
    lightBg: 'bg-purple-600/10 text-purple-700 border border-purple-200/60'
  },
  { 
    title: 'Total Teachers', 
    value: '142', 
    change: '+4 new hired', 
    isPositive: true, 
    icon: Users, 
    lightBg: 'bg-purple-600/10 text-purple-700 border border-purple-200/60'
  },
  { 
    title: 'Attendance Rate', 
    value: '96.4%', 
    change: '-0.2% yesterday', 
    isPositive: false, 
    icon: CalendarCheck, 
    lightBg: 'bg-purple-600/10 text-purple-700 border border-purple-200/60'
  },
  { 
    title: 'Fee Collection', 
    value: 'Rs. 2,484,250', 
    change: '+8.4% vs last month', 
    isPositive: true, 
    icon: DollarSign, 
    lightBg: 'bg-purple-600/10 text-purple-700 border border-purple-200/60'
  },
];

// Localized Pakistani student/teacher activity records
const classRecentActivities = [
  { id: 1, text: 'Student enrolled — Muhammad Zafar (Class 9)', time: '2 hours ago', type: 'student' },
  { id: 2, text: 'Student enrolled — Areeb Chauhan (Class 8)', time: '5 hours ago', type: 'student' },
  { id: 3, text: 'Student enrolled — Ayesha Farooq (Class 10)', time: '1 day ago', type: 'student' },
  { id: 4, text: 'Fee payment received — Anas Rasheed (Class 7)', time: '1 day ago', type: 'finance' },
  { id: 5, text: 'Fee payment received — Marium Chaudhry (Class 6)', time: '2 days ago', type: 'finance' },
];

const upcomingExams = [
  { id: 1, title: 'Mid-Term Exam — Mathematics', date: 'Aug 28, 2026', countdown: 'In 9 days' },
  { id: 2, title: 'Unit Test 2 — English', date: 'Sep 02, 2026', countdown: 'In 14 days' },
  { id: 3, title: 'Islamiat Quiz — Class 9 & 10', date: 'Sep 05, 2026', countdown: 'In 17 days' },
  { id: 4, title: 'Physics Practical Assessment', date: 'Sep 10, 2026', countdown: 'In 22 days' },
  { id: 5, title: 'Computer Science Practical', date: 'Sep 12, 2026', countdown: 'In 24 days' },
];

// Localized Pakistani student names for pending fees
const pendingFeesList = [
  { id: 1, initials: 'MA', name: 'Muhammad Ali', details: 'Class 9-A · Examination Fee – Half Yearly · Aug 2026', amount: 'PKR 1,800' },
  { id: 2, initials: 'FA', name: 'Fatima Bibi', details: 'Class 8-B · Examination Fee – Half Yearly · Aug 2026', amount: 'PKR 1,500' },
  { id: 3, initials: 'AZ', name: 'Ahmed Raza', details: 'Class 10-C · Monthly Tuition Fee · Aug 2026', amount: 'PKR 3,500' },
  { id: 4, initials: 'ZK', name: 'Zainab Khan', details: 'Class 7-A · Examination Fee – Half Yearly · Aug 2026', amount: 'PKR 1,500' },
  { id: 5, initials: 'HU', name: 'Hamza Usman', details: 'Class 6-B · Sports Fund Contribution · Aug 2026', amount: 'PKR 800' },
];

// Master list of school events with local context
const schoolEvents = {
  '2026-7': { // August 2026 (Month index 7)
    11: { title: 'Staff Professional Development Seminar', type: 'meeting' },
    14: { title: 'Independence Day Celebration & Speech Contest', type: 'event' },
    19: { title: 'Inter-School Science Exhibition', type: 'exam' },
    22: { title: 'Parent-Teacher Meeting (PTM)', type: 'meeting' },
    24: { title: 'Annual Free Medical & Health Check-up Camp', type: 'event' },
    26: { title: 'Career Counselling Session (Class 10)', type: 'event' },
    28: { title: 'Mid-Term Examinations Begin', type: 'exam' }
  }
};

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function AdminDashboard() {
  const [activeAttendanceTooltip, setActiveAttendanceTooltip] = useState(null);
  const [activeFeeIndex, setActiveFeeIndex] = useState(null);
  const [activeClassIndex, setActiveClassIndex] = useState(null);

  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 19)); // August 19, 2026
  const [selectedDay, setSelectedDay] = useState(19);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(1);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(1);
  };

  const currentMonthEvents = schoolEvents[`${year}-${month}`] || {};

  const attendanceData = {
    weekly: { 
      days: [
        { day: 'Thu', count: 154, x: 40, y: 35 },
        { day: 'Fri', count: 148, x: 115, y: 45 },
        { day: 'Sat', count: 152, x: 190, y: 40 },
        { day: 'Sun', count: 4, x: 265, y: 135 },
        { day: 'Mon', count: 145, x: 340, y: 48 },
        { day: 'Tue', count: 2, x: 415, y: 140 },
        { day: 'Wed', count: 0, x: 480, y: 145 },
      ],
      path: 'M 40,35 Q 75,30 115,45 T 190,40 T 265,135 T 340,48 T 415,140 T 480,145'
    }
  };

  const feeData = [
    { month: 'Mar', val1: 'PKR 329,600', val2: 'PKR 0', height: 32 },
    { month: 'Apr', val1: 'PKR 250,000', val2: 'PKR 0', height: 26 },
    { month: 'May', val1: 'PKR 0', val2: 'PKR 0', height: 2 },
    { month: 'Jun', val1: 'PKR 0', val2: 'PKR 0', height: 2 },
    { month: 'Jul', val1: 'PKR 600,000', val2: 'PKR 0', height: 60 },
    { month: 'Aug', val1: 'PKR 35,000', val2: 'PKR 880,000', height: 88, isPurpleAccent: true },
  ];

  const classPerformanceData = [
    { name: 'Class 9', score: '70%', height: 70, color: 'bg-purple-400 hover:bg-purple-500' },
    { name: 'Class 2', score: '68%', height: 68, color: 'bg-indigo-400 hover:bg-indigo-500' },
    { name: 'Class 3', score: '73%', height: 73, color: 'bg-purple-600 hover:bg-purple-700' },
    { name: 'Class 7', score: '67%', height: 67, color: 'bg-violet-400 hover:bg-violet-500' },
    { name: 'Class 5', score: '65%', height: 65, color: 'bg-emerald-400 hover:bg-emerald-500', isHighlighted: true },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-800 p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-indigo-100 text-[11px] font-semibold tracking-wider uppercase mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> Admin Command Center
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Welcome back, Admin 👋</h1>
          <p className="text-indigo-100/90 text-sm max-w-xl">
            Here is what’s happening across Khan's Learning enterprise ecosystem today. All systems running at 99.9% efficiency.
          </p>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <button 
            type="button"
            className="px-5 py-3 bg-white text-indigo-700 hover:bg-indigo-50 font-bold rounded-2xl shadow-lg transition-all text-xs flex items-center gap-2 cursor-pointer"
          >
            <UserPlus className="w-4 h-4" /> Add New Student
          </button>
        </div>
      </div>

      {/* Glassy Purple Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index}
              className="bg-gradient-to-br from-purple-500/10 via-white/80 to-indigo-500/10 backdrop-blur-xl p-6 rounded-3xl border border-purple-200/50 shadow-lg shadow-purple-900/5 hover:shadow-xl hover:bg-white/90 transition-all space-y-4 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-br from-purple-600/10 to-indigo-600/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between relative z-10">
                <div className={`w-12 h-12 rounded-2xl ${item.lightBg} flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-md ${item.isPositive ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-200/50' : 'bg-rose-500/10 text-rose-600 border border-rose-200/50'}`}>
                  {item.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />} {item.change}
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{item.title}</p>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{item.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Two Interactive Analytics Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Attendance Overview Graph Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base">Attendance Overview</h3>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
              <span className="px-3 py-1 rounded-lg bg-white text-slate-900 shadow-sm">Weekly</span>
            </div>
          </div>

          <div className="relative h-52 w-full flex flex-col justify-end overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400 pl-1">160</div>
              <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400 pl-1">120</div>
              <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400 pl-1">80</div>
              <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400 pl-1">40</div>
              <div className="border-b border-slate-200 w-full text-[10px] text-slate-400 pl-1">0</div>
            </div>

            <div className="relative z-10 h-36 w-full flex items-end">
              <svg 
                className="w-full h-full overflow-hidden" 
                viewBox="0 0 520 160" 
                preserveAspectRatio="none"
                onMouseLeave={() => setActiveAttendanceTooltip(null)}
              >
                <defs>
                  <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9333ea" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#9333ea" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <path d={`${attendanceData.weekly.path} L 480,160 L 40,160 Z`} fill="url(#purpleGradient)" />
                <path d={attendanceData.weekly.path} fill="none" stroke="#9333ea" strokeWidth="3.5" strokeLinecap="round" />

                {attendanceData.weekly.days.map((item, idx) => (
                  <g key={idx}>
                    {activeAttendanceTooltip?.day === item.day && (
                      <line x1={item.x} y1="0" x2={item.x} y2="160" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
                    )}
                    {activeAttendanceTooltip?.day === item.day && (
                      <circle cx={item.x} cy={item.y} r="6" fill="#fff" stroke="#9333ea" strokeWidth="3" />
                    )}
                    <circle 
                      cx={item.x} 
                      cy={item.y} 
                      r="16" 
                      fill="transparent" 
                      className="cursor-pointer"
                      onMouseEnter={() => setActiveAttendanceTooltip(item)}
                    />
                  </g>
                ))}
              </svg>

              {activeAttendanceTooltip && (
                <div 
                  className="absolute z-30 bg-white/95 backdrop-blur-md border border-purple-200 shadow-xl rounded-2xl px-3.5 py-2 pointer-events-none transition-all duration-150"
                  style={{ 
                    left: `${Math.min(Math.max(activeAttendanceTooltip.x - 35, 15), 370)}px`, 
                    top: `${Math.max(activeAttendanceTooltip.y - 55, 5)}px` 
                  }}
                >
                  <p className="text-xs font-bold text-slate-900">{activeAttendanceTooltip.day}</p>
                  <p className="text-[11px] font-semibold text-purple-600">present : {activeAttendanceTooltip.count}</p>
                </div>
              )}
            </div>

            <div className="flex justify-between text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100 px-2">
              {attendanceData.weekly.days.map((item, idx) => (
                <span 
                  key={idx} 
                  className={`cursor-pointer transition-colors ${activeAttendanceTooltip?.day === item.day ? 'text-purple-600 font-bold' : ''}`}
                  onMouseEnter={() => setActiveAttendanceTooltip(item)}
                >
                  {item.day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Fee Collection Bar Chart Card */}
        <div 
          className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 relative overflow-hidden"
          onMouseLeave={() => setActiveFeeIndex(null)}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base">Fee Collection</h3>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-[11px] font-bold">
              <span className="px-3 py-1 rounded-lg bg-white text-slate-900 shadow-sm">Monthly</span>
            </div>
          </div>

          <div className="relative h-52 w-full flex flex-col justify-end overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400 pl-1">1000000</div>
              <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400 pl-1">750000</div>
              <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400 pl-1">500000</div>
              <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400 pl-1">250000</div>
              <div className="border-b border-slate-200 w-full text-[10px] text-slate-400 pl-1">0</div>
            </div>

            {activeFeeIndex !== null && (
              <div 
                className="absolute top-0 bottom-6 bg-purple-100/50 transition-all duration-150 rounded-xl pointer-events-none z-0"
                style={{
                  width: '14%',
                  left: `${6 + activeFeeIndex * 15.6}%`
                }}
              />
            )}

            <div className="relative z-10 h-36 w-full flex items-end justify-around px-2">
              {feeData.map((item, idx) => (
                <div 
                  key={idx}
                  className="h-full flex items-end justify-center w-12 cursor-pointer relative group"
                  onMouseEnter={() => setActiveFeeIndex(idx)}
                >
                  <div 
                    style={{ height: `${item.height}%` }}
                    className={`w-9 rounded-t-xl transition-all ${item.isPurpleAccent ? 'bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/30' : 'bg-purple-500 hover:bg-purple-600'}`} 
                  />
                </div>
              ))}
            </div>

            {activeFeeIndex !== null && (
              <div 
                className="absolute z-30 bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl px-4 py-3 pointer-events-none transition-all duration-150"
                style={{
                  left: `${Math.min(Math.max(15 + activeFeeIndex * 62, 10), 280)}px`,
                  top: '25px'
                }}
              >
                <p className="text-xs font-bold text-slate-900">{feeData[activeFeeIndex].month}</p>
                <p className="text-xs font-bold text-purple-600 mt-1">{feeData[activeFeeIndex].val1}</p>
                <p className="text-xs font-bold text-indigo-600 mt-0.5">{feeData[activeFeeIndex].val2}</p>
              </div>
            )}

            <div className="flex justify-around text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100">
              {feeData.map((item, idx) => (
                <span 
                  key={idx} 
                  className={`cursor-pointer transition-colors ${activeFeeIndex === idx ? 'text-slate-900 font-bold' : ''}`}
                  onMouseEnter={() => setActiveFeeIndex(idx)}
                >
                  {item.month}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Class Performance & Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Class Performance Bar Chart Card */}
        <div 
          className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6 relative overflow-hidden"
          onMouseLeave={() => setActiveClassIndex(null)}
        >
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base">Class Performance</h3>
            <span className="text-xs font-semibold text-slate-400">Academic Score Averages</span>
          </div>

          <div className="relative h-56 w-full flex flex-col justify-end overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400 pl-1">100</div>
              <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400 pl-1">75</div>
              <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400 pl-1">50</div>
              <div className="border-b border-dashed border-slate-200 w-full text-[10px] text-slate-400 pl-1">25</div>
              <div className="border-b border-slate-200 w-full text-[10px] text-slate-400 pl-1">0</div>
            </div>

            {activeClassIndex !== null && (
              <div 
                className="absolute top-0 bottom-6 bg-purple-100/50 transition-all duration-150 rounded-xl pointer-events-none z-0"
                style={{
                  width: '16%',
                  left: `${4 + activeClassIndex * 19.2}%`
                }}
              />
            )}

            <div className="relative z-10 h-44 w-full flex items-end justify-around px-2">
              {classPerformanceData.map((item, idx) => (
                <div 
                  key={idx}
                  className="h-full flex items-end justify-center w-14 cursor-pointer relative group"
                  onMouseEnter={() => setActiveClassIndex(idx)}
                >
                  <div 
                    style={{ height: `${item.height}%` }}
                    className={`w-11 rounded-t-xl transition-all shadow-sm ${item.color}`} 
                  />
                </div>
              ))}
            </div>

            {activeClassIndex !== null && (
              <div 
                className="absolute z-30 bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl px-4 py-3 pointer-events-none transition-all duration-150"
                style={{
                  left: `${Math.min(Math.max(20 + activeClassIndex * 85, 15), 360)}px`,
                  top: '35px'
                }}
              >
                <p className="text-xs font-bold text-slate-900">{classPerformanceData[activeClassIndex].name}</p>
                <p className="text-xs font-bold text-slate-600 mt-0.5">Avg Score : {classPerformanceData[activeClassIndex].score}</p>
              </div>
            )}

            <div className="flex justify-around text-[11px] font-semibold text-slate-400 pt-2 border-t border-slate-100">
              {classPerformanceData.map((item, idx) => (
                <span 
                  key={idx} 
                  className={`cursor-pointer transition-colors ${activeClassIndex === idx ? 'text-slate-900 font-bold' : ''}`}
                  onMouseEnter={() => setActiveClassIndex(idx)}
                >
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Panel */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">Recent Activity</h3>
          
          <div className="divide-y divide-slate-100 pt-2">
            {classRecentActivities.map((act) => (
              <div key={act.id} className="py-3 flex items-start gap-3 first:pt-0 last:pb-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  act.type === 'student' ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {act.type === 'student' ? <UserCheck className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 leading-snug">{act.text}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3-Column Section: Upcoming Exams, Pending Fees & Fully Working School Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Upcoming Exams Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">Upcoming Exams</h3>

          <div className="space-y-3 pt-2">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="p-3.5 rounded-2xl bg-purple-50/50 border border-purple-100/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
                    <ExamIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{exam.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{exam.date}</p>
                  </div>
                </div>
                <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100/80 px-2.5 py-1 rounded-full flex-shrink-0">
                  {exam.countdown}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Pending Fees Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base">Pending Fees</h3>
            <span className="text-[10px] font-extrabold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full">
              10 pending
            </span>
          </div>

          <div className="divide-y divide-slate-100 pt-2">
            {pendingFeesList.map((fee) => (
              <div key={fee.id} className="py-3.5 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-purple-100 text-purple-700 font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                    {fee.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{fee.name}</p>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{fee.details}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="inline-block text-[9px] font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full mb-1">
                    pending
                  </span>
                  <p className="text-xs font-extrabold text-rose-600">{fee.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Fully Interactive School Calendar Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-purple-600" /> School Calendar
            </h3>
          </div>

          {/* Interactive Mini Calendar Widget */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <button 
                onClick={handlePrevMonth}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>{MONTH_NAMES[month]} {year}</span>
              <button 
                onClick={handleNextMonth}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 text-center text-[10px] font-semibold text-slate-400">
              <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
            </div>

            {/* Dynamic Calendar Days Grid */}
            <div className="grid grid-cols-7 text-center text-[11px] font-medium text-slate-700 gap-y-2">
              {/* Padding empty slots for the first week */}
              {Array.from({ length: firstDay }).map((_, index) => (
                <span key={`empty-${index}`} className="text-slate-300">-</span>
              ))}

              {/* Actual Month Days */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const dayNum = index + 1;
                const hasEvent = currentMonthEvents[dayNum];
                const isSelected = selectedDay === dayNum;

                return (
                  <button
                    key={dayNum}
                    onClick={() => setSelectedDay(dayNum)}
                    className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto transition-all cursor-pointer text-[11px] font-bold ${
                      isSelected 
                        ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/50 scale-110' 
                        : hasEvent 
                          ? 'bg-purple-100 text-purple-700 ring-1 ring-purple-300' 
                          : 'hover:bg-slate-200 text-slate-700'
                    }`}
                    title={hasEvent ? hasEvent.title : `Day ${dayNum}`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Upcoming Events List based on selected day / month */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Events for {MONTH_NAMES[month]} {selectedDay}, {year}
              </p>
            </div>

            {currentMonthEvents[selectedDay] ? (
              <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-purple-50/60 border border-purple-100">
                <span className="font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" /> 
                  {currentMonthEvents[selectedDay].title}
                </span>
                <span className="text-[11px] font-semibold text-purple-700 uppercase">
                  {currentMonthEvents[selectedDay].type}
                </span>
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-3 text-center italic">No scheduled events for this date.</p>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}