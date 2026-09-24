import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Bell, Building2, ChevronDown, DollarSign, Info, X } from 'lucide-react';

export default function Header({ setSidebarOpen }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Fee Challan Generated', desc: 'Batch #CH-2026-09 successfully issued for Grade 10.', time: '10m ago', unread: true, type: 'finance' },
    { id: 2, title: 'New Student Admission', desc: 'Sarah Jenkins registered under Section 10-A.', time: '1h ago', unread: true, type: 'student' },
    { id: 3, title: 'System Security Alert', desc: 'Daily backup successfully encrypted and synced.', time: '5h ago', unread: false, type: 'system' }
  ]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20 shadow-2xs gap-2">
      
      {/* Left Section: Sidebar Toggle & Search Bar */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <button 
          onClick={() => setSidebarOpen(true)} 
          className="md:hidden text-slate-600 p-2 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer flex-shrink-0"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Global Search Bar (Hidden on mobile screens to prevent crowding, visible on sm and up) */}
        <div className="relative w-full max-w-xs hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="h-4 w-4" />
          </div>
          <input
            type="text"
            placeholder="Search students, classes..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 hover:bg-slate-100/60 focus:bg-white text-slate-900 placeholder-slate-400 text-xs rounded-2xl border border-slate-200/80 outline-none transition-all duration-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 cursor-text"
          />
        </div>
      </div>

      {/* Right Section: Notifications & Profile Avatar */}
      <div className="flex items-center gap-2 flex-shrink-0 relative">
        
        {/* Notification Bell */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-2xl transition-colors cursor-pointer"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white animate-pulse" />
            )}
          </button>

          {/* Notification Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-72 sm:w-96 bg-white rounded-3xl border border-slate-200/80 shadow-2xl p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="bg-orange-100 text-orange-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <button onClick={() => setShowNotifications(false)} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto py-2">
                {notifications.map((item) => (
                  <div key={item.id} className="py-3 px-2 flex items-start gap-3 rounded-2xl hover:bg-slate-50">
                    <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Info className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-900">{item.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-2xl bg-gradient-to-tr from-orange-100 to-amber-100 text-orange-700 font-extrabold text-xs flex items-center justify-center border border-orange-200 shadow-2xs cursor-pointer">
            SA
          </div>
        </div>

      </div>
    </header>
  );
}