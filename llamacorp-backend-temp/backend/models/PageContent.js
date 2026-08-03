const mongoose = require('mongoose');

const pageContentSchema = new mongoose.Schema({
  pageId: {
    type: String, // e.g., 'home', 'about', 'services'
    required: true,
    unique: true,
  },
  sections: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    // Example: { hero: { title: "...", subtitle: "..." }, about: { text: "..." } }
  }
}, { timestamps: true });

module.exports = mongoose.model('PageContent', pageContentSchema);