import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';
import LoginPage from '../pages/LoginPage';
import ClassesPage from '../pages/ClassesPage';
// import ChallanPage from './pages/ChallanPage';
import AddStudentsPage from '../pages/AddStudentsPage';
// import ReportsPage from './pages/ReportsPage';
// import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard Layout with Nested Routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="classes" replace />} />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="add-student" element={<AddStudentsPage />} />
          {/* <Route path="challan" element={<ChallanPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} /> */}
        </Route>

        {/* Redirect root to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}