import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconDentalCheckup, IconRootCanal, IconDentalImplant, IconSmileDesign, IconTeethWhitening, IconWisdomTooth, IconLaserDentistry, IconBraces } from '../components/DentalIcons';
import { FaCalendarAlt } from 'react-icons/fa';
import SectionHeader from '../components/SectionHeader';

const services = [
    {
        Icon: IconDentalCheckup, title: 'Dental Checkup', category: 'General Dentistry',
        desc: 'Regular examinations and cleaning to maintain optimal oral health.',
        features: ['Digital X-Rays', 'Teeth Scaling', 'Oral Cancer Screening', 'Hygiene Counseling'],
        duration: '45–60 min', color: 'var(--primary)',
    },
    {
        Icon: IconRootCanal, title: 'Root Canal Treatment', category: 'Endodontics',
        desc: 'Advanced therapy to save infected teeth and relieve dental pain.',
        features: ['Single & Multi-Canal', 'Rotary RCT', 'Digital X-Ray Guided', 'Same Day Treatment'],
        duration: '60–90 min', color: 'var(--primary-hover)',
    },
    {
        Icon: IconTeethWhitening, title: 'Teeth Whitening', category: 'Cosmetic Dentistry',
        desc: 'Professional treatment to brighten your teeth and enhance your smile.',
        features: ['Laser Whitening', 'Take-Home Kits', 'Safe & Effective', 'Long Lasting Results'],
        duration: '60–90 min', color: 'var(--primary)',
    },
    {
        Icon: IconDentalImplant, title: 'Dental Implants', category: 'Oral Surgery',
        desc: 'Precision-crafted replacements for missing teeth that look and feel natural.',
        features: ['Titanium Implants', 'Same Day Crown', 'All-on-4 Available', 'Lifetime Warranty'],
        duration: '2–3 hrs', color: 'var(--secondary)',
    },
    {
        Icon: IconSmileDesign, title: 'Smile Designing', category: 'Cosmetic Dentistry',
        desc: 'Comprehensive cosmetic transformations for your perfect, confident smile.',
        features: ['Digital Smile Preview', 'Porcelain Veneers', 'Ceramic Crowns', 'Composite Bonding'],
        duration: '2–4 sessions', color: 'var(--secondary)',
    },
    {
        Icon: IconBraces, title: 'Braces & Aligners', category: 'Orthodontics',
        desc: 'Specialized orthodontic solutions to straighten teeth and improve alignment.',
        features: ['Metal Braces', 'Ceramic Braces', 'Clear Aligners', 'Retainers'],
        duration: '12–24 months', color: 'var(--primary-hover)',
    },
    {
        Icon: IconWisdomTooth, title: 'Wisdom Tooth Removal', category: 'Oral Surgery',
        desc: 'Safe and comfortable extraction of impacted or problematic wisdom teeth.',
        features: ['Painless Extraction', 'Impacted Tooth Surgery', 'Same-Day Procedure', 'Expert Care'],
        duration: '30–60 min', color: 'var(--secondary)',
    },
];

export default function Services() {
    return (
        <div>
            {/* Hero */}
            <section style={{ background: 'var(--bg-light)', padding: '60px 24px 48px', textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <span className="section-badge">✦ Our Services</span>
                    <h1 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '12px' }}>
                        Dental <span className="gradient-text">Services</span>
                    </h1>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
                        From routine checkups to complex cosmetic treatments — expert care under one roof.
                    </p>
                </motion.div>
            </section>

            {/* Services Grid */}
            <section style={{ padding: '64px 24px', background: 'var(--white)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                whileHover={{ y: -8 }}
                                style={{
                                    background: 'var(--bg-card)', borderRadius: '24px', overflow: 'hidden',
                                    boxShadow: 'var(--shadow-soft)', border: '1px solid var(--border-color)',
                                    transition: 'box-shadow 0.3s ease',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 20px 60px rgba(255, 107, 61, 0.12)`}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-soft)'}
                            >
                                {/* Header */}
                                <div style={{
                                    height: '120px', background: `linear-gradient(135deg, ${service.color}15, ${service.color}08)`,
                                    display: 'flex', alignItems: 'center', padding: '0 28px', gap: '16px',
                                    borderBottom: `2px solid ${service.color}20`,
                                }}>
                                    <div style={{
                                        width: '72px', height: '72px', borderRadius: '16px',
                                        background: 'white', border: '1.5px solid #f0ece8',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        boxShadow: '0 2px 10px rgba(124,58,30,0.1)',
                                        flexShrink: 0,
                                    }}>
                                        <service.Icon size={44} color="var(--primary)" />
                                    </div>
                                    <div>
                                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: service.color, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{service.category}</span>
                                        <h3 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '19px', fontWeight: 700, color: 'var(--text-main)', marginTop: '2px' }}>{service.title}</h3>
                                    </div>
                                </div>

                                {/* Body */}
                                <div style={{ padding: '24px 28px' }}>
                                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>{service.desc}</p>

                                    {/* Features */}
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '20px' }}>
                                        {service.features.map((f, j) => (
                                            <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: service.color, flexShrink: 0 }} />
                                                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{f}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-muted)' }}>⏱ {service.duration}</span>
                                        <Link to="/appointment"
                                            style={{
                                                background: `${service.color}15`, color: service.color,
                                                padding: '8px 18px', borderRadius: '50px',
                                                fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px',
                                                textDecoration: 'none', transition: 'all 0.2s ease',
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.background = service.color; e.currentTarget.style.color = 'white'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.background = `${service.color}15`; e.currentTarget.style.color = service.color; }}
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section style={{ padding: '64px 24px', background: 'var(--bg-light)' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <SectionHeader badge="FAQ" title="Common" highlight="Questions" />
                    <div>
                        {[
                            { q: 'How often should I visit the dentist?', a: 'We recommend visiting every 6 months for routine checkups and cleanings, even if you have no visible dental problems.' },
                            { q: 'Is root canal treatment painful?', a: 'Modern root canal treatment is typically painless due to advanced anesthesia and precision instruments.' },
                            { q: 'How long do dental implants last?', a: 'With proper oral hygiene and regular dental checkups, dental implants can last a lifetime.' },
                            { q: 'Are braces or clear aligners better?', a: 'Both are effective solutions. The choice depends on your specific dental needs and lifestyle preferences.' },
                            { q: 'Do you offer emergency dental care?', a: 'Yes! We provide emergency dental care for severe pain, dental trauma, and urgent issues.' },
                        ].map((faq, i) => (
                            <FAQItem key={i} q={faq.q} a={faq.a} i={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: '80px 24px', background: 'var(--gradient-primary)', textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(26px, 4vw, 40px)', color: 'white', marginBottom: '16px' }}>
                        Ready to Book Your Treatment?
                    </h2>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.85)', marginBottom: '32px' }}>Experience professional dental care with our expert team.</p>
                    <Link to="/appointment" id="services-book-btn"
                        style={{ background: 'white', color: 'var(--primary)', padding: '16px 40px', borderRadius: '50px', fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: 'var(--shadow-soft)' }}
                    >
                        <FaCalendarAlt /> Book Appointment
                    </Link>
                </motion.div>
            </section>
        </div>
    );
}

function FAQItem({ q, a, i }) {
    const [open, setOpen] = React.useState(false);
    return (
        <motion.div
            className="faq-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
        >
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px',
                    textAlign: 'left',
                }}
            >
                <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '16px', color: 'var(--text-main)' }}>{q}</span>
                <span style={{ color: 'var(--primary)', fontSize: '20px', transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
            </button>
            {open && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ padding: '0 24px 20px', fontFamily: 'Inter, sans-serif', fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.8 }}
                >
                    {a}
                </motion.div>
            )}
        </motion.div>
    );
}
