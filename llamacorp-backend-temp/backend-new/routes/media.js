const express = require('express');
const { uploadImage, getMedia, deleteMedia } = require('../controllers/mediaController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

const router = express.Router();

router.use(protect);
router.use(authorize('Admin', 'Editor', 'Author'));

router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getMedia);
router.delete('/:id', authorize('Admin'), deleteMedia);

module.exports = router;
