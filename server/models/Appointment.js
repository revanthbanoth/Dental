const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Patient name is required'],
        trim: true,
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
    },
    date: {
        type: String,
        required: [true, 'Appointment date is required'],
    },
    time: {
        type: String,
        required: [true, 'Appointment time is required'],
    },
    doctor: {
        type: String,
        required: [true, 'Please select a doctor'],
        enum: [
            'Dr. Priya Sharma',
            'Dr. Rajesh Kumar',
            'Dr. Anita Rao',
            'Dr. Mohammed Khalid',
            'Any Available Doctor',
        ],
        default: 'Any Available Doctor',
    },
    service: {
        type: String,
        required: [true, 'Service is required'],
        enum: [
            'Dental Checkup',
            'Root Canal Treatment',
            'Dental Implants',
            'Smile Designing',
            'Wisdom Tooth Extraction',
            'Laser Dentistry',
            'Teeth Whitening',
            'Braces / Aligners',
            'Other',
        ],
    },
    message: {
        type: String,
        trim: true,
        default: '',
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled', 'completed'],
        default: 'pending',
    },
    appointmentId: {
        type: String,
        unique: true,
    },
}, { timestamps: true });

// Generate unique appointment ID before saving
appointmentSchema.pre('save', async function (next) {
    if (!this.appointmentId) {
        // Simple format: LD (Lotus Dental) + random 5 digit number
        const randomDigits = Math.floor(10000 + Math.random() * 90000);
        this.appointmentId = `LD-${randomDigits}`;
    }
    next();
});

module.exports = mongoose.model('Appointment', appointmentSchema);
