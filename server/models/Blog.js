const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    excerpt: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['Dental Tips', 'Oral Hygiene', 'FAQ', 'News', 'Treatment'],
        default: 'Dental Tips',
    },
    image: {
        type: String,
        default: '',
    },
    author: {
        type: String,
        default: 'Dr. Priya Sharma',
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
    tags: [String],
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
