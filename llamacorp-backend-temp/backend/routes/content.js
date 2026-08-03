const express = require('express');
const router = express.Router();
const PageContent = require('../models/PageContent');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { upload } = require('../utils/cloudinary');

// GET content for a specific page (Public)
router.get('/:pageId', async (req, res) => {
    try {
        const content = await PageContent.findOne({ pageId: req.params.pageId });
        if (!content) {
            // Return empty sections object instead of 404 to avoid frontend breaking before data is seeded
            return res.json({ pageId: req.params.pageId, sections: {} });
        }
        res.json(content);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching page content' });
    }
});

// GET all page contents (Admin)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const contents = await PageContent.find();
        res.json(contents);
    } catch (err) {
         res.status(500).json({ message: 'Error fetching all page contents' });
    }
});

// PUT update content for a specific page (Admin only)
// Upserts the document if it doesn't exist
router.put('/:pageId', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { sections } = req.body;

        const updatedContent = await PageContent.findOneAndUpdate(
            { pageId: req.params.pageId },
            { $set: { sections } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json(updatedContent);
    } catch (err) {
        console.error('Error updating page content:', err);
        res.status(500).json({ message: 'Error updating page content' });
    }
});

// POST upload image for content (Admin only)
router.post('/upload-image', authMiddleware, adminMiddleware, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        res.json({ url: req.file.path });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Error uploading image' });
    }
});

module.exports = router;