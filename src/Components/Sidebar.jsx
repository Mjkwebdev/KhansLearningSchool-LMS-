import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BookOpen, 
  CreditCard, 
  UserPlus, 
  BarChart3, 
  Settings, 
  LogOut, 
  X 
} from 'lucide-react';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    { name: 'Classes', path: '/dashboard/classes', icon: BookOpen },
    { name: 'Challan', path: '/dashboard/challan', icon: CreditCard },
    { name: 'Add Students', path: '/dashboard/add-student', icon: UserPlus },
    { name: 'Reports', path: '/dashboard/reports', icon: BarChart3 },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-slate-900/40 z-20 md:hidden" 
        />
      )}

      {/* Sidebar Drawer */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-30 w-64 bg-slate-900 text-slate-300 flex flex-col justify-between p-4 transition-transform duration-200 ease-in-out shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div>
          {/* Logo Branding */}
          <div className="flex items-center justify-between px-2 py-3 mb-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Logo" className="h-10 w-auto object-contain" />
              <div>
                <h2 className="text-sm font-bold text-white leading-tight">Khan's Learning</h2>
                <p className="text-[10px] text-indigo-400 uppercase tracking-widest font-semibold">School Management</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links using React Router NavLink */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) => `
                    w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150
                    ${isActive 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                      : 'hover:bg-slate-800/60 hover:text-white text-slate-400'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* User Footer */}
        <div className="border-t border-slate-800 pt-4 px-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold text-sm">
                A
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Admin Portal</p>
                <p className="text-[10px] text-slate-500">admin@kls.edu.pk</p>
              </div>
            </div>
            <button title="Logout" className="text-slate-400 hover:text-rose-400 transition-colors p-1.5">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}