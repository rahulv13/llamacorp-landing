const express = require('express');
const { getAuthors, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorController');
const { protect, authorize } = require('../middleware/auth');
const { body } = require('express-validator');

const router = express.Router();

const authorValidation = [
    body('name', 'Author name is required').notEmpty()
];

router.get('/', getAuthors);
router.post('/', protect, authorize('Admin'), authorValidation, createAuthor);
router.put('/:id', protect, authorize('Admin'), authorValidation, updateAuthor);
router.delete('/:id', protect, authorize('Admin'), deleteAuthor);

module.exports = router;
