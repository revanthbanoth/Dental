import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { adminLogin } from '../../services/api';
import { FaLock, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import { IconDentalCheckup } from '../../components/DentalIcons';

export default function AdminLogin() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.username || !form.password) {
            toast.error('Please fill all fields');
            return;
        }
        setLoading(true);
        try {
            const res = await adminLogin(form);
            localStorage.setItem('adminToken', res.data.token);
            toast.success('Login successful!');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            height: '100vh',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f2744 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
        }}>
            {/* Background decorations */}
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 107, 61, 0.15) 0%, transparent 70%)' }} />
            <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232, 90, 47, 0.1) 0%, transparent 70%)' }} />



            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ width: '100%', maxWidth: '440px', position: 'relative' }}
            >
                <div style={{
                    background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(20px)',
                    borderRadius: '28px', padding: '36px 44px', border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
                }}>
                    {/* Logo */}
                    <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                        <div style={{
                            width: '56px', height: '56px', borderRadius: '16px',
                            background: 'var(--gradient-primary)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            margin: '0 auto 14px',
                            boxShadow: 'var(--shadow-soft)',
                        }}>
                            <IconDentalCheckup size={32} color="white" />
                        </div>
                        <h1 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '24px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Admin Portal</h1>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>SmileCare Dental Clinic (Demo)</p>
                    </div>

                    <form onSubmit={handleSubmit} id="admin-login-form">
                        <div style={{ marginBottom: '18px' }}>
                            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                                Username
                            </label>
                            <input
                                type="text" id="admin-username" value={form.username} placeholder="admin"
                                onChange={(e) => setForm({ ...form, username: e.target.value })}
                                style={{
                                    width: '100%', padding: '14px 18px', borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                                    color: 'white', fontFamily: 'Inter, sans-serif', fontSize: '15px', outline: 'none',
                                    transition: 'all 0.3s ease',
                                }}
                                onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 61, 0.2)'; }}
                                onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}
                            />
                        </div>

                        <div style={{ marginBottom: '22px' }}>
                            <label style={{ display: 'block', fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                                Password
                            </label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? "text" : "password"} id="admin-password" value={form.password} placeholder="••••••••"
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    style={{
                                        width: '100%', padding: '14px 18px', paddingRight: '46px', borderRadius: '12px',
                                        background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                                        color: 'white', fontFamily: 'Inter, sans-serif', fontSize: '15px', outline: 'none',
                                        transition: 'all 0.3s ease',
                                    }}
                                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(255, 107, 61, 0.2)'; }}
                                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '14px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        color: 'rgba(255,255,255,0.5)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '18px',
                                        padding: '4px',
                                    }}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            id="admin-login-btn"
                            style={{
                                width: '100%', padding: '15px', borderRadius: '14px',
                                background: loading ? 'var(--text-muted)' : 'var(--gradient-primary)',
                                color: 'white', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                                fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '16px',
                                boxShadow: loading ? 'none' : 'var(--shadow-soft)',
                            }}
                        >
                            {loading ? 'Logging in...' : <><FaLock style={{ marginRight: '8px', fontSize: '14px' }} /> Login to Dashboard</>}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
