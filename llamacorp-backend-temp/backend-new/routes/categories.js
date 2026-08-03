const express = require('express');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');
const { body } = require('express-validator');

const router = express.Router();

const categoryValidation = [
    body('name', 'Category name is required').notEmpty()
];

router.get('/', getCategories);
router.post('/', protect, authorize('Admin', 'Editor'), categoryValidation, createCategory);
router.put('/:id', protect, authorize('Admin', 'Editor'), categoryValidation, updateCategory);
router.delete('/:id', protect, authorize('Admin'), deleteCategory);

module.exports = router;
