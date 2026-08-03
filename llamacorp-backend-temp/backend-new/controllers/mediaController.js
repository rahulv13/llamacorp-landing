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

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'llamacorp',
                format: 'webp',
                transformation: [
                    { width: 1920, crop: 'limit' },
                    { quality: 'auto' },
                ]
            },
            async (error, result) => {
                if (error) {
                    return res.status(500).json({ success: false, message: 'Cloudinary upload failed', error: error.message });
                }

                try {
                    const media = await Media.create({
                        publicId: result.public_id,
                        secureUrl: result.secure_url,
                        filename: req.file.originalname,
                        width: result.width,
                        height: result.height,
                        bytes: result.bytes,
                        format: result.format,
                        createdBy: req.user.id
                    });

                    return res.status(201).json({
                        success: true,
                        data: media,
                        url: media.secureUrl // For TipTap
                    });
                } catch (dbErr) {
                    return res.status(500).json({ success: false, message: 'Server Error saving to DB', error: dbErr.message });
                }
            }
        );

        uploadStream.end(req.file.buffer);

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
