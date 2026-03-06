import React, { useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaCalendarAlt, FaClock, FaUserMd, FaTooth, FaChevronRight, FaArrowLeft, FaDownload } from 'react-icons/fa';
import html2canvas from 'html2canvas';
import { IconDentalCheckup } from '../components/DentalIcons';

export default function AppointmentSuccess() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const appointment = state?.appointment;
    const ticketRef = useRef(null);

    const downloadScreenshot = () => {
        if (ticketRef.current) {
            html2canvas(ticketRef.current, {
                backgroundColor: '#f0fdfa',
                scale: 2, // Better quality
            }).then((canvas) => {
                const link = document.createElement('a');
                link.download = `appointment-${appointment.appointmentId}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    };

    useEffect(() => {
        // If someone tries to access this page directly without an appointment in state
        if (!appointment) {
            console.error('Appointment data not found in location state');
            const timer = setTimeout(() => navigate('/appointment'), 3000);
            return () => clearTimeout(timer);
        }
        window.scrollTo(0, 0);
    }, [appointment, navigate]);

    if (!appointment) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-light)', padding: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                    <IconDentalCheckup size={60} color="var(--primary)" />
                    <h2 style={{ color: 'var(--text-main)', marginTop: '20px' }}>Redirecting...</h2>
                    <p style={{ color: 'var(--text-muted)' }}>If you are not redirected, <Link to="/appointment" style={{ color: 'var(--primary)' }}>click here</Link></p>
                </div>
            </div>
        );
    }

    // Safety fallback for doctor name
    const getDoctorLabel = () => {
        if (!appointment.doctor) return 'Any available';
        const parts = appointment.doctor.split(' ');
        if (parts.length > 1) return parts[1]; // Return first name
        return appointment.doctor;
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-light)', padding: '100px 20px 40px' }} ref={ticketRef}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ maxWidth: '450px', margin: '0 auto', background: 'var(--white)', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}
            >
                {/* Compact Header */}
                <div style={{ background: 'var(--gradient-primary)', padding: '30px 24px', textAlign: 'center', color: 'white' }}>
                    <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: '0 8px 20px rgba(0,0,0,0.15)', padding: '6px' }}>
                        <IconDentalCheckup size={36} color="var(--primary)" />
                    </div>
                    <h1 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '20px', fontWeight: 800, marginBottom: '4px' }}>Booking Confirmed!</h1>
                    <p style={{ opacity: 0.9, fontSize: '13px' }}>Show this at the clinic reception</p>
                </div>

                {/* Body Content */}
                <div style={{ padding: '24px' }}>
                    {/* ID Banner */}
                    <div style={{ background: 'var(--bg-light)', borderRadius: '16px', padding: '16px', border: '1px solid var(--border-color)', textAlign: 'center', marginBottom: '24px' }}>
                        <p style={{ fontSize: '11px', color: 'var(--primary-hover)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Appointment ID</p>
                        <h2 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '2px', fontFamily: 'monospace', margin: 0 }}>
                            {appointment.appointmentId || 'LD-XXXXX'}
                        </h2>
                    </div>

                    {/* Compact Details Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                        {[
                            { icon: <FaCalendarAlt />, label: 'DATE', value: appointment.date },
                            { icon: <FaClock />, label: 'TIME', value: appointment.time },
                            { icon: <FaUserMd />, label: 'DOCTOR', value: getDoctorLabel() },
                            { icon: <FaTooth />, label: 'SERVICE', value: appointment.service },
                        ].map((item, i) => (
                            <div key={i} style={{ padding: '12px', background: 'var(--bg-light)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: 'var(--text-muted)' }}>
                                    <span style={{ fontSize: '10px' }}>{item.icon}</span>
                                    <span style={{ fontSize: '9px', fontWeight: 700 }}>{item.label}</span>
                                </div>
                                <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.value || '—'}</p>
                            </div>
                        ))}
                    </div>

                    {/* Patient Info Bar */}
                    <div style={{ padding: '12px 16px', background: 'var(--white)', border: '1px solid var(--border-color)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Patient: <strong>{appointment.name || 'Visitor'}</strong></span>
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{appointment.phone || ''}</span>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            onClick={() => navigate('/')}
                            style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--white)', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                        >
                            Done
                        </button>
                        <button
                            onClick={downloadScreenshot}
                            style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: 'var(--gradient-primary)', color: 'white', fontWeight: 600, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                        >
                            <FaDownload size={12} /> Save Photo
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
