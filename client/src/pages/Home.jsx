import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SectionHeader from '../components/SectionHeader';
import { IconDentalImplant, IconBraces, IconRootCanal, IconSmileDesign, IconTeethWhitening, IconWisdomTooth, IconLaserDentistry, IconDentalCheckup, IconCrown } from '../components/DentalIcons';
import {
    FaTooth, FaUserMd, FaStar, FaAward, FaHeartbeat, FaCheckCircle,
    FaSmile, FaArrowRight, FaPhone, FaCalendarAlt, FaMapMarkerAlt,
    FaStethoscope, FaShieldAlt, FaClock,
} from 'react-icons/fa';

// toothImg removed - using SVG IconDentalCheckup

const services = [
    { emoji: <IconDentalCheckup size={32} color="var(--primary)" />, title: 'Dental Checkup', desc: 'Regular examinations and cleaning to maintain optimal oral health.', color: 'var(--primary)' },
    { emoji: '🏨', title: 'Root Canal Treatment', desc: 'Advanced therapy to save infected teeth and relieve dental pain.', color: 'var(--primary-hover)' },
    { emoji: '💎', title: 'Teeth Whitening', desc: 'Professional treatment to brighten your teeth and enhance your smile.', color: 'var(--secondary)' },
    { emoji: '✨', title: 'Dental Implants', desc: 'Precision-crafted replacements for missing teeth that look and feel natural.', color: 'var(--primary)' },
    { emoji: <IconSmileDesign size={32} color="var(--primary)" />, title: 'Smile Designing', desc: 'Comprehensive cosmetic transformations for your perfect, confident smile.', color: 'var(--primary)' },
    { emoji: '😬', title: 'Braces & Aligners', desc: 'Specialized orthodontic solutions to straighten teeth and improve alignment.', color: 'var(--primary-hover)' },
];

const testimonials = [
    { name: 'Aditi Singh', rating: 5, text: 'Absolutely amazing experience! The doctors are so gentle and professional. My dental implants look completely natural. Highly recommended!', location: 'City Center', service: 'Dental Implants' },
    { name: 'Vikram Malhotra', rating: 5, text: 'Best dental clinic template! Got my treatment done here – totally painless. The staff is friendly and the clinic is very clean and modern.', location: 'North Plaza', service: 'Root Canal' },
    { name: 'Kavita Iyer', rating: 5, text: 'My smile is completely transformed after the smile designing treatment. The results exceeded my expectations. Thank you SmileCare!', location: 'Medical Square', service: 'Smile Designing' },
    { name: 'Arjun Khanna', rating: 5, text: 'Very professional team. Got my teeth whitening done and the results are fantastic. The clinic has all modern equipment.', location: 'South Mall', service: 'Teeth Whitening' },
];

const stats = [
    { number: '5000+', label: 'Happy Patients', icon: '😊' },
    { number: '10+', label: 'Years Experience', icon: '🏆' },
    { number: '15+', label: 'Expert Doctors', icon: '👨‍⚕️' },
    { number: '20+', label: 'Services Offered', icon: <IconDentalCheckup size={24} color="white" /> },
];

const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

// ── Patient Speak Component (Clove Dental style) ──────────────────────────────
function PatientSpeak() {
    const [current, setCurrent] = useState(0);
    const visible = 3;
    const total = testimonials.length;

    const prev = () => setCurrent(c => (c - 1 + total) % total);
    const next = () => setCurrent(c => (c + 1) % total);

    // Get 3 visible slides (wrap around)
    const slides = [0, 1, 2].map(i => testimonials[(current + i) % total]);

    return (
        <section style={{ background: 'var(--sidebar-bg)', padding: '80px 24px', position: 'relative' }}>
            {/* Heading */}
            <h2 style={{ textAlign: 'center', color: 'white', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, fontFamily: "'Poppins', sans-serif", marginBottom: '56px', letterSpacing: '-0.5px' }}>
                Patient Speak
            </h2>

            {/* Cards + Arrows */}
            <div className="patient-speak-grid-parent" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '24px', overflow: 'hidden' }}>

                {/* Left Arrow */}
                <button className="arrow-btn" onClick={prev} style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.3)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0, transition: 'all 0.2s', fontFamily: 'sans-serif' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                >←</button>

                {/* 3 Cards */}
                <div className="patient-speak-grid" style={{ display: 'grid', gap: '24px', flex: 1 }}>
                    {slides.map((t, i) => (
                        <div key={i} className={`testimonial-slide-${i}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* Speech Bubble */}
                            <div style={{ position: 'relative', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px', padding: '32px 28px 28px', width: '100%', backdropFilter: 'blur(10px)' }}>
                                {/* Top-left blue quote */}
                                <span style={{ position: 'absolute', top: '-14px', left: '20px', fontSize: '52px', color: 'var(--secondary)', lineHeight: 1, fontFamily: 'Georgia, serif', fontWeight: 900 }}>"</span>

                                {/* Review text */}
                                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, margin: '8px 0 24px' }}>{t.text}</p>

                                {/* Bottom-right blue quote */}
                                <span style={{ position: 'absolute', bottom: '-10px', right: '20px', fontSize: '44px', color: 'var(--secondary)', lineHeight: 1, fontFamily: 'Georgia, serif', fontWeight: 900 }}>"</span>

                                {/* Bubble tail */}
                                <div style={{ position: 'absolute', bottom: '-18px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '14px solid transparent', borderRight: '14px solid transparent', borderTop: '18px solid rgba(255,255,255,0.08)' }} />
                            </div>

                            {/* Patient name + service below */}
                            <div style={{ marginTop: '28px', textAlign: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: '15px', color: 'white' }}>{t.name}</span>
                                    <span style={{ color: 'var(--secondary)', fontSize: '20px', fontFamily: 'Georgia, serif' }}>"</span>
                                </div>
                                <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', marginTop: '4px' }}>
                                    {[...Array(t.rating)].map((_, j) => <span key={j} style={{ color: 'var(--gold)', fontSize: '13px' }}>★</span>)}
                                </div>
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'rgba(255,255,255,0.55)', marginTop: '3px' }}>{t.location} · {t.service}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button className="arrow-btn" onClick={next} style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.3)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0, transition: 'all 0.2s', fontFamily: 'sans-serif' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
                >→</button>
            </div>

            {/* Dot indicators */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '36px' }}>
                {testimonials.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '4px', border: 'none', background: i === current ? 'var(--primary)' : 'rgba(255,255,255,0.35)', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
                ))}
            </div>

            <style>{`
              .patient-speak-grid { grid-template-columns: repeat(3, 1fr); }
              @media (max-width: 1024px) {
                .patient-speak-grid { grid-template-columns: repeat(2, 1fr) !important; }
                .testimonial-slide-2 { display: none !important; }
              }
              @media (max-width: 640px) {
                .patient-speak-grid { grid-template-columns: 1fr !important; }
                .testimonial-slide-1, .testimonial-slide-2 { display: none !important; }
                .patient-speak-grid-parent { gap: 12px !important; }
                .arrow-btn { width: 40px !important; height: 40px !important; }
              }
            `}</style>
        </section>
    );
}


export default function Home() {
    const [currentStat, setCurrentStat] = useState(0);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 640, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <div>
            {/* ===== HERO SECTION ===== */}
            <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '60px 24px', background: 'var(--bg-light)' }}>
                <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,61,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,90,47,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

                <div className="hero-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', alignItems: 'center', width: '100%', gap: '40px' }}>
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}>
                        <span className="section-badge" style={{ background: 'rgba(255, 107, 61, 0.1)', color: 'var(--primary)', border: '1px solid rgba(255, 107, 61, 0.2)', fontWeight: 700 }}>
                            <FaAward style={{ marginRight: '8px', color: 'var(--gold-stars)' }} /> Professional Dental Care Template
                        </span>
                        <h1 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 900, color: 'var(--text-main)', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-0.02em' }}>
                            Modern Dental Care for a <span className="gradient-text">Healthy Smile</span>
                        </h1>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '36px', maxWidth: '520px' }}>
                            This is a demo website template for dental clinics. Experience world-class dental care with modern equipment and a gentle touch.
                        </p>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <Link to="/appointment" className="btn-primary" id="hero-book-btn" style={{ fontSize: '15px', padding: '14px 28px' }}>
                                <FaCalendarAlt /> Book Appointment
                            </Link>
                            <Link to="/contact" className="btn-outline" id="hero-call-btn" style={{ fontSize: '15px', padding: '13px 24px' }}>
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }} style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="animate-float" style={{
                            width: '300px', height: '360px', borderRadius: '30px',
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 240, 230, 0.7) 100%)',
                            backdropFilter: 'blur(12px)',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 25px 50px rgba(255, 107, 61, 0.12)',
                            position: 'relative', overflow: 'hidden',
                            border: '1px solid rgba(255, 107, 61, 0.2)'
                        }}>
                            <div style={{ width: '150px', height: '150px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'drop-shadow(0 10px 15px rgba(255, 107, 61, 0.15))' }}>
                                <IconDentalCheckup size={110} color="var(--primary)" />
                            </div>
                            <h3 style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'var(--text-main)', fontSize: '20px', fontWeight: 800, marginBottom: '6px', textAlign: 'center', letterSpacing: '-0.01em' }}>SmileCare Dental Clinic</h3>
                            <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)', fontSize: '13px', fontWeight: 500, textAlign: 'center', opacity: 0.9 }}>Professional (Demo) Template</p>
                            <div style={{ marginTop: '20px', display: 'flex', gap: '5px' }}>
                                {[1, 2, 3, 4, 5].map(s => <FaStar key={s} style={{ color: 'var(--gold-stars)', fontSize: '17px', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))' }} />)}
                            </div>
                        </div>
                    </motion.div>
                </div>
                <style>{`
                  .hero-grid { grid-template-columns: 1fr 1fr; }
                  @media (max-width: 768px) { 
                    .hero-grid { grid-template-columns: 1fr !important; text-align: center; gap: 40px !important; } 
                    .hero-grid > div { display: flex; flex-direction: column; align-items: center; }
                  }
                `}</style>
            </section>

            {/* ===== STATS SECTION ===== */}
            <section style={{ background: 'var(--gradient-primary)', padding: '24px 16px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                    {stats.map((stat, i) => (
                        <div key={i} style={{ textAlign: 'center', color: 'white', padding: '8px', minWidth: '130px', flex: '1 1 130px' }}>
                            <div style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '28px', fontWeight: 800 }}>{stat.number}</div>
                            <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', opacity: 0.85 }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== SERVICES DIAGRAM SECTION (NEW) ===== */}
            <section style={{ padding: '100px 24px', background: 'var(--bg-light)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <SectionHeader
                        badge="Our Expertise"
                        title="Premium"
                        highlight="Treatments"
                        description="Experience world-class dental care with our specialized services."
                    />

                    {/* Diagram Container */}
                    <div className="services-diagram-container">

                        {/* Left Side Services */}
                        <div className="diagram-side left">
                            {[
                                { Icon: IconBraces, title: 'Braces', desc: 'Customized treatment for perfect, lasting results.' },
                                { Icon: IconSmileDesign, title: 'Smile Design', desc: 'Transform your smile with natural-looking results.' },
                                { Icon: IconDentalImplant, title: 'Implants', desc: 'Permanent solution to replace missing teeth.' },
                                { Icon: IconCrown, title: 'Crowns & Bridges', desc: 'Durable zirconia solutions for missing teeth.' }
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    className="diagram-card"
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="card-connector-line left" />
                                    <div className="diagram-card-inner">
                                        <div className="diagram-icon-box">
                                            <s.Icon size={32} color="var(--primary)" />
                                        </div>
                                        <div className="diagram-text-box">
                                            <h3>{s.title}</h3>
                                            <p>{s.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Center Visual */}
                        <div className="diagram-center">
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <IconDentalCheckup size={200} color="var(--primary)" />
                            </motion.div>
                        </div>

                        {/* Right Side Services */}
                        <div className="diagram-side right">
                            {[
                                { Icon: IconTeethWhitening, title: 'Whitening', desc: 'Professional whitening for a brighter smile.' },
                                { Icon: IconRootCanal, title: 'Root Canal', desc: 'Pain-free treatment to save infected teeth.' },
                                { Icon: IconWisdomTooth, title: 'Extraction', desc: 'Safe removal of impacted wisdom teeth.' },
                                { Icon: IconCrown, title: 'Braces', desc: 'Orthodontic solutions for perfect alignment.' }
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    className="diagram-card"
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <div className="card-connector-line right" />
                                    <div className="diagram-card-inner">
                                        <div className="diagram-icon-box">
                                            <s.Icon size={32} color="var(--primary)" />
                                        </div>
                                        <div className="diagram-text-box">
                                            <h3>{s.title}</h3>
                                            <p>{s.desc}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <style>{`
                    .services-diagram-container {
                        display: grid;
                        grid-template-columns: 1fr 300px 1fr;
                        gap: 20px;
                        align-items: center;
                        position: relative;
                        margin-top: 60px;
                    }

                    .diagram-side {
                        display: flex;
                        flex-direction: column;
                        gap: 24px;
                        z-index: 2;
                    }

                    .diagram-center {
                        width: 300px;
                        height: 350px;
                        position: relative;
                        z-index: 1;
                    }

                    .center-tooth-img {
                        width: 100%;
                        height: auto;
                        filter: drop-shadow(0 20px 40px rgba(0,0,0,0.1));
                    }

                    .diagram-card {
                        position: relative;
                        background: var(--bg-card);
                        border-radius: 20px;
                        padding: 24px;
                        box-shadow: var(--shadow-soft);
                        border: 1px solid var(--border-color);
                        transition: all 0.3s ease;
                    }

                    .diagram-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 20px 40px rgba(249, 115, 22, 0.1);
                        border-color: #fca5a1;
                    }

                    .diagram-card-inner {
                        display: flex;
                        gap: 20px;
                        align-items: center;
                    }

                    .diagram-icon-box {
                        width: 48px;
                        height: 48px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-shrink: 0;
                    }

                    .diagram-text-box h3 {
                        font-family: 'Inter', sans-serif;
                        font-size: 18px;
                        font-weight: 700;
                        color: var(--text-main);
                        margin-bottom: 4px;
                    }

                    .diagram-text-box p {
                        font-family: 'Inter', sans-serif;
                        font-size: 13px;
                        color: var(--text-muted);
                        line-height: 1.5;
                        margin: 0;
                    }

                    /* Connector Lines */
                    .card-connector-line {
                        position: absolute;
                        top: 50%;
                        width: 100px;
                        height: 2px;
                        border-top: 2px dotted var(--secondary);
                        pointer-events: none;
                        display: block;
                    }

                    .card-connector-line.left {
                        right: -100px;
                        transform-origin: left;
                    }

                    .card-connector-line.right {
                        left: -100px;
                        transform-origin: right;
                    }

                    /* Animation and Tablet/Mobile adjustments */
                    @media (max-width: 1100px) {
                        .services-diagram-container {
                            grid-template-columns: 1fr;
                            gap: 40px;
                        }
                        .diagram-center {
                            grid-row: 1;
                            width: 250px;
                            height: 250px;
                            margin: 0 auto;
                        }
                        .card-connector-line {
                            display: none;
                        }
                    }

                    @media (max-width: 640px) {
                        .diagram-card-inner {
                            flex-direction: column;
                            text-align: center;
                            gap: 12px;
                        }
                        .diagram-side {
                            gap: 16px;
                        }
                    }
                `}</style>
            </section>

            {/* ===== WHY CHOOSE US ===== */}
            <section style={{ padding: '64px 24px', background: 'var(--white)' }}>
                <div className="choose-us-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gap: '60px', alignItems: 'center' }}>
                    <motion.div {...fadeInUp}>
                        <SectionHeader badge="Why Choose Us" title="Trusted" highlight="Care" center={false} />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            {[
                                { icon: '👨‍⚕️', title: 'Experts', desc: '10+ years exp.' },
                                { icon: '🔬', title: 'Tech', desc: 'Modern tools.' },
                                { icon: '❤️', title: 'Care', desc: 'Personalized.' },
                                { icon: '💰', title: 'Price', desc: 'Affordable.' },
                            ].map((item, i) => (
                                <div key={i} style={{ background: 'var(--bg-light)', padding: '16px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                                    <div style={{ fontSize: '20px', marginBottom: '8px' }}>{item.icon}</div>
                                    <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-main)' }}>{item.title}</h4>
                                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    <div style={{ borderRadius: '24px', background: 'linear-gradient(135deg, var(--bg-light), var(--bg-section))', padding: '32px', border: '1px solid rgba(255, 107, 61, 0.1)' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '16px', textAlign: 'center' }}>Clinic Features</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            {['Modern Equipment', 'Sterilized Env', 'Expert Team', 'Pain-Free', 'Digital Records', 'Comfortable'].map((f, i) => (
                                <div key={i} style={{ background: 'var(--bg-card)', padding: '10px', borderRadius: '10px', fontSize: '12px', boxShadow: 'var(--shadow-soft)', color: 'var(--text-secondary)' }}>
                                    <span style={{ color: 'var(--primary)', fontWeight: 700, marginRight: '4px' }}>✓</span> {f}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <style>{`
                  .choose-us-grid { grid-template-columns: 1fr 1fr; }
                  @media (max-width: 768px) { 
                    .choose-us-grid { grid-template-columns: 1fr !important; gap: 32px !important; } 
                  }
                `}</style>
            </section>

            {/* ===== DOCTOR PREVIEW ===== */}
            <section style={{ padding: '64px 24px', background: 'var(--bg-light)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <SectionHeader badge="Leadership" title="Expert" highlight="Doctors" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                        {[
                            { name: 'Dr. Rahul Sharma', role: 'Demo Lead Dentist', color: 'var(--primary)' },
                            { name: 'Dr. Anjali Gupta', role: 'Demo Orthodontist', color: 'var(--primary-hover)' },
                            { name: 'Dr. Sameer Khan', role: 'Demo Endodontist', color: 'var(--secondary)' },
                        ].map((doc, i) => (
                            <div key={i} style={{ background: 'var(--bg-card)', borderRadius: '20px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', border: '1px solid var(--border-color)' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: `${doc.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <FaUserMd style={{ fontSize: '28px', color: doc.color }} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '15px', fontWeight: 700 }}>{doc.name}</h3>
                                    <p style={{ fontSize: '12px', color: doc.color, fontWeight: 600 }}>{doc.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <PatientSpeak />

            {/* ===== MAP SECTION ===== */}
            <section style={{ padding: '64px 24px', background: 'var(--white)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <SectionHeader badge="Location" title="Visit" highlight="Us" />
                    <div style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-soft)', border: '1px solid var(--border-color)' }}>
                        <iframe title="Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30441.62959090063!2d78.44555199999999!3d17.5428543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8e86c49d4f73%3A0x2f0c7fc4c2ee1b8!2sKompally%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1709000000000!5m2!1sen!2sin" width="100%" height="280" style={{ border: 0, display: 'block' }} allowFullScreen="" loading="lazy" />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '24px', flexWrap: 'wrap', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        <span><FaMapMarkerAlt /> 123 Dental Street, Medical Plaza, City Center, India</span>
                        <span><FaPhone /> +91 90000 00000</span>
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section style={{ padding: '64px 24px', background: 'var(--gradient-primary)', textAlign: 'center', color: 'white' }}>
                <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 800, marginBottom: '16px' }}>Ready for Your Perfect Smile?</h2>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/appointment" className="btn-primary" style={{ background: 'white', color: 'var(--primary)', padding: '12px 28px', borderRadius: '50px', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>Book Appointment</Link>
                    <Link to="/contact" className="btn-outline" style={{ color: 'white', padding: '10px 26px', borderRadius: '50px', fontWeight: 600, fontSize: '14px', textDecoration: 'none', border: '2px solid white' }}>Contact Us</Link>
                </div>
            </section>
        </div>
    );
}
