const express = require('express');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const { body } = require('express-validator');

const router = express.Router();

router.use(protect);
router.use(authorize('Admin'));

router.get('/', getUsers);
router.get('/:id', getUser);
router.post(
    '/',
    [
        body('name', 'Name is required').notEmpty(),
        body('email', 'Please include a valid email').isEmail(),
        body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    ],
    createUser
);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
