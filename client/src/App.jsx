import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactHub from './components/ContactHub';
import ScrollToTop from './components/ScrollToTop';
import { IconDentalCheckup } from './components/DentalIcons';

import PublicApp from './PublicApp';
import AdminApp from './AdminApp';

function App() {
  const [loading, setLoading] = useState(true);

  // Detect if we are on the admin subdomain
  // On local dev, you can test by visiting: http://localhost:5173/?admin=true
  // For production, this checks for 'admin.' subdomain
  const isAdminsite = window.location.hostname.startsWith('admin.') ||
    window.location.search.includes('admin=true');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="page-loader">
        <div className="text-center text-white">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
              <IconDentalCheckup size={100} color="white" />
            </div>
            <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '28px', fontWeight: 700, marginBottom: '8px' }}>
              SmileCare Dental Clinic (Demo)
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', opacity: 0.8 }}>Professional Dental Care Template</p>
            <div style={{ width: '120px', height: '3px', background: 'rgba(255,255,255,0.4)', borderRadius: '2px', margin: '20px auto 0' }}>
              <motion.div
                style={{ height: '100%', background: 'white', borderRadius: '2px' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '12px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
          },
        }}
      />
      {isAdminsite ? <AdminApp /> : <PublicApp />}
    </Router>
  );
}

export default App;
