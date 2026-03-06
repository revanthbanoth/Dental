const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'lotusdental_secret';

// ─── Middleware: Verify Admin JWT ────────────────────────────────────────────
const verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'No token provided. Please login.' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded;
        next();
    } catch {
        return res.status(401).json({ success: false, message: 'Invalid or expired token. Please login again.' });
    }
};

// ─── POST /api/admin/login ────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: 'Username and password are required.' });
        }

        // Find admin in MongoDB
        const admin = await Admin.findOne({ username: username.toLowerCase(), isActive: true });

        if (!admin) {
            return res.status(401).json({ success: false, message: 'Invalid username or password.' });
        }

        // Verify password using bcrypt
        const isMatch = await admin.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid username or password.' });
        }

        // Update lastLogin
        admin.lastLogin = new Date();
        await admin.save();

        // Generate JWT
        const token = jwt.sign(
            { id: admin._id, username: admin.username, name: admin.name, role: admin.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            success: true,
            token,
            admin: { id: admin._id, username: admin.username, name: admin.name, role: admin.role, email: admin.email },
            message: 'Login successful',
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ success: false, message: 'Server error during login.' });
    }
});

// ─── GET /api/admin/verify ────────────────────────────────────────────────────
router.get('/verify', verifyAdmin, (req, res) => {
    res.json({ success: true, admin: req.admin });
});

// ─── GET /api/admin/profile ───────────────────────────────────────────────────
router.get('/profile', verifyAdmin, async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select('-password');
        if (!admin) return res.status(404).json({ success: false, message: 'Admin not found' });
        res.json({ success: true, data: admin });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
module.exports.verifyAdmin = verifyAdmin;
