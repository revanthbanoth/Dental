import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaPhone, FaTimes, FaHeadset } from 'react-icons/fa';

export default function ContactHub() {
    const [isOpen, setIsOpen] = useState(false);

    const contactOptions = [
        {
            name: 'WhatsApp Us',
            icon: <FaWhatsapp />,
            color: '#25D366',
            link: 'https://wa.me/919000000000?text=Hello! I\'d like to book an appointment at SmileCare Dental Clinic (Demo).',
            isExternal: true
        },
        {
            name: 'Emergency Call',
            icon: <FaPhone />,
            color: '#EF4444',
            link: 'tel:+919000000000',
            isExternal: false
        }
    ];

    return (
        <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
            <AnimatePresence>
                {isOpen && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-end', marginBottom: '8px' }}>
                        {contactOptions.map((option, idx) => (
                            <motion.a
                                key={idx}
                                href={option.link}
                                target={option.isExternal ? "_blank" : "_self"}
                                rel={option.isExternal ? "noreferrer" : ""}
                                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                                transition={{ delay: (contactOptions.length - idx) * 0.1 }}
                                whileHover={{ x: -10 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 20px',
                                    borderRadius: '50px',
                                    background: 'var(--white)',
                                    color: 'var(--text-main)',
                                    textDecoration: 'none',
                                    boxShadow: 'var(--shadow-soft)',
                                    border: '1px solid var(--border-color)',
                                    fontFamily: 'Inter, sans-serif',
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                <span>{option.name}</span>
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: option.color,
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '16px'
                                }}>
                                    {option.icon}
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: isOpen ? 'var(--text-main)' : 'var(--gradient-primary)',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    boxShadow: isOpen ? 'var(--shadow-xl)' : 'var(--shadow-soft)',
                    transition: 'background 0.3s ease',
                    position: 'relative'
                }}
            >
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    {isOpen ? <FaTimes /> : <FaHeadset />}
                </motion.div>

                {!isOpen && (
                    <span style={{
                        position: 'absolute',
                        inset: '-4px',
                        borderRadius: '50%',
                        border: '2px solid var(--primary)',
                        animation: 'pulse-glow 2s ease-in-out infinite',
                        opacity: 0.6,
                    }} />
                )}
            </motion.button>
        </div>
    );
}
