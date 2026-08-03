const Author = require('../models/Author');
const { validationResult } = require('express-validator');

// @desc    Get all authors
// @route   GET /api/authors
// @access  Public
exports.getAuthors = async (req, res) => {
    try {
        const authors = await Author.find().sort({ name: 1 });
        res.status(200).json({ success: true, count: authors.length, data: authors });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Create author
// @route   POST /api/authors
// @access  Private/Admin
exports.createAuthor = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    try {
        const author = await Author.create(req.body);
        res.status(201).json({ success: true, data: author });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Update author
// @route   PUT /api/authors/:id
// @access  Private/Admin
exports.updateAuthor = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!author) return res.status(404).json({ success: false, message: 'Author not found' });
        res.status(200).json({ success: true, data: author });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Delete author
// @route   DELETE /api/authors/:id
// @access  Private/Admin
exports.deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) return res.status(404).json({ success: false, message: 'Author not found' });
        await author.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};
