const express = require('express');
const router = express.Router();
const Author = require('../models/Author');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { upload } = require('../utils/cloudinary');

// GET all authors (Public, so blogs can display them or populate them)
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find().sort({ name: 1 });
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching authors' });
  }
});

// GET single author
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json(author);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching author' });
  }
});

// POST create a new author (Admin only)
router.post('/', authMiddleware, adminMiddleware, upload.single('avatar'), async (req, res) => {
  try {
    const { name, role } = req.body;
    let avatarUrl = '';

    if (req.file) {
      avatarUrl = req.file.path; // Cloudinary URL
    }

    const newAuthor = new Author({
      name,
      role,
      avatar: avatarUrl,
    });

    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (err) {
    console.error('Error creating author:', err);
    res.status(500).json({ message: 'Error creating author' });
  }
});

// PUT update an existing author (Admin only)
router.put('/:id', authMiddleware, adminMiddleware, upload.single('avatar'), async (req, res) => {
  try {
    const { name, role } = req.body;
    const updateData = { name, role };

    if (req.file) {
      updateData.avatar = req.file.path;
    }

    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }

    res.json(updatedAuthor);
  } catch (err) {
    console.error('Error updating author:', err);
    res.status(500).json({ message: 'Error updating author' });
  }
});

// DELETE an author (Admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json({ message: 'Author deleted successfully' });
  } catch (err) {
    console.error('Error deleting author:', err);
    res.status(500).json({ message: 'Error deleting author' });
  }
});

module.exports = router;
