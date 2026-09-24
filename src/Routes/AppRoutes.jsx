import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout'
import LoginPage from '../pages/Auth/LoginPage';
import StudentsPage from '../pages/Admin/StudentsPage';
import StudentDetailPage from '../pages/Admin/StudentDetailPage';
// import ClassesPage from './pages/ClassesPage';
// import ChallanPage from './pages/ChallanPage';
// import AddStudentsPage from './pages/AddStudentsPage';
import AdminDashboard from '../pages/Admin/AdminDashboard';
// import ReportsPage from './pages/ReportsPage';
// import SettingsPage from './pages/SettingsPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Dashboard Protected Routes */}
        <Route path="/admin" element={<DashboardLayout />}>
          {/* Default entry when hitting root or admin base */}
          {/* <Route index element={<Navigate to="/classes" replace />} /> */}
          
          {/* Admin Management Sections */}
          
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="students/:id" element={<StudentDetailPage />} />
          {/* <Route path="classes" element={<ClassesPage />} />
          <Route path="challan" element={<ChallanPage />} />
          <Route path="student" element={<AddStudentsPage />} /> */}
          
          {/* Uncomment when ready */}
          {/* <Route path="reports" element={<ReportsPage />} /> */}
          {/* <Route path="settings" element={<SettingsPage />} /> */}
        </Route>

        {/* Catch-all fallback to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}