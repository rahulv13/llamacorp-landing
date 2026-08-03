const Media = require('../models/Media');
const { cloudinary } = require('../config/cloudinary');

// @desc    Upload image to Cloudinary & DB
// @route   POST /api/media/upload
// @access  Private/Admin
exports.uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Please upload an image' });
        }

        const media = await Media.create({
            publicId: req.file.filename,
            secureUrl: req.file.path,
            filename: req.file.originalname,
            width: req.file.width, // multer-storage-cloudinary might not provide this directly without extra setup, but we'll try
            height: req.file.height,
            bytes: req.file.size,
            format: 'webp',
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            data: media,
            url: media.secureUrl // For TipTap
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Get all media
// @route   GET /api/media
// @access  Private/Admin
exports.getMedia = async (req, res) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 20;
        const startIndex = (page - 1) * limit;

        const media = await Media.find()
            .sort({ createdAt: -1 })
            .skip(startIndex)
            .limit(limit)
            .populate('createdBy', 'name');

        const total = await Media.countDocuments();

        res.status(200).json({
            success: true,
            count: media.length,
            pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
            data: media
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Delete media
// @route   DELETE /api/media/:id
// @access  Private/Admin
exports.deleteMedia = async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ success: false, message: 'Media not found' });
        }

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(media.publicId);

        // Delete from DB
        await media.deleteOne();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};
