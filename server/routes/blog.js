const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// GET /api/blog - Get all published blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
        res.json({ success: true, count: blogs.length, data: blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// GET /api/blog/:slug - Get single blog
router.get('/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        res.json({ success: true, data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// POST /api/blog - Create blog (Admin)
router.post('/', async (req, res) => {
    try {
        const { title, slug, excerpt, content, category, image, author, tags } = req.body;
        const blog = new Blog({ title, slug, excerpt, content, category, image, author, tags });
        await blog.save();
        res.status(201).json({ success: true, message: 'Blog created successfully', data: blog });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

// DELETE /api/blog/:id - Delete blog (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        res.json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
});

module.exports = router;
