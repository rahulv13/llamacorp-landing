const Tag = require('../models/Tag');
const { validationResult } = require('express-validator');

// @desc    Get all tags
// @route   GET /api/tags
// @access  Public
exports.getTags = async (req, res) => {
    try {
        const tags = await Tag.find().sort({ name: 1 });
        res.status(200).json({ success: true, count: tags.length, data: tags });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Create tag
// @route   POST /api/tags
// @access  Private/Admin
exports.createTag = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    try {
        const tag = await Tag.create(req.body);
        res.status(201).json({ success: true, data: tag });
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ success: false, message: 'Tag already exists' });
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Update tag
// @route   PUT /api/tags/:id
// @access  Private/Admin
exports.updateTag = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    try {
        const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!tag) return res.status(404).json({ success: false, message: 'Tag not found' });
        res.status(200).json({ success: true, data: tag });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Delete tag
// @route   DELETE /api/tags/:id
// @access  Private/Admin
exports.deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findById(req.params.id);
        if (!tag) return res.status(404).json({ success: false, message: 'Tag not found' });
        await tag.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};
