import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
    getAppointments, deleteAppointment, updateAppointmentStatus,
    getContacts, deleteContact, verifyAdmin,
} from '../../services/api';
import { FaCalendarAlt, FaHourglassHalf, FaCheckCircle, FaEnvelope, FaChartBar, FaTooth, FaSyncAlt } from 'react-icons/fa';
import { IconDentalCheckup } from '../../components/DentalIcons';

const statusConfig = {
    pending: { bg: 'var(--bg-light)', color: 'var(--text-secondary)', label: 'Pending', dot: 'var(--gold-stars)' },
    confirmed: { bg: '#dcfce7', color: '#166534', label: 'Confirmed', dot: 'var(--secondary)' },
    cancelled: { bg: '#fee2e2', color: '#991b1b', label: 'Cancelled', dot: '#ef4444' },
    completed: { bg: '#dbeafe', color: '#1e40af', label: 'Completed', dot: 'var(--primary)' },
};

const font = "'Inter', system-ui, sans-serif";

export default function AdminDashboard() {
    const [tab, setTab] = useState('appointments');
    const [appointments, setAppointments] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        verifyAdmin().then(() => fetchData()).catch(() => navigate('/login'));
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [a, c] = await Promise.all([getAppointments(), getContacts()]);
            setAppointments(a.data.data || []);
            setContacts(c.data.data || []);
        } catch { toast.error('Failed to load data'); }
        finally { setLoading(false); }
    };

    const handleDeleteAppt = async (id) => {
        if (!window.confirm('Delete this appointment?')) return;
        await deleteAppointment(id).then(() => {
            setAppointments(p => p.filter(a => a._id !== id));
            toast.success('Deleted');
        }).catch(() => toast.error('Failed'));
    };

    const handleStatus = async (id, status) => {
        await updateAppointmentStatus(id, status).then(() => {
            setAppointments(p => p.map(a => a._id === id ? { ...a, status } : a));
            toast.success('Status updated');
        }).catch(() => toast.error('Failed'));
    };

    const handleDeleteContact = async (id) => {
        if (!window.confirm('Delete this message?')) return;
        await deleteContact(id).then(() => {
            setContacts(p => p.filter(c => c._id !== id));
            toast.success('Deleted');
        }).catch(() => toast.error('Failed'));
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/login');
        toast.success('Logged out');
    };

    const filteredAppointments = appointments.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.phone.includes(search) ||
        (a.appointmentId && a.appointmentId.toLowerCase().includes(search.toLowerCase()))
    );

    const filteredContacts = contacts.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search) ||
        c.message.toLowerCase().includes(search.toLowerCase())
    );

    const stats = [
        { label: 'Total Appointments', value: appointments.length, icon: <FaCalendarAlt />, bg: 'var(--bg-light)', border: 'var(--border-color)', text: 'var(--primary)' },
        { label: 'Pending', value: appointments.filter(a => a.status === 'pending').length, icon: <FaHourglassHalf />, bg: '#fffbeb', border: '#fef3c7', text: 'var(--gold-stars)' },
        { label: 'Confirmed', value: appointments.filter(a => a.status === 'confirmed').length, icon: <FaCheckCircle />, bg: '#f0fdf4', border: '#dcfce7', text: 'var(--secondary)' },
        { label: 'Messages', value: contacts.length, icon: <FaEnvelope />, bg: '#fdf4ff', border: '#f3e8ff', text: 'var(--primary-hover)' },
    ];

    const tabs = [
        { id: 'overview', icon: <FaChartBar style={{ marginRight: '6px' }} />, label: 'Overview' },
        { id: 'appointments', icon: <FaCalendarAlt style={{ marginRight: '6px' }} />, label: `Appointments (${appointments.length})` },
        { id: 'contacts', icon: <FaEnvelope style={{ marginRight: '6px' }} />, label: `Messages (${contacts.length})` },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-light)', fontFamily: font }}>

            {/* ── Top Header ── */}
            <header style={{
                background: 'white', borderBottom: '1px solid #e2e8f0',
                padding: isMobile ? '12px 16px' : '0 28px',
                height: isMobile ? 'auto' : '60px',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'stretch' : 'center',
                justifyContent: 'space-between',
                position: 'sticky', top: 0, zIndex: 100,
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                gap: isMobile ? '12px' : '0'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'white', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '2px' }}>
                            <IconDentalCheckup size={30} color="var(--primary)" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-main)', lineHeight: 1 }}>SmileCare Dental</div>
                            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>Admin Panel (Demo)</div>
                        </div>
                    </div>
                    {isMobile && (
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={fetchData} style={{ padding: '6px', borderRadius: '7px', border: '1px solid #e2e8f0', background: 'white', color: 'var(--text-secondary)' }}>
                                <FaSyncAlt size={14} />
                            </button>
                            <button onClick={handleLogout} style={{ padding: '6px 12px', borderRadius: '7px', border: 'none', background: '#fee2e2', color: '#dc2626', fontSize: '12px', fontWeight: 700 }}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                {!isMobile && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>{new Date().toLocaleDateString('en-IN', { dateStyle: 'medium' })}</span>
                        <a
                            href={window.location.origin.replace('admin.', '')}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                                fontSize: '12px', color: '#64748b', textDecoration: 'none',
                                fontFamily: font, fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px'
                            }}
                        >
                            Live Site ↗
                        </a>
                        <button onClick={fetchData} style={{ padding: '6px 12px', borderRadius: '7px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontSize: '13px', color: 'var(--text-secondary)', fontFamily: font, display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <FaSyncAlt style={{ fontSize: '11px' }} /> Refresh
                        </button>
                        <button onClick={handleLogout} style={{ padding: '6px 14px', borderRadius: '7px', border: 'none', background: '#fee2e2', color: '#dc2626', cursor: 'pointer', fontSize: '13px', fontWeight: 600, fontFamily: font }}>
                            Logout
                        </button>
                    </div>
                )}
            </header>

            {/* ── Tab Navigation ── */}
            <div style={{
                background: 'white', borderBottom: '1px solid #e2e8f0',
                padding: isMobile ? '8px 16px' : '0 28px',
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '12px' : '0',
                alignItems: isMobile ? 'stretch' : 'center',
                justifyContent: 'space-between'
            }}>
                <div style={{ display: 'flex', overflowX: isMobile ? 'auto' : 'visible' }}>
                    {tabs.map(t => (
                        <button key={t.id} onClick={() => setTab(t.id)} style={{
                            padding: isMobile ? '12px 14px' : '14px 20px',
                            border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600,
                            fontFamily: font, background: 'transparent',
                            color: tab === t.id ? 'var(--primary)' : '#64748b',
                            borderBottom: tab === t.id ? '2px solid var(--primary)' : '2px solid transparent',
                            transition: 'all 0.2s ease',
                            whiteSpace: 'nowrap',
                            flex: isMobile ? 1 : 'none'
                        }}>
                            {isMobile ? t.label.split(' ')[0] : <>{t.icon} {t.label}</>}
                        </button>
                    ))}
                </div>

                <div style={{ position: 'relative', width: isMobile ? '100%' : '300px', marginBottom: isMobile ? '8px' : '0' }}>
                    <FaSyncAlt style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '12px', color: '#94a3b8' }} />
                    <input
                        type="text"
                        placeholder="Search patient, ID or phone..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 12px 10px 36px',
                            borderRadius: '10px',
                            border: '1px solid #e2e8f0',
                            fontSize: '14px',
                            fontFamily: font,
                            outline: 'none',
                            background: '#f8fafc',
                            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)'
                        }}
                    />
                </div>
            </div>

            {/* ── Main Content ── */}
            <main style={{ maxWidth: '1400px', margin: '0 auto', padding: isMobile ? '16px' : '24px 28px' }}>

                {/* Stats Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
                    gap: isMobile ? '10px' : '16px',
                    marginBottom: '24px'
                }}>
                    {stats.map((s, i) => (
                        <div key={i} style={{
                            background: 'white', borderRadius: '12px',
                            padding: isMobile ? '14px' : '20px',
                            border: `1px solid ${s.border}`, display: 'flex', alignItems: 'center',
                            gap: isMobile ? '10px' : '14px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                        }}>
                            {!isMobile && (
                                <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: s.text, flexShrink: 0 }}>{s.icon}</div>
                            )}
                            <div>
                                <div style={{ fontSize: isMobile ? '20px' : '26px', fontWeight: 800, color: s.text, lineHeight: 1 }}>{s.value}</div>
                                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', fontWeight: 500 }}>{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── OVERVIEW TAB ── */}
                {tab === 'overview' && (
                    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                        <div style={{ padding: '18px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>Recent Appointments</div>
                            <button onClick={() => setTab('appointments')} style={{ fontSize: '13px', color: 'var(--primary)', border: 'none', background: 'none', cursor: 'pointer', fontFamily: font, fontWeight: 600 }}>View All →</button>
                        </div>
                        {isMobile ? (
                            <div style={{ padding: '12px' }}>
                                {filteredAppointments.slice(0, 10).map((a, i) => {
                                    const sc = statusConfig[a.status] || statusConfig.pending;
                                    return (
                                        <div key={a._id} style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>{a.appointmentId || '—'}</span>
                                                <span style={{ background: sc.bg, color: sc.color, padding: '2px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 700 }}>{sc.label}</span>
                                            </div>
                                            <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>{a.name}</div>
                                            <div style={{ fontSize: '12px', color: '#64748b' }}>{a.service} • {a.doctor}</div>
                                            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '8px', display: 'flex', gap: '8px' }}>
                                                <span>📅 {a.date}</span>
                                                <span>⏰ {a.time}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                                {filteredAppointments.length === 0 && (
                                    <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>{search ? 'No matches' : 'No appointments'}</div>
                                )}
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ background: '#f8fafc' }}>
                                            {['ID', 'Patient', 'Phone', 'Doctor', 'Service', 'Date', 'Time', 'Status'].map(h => (
                                                <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', whiteSpace: 'nowrap', fontFamily: font }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAppointments.slice(0, 10).map((a, i) => {
                                            const sc = statusConfig[a.status] || statusConfig.pending;
                                            return (
                                                <tr key={a._id} style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                                                    <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace' }}>{a.appointmentId || '—'}</td>
                                                    <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 600, color: '#0f172a' }}>{a.name}</td>
                                                    <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748b' }}>{a.phone}</td>
                                                    <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--primary)', fontWeight: 500 }}>{a.doctor || '—'}</td>
                                                    <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>{a.service}</td>
                                                    <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{a.date}</td>
                                                    <td style={{ padding: '12px 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>{a.time}</td>
                                                    <td style={{ padding: '12px 16px' }}>
                                                        <span style={{ background: sc.bg, color: sc.color, padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: sc.dot, display: 'inline-block' }} />
                                                            {sc.label}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {filteredAppointments.length === 0 && (
                                            <tr><td colSpan={8} style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>{search ? 'No matching appointments found.' : 'No appointments yet.'}</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* ── APPOINTMENTS TAB ── */}
                {tab === 'appointments' && (
                    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                        <div style={{ padding: '18px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>All Appointments</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{filteredAppointments.length} matching / {appointments.length} total</div>
                        </div>
                        {loading ? (
                            <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>Loading...</div>
                        ) : isMobile ? (
                            <div style={{ padding: '12px' }}>
                                {filteredAppointments.map((a, i) => {
                                    const sc = statusConfig[a.status] || statusConfig.pending;
                                    return (
                                        <div key={a._id} style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', marginBottom: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'flex-start' }}>
                                                <div>
                                                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary)', fontFamily: 'monospace', marginBottom: '4px' }}>{a.appointmentId || '—'}</div>
                                                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>{a.name}</div>
                                                </div>
                                                <select
                                                    value={a.status}
                                                    onChange={e => handleStatus(a._id, e.target.value)}
                                                    style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.dot}40`, padding: '6px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 700, outline: 'none' }}
                                                >
                                                    {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                                                </select>
                                            </div>

                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '12px', color: '#64748b' }}>
                                                <div>📞 {a.phone}</div>
                                                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>📧 {a.email}</div>
                                                <div>👨‍⚕️ {a.doctor || '—'}</div>
                                                <div>🦷 {a.service}</div>
                                                <div>📅 {a.date}</div>
                                                <div>⏰ {a.time}</div>
                                            </div>

                                            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid #e2e8f0', textAlign: 'right' }}>
                                                <button
                                                    onClick={() => handleDeleteAppt(a._id)}
                                                    style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                                                >
                                                    Delete Appointment
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                                {filteredAppointments.length === 0 && (
                                    <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>{search ? 'No matches found' : 'No appointments yet.'}</div>
                                )}
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
                                    <thead>
                                        <tr style={{ background: '#f8fafc' }}>
                                            {['ID', 'Patient', 'Phone', 'Email', 'Doctor', 'Service', 'Date', 'Time', 'Status', 'Action'].map(h => (
                                                <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', whiteSpace: 'nowrap', fontFamily: font }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredAppointments.map((a, i) => {
                                            const sc = statusConfig[a.status] || statusConfig.pending;
                                            return (
                                                <tr key={a._id}
                                                    style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? 'white' : '#fafafa', transition: 'background 0.15s' }}
                                                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-section)'}
                                                    onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'white' : '#fafafa'}
                                                >
                                                    <td style={{ padding: '12px 14px', fontSize: '11px', color: 'var(--primary)', fontWeight: 800, fontFamily: 'monospace' }}>{a.appointmentId || '—'}</td>
                                                    <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>{a.name}</td>
                                                    <td style={{ padding: '12px 14px', fontSize: '13px', color: 'var(--text-secondary)' }}>{a.phone}</td>
                                                    <td style={{ padding: '12px 14px', fontSize: '12px', color: '#64748b' }}>{a.email}</td>
                                                    <td style={{ padding: '12px 14px', fontSize: '12px', color: 'var(--primary)', fontWeight: 600, whiteSpace: 'nowrap' }}>{a.doctor || '—'}</td>
                                                    <td style={{ padding: '12px 14px', fontSize: '12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{a.service}</td>
                                                    <td style={{ padding: '12px 14px', fontSize: '12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{a.date}</td>
                                                    <td style={{ padding: '12px 14px', fontSize: '12px', color: 'var(--text-secondary)' }}>{a.time}</td>
                                                    <td style={{ padding: '12px 14px' }}>
                                                        <select value={a.status} onChange={e => handleStatus(a._id, e.target.value)}
                                                            style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.dot}40`, padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', outline: 'none', fontFamily: font }}>
                                                            {Object.entries(statusConfig).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                                                        </select>
                                                    </td>
                                                    <td style={{ padding: '12px 14px' }}>
                                                        <button onClick={() => handleDeleteAppt(a._id)}
                                                            style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: font, transition: 'all 0.2s' }}
                                                            onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = 'white'; }}
                                                            onMouseLeave={e => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.color = '#dc2626'; }}
                                                        >Delete</button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {filteredAppointments.length === 0 && (
                                            <tr><td colSpan={10} style={{ padding: '60px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
                                                <div style={{ fontSize: '36px', marginBottom: '8px', opacity: 0.3 }}><FaCalendarAlt /></div>No matching appointments found.
                                            </td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* ── CONTACTS TAB ── */}
                {tab === 'contacts' && (
                    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                        <div style={{ padding: '18px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontWeight: 700, fontSize: '15px', color: '#0f172a' }}>Contact Messages</div>
                            <div style={{ fontSize: '12px', color: '#94a3b8' }}>{filteredContacts.length} matching / {contacts.length} total</div>
                        </div>
                        {loading ? (
                            <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>Loading...</div>
                        ) : isMobile ? (
                            <div style={{ padding: '12px' }}>
                                {filteredContacts.map((c, i) => (
                                    <div key={c._id} style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px', marginBottom: '12px', border: '1px solid #e2e8f0' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{c.name}</span>
                                            <span style={{ fontSize: '11px', color: '#94a3b8' }}>{new Date(c.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div style={{ fontSize: '12px', color: 'var(--primary)', marginBottom: '10px' }}>{c.email} • {c.phone || 'No phone'}</div>
                                        <div style={{ background: 'white', padding: '12px', borderRadius: '8px', fontSize: '13px', color: 'var(--text-secondary)', border: '1px solid #f1f5f9', marginBottom: '12px' }}>
                                            {c.message}
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <button
                                                onClick={() => handleDeleteContact(c._id)}
                                                style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: 600 }}
                                            >
                                                Delete Message
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {filteredContacts.length === 0 && (
                                    <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>{search ? 'No matches' : 'No messages'}</div>
                                )}
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ background: '#f8fafc' }}>
                                            {['#', 'Name', 'Email', 'Phone', 'Message', 'Received', 'Action'].map(h => (
                                                <th key={h} style={{ padding: '11px 14px', textAlign: 'left', fontSize: '11px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.6px', whiteSpace: 'nowrap', fontFamily: font }}>{h}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredContacts.map((c, i) => (
                                            <tr key={c._id}
                                                style={{ borderTop: '1px solid #f1f5f9', background: i % 2 === 0 ? 'white' : '#fafafa', transition: 'background 0.15s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-section)'}
                                                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'white' : '#fafafa'}
                                            >
                                                <td style={{ padding: '12px 14px', fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>{i + 1}</td>
                                                <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{c.name}</td>
                                                <td style={{ padding: '12px 14px', fontSize: '13px', color: 'var(--primary)' }}>{c.email}</td>
                                                <td style={{ padding: '12px 14px', fontSize: '13px', color: 'var(--text-secondary)' }}>{c.phone || '—'}</td>
                                                <td style={{ padding: '12px 14px', fontSize: '12px', color: '#64748b', maxWidth: '300px' }}>
                                                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.message}</div>
                                                </td>
                                                <td style={{ padding: '12px 14px', fontSize: '12px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                                                    {new Date(c.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                                                </td>
                                                <td style={{ padding: '12px 14px' }}>
                                                    <button onClick={() => handleDeleteContact(c._id)}
                                                        style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: font, transition: 'all 0.2s' }}
                                                        onMouseEnter={e => { e.currentTarget.style.background = '#dc2626'; e.currentTarget.style.color = 'white'; }}
                                                        onMouseLeave={e => { e.currentTarget.style.background = '#fee2e2'; e.currentTarget.style.color = '#dc2626'; }}
                                                    >Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
