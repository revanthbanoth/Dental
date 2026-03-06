import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaUser } from 'react-icons/fa';
import { sendContact } from '../services/api';
import toothCharacter from '../assets/tooth-character.png';
import dentalOffice from '../assets/dental-office.png';

const inputStyle = {
    width: '100%', padding: '12px 16px', border: 'none',
    borderRadius: '8px', fontFamily: 'Inter, sans-serif', fontSize: '15px',
    color: 'var(--text-main)', background: 'var(--white)', outline: 'none',
    transition: 'box-shadow 0.3s ease',
};

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [focusedField, setFocusedField] = useState('');

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required';
        if (!form.message.trim()) errs.message = 'Message is required';
        return errs;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }
        setLoading(true);
        try {
            await sendContact(form);
            toast.success('Message sent! We will contact you shortly.', { duration: 5000 });
            setForm({ name: '', email: '', phone: '', message: '' });
        } catch {
            toast.error('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getFocusStyle = (field) => ({
        ...(focusedField === field ? { borderColor: 'var(--primary)', boxShadow: '0 0 0 4px rgba(255, 107, 61, 0.12)' } : {}),
        ...(errors[field] ? { borderColor: '#dc2626' } : {}),
    });

    return (
        <div>
            {/* Hero */}
            <section style={{ background: 'var(--bg-light)', padding: '80px 24px 64px', textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <span className="section-badge">✦ Contact Us</span>
                    <h1 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px' }}>
                        Get in <span className="gradient-text">Touch With Us</span>
                    </h1>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        Have questions or need to reach us? We're here to help. Contact SmileCare Dental Clinic anytime.
                    </p>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-muted)' }}>
                        <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
                        <span>›</span>
                        <span>Contact</span>
                    </div>
                </motion.div>
            </section>

            {/* Contact Info Cards */}
            <section style={{ padding: '72px 24px 48px', background: 'var(--white)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '64px' }}>
                        {[
                            {
                                icon: <FaMapMarkerAlt style={{ fontSize: '24px', color: 'var(--primary)' }} />,
                                title: 'Our Address',
                                lines: ['123 Dental Street, Medical Plaza', 'City Center, India – 500000', 'Demo Location'],
                                color: 'var(--primary)',
                                href: '#',
                            },
                            {
                                icon: <FaPhone style={{ fontSize: '24px', color: 'var(--primary-hover)' }} />,
                                title: 'Phone Numbers',
                                lines: ['+91 90000 00000', 'Emergency: 24/7 (Demo)'],
                                color: 'var(--primary-hover)',
                                href: 'tel:+919000000000',
                            },
                            {
                                icon: <FaEnvelope style={{ fontSize: '24px', color: 'var(--secondary)' }} />,
                                title: 'Email Address',
                                lines: ['info@smilecaredental.com', 'support@smilecaredental.com'],
                                color: 'var(--secondary)',
                                href: 'mailto:info@smilecaredental.com',
                            },
                            {
                                icon: <FaClock style={{ fontSize: '24px', color: 'var(--primary)' }} />,
                                title: 'Working Hours',
                                lines: ['Mon–Sat: 9:00 AM – 8:00 PM', 'Sunday: 10:00 AM – 4:00 PM', 'Emergency: 24/7'],
                                color: 'var(--primary)',
                            },
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{
                                    background: `${card.color}08`, borderRadius: '20px', padding: '28px',
                                    border: `1px solid ${card.color}20`, textAlign: 'center',
                                    cursor: card.href ? 'pointer' : 'default',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                }}
                                whileHover={{ y: -4, boxShadow: `0 12px 30px ${card.color}20` }}
                                onClick={() => card.href && window.open(card.href, '_blank')}
                            >
                                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: `${card.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                    {card.icon}
                                </div>
                                <h3 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '17px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '12px' }}>{card.title}</h3>
                                {card.lines.map((line, j) => (
                                    <p key={j} style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{line}</p>
                                ))}
                            </motion.div>
                        ))}
                    </div>

                    {/* Redesigned Contact Section */}
                    <div style={{ position: 'relative', marginTop: '40px' }}>
                        <div className="redesigned-contact-grid" style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(400px, 460px) 1fr',
                            borderRadius: '32px',
                            overflow: 'visible', // Allow character to glow/float
                            boxShadow: '0 25px 50px -12px rgba(255, 107, 61, 0.15)',
                            border: '1px solid var(--border-color)',
                            background: 'white',
                            minHeight: '600px',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            {/* Form Side */}
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                style={{
                                    background: 'var(--bg-light)', // Consistent with theme
                                    padding: '60px 50px',
                                    position: 'relative',
                                    borderRadius: '32px 0 0 32px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center'
                                }}
                            >

                                <div style={{ position: 'relative', zIndex: 3 }}>
                                    <h3 style={{
                                        fontFamily: 'Inter, system-ui, sans-serif',
                                        fontSize: '36px',
                                        fontWeight: 900,
                                        color: '#FF7043',
                                        marginBottom: '40px',
                                        textAlign: 'center',
                                        lineHeight: 1.2
                                    }}>
                                        Get Instant <br /> Call Back
                                    </h3>

                                    <form onSubmit={handleSubmit} id="contact-form">
                                        <div style={{ marginBottom: '18px' }}>
                                            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: 'var(--text-main)', marginBottom: '8px' }}>Full Name *</label>
                                            <input type="text" name="name" id="contact-name" value={form.name} placeholder="Full Name" onChange={handleChange} onFocus={() => setFocusedField('name')} onBlur={() => setFocusedField('')} style={{ ...inputStyle, ...getFocusStyle('name') }} />
                                            {errors.name && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>{errors.name}</p>}
                                        </div>

                                        <div style={{ marginBottom: '18px' }}>
                                            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: 'var(--text-main)', marginBottom: '8px' }}>Phone Number *</label>
                                            <input type="tel" name="phone" id="contact-phone" value={form.phone} placeholder="Phone Number" onChange={handleChange} onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField('')} style={{ ...inputStyle, ...getFocusStyle('phone') }} />
                                        </div>

                                        <div style={{ marginBottom: '32px' }}>
                                            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: 'var(--text-main)', marginBottom: '8px' }}>Email Id</label>
                                            <input type="email" name="email" id="contact-email" value={form.email} placeholder="Email ID" onChange={handleChange} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField('')} style={{ ...inputStyle, ...getFocusStyle('email') }} />
                                            {errors.email && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>{errors.email}</p>}
                                        </div>

                                        <button type="submit" disabled={loading} id="contact-submit-btn"
                                            style={{
                                                width: '100%', padding: '16px', borderRadius: '12px',
                                                background: loading ? '#94a3b8' : '#FF7043',
                                                color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                                                fontFamily: 'Inter, sans-serif', fontWeight: 800, fontSize: '16px',
                                                boxShadow: '0 8px 24px rgba(255, 107, 61, 0.3)',
                                                transition: 'all 0.3s ease',
                                            }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {loading ? 'Sending...' : 'Send'}
                                        </button>
                                    </form>
                                </div>
                            </motion.div>

                            {/* Map Side */}
                            <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '500px', borderRadius: '0 32px 32px 0', overflow: 'hidden' }}>
                                <iframe
                                    title="SmileCare Dental Clinic"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30441.62959090063!2d78.44555199999999!3d17.5428543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8e86c49d4f73%3A0x2f0c7fc4c2ee1b8!2sKompally%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1709000000000!5m2!1sen!2sin"
                                    width="100%" height="100%" style={{ border: 0, display: 'block' }} allowFullScreen="" loading="lazy"
                                />
                                {/* Directions Card */}
                                <div className="map-overlay" style={{
                                    position: 'absolute', bottom: '30px', left: '30px', right: '30px',
                                    background: 'rgba(255,255,255,0.98)', padding: '20px', borderRadius: '20px',
                                    border: '1px solid var(--border-color)', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                                    display: 'flex', alignItems: 'center', gap: '15px', backdropFilter: 'blur(10px)'
                                }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--primary)15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <FaMapMarkerAlt style={{ color: 'var(--primary)', fontSize: '20px' }} />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: '0 0 2px', fontWeight: 800, fontSize: '15px', color: 'var(--text-main)' }}>123 Dental Street</p>
                                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>Medical Plaza, City Center, India</p>
                                    </div>
                                    <a href="https://maps.google.com" target="_blank" rel="noreferrer"
                                        style={{ background: 'var(--gradient-primary)', color: 'white', padding: '10px 20px', borderRadius: '12px', fontSize: '13px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 12px rgba(255, 107, 61, 0.2)' }}>
                                        Directions
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <style>{`
                        .redesigned-contact-grid {
                            grid-template-columns: minmax(400px, 460px) 1fr;
                        }
                        @media (max-width: 992px) {
                            .redesigned-contact-grid {
                                grid-template-columns: 1fr !important;
                                min-height: auto !important;
                            }
                            div[style*="borderRadius: 32px 0 0 32px"] {
                                borderRadius: 32px 32px 0 0 !important;
                                padding: 40px !important;
                            }
                            div[style*="borderRadius: 0 32px 32px 0"] {
                                borderRadius: 0 0 32px 32px !important;
                                minHeight: 400px !important;
                            }
                            .floating-tooth-mobile {
                                width: 140px !important;
                                left: -30px !important;
                                bottom: -10px !important;
                                z-index: 100 !important;
                            }
                        }
                        @media (max-width: 600px) {
                            .floating-tooth-mobile {
                                display: none !important; /* Hide on very small screens to avoid clutter */
                            }
                            div[style*="padding: 60px 50px"] {
                                padding: 30px 20px !important;
                            }
                            h3 { font-size: 28px !important; }
                        }
                    `}</style>
                </div>
            </section>
        </div>
    );
}
