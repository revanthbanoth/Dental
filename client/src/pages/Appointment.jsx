import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaCalendarAlt, FaPhone, FaUser, FaEnvelope, FaClock, FaMapMarkerAlt, FaHospital, FaCheckCircle, FaClipboardList, FaCommentAlt, FaLock, FaAward, FaUserMd } from 'react-icons/fa';
import { IconDentalCheckup, IconSmileDesign } from '../components/DentalIcons';
import { bookAppointment } from '../services/api';

const doctors = [
    'Any Available (Demo)',
    'Dr. Rahul Sharma – Demo Dentist',
    'Dr. Anjali Gupta – Demo Orthodontist',
    'Dr. Sameer Khan – Demo Endodontist',
];

// Map display name to stored value
const doctorValues = [
    'Any Available',
    'Dr. Rahul Sharma',
    'Dr. Anjali Gupta',
    'Dr. Sameer Khan',
];

const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
    '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '07:00 PM', '07:30 PM',
];

const inputStyle = {
    width: '100%', padding: '14px 18px', border: '2px solid var(--border-color)',
    borderRadius: '12px', fontFamily: 'Inter, sans-serif', fontSize: '15px',
    color: 'var(--text-main)', background: 'var(--white)', outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
};

const services = [
    'Dental Checkup',
    'Root Canal Treatment',
    'Teeth Whitening',
    'Dental Implants',
    'Smile Designing',
    'Braces & Aligners',
    'Wisdom Tooth Removal',
    'Other (Demo)',
];

export default function Appointment() {
    const initialForm = { name: '', phone: '', email: '', date: '', time: '', doctor: '', service: '', message: '' };
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [focusedField, setFocusedField] = useState('');

    const validate = () => {
        const errs = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        // Accept any 10-digit number, with optional +91 prefix or spaces/dashes
        const phoneDigits = form.phone.trim().replace(/[\s\-\+]/g, '').replace(/^91/, '');
        if (!form.phone.trim() || !/^[0-9]{10}$/.test(phoneDigits)) errs.phone = 'Valid 10-digit phone number required';
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email required';
        if (!form.date) errs.date = 'Date is required';
        if (!form.time) errs.time = 'Time slot is required';
        if (!form.doctor) errs.doctor = 'Please select a doctor';
        if (!form.service) errs.service = 'Please select a service';
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
            const response = await bookAppointment(form);
            setForm(initialForm);
            // Navigate to success page with appointment data
            navigate('/appointment/success', {
                state: { appointment: response.data.data }
            });
        } catch (error) {
            console.error('Appointment booking error:', error);
            const msg = error.response?.data?.message
                || (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK'
                    ? '❌ Cannot connect to server. Please make sure the backend is running on port 5000.'
                    : 'Failed to book appointment. Please try again.');
            toast.error(msg, { duration: 5000 });
        } finally {
            setLoading(false);
        }
    };

    const getFocusStyle = (field) => focusedField === field
        ? { borderColor: 'var(--primary)', boxShadow: '0 0 0 4px rgba(20, 184, 166, 0.12)' }
        : errors[field] ? { borderColor: '#dc2626', boxShadow: '0 0 0 4px rgba(220,38,38,0.08)' } : {};

    const today = new Date().toISOString().split('T')[0];

    return (
        <div>
            {/* Hero */}
            <section style={{ background: 'var(--bg-light)', padding: '80px 24px 64px', textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <span className="section-badge">✦ Book Appointment</span>
                    <h1 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px' }}>
                        Schedule Your <span className="gradient-text">Dental Visit</span>
                    </h1>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        Book an appointment with our expert dentists. We'll confirm within 2 hours.
                    </p>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-muted)' }}>
                        <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
                        <span>›</span>
                        <span>Book Appointment</span>
                    </div>
                </motion.div>
            </section>

            {/* Form Section */}
            <section style={{ padding: '80px 24px', background: 'var(--white)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '60px', alignItems: 'start' }}>
                    {/* Info Panel */}
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <div style={{ background: 'var(--gradient-primary)', borderRadius: '24px', padding: '36px', color: 'white', marginBottom: '24px' }}>
                            <h3 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '22px', fontWeight: 700, marginBottom: '20px' }}>Clinic Information</h3>
                            {[
                                { icon: <FaMapMarkerAlt />, label: 'Address', value: '123 Dental Street, Medical Plaza\nCity Center, India – 500000' },
                                { icon: <FaPhone />, label: 'Phone', value: '+91 90000 00000' },
                                { icon: <FaEnvelope />, label: 'Email', value: 'info@smilecaredental.com' },
                                { icon: <FaClock />, label: 'Hours', value: 'Mon–Sat: 9AM–8PM\nSunday: 10AM–4PM (Demo)' },
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '14px', marginBottom: '18px', alignItems: 'flex-start' }}>
                                    <span style={{ fontSize: '18px', marginTop: '2px', opacity: 0.9 }}>{item.icon}</span>
                                    <div>
                                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600, opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>{item.label}</div>
                                        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', lineHeight: 1.6, whiteSpace: 'pre-line', opacity: 0.9 }}>{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Steps */}
                        <div style={{ background: 'var(--bg-light)', borderRadius: '20px', padding: '28px', border: '1px solid var(--border-color)' }}>
                            <h4 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '18px', color: 'var(--text-main)', marginBottom: '16px' }}>How It Works</h4>
                            {[
                                {
                                    step: '1', text: 'Fill the appointment form with your details', icon: <FaClipboardList />
                                },
                                { step: '2', text: 'Our team confirms via call within 2 hours', icon: <FaPhone /> },
                                { step: '3', text: 'Visit the clinic at your scheduled time', icon: <FaHospital /> },
                                { step: '4', text: 'Receive expert dental care & treatment', icon: <IconSmileDesign size={18} color="var(--primary)" /> },
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '14px' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>
                                        {item.step}
                                    </div>
                                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '6px' }}>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Appointment Form */}
                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
                        <div style={{ background: 'var(--white)', borderRadius: '28px', padding: '44px', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--border-color)' }}>
                            <h3 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '26px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>Book Your Appointment</h3>
                            <div style={{ background: 'var(--bg-light)', border: '1px solid var(--border-color)', color: 'var(--text-main)', padding: '10px 16px', borderRadius: '12px', fontSize: '13px', marginBottom: '16px', fontWeight: 500 }}>
                                🔔 <strong>Note:</strong> This is a demo appointment form. Submissions will be stored as demo data.
                            </div>
                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-muted)', marginBottom: '32px' }}>Fill in the form and we'll get back to you promptly.</p>

                            <form onSubmit={handleSubmit} id="appointment-form">
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                    {/* Name */}
                                    <div>
                                        <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                                            <FaUser style={{ marginRight: '6px', color: 'var(--primary)' }} /> Full Name *
                                        </label>
                                        <input
                                            type="text" name="name" id="appt-name" value={form.name} placeholder="Your full name"
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('name')}
                                            onBlur={() => setFocusedField('')}
                                            style={{ ...inputStyle, ...getFocusStyle('name') }}
                                        />
                                        {errors.name && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>{errors.name}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                                            <FaPhone style={{ marginRight: '6px', color: 'var(--primary)' }} /> Phone Number *
                                        </label>
                                        <input
                                            type="tel" name="phone" id="appt-phone" value={form.phone} placeholder="10-digit mobile number"
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('phone')}
                                            onBlur={() => setFocusedField('')}
                                            style={{ ...inputStyle, ...getFocusStyle('phone') }}
                                        />
                                        {errors.phone && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>{errors.phone}</p>}
                                    </div>
                                </div>

                                {/* Email */}
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                                        <FaEnvelope style={{ marginRight: '6px', color: 'var(--primary)' }} /> Email Address *
                                    </label>
                                    <input
                                        type="email" name="email" id="appt-email" value={form.email} placeholder="your.email@example.com"
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField('')}
                                        style={{ ...inputStyle, ...getFocusStyle('email') }}
                                    />
                                    {errors.email && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>{errors.email}</p>}
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                    {/* Date */}
                                    <div>
                                        <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                                            <FaCalendarAlt style={{ marginRight: '6px', color: 'var(--primary)' }} /> Appointment Date *
                                        </label>
                                        <input
                                            type="date" name="date" id="appt-date" value={form.date} min={today}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('date')}
                                            onBlur={() => setFocusedField('')}
                                            style={{ ...inputStyle, ...getFocusStyle('date') }}
                                        />
                                        {errors.date && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>{errors.date}</p>}
                                    </div>

                                    {/* Time */}
                                    <div>
                                        <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                                            <FaClock style={{ marginRight: '6px', color: 'var(--primary)' }} /> Preferred Time *
                                        </label>
                                        <select
                                            name="time" id="appt-time" value={form.time}
                                            onChange={handleChange}
                                            onFocus={() => setFocusedField('time')}
                                            onBlur={() => setFocusedField('')}
                                            style={{ ...inputStyle, ...getFocusStyle('time'), cursor: 'pointer' }}
                                        >
                                            <option value="">Select time slot</option>
                                            {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                        {errors.time && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>{errors.time}</p>}
                                    </div>
                                </div>

                                {/* Doctor Selection */}
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                                        <FaUserMd style={{ marginRight: '6px', color: 'var(--primary)' }} /> Preferred Doctor *
                                    </label>
                                    <select
                                        name="doctor" id="appt-doctor" value={form.doctor}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('doctor')}
                                        onBlur={() => setFocusedField('')}
                                        style={{ ...inputStyle, ...getFocusStyle('doctor'), cursor: 'pointer' }}
                                    >
                                        <option value="">Select a doctor</option>
                                        {doctors.map((d, i) => (
                                            <option key={i} value={doctorValues[i]}>{d}</option>
                                        ))}
                                    </select>
                                    {errors.doctor && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>{errors.doctor}</p>}
                                </div>

                                {/* Service */}
                                <div style={{ marginBottom: '16px' }}>
                                    <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                                        <FaCheckCircle style={{ marginRight: '6px', color: 'var(--primary)' }} /> Service Required *
                                    </label>
                                    <select
                                        name="service" id="appt-service" value={form.service}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('service')}
                                        onBlur={() => setFocusedField('')}
                                        style={{ ...inputStyle, ...getFocusStyle('service'), cursor: 'pointer' }}
                                    >
                                        <option value="">Select a dental service</option>
                                        {services.map((s) => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                    {errors.service && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>{errors.service}</p>}
                                </div>

                                {/* Message */}
                                <div style={{ marginBottom: '28px' }}>
                                    <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                                        <FaCommentAlt style={{ marginRight: '6px', color: 'var(--primary)' }} /> Additional Message
                                    </label>
                                    <textarea
                                        name="message" id="appt-message" value={form.message} placeholder="Describe your concern or any specific requirements..." rows={4}
                                        onChange={handleChange}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField('')}
                                        style={{ ...inputStyle, ...getFocusStyle('message'), resize: 'vertical', minHeight: '100px' }}
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={loading}
                                    whileHover={{ scale: loading ? 1 : 1.02 }}
                                    whileTap={{ scale: loading ? 1 : 0.98 }}
                                    style={{
                                        width: '100%', padding: '16px', borderRadius: '14px',
                                        background: loading ? '#f1f5f9' : 'var(--gradient-primary)',
                                        color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                                        fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '16px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                        boxShadow: loading ? 'none' : 'var(--shadow-soft)',
                                        transition: 'background 0.3s ease',
                                    }}
                                    id="appt-submit-btn"
                                >
                                    {loading ? (
                                        <>
                                            <span style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite', display: 'inline-block' }} />
                                            Booking Appointment...
                                        </>
                                    ) : (
                                        <><FaCalendarAlt /> Confirm Appointment</>
                                    )}
                                </motion.button>

                                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', marginTop: '16px' }}>
                                    <FaLock style={{ marginRight: '4px' }} /> Your information is safe & secure. We'll contact you within 2 hours to confirm.
                                </p>
                            </form>
                        </div>
                    </motion.div>
                </div>
                <style>{`
          @media(max-width:768px){
            section div[style*="grid-template-columns: 1fr 1.6fr"]{grid-template-columns:1fr !important;}
            form div[style*="grid-template-columns: 1fr 1fr"]{grid-template-columns:1fr !important;}
          }
          @keyframes spin { to { transform: rotate(360deg); } }
        `}</style>
            </section>
        </div>
    );
}
