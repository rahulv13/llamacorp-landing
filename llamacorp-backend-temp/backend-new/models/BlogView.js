const mongoose = require('mongoose');

const blogViewSchema = new mongoose.Schema(
    {
        visitor: {
            type: String, // could be a session ID or user ID
        },
        ip: {
            type: String,
        },
        blog: {
            type: mongoose.Schema.ObjectId,
            ref: 'Blog',
            required: true,
        },
        referrer: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('BlogView', blogViewSchema);
