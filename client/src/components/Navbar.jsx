import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone, FaTooth, FaMapMarkerAlt } from 'react-icons/fa';
import { IconDentalCheckup } from './DentalIcons';

const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/doctors', label: 'Doctors' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Top Bar */}
            <div style={{
                background: 'var(--gradient-primary)',
                color: 'white',
                padding: '8px 0',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
            }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaMapMarkerAlt style={{ fontSize: '12px' }} />
                        City Center, India – Open Mon–Sat: 9AM–8PM | Sun: 10AM–4PM
                    </span>
                    <a href="tel:+919000000000" style={{ color: 'white', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FaPhone style={{ fontSize: '12px' }} /> +91 90000 00000
                    </a>
                </div>
            </div>

            {/* Main Navbar */}
            <motion.nav
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1000,
                    background: scrolled ? 'rgba(255,255,255,0.97)' : 'var(--white)',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    boxShadow: scrolled ? 'var(--shadow-soft)' : '0 1px 0 var(--border-color)',
                    transition: 'all 0.3s ease',
                }}
            >
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
                    {/* Logo */}
                    <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <motion.div
                            whileHover={{ rotate: 10, scale: 1.05 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            style={{
                                width: '48px', height: '48px', borderRadius: '14px',
                                background: scrolled ? 'var(--bg-light)' : 'rgba(255, 107, 61, 0.08)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <IconDentalCheckup size={28} color="var(--primary)" />
                        </motion.div>
                        <div>
                            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700, fontSize: '18px', color: 'var(--text-main)', lineHeight: 1.1 }}>SmileCare Dental</div>
                            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'var(--primary)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>Clinic (Demo)</div>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                style={({ isActive }) => ({
                                    textDecoration: 'none',
                                    padding: '8px 16px',
                                    borderRadius: '8px',
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: isActive ? 600 : 500,
                                    fontSize: '14px',
                                    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                                    background: isActive ? 'rgba(255, 107, 61, 0.08)' : 'transparent',
                                    transition: 'all 0.2s ease',
                                })}
                                onMouseEnter={(e) => {
                                    if (!e.currentTarget.style.background.includes('0.08')) {
                                        e.currentTarget.style.background = 'rgba(255, 107, 61, 0.06)';
                                        e.currentTarget.style.color = 'var(--primary)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    const isActive = e.currentTarget.classList.contains('active');
                                    if (!isActive) {
                                        e.currentTarget.style.background = 'transparent';
                                        e.currentTarget.style.color = 'var(--text-secondary)';
                                    }
                                }}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <Link to="/appointment" className="btn-primary" style={{ marginLeft: '8px', padding: '10px 22px', fontSize: '14px' }}>
                            Book Appointment
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--text-main)', fontSize: '22px', display: 'none',
                            padding: '8px',
                        }}
                        className="mobile-menu-btn"
                        id="mobile-menu-toggle"
                    >
                        {mobileOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                background: 'var(--bg-card)',
                                borderTop: '1px solid var(--border-color)',
                                overflow: 'hidden',
                            }}
                        >
                            <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                {navLinks.map((link) => (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        onClick={() => setMobileOpen(false)}
                                        style={({ isActive }) => ({
                                            textDecoration: 'none',
                                            padding: '12px 16px',
                                            borderRadius: '10px',
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: isActive ? 600 : 500,
                                            fontSize: '15px',
                                            color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                                            background: isActive ? 'rgba(255, 107, 61, 0.08)' : 'transparent',
                                        })}
                                    >
                                        {link.label}
                                    </NavLink>
                                ))}
                                <Link
                                    to="/appointment"
                                    onClick={() => setMobileOpen(false)}
                                    className="btn-primary"
                                    style={{ margin: '8px 0', justifyContent: 'center' }}
                                >
                                    Book Appointment
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
          nav .hidden { display: none !important; }
        }
      `}</style>
        </>
    );
}
