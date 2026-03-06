const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// POST /api/appointments - Book an appointment
router.post('/', async (req, res) => {
    try {
        const { name, phone, email, date, time, service, message } = req.body;

        // Validation
        if (!name || !phone || !email || !date || !time || !service) {
            return res.status(400).json({
                success: false,
                message: 'Please fill all required fields.',
            });
        }

        const appointment = new Appointment({
            name, phone, email, date, time, service, message,
        });

        await appointment.save();

        res.status(201).json({
            success: true,
            message: '✅ Appointment booked successfully! We will contact you shortly.',
            data: appointment,
        });
    } catch (error) {
        console.error('Appointment booking error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again.',
            error: error.message,
        });
    }
});

// GET /api/appointments - Get all appointments (Admin)
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: appointments.length,
            data: appointments,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// PATCH /api/appointments/:id/status - Update appointment status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }
        res.json({ success: true, data: appointment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// DELETE /api/appointments/:id - Delete appointment (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).json({ success: false, message: 'Appointment not found' });
        }
        res.json({ success: true, message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

module.exports = router;
