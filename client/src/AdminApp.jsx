import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import { Toaster } from 'react-hot-toast';

export default function AdminApp() {
    return (
        <div className="admin-root">
            <Toaster position="top-right" />
            <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/login" element={<AdminLogin />} />
                {/* Fallback to dashboard which handles its own auth check */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </div>
    );
}
