import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaCalendarAlt, FaUserMd, FaGraduationCap, FaAward, FaLanguage, FaClock } from 'react-icons/fa';
import SectionHeader from '../components/SectionHeader';

const doctors = [
    {
        name: 'Dr. Rahul Sharma',
        role: 'Demo Lead Dentist',
        qualification: 'BDS, MDS – General Dentistry',
        experience: '10+ Years',
        specialization: ['Dental Implants', 'Smile Designing', 'Cosmetic Dentistry', 'Full Mouth Rehab'],
        color: 'var(--primary)',
        rating: 5.0,
        reviews: 320,
        college: 'Medical University (Demo)',
        languages: 'English, Hindi',
        availability: 'Mon–Sat: 9AM–6PM',
    },
    {
        name: 'Dr. Anjali Gupta',
        role: 'Demo Orthodontist',
        qualification: 'BDS, MDS – Orthodontics',
        experience: '8+ Years',
        specialization: ['Metal Braces', 'Clear Aligners', 'Invisalign Specialists', 'Teeth Alignment'],
        color: 'var(--primary-hover)',
        rating: 4.9,
        reviews: 280,
        college: 'Dental Institute (Demo)',
        languages: 'English, Hindi',
        availability: 'Tue–Sun: 10AM–7PM',
    },
    {
        name: 'Dr. Sameer Khan',
        role: 'Demo Endodontist',
        qualification: 'BDS, MDS – endodontics',
        experience: '9+ Years',
        specialization: ['Painless Root Canal', 'Gum Treatment', 'Laser Therapy', 'Scaling'],
        color: 'var(--secondary)',
        rating: 4.9,
        reviews: 195,
        college: 'National Dental Academy (Demo)',
        languages: 'English, Hindi, Urdu',
        availability: 'Mon–Fri: 9AM–5PM',
    },
    {
        name: 'Dr. Neha Verma',
        role: 'Demo Oral Surgeon',
        qualification: 'BDS, MDS – Oral Surgery',
        experience: '7+ Years',
        specialization: ['Tooth Extractions', 'Wisdom Tooth Surgery', 'Bone Grafting', 'Jaw Surgery'],
        color: 'var(--primary)',
        rating: 5.0,
        reviews: 210,
        college: 'Global School of Dentistry (Demo)',
        languages: 'English, Hindi',
        availability: 'Mon–Sat: 11AM–8PM',
    },
];

export default function Doctors() {
    return (
        <div>
            {/* Hero */}
            <section style={{ background: 'var(--bg-light)', padding: '80px 24px 64px', textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <span className="section-badge">✦ Meet Our Team</span>
                    <h1 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px' }}>
                        Our Expert <span className="gradient-text">Dental Team</span>
                    </h1>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        Meet the skilled specialists behind thousands of beautiful smiles. Board-certified, experienced, and dedicated to your health.
                    </p>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-muted)' }}>
                        <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
                        <span>›</span>
                        <span>Doctors</span>
                    </div>
                </motion.div>
            </section>

            {/* Doctors Grid */}
            <section style={{ padding: '96px 24px', background: 'var(--white)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                        {doctors.map((doc, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.12 }}
                                className="doctor-card"
                            >
                                {/* Card Header */}
                                <div style={{
                                    height: '220px', background: `linear-gradient(135deg, ${doc.color}20, ${doc.color}10)`,
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                    position: 'relative',
                                }}>
                                    <div style={{
                                        width: '100px', height: '100px', borderRadius: '50%',
                                        background: `linear-gradient(135deg, ${doc.color}, ${doc.color}cc)`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: `0 10px 30px ${doc.color}40`, marginBottom: '12px',
                                    }}>
                                        <FaUserMd style={{ fontSize: '50px', color: 'white' }} />
                                    </div>
                                    <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                                        {[...Array(5)].map((_, j) => (
                                            <FaStar key={j} style={{ color: 'var(--gold-stars)', fontSize: '12px' }} />
                                        ))}
                                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-secondary)', marginLeft: '6px' }}>{doc.rating} ({doc.reviews})</span>
                                    </div>
                                    {/* Availability badge */}
                                    <div style={{
                                        position: 'absolute', top: '16px', right: '16px',
                                        background: '#dcfce7', color: '#16a34a', padding: '4px 12px',
                                        borderRadius: '100px', fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600,
                                    }}>
                                        ● Available
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div style={{ padding: '24px 28px' }}>
                                    <h3 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '22px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>{doc.name}</h3>
                                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: doc.color, fontWeight: 600, marginBottom: '4px' }}>{doc.role}</p>
                                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--text-muted)', marginBottom: '20px' }}>{doc.qualification}</p>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                                            <FaGraduationCap style={{ fontSize: '14px', color: doc.color, marginTop: '2px' }} />
                                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>{doc.college}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <FaAward style={{ fontSize: '14px', color: doc.color }} />
                                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>{doc.experience} Experience</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <FaLanguage style={{ fontSize: '14px', color: doc.color }} />
                                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>{doc.languages}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                            <FaClock style={{ fontSize: '14px', color: doc.color }} />
                                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>{doc.availability}</span>
                                        </div>
                                    </div>

                                    {/* Specializations */}
                                    <div style={{ marginBottom: '20px' }}>
                                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Specializations</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                            {doc.specialization.map((s) => (
                                                <span key={s} style={{
                                                    background: `${doc.color}12`, color: doc.color,
                                                    padding: '4px 10px', borderRadius: '100px',
                                                    fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 500,
                                                }}>{s}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <Link to="/appointment"
                                        style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                            background: `linear-gradient(135deg, ${doc.color}, ${doc.color}cc)`,
                                            color: 'white', padding: '12px', borderRadius: '12px',
                                            fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', textDecoration: 'none',
                                            transition: 'all 0.2s ease', boxShadow: `0 4px 15px ${doc.color}35`,
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <FaCalendarAlt /> Book Appointment
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section style={{ padding: '80px 24px', background: 'var(--gradient-primary)', textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(26px, 4vw, 40px)', color: 'white', marginBottom: '16px' }}>
                        Join Our Growing Family of Happy Patients
                    </h2>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.9)', marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
                        Our team of specialists is ready to give you the best dental care experience at our clinic.
                    </p>
                    <Link to="/appointment" id="doctors-book-btn"
                        style={{ background: 'var(--white)', color: 'var(--primary)', padding: '16px 40px', borderRadius: '50px', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: 'var(--shadow-soft)' }}
                    >
                        <FaCalendarAlt /> Schedule a Consultation
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}
