import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  CreditCard,
  FileSpreadsheet,
  Clock,
  Bell,
  MessageSquare,
  BarChart3,
  Shield,
  Layers,
  FileText,
  FolderOpen,
  LogOut, 
  X,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ sidebarOpen, setSidebarOpen, isCollapsed, setIsCollapsed }) {

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/admin/students', icon: Users },
    { name: 'Teachers', path: '/admin/teachers', icon: GraduationCap },
    { name: 'Classes', path: '/admin/classes', icon: BookOpen },
    { name: 'Attendance', path: '/admin/attendance', icon: CalendarCheck },
    { name: 'Fees', path: '/admin/fees', icon: CreditCard },
    { name: 'Homework', path: '/admin/homework', icon: FileSpreadsheet },
    { name: 'Timetable', path: '/admin/timetable', icon: Clock },
    { name: 'Notice Board', path: '/admin/notice-board', icon: Bell },
    { name: 'Communication', path: '/admin/communication', icon: MessageSquare },
    { name: 'Reports', path: '/admin/reports', icon: BarChart3 },
    { name: 'Roles & Permissions', path: '/admin/roles', icon: Shield },
    { name: 'Subject & Class', path: '/admin/subjects', icon: Layers },
    { name: 'Tests & Exams', path: '/admin/exams', icon: FileText },
    { name: 'Study Material', path: '/admin/study-material', icon: FolderOpen },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-20 md:hidden cursor-pointer transition-all" 
        />
      )}

      {/* Sidebar Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 md:relative h-full bg-slate-950 text-slate-300 flex flex-col justify-between p-4 transition-all duration-300 ease-in-out shrink-0 border-r border-slate-900/90 shadow-2xl overflow-hidden
        ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'md:w-20' : 'md:w-64'}
      `}>
        {/* Ambient Glowing Mesh Accents */}
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-purple-600/20 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-indigo-600/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col h-full">
          
          {/* Top Branding & Desktop Toggle Button */}
          <div className="flex items-center justify-between px-2 py-3.5 mb-6 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md shadow-sm relative group">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-md shadow-purple-900/30 flex items-center justify-center flex-shrink-0">
                <img src="/school_logo.png" alt="Logo" className="w-8 h-8 object-contain rounded-[10px]" />
              </div>
              
              {!isCollapsed && (
                <div className="min-w-0 transition-opacity duration-200">
                  <h2 className="text-xs font-bold text-white tracking-tight truncate flex items-center gap-1">
                    Khan's Learning <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300 animate-pulse" />
                  </h2>
                  <p className="text-[9px] text-purple-400 uppercase tracking-widest font-semibold mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> Admin Suite
                  </p>
                </div>
              )}
            </div>

            {/* Mobile Close Button */}
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white cursor-pointer p-1">
              <X className="h-5 w-5" />
            </button>

            {/* Desktop Expand/Collapse Toggle Button */}
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)} 
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-800 border border-slate-700 text-slate-300 rounded-full items-center justify-center shadow-lg hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-all cursor-pointer z-40"
            >
              {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Section Label */}
          {!isCollapsed && (
            <div className="px-3 mb-2 flex items-center justify-between transition-opacity duration-200">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Navigation</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" title="Node Online" />
            </div>
          )}

          {/* Scrollable Navigation Links with Custom Scrollbar */}
          <nav className="space-y-1.5 flex-1 overflow-y-auto pr-1.5 custom-scrollbar">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  title={isCollapsed ? item.name : undefined}
                  className={({ isActive }) => `
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer group relative overflow-hidden
                    ${isActive 
                      ? 'bg-purple-600/20 backdrop-blur-xl text-white shadow-lg shadow-purple-950/50 border border-purple-500/40 ring-1 ring-purple-500/20' 
                      : 'hover:bg-white/[0.04] hover:text-white text-slate-400 border border-transparent'
                    }
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-purple-400 to-indigo-500 rounded-r-full shadow-md shadow-purple-500" />
                      )}

                      <div className={`flex items-center gap-3 relative z-10 pl-1 ${isCollapsed ? 'justify-center w-full' : ''}`}>
                        <div className={`transition-transform duration-200 group-hover:scale-110 flex-shrink-0 ${isActive ? 'text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'text-slate-400 group-hover:text-indigo-400'}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        {!isCollapsed && (
                          <span className={`truncate ${isActive ? 'text-white font-bold' : ''}`}>{item.name}</span>
                        )}
                      </div>

                      {isActive && !isCollapsed && (
                        <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.8)] relative z-10" />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* User Footer Profile & Logout Card */}
          <div className="relative z-10 border-t border-slate-900/80 pt-4 px-1 mt-auto">
            {isCollapsed ? (
              <div className="flex flex-col items-center gap-3 py-2 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-md shadow-inner">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-xs shadow-md ring-1 ring-white/20" title="Admin Portal">
                  A
                </div>
                <button 
                  title="Logout" 
                  className="text-slate-400 hover:text-rose-400 transition-colors p-2 rounded-xl hover:bg-rose-500/10 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-3 rounded-2xl backdrop-blur-md shadow-inner hover:bg-white/[0.04] transition-all">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-xs shadow-md flex-shrink-0 ring-1 ring-white/20">
                    A
                  </div>
                  <div className="min-w-0 transition-opacity duration-200">
                    <p className="text-xs font-bold text-white truncate">Admin Portal</p>
                    <p className="text-[10px] text-slate-400 truncate">admin@khanslearning.edu</p>
                  </div>
                </div>
                <button title="Logout" className="text-slate-400 hover:text-rose-400 transition-colors p-1.5 rounded-xl hover:bg-rose-500/10 cursor-pointer">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

        </div>
      </aside>
    </>
  );
}