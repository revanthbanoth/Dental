import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaTag, FaUser, FaTooth, FaCheckCircle, FaSmile, FaAppleAlt, FaChild, FaLightbulb } from 'react-icons/fa';
import { IconDentalCheckup } from '../components/DentalIcons';

const blogPosts = [
    {
        id: 1, slug: 'importance-of-regular-dental-checkups',
        title: 'Why Regular Dental Checkups Are Essential for Your Health',
        excerpt: 'Regular dental checkups every 6 months can prevent 90% of common dental problems. Discover what happens during a routine dental exam and why you should never skip it.',
        category: 'Dental Tips', author: 'Dr. Rahul Sharma', date: 'Feb 28, 2026', readTime: '5 min read',
        tags: ['Checkup', 'Prevention', 'Oral Health'],
        icon: <IconDentalCheckup size={64} color="white" />, color: 'var(--primary)',
    },
    {
        id: 2, slug: 'oral-hygiene-guide-2024',
        title: 'The Complete Guide to Perfect Oral Hygiene in 2026',
        excerpt: "From brushing techniques to flossing and mouthwash — learn dentist-approved oral hygiene habits that will keep your teeth healthy and your smile bright for life.",
        category: 'Oral Hygiene', author: 'Dr. Neha Verma', date: 'Feb 20, 2026', readTime: '7 min read',
        tags: ['Brushing', 'Flossing', 'Hygiene'],
        icon: <FaCheckCircle size={64} />, color: 'var(--primary-hover)',
    },
    {
        id: 3, slug: 'dental-implants-vs-dentures',
        title: 'Dental Implants vs Dentures: Which Is Right for You?',
        excerpt: 'Comparing the two most popular tooth replacement options — their costs, comfort, longevity, and maintenance. A comprehensive guide to help you make the right choice.',
        category: 'Treatment', author: 'Dr. Sameer Khan', date: 'Feb 15, 2026', readTime: '8 min read',
        tags: ['Implants', 'Dentures', 'Treatment'],
        icon: <FaTooth size={64} />, color: 'var(--secondary)',
    },
    {
        id: 4, slug: 'foods-bad-for-teeth',
        title: '10 Foods That Are Secretly Destroying Your Teeth',
        excerpt: 'Some "healthy" foods can be surprisingly harmful to your teeth. Learn which foods and drinks to limit or avoid to protect your enamel and prevent cavities.',
        category: 'Dental Tips', author: 'Dr. Rahul Sharma', date: 'Feb 10, 2026', readTime: '6 min read',
        tags: ['Diet', 'Enamel', 'Cavities'],
        icon: <FaAppleAlt size={64} />, color: 'var(--secondary)',
    },
    {
        id: 5, slug: 'teeth-whitening-myths',
        title: '7 Common Teeth Whitening Myths Debunked by Dentists',
        excerpt: 'Is whitening safe? Does it damage enamel? Are home kits effective? Our dentists bust the most common teeth whitening myths so you can make an informed decision.',
        category: 'Dental Tips', author: 'Dr. Anjali Gupta', date: 'Feb 5, 2026', readTime: '5 min read',
        tags: ['Whitening', 'Myths', 'Cosmetic'],
        icon: <FaLightbulb size={64} />, color: 'var(--primary)',
    },
    {
        id: 6, slug: 'kids-dental-care-guide',
        title: "A Parent's Complete Guide to Children's Dental Care",
        excerpt: "From baby's first tooth to teenage braces — everything Indian parents need to know about their child's oral health at every stage of development.",
        category: 'Oral Hygiene', author: 'Dr. Neha Verma', date: 'Jan 30, 2026', readTime: '9 min read',
        tags: ["Kids' Dental", 'Prevention', 'Parents'],
        icon: <FaChild size={64} />, color: 'var(--primary-hover)',
    },
];

const categories = ['All', 'Dental Tips', 'Oral Hygiene', 'Treatment', 'FAQ'];

export default function Blog() {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filtered = selectedCategory === 'All'
        ? blogPosts
        : blogPosts.filter((p) => p.category === selectedCategory);

    return (
        <div>
            {/* Hero */}
            <section style={{ background: 'var(--bg-light)', padding: '80px 24px 64px', textAlign: 'center' }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <span className="section-badge">✦ Dental Blog</span>
                    <h1 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: 'var(--text-main)', marginBottom: '16px' }}>
                        Dental Tips &amp; <span className="gradient-text">Oral Health</span>
                    </h1>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                        Expert dental advice, oral hygiene tips, and answers to common dental questions from our specialists.
                    </p>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-muted)' }}>
                        <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
                        <span>›</span>
                        <span>Blog</span>
                    </div>
                </motion.div>
            </section>

            {/* Blog Content */}
            <section style={{ padding: '72px 24px', background: 'var(--white)' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {/* Category Filter */}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{
                                    padding: '10px 24px', borderRadius: '100px', border: 'none', cursor: 'pointer',
                                    fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px',
                                    background: selectedCategory === cat ? 'var(--gradient-primary)' : 'var(--bg-light)',
                                    color: selectedCategory === cat ? 'white' : 'var(--text-secondary)',
                                    transition: 'all 0.2s ease',
                                    boxShadow: selectedCategory === cat ? 'var(--shadow-soft)' : 'none',
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Blog Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
                        {filtered.map((post, i) => (
                            <motion.div
                                key={post.id}
                                className="blog-card"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                            >
                                {/* Post Image */}
                                <div style={{ height: '180px', background: `linear-gradient(135deg, ${post.color}, ${post.color}cc)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', position: 'relative' }}>
                                    {post.icon}
                                    <span style={{
                                        position: 'absolute', top: '12px', left: '12px',
                                        background: post.color, color: 'white',
                                        padding: '4px 12px', borderRadius: '100px',
                                        fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 600,
                                    }}>
                                        {post.category}
                                    </span>
                                </div>

                                {/* Post Content */}
                                <div style={{ padding: '24px' }}>
                                    <div style={{ display: 'flex', gap: '16px', marginBottom: '14px', flexWrap: 'wrap' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--text-muted)' }}>
                                            <FaUser style={{ color: post.color }} /> {post.author}
                                        </span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--text-muted)' }}>
                                            <FaClock style={{ color: post.color }} /> {post.readTime}
                                        </span>
                                    </div>

                                    <h3 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '10px', lineHeight: 1.35 }}>
                                        {post.title}
                                    </h3>
                                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
                                        {post.excerpt}
                                    </p>

                                    {/* Tags */}
                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                                        {post.tags.map((tag) => (
                                            <span key={tag} style={{
                                                background: `${post.color}10`, color: post.color,
                                                padding: '3px 10px', borderRadius: '100px',
                                                fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 500,
                                                display: 'flex', alignItems: 'center', gap: '4px',
                                            }}>
                                                <FaTag style={{ fontSize: '9px' }} /> {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                                        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--text-muted)' }}>{post.date}</span>
                                        <a href="#" style={{
                                            color: post.color, fontFamily: 'Inter, sans-serif', fontWeight: 600,
                                            fontSize: '13px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px',
                                        }}
                                            onClick={(e) => e.preventDefault()}>
                                            Read More →
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>


                </div>
            </section>
        </div>
    );
}
