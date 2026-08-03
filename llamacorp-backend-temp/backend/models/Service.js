const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  features: [{
    type: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
