const express = require('express');
const { getTags, createTag, updateTag, deleteTag } = require('../controllers/tagController');
const { protect, authorize } = require('../middleware/auth');
const { body } = require('express-validator');

const router = express.Router();

const tagValidation = [
    body('name', 'Tag name is required').notEmpty()
];

router.get('/', getTags);
router.post('/', protect, authorize('Admin', 'Editor'), tagValidation, createTag);
router.put('/:id', protect, authorize('Admin', 'Editor'), tagValidation, updateTag);
router.delete('/:id', protect, authorize('Admin'), deleteTag);

module.exports = router;
