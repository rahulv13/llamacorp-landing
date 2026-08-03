const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add an author name'],
            trim: true,
            maxlength: [50, 'Name cannot be more than 50 characters'],
        },
        bio: {
            type: String,
            maxlength: [500, 'Bio cannot be more than 500 characters'],
        },
        avatar: {
            type: String,
            default: 'no-photo.jpg',
        },
        email: {
            type: String,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },
        socialLinks: {
            twitter: { type: String },
            linkedin: { type: String },
            github: { type: String },
            website: { type: String }
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Author', authorSchema);
