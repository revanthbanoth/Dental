import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeader({ badge, title, highlight, description, center = true }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: center ? 'center' : 'left', marginBottom: '48px' }}
        >
            {badge && (
                <span className="section-badge">
                    <span>✦</span> {badge}
                </span>
            )}
            <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px' }}>
                {title}{' '}
                {highlight && <span className="gradient-text">{highlight}</span>}
            </h2>
            {description && (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'var(--text-muted)', maxWidth: center ? '600px' : 'none', margin: center ? '0 auto' : '0', lineHeight: 1.7 }}>
                    {description}
                </p>
            )}
        </motion.div>
    );
}
