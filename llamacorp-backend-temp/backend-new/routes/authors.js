const express = require('express');
const { getAuthors, getAuthorBySlug, getAuthorById, createAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorController');
const { protect, authorize } = require('../middleware/auth');
const { body } = require('express-validator');

const router = express.Router();

const authorValidation = [
    body('fullName', 'Full name is required').notEmpty()
];

router.get('/', getAuthors);
router.get('/:slug', getAuthorBySlug);
router.get('/id/:id', protect, authorize('Admin', 'Editor'), getAuthorById);

router.post('/', protect, authorize('Admin'), authorValidation, createAuthor);
router.put('/:id', protect, authorize('Admin'), updateAuthor);
router.delete('/:id', protect, authorize('Admin'), deleteAuthor);

module.exports = router;
