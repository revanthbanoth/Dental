import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaWhatsapp, FaYoutube, FaLock, FaHeart, FaAngleRight } from 'react-icons/fa';
import { IconDentalCheckup } from './DentalIcons';

export default function Footer() {
    return (
        <footer style={{ background: '#0f172a', color: 'white', fontFamily: 'Inter, sans-serif' }}>
            {/* Main Footer */}
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 24px 40px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px' }}>

                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconDentalCheckup size={24} color="white" />
                            </div>
                            <div>
                                <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700, fontSize: '18px' }}>SmileCare Dental</div>
                                <div style={{ fontSize: '11px', color: 'var(--secondary)', letterSpacing: '1px', textTransform: 'uppercase' }}>Clinic (Demo)</div>
                            </div>
                        </div>
                        <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.7, marginBottom: '20px' }}>
                            Demo Dental Clinic Website Template – Created for demonstration purposes. Professional dental care for a healthy smile.
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {[
                                { icon: <FaWhatsapp />, href: 'https://wa.me/919160503307', color: '#25d366' },
                            ].map((s, i) => (
                                <a key={i} href={s.href} target="_blank" rel="noreferrer"
                                    style={{
                                        width: '36px', height: '36px', borderRadius: '10px',
                                        background: 'rgba(255,255,255,0.1)', display: 'flex',
                                        alignItems: 'center', justifyContent: 'center',
                                        color: 'white', fontSize: '16px', transition: 'all 0.3s ease',
                                        textDecoration: 'none',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = s.color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '18px', marginBottom: '20px', color: 'white' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {[
                                { to: '/', label: 'Home' },
                                { to: '/about', label: 'About Us' },
                                { to: '/services', label: 'Our Services' },
                                { to: '/doctors', label: 'Our Doctors' },
                                { to: '/appointment', label: 'Book Appointment' },
                                { to: '/blog', label: 'Dental Blog' },
                                { to: '/contact', label: 'Contact Us' },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link to={link.to} style={{
                                        color: '#94a3b8', textDecoration: 'none', fontSize: '14px',
                                        transition: 'color 0.2s ease', display: 'flex', alignItems: 'center', gap: '6px',
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--secondary)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                                    >
                                        → {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '18px', marginBottom: '20px', color: 'white' }}>Our Services</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {['Dental Checkup', 'Root Canal Treatment', 'Dental Implants', 'Smile Designing', 'Teeth Whitening', 'Braces / Aligners', 'Laser Dentistry', 'Wisdom Tooth Extraction'].map((s) => (
                                <li key={s}>
                                    <Link to="/services" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s ease', display: 'flex', alignItems: 'center', gap: '6px' }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--secondary)'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                                    >
                                        <FaAngleRight style={{ fontSize: '12px' }} /> {s}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '18px', marginBottom: '20px', color: 'white' }}>Contact Info</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { icon: <FaMapMarkerAlt />, text: '123 Dental Street, Medical Plaza, City Center, India – 500000' },
                                { icon: <FaPhone />, text: '+91 90000 00000', href: 'tel:+919000000000' },
                                { icon: <FaEnvelope />, text: 'info@smilecaredental.com', href: 'mailto:info@smilecaredental.com' },
                                { icon: <FaClock />, text: 'Mon–Sat: 9AM–8PM\nSun: 10AM–4PM' },
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                    <span style={{ color: 'var(--secondary)', marginTop: '2px', flexShrink: 0 }}>{item.icon}</span>
                                    {item.href ? (
                                        <a href={item.href} style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, textDecoration: 'none' }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--secondary)'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                                        >{item.text}</a>
                                    ) : (
                                        <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{item.text}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '20px 24px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <p style={{ color: '#64748b', fontSize: '13px', margin: 0 }}>
                        © {new Date().getFullYear()} SmileCare Dental Clinic (Demo). All rights reserved. | Demo Dental Clinic Website Template – Created for demonstration purposes.
                    </p>

                </div>
            </div>
        </footer>
    );
}
