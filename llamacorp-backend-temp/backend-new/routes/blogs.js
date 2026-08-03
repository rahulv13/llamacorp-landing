const express = require('express');
const { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog, publishBlog, draftBlog, featureBlog } = require('../controllers/blogController');
const { protect, authorize } = require('../middleware/auth');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Optional auth middleware to check if user is admin for getBlogs filtering
const optionalAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
        } catch (err) {}
    }
    next();
};

const blogValidation = [
    body('title', 'Title is required').notEmpty(),
    body('content', 'Content is required').notEmpty(),
];

router.get('/', optionalAuth, getBlogs);
router.get('/:slug', getBlogBySlug);

router.post('/', protect, authorize('Admin', 'Editor', 'Author'), blogValidation, createBlog);
router.put('/:id', protect, authorize('Admin', 'Editor', 'Author'), blogValidation, updateBlog);
router.delete('/:id', protect, authorize('Admin', 'Editor', 'Author'), deleteBlog);

router.patch('/:id/publish', protect, authorize('Admin', 'Editor'), publishBlog);
router.patch('/:id/draft', protect, authorize('Admin', 'Editor', 'Author'), draftBlog);
router.patch('/:id/feature', protect, authorize('Admin'), featureBlog);

module.exports = router;
