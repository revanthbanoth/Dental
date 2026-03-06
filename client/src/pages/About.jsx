import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaAward, FaUserMd, FaHeart, FaBullseye, FaCheckCircle, FaCalendarAlt, FaMedal, FaCrown, FaStar } from 'react-icons/fa';
import SectionHeader from '../components/SectionHeader';
import { IconDentalCheckup } from '../components/DentalIcons';

const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
});

export default function About() {
    return (
        <div>
            {/* Page Hero */}
            <section style={{ background: 'var(--bg-light)', padding: '60px 24px 48px', textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <span className="section-badge">✦ About Us</span>
                    <h1 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
                        About <span className="gradient-text">SmileCare Dental Clinic</span>
                    </h1>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        Professional dental care clinic template for a healthy smile.
                    </p>
                </motion.div>
            </section>

            {/* Clinic Introduction */}
            <section style={{ padding: '64px 24px', background: 'white' }}>
                <div className="about-intro-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gap: '60px', alignItems: 'center' }}>
                    <motion.div {...fadeInUp()}>
                        <span className="section-badge">✦ Our Story</span>
                        <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px', lineHeight: 1.3 }}>
                            A Legacy of <span className="gradient-text">Dental Excellence</span>
                        </h2>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
                            SmileCare Dental Clinic (Demo) is a modern dental care template designed to provide high-quality services. We believe that excellent dental care goes beyond just treating teeth — it's about building lasting relationships with our patients for a lifetime of healthy smiles.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            {[
                                { number: '5000+', label: 'Patients' },
                                { number: '10+', label: 'Years Exp' },
                                { number: '15+', label: 'Experts' },
                                { number: '98%', label: 'Satisfaction' },
                            ].map((s, i) => (
                                <div key={i} style={{ background: 'var(--bg-light)', borderRadius: '12px', padding: '12px', border: '1px solid var(--border-color)' }}>
                                    <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '20px', fontWeight: 800, color: 'var(--primary)' }}>{s.number}</div>
                                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--text-secondary)' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div {...fadeInUp(0.2)}>
                        <div style={{ borderRadius: '24px', background: 'var(--gradient-primary)', padding: '32px', textAlign: 'center', boxShadow: 'var(--shadow-xl)' }}>
                            <IconDentalCheckup size={60} color="white" />
                            <h3 style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'white', fontSize: '20px', marginTop: '16px' }}>SmileCare Dental Clinic</h3>
                            <p style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(255,255,255,0.85)', fontSize: '13px', marginTop: '8px' }}>
                                123 Dental Street, Medical Plaza, City Center, India
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section style={{ padding: '96px 24px', background: 'var(--bg-light)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <SectionHeader badge="Our Purpose" title="Mission &" highlight="Vision" description="Guided by our core values of excellence, compassion, and innovation." />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
                        {[
                            {
                                icon: <FaBullseye style={{ fontSize: '28px', color: 'var(--primary)' }} />,
                                title: 'Our Mission',
                                text: 'To provide comprehensive, high-quality dental care in a comfortable and caring environment, making advanced dentistry accessible to everyone in our community.',
                                color: 'var(--primary)',
                            },
                            {
                                icon: <FaHeart style={{ fontSize: '28px', color: 'var(--primary-hover)' }} />,
                                title: 'Our Vision',
                                text: 'To be the most trusted resource for dental wellness, known for clinical excellence, cutting-edge technology, and patient-centered care that transforms smiles and lives.',
                                color: 'var(--primary-hover)',
                            },
                            {
                                icon: <FaAward style={{ fontSize: '28px', color: '#ff8a65' }} />, // Secondary Orange
                                title: 'Our Values',
                                text: 'Excellence in clinical care, compassion for every patient, integrity in all dealings, and continuous innovation in modern dental technology.',
                                color: '#ff8a65',
                            },
                        ].map((item, i) => (
                            <motion.div key={i} {...fadeInUp(i * 0.15)} style={{
                                background: 'white', borderRadius: '24px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                                border: `1px solid ${item.color}20`, position: 'relative', overflow: 'hidden',
                            }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                                    {item.icon}
                                </div>
                                <h3 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '22px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '14px' }}>{item.title}</h3>
                                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'var(--text-muted)', lineHeight: 1.8 }}>{item.text}</p>
                                <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: `${item.color}08` }} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section style={{ padding: '64px 24px', background: 'var(--gradient-primary)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                        {[
                            { icon: <FaAward />, title: 'Best Clinic 2023' },
                            { icon: <FaCheckCircle />, title: 'NABH Accredited' },
                            { icon: <FaMedal />, title: 'ISO 9001:2015' },
                            { icon: <FaCrown />, title: '5-Star Rated' },
                        ].map((item, i) => (
                            <div key={i} style={{ padding: '16px', color: 'white', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', background: 'rgba(255,255,255,0.1)' }}>
                                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                                <h4 style={{ fontSize: '14px', fontWeight: 600 }}>{item.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Doctor Profile */}
            <section style={{ padding: '64px 24px', background: 'white' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <SectionHeader badge="Leadership" title="Meet Our" highlight="Lead Doctor" />
                    <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--bg-light)', borderRadius: '24px', padding: '32px', border: '1px solid var(--border-color)' }}>
                        <div style={{ display: 'flex', gap: '32px', alignItems: 'center', flexWrap: 'wrap' }}>
                            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <FaUserMd style={{ fontSize: '48px', color: 'white' }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>Dr. Rahul Sharma</h3>
                                <p style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: 600, marginBottom: '12px' }}>BDS, MDS | Demo Lead Dentist</p>
                                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                                    Dr. Rahul Sharma has 10+ years of experience in general and cosmetic dentistry. He has completed over 2,000 procedures and is passionate about providing gentle dental care.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '80px 24px', background: 'var(--bg-light)', textAlign: 'center' }}>
                <motion.div {...fadeInUp()}>
                    <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px' }}>
                        Ready to Experience <span className="gradient-text">Premium Dental Care?</span>
                    </h2>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 32px', lineHeight: 1.7 }}>
                        Book your appointment with our expert dentists today.
                    </p>
                    <Link to="/appointment" className="btn-primary" id="about-book-btn" style={{ fontSize: '16px', padding: '16px 40px' }}>
                        <FaCalendarAlt /> Book Appointment
                    </Link>
                </motion.div>
            </section>
            <style>{`
              .about-intro-grid { grid-template-columns: 1.2fr 1fr; }
              @media (max-width: 768px) { 
                .about-intro-grid { grid-template-columns: 1fr !important; gap: 40px !important; } 
                .about-intro-grid div:first-child { order: 2; }
                .about-intro-grid div:last-child { order: 1; }
              }
            `}</style>
        </div>
    );
}
