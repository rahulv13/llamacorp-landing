const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    default: '',
  },
  readTime: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    enum: ['AI & Technology', 'Marketing', 'SEO', 'Business Growth', 'Design', 'Uncategorized'],
    default: 'Uncategorized',
  },
  tags: {
    type: [String],
    default: [],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true,
  },
  coverImage: {
    type: String, // URL from Cloudinary
    default: '',
  },
  ogImage: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'scheduled'],
    default: 'draft',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  featuredOrder: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  metaTitle: {
    type: String,
    default: '',
  },
  metaDescription: {
    type: String,
    default: '',
  },
  metaKeywords: {
    type: String,
    default: '',
  },
  canonicalUrl: {
    type: String,
    default: '',
  },
  publishedDate: {
    type: Date,
  }
}, { timestamps: true });

// Pre-save middleware to auto-generate slug if missing
blogSchema.pre('validate', function(next) {
  if (this.title && !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  if (typeof next === 'function') {
    next();
  }
});

module.exports = mongoose.model('Blog', blogSchema);
