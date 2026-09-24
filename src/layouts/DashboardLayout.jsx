import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="h-screen w-screen bg-slate-50 flex overflow-hidden font-sans">
      
      {/* Sidebar Component with lifted collapse state */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden w-full">
        
        {/* Header */}
        <Header setSidebarOpen={setSidebarOpen} />

        {/* Scrollable Page View (Expanded to full width by removing max-w limits) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 w-full mx-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}