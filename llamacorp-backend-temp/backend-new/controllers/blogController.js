const Blog = require('../models/Blog');
const seoService = require('../services/seoService');
const { validationResult } = require('express-validator');

// @desc    Get all blogs (public, but supports admin filters)
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const startIndex = (page - 1) * limit;

        const query = { deleted: false };

        // If not admin, only show published
        if (!req.user || req.user.role !== 'Admin') {
            query.status = 'published';
        } else if (req.query.status) {
            query.status = req.query.status;
        }

        if (req.query.category) {
            query.category = req.query.category;
        }

        // Search
        if (req.query.search) {
            query.$text = { $search: req.query.search };
        }

        const blogs = await Blog.find(query)
            .sort({ createdAt: -1 })
            .skip(startIndex)
            .limit(limit)
            .populate('author', 'name avatar role')
            .populate('category', 'name slug color');

        const total = await Blog.countDocuments(query);

        res.status(200).json({
            success: true,
            count: blogs.length,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
            data: blogs
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
exports.getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug, deleted: false })
            .populate('author', 'name avatar bio')
            .populate('category', 'name slug color');
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }
        res.status(200).json({ success: true, data: blog });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private
exports.createBlog = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    try {
        const blog = await Blog.create(req.body);
        seoService.invalidateCache();
        res.status(201).json({ success: true, data: blog });
    } catch (err) {
        console.error('Error creating blog:', err);
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private
exports.updateBlog = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    try {
        let blog = await Blog.findById(req.params.id);
        if (!blog || blog.deleted) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        // Push current content to versions if content is changing
        if (req.body.content && JSON.stringify(req.body.content) !== JSON.stringify(blog.content)) {
            blog.versions.push({
                content: blog.content,
                savedAt: Date.now()
            });
        }

        // Update fields
        Object.keys(req.body).forEach(key => {
            if (key !== 'versions') {
                blog[key] = req.body[key];
            }
        });

        await blog.save();
        seoService.invalidateCache();
        res.status(200).json({ success: true, data: blog });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Soft Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private
exports.deleteBlog = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);
        if (!blog || blog.deleted) {
            return res.status(404).json({ success: false, message: 'Blog not found' });
        }

        blog.deleted = true;
        blog.deletedAt = Date.now();
        await blog.save();

        seoService.invalidateCache();
        res.status(200).json({ success: true, message: 'Blog moved to trash' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Publish blog
// @route   PATCH /api/blogs/:id/publish
// @access  Private
exports.publishBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog || blog.deleted) return res.status(404).json({ success: false, message: 'Blog not found' });

        blog.status = 'published';
        blog.published = true;
        if (!blog.publishedAt) blog.publishedAt = Date.now();
        await blog.save();

        seoService.invalidateCache();
        res.status(200).json({ success: true, data: blog });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Draft blog
// @route   PATCH /api/blogs/:id/draft
// @access  Private
exports.draftBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog || blog.deleted) return res.status(404).json({ success: false, message: 'Blog not found' });

        blog.status = 'draft';
        await blog.save();

        seoService.invalidateCache();
        res.status(200).json({ success: true, data: blog });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Feature blog
// @route   PATCH /api/blogs/:id/feature
// @access  Private/Admin
exports.featureBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog || blog.deleted) return res.status(404).json({ success: false, message: 'Blog not found' });

        blog.featured = !blog.featured;
        await blog.save();

        res.status(200).json({ success: true, data: blog });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};
