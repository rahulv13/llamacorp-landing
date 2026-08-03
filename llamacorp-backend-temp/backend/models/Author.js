const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String, // URL from Cloudinary
    default: '',
  }
}, { timestamps: true });

module.exports = mongoose.model('Author', authorSchema);
