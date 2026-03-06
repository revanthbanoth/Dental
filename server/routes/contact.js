const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact - Save contact message
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email and message are required.',
            });
        }

        const contact = new Contact({ name, email, phone, message });
        await contact.save();

        res.status(201).json({
            success: true,
            message: '✅ Message sent successfully! We will get back to you soon.',
            data: contact,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// GET /api/contact - Get all contact messages (Admin)
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, count: contacts.length, data: contacts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// DELETE /api/contact/:id
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) return res.status(404).json({ success: false, message: 'Message not found' });
        res.json({ success: true, message: 'Message deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

module.exports = router;
