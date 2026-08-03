const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
    {
        publicId: {
            type: String,
            required: true,
        },
        secureUrl: {
            type: String,
            required: true,
        },
        filename: {
            type: String,
        },
        width: {
            type: Number,
        },
        height: {
            type: Number,
        },
        bytes: {
            type: Number,
        },
        format: {
            type: String,
        },
        alt: {
            type: String,
        },
        createdBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Media', mediaSchema);
