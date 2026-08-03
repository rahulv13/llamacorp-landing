const mongoose = require('mongoose');
const slugify = require('slugify');
const readingTime = require('reading-time');

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title'],
            trim: true,
            maxlength: [150, 'Title cannot be more than 150 characters'],
        },
        slug: {
            type: String,
            unique: true,
        },
        excerpt: {
            type: String,
            maxlength: [500, 'Excerpt cannot be more than 500 characters'],
        },
        content: {
            type: String,
            required: [true, 'Please add some text'],
        },
        coverImage: {
            type: String,
            default: 'no-photo.jpg',
        },
        galleryImages: {
            type: [String],
        },
        category: {
            type: String,
            default: 'Uncategorized',
        },
        tags: {
            type: [String],
        },
        author: {
            type: mongoose.Schema.ObjectId,
            ref: 'Author',
            required: true,
        },
        status: {
            type: String,
            enum: ['draft', 'published', 'scheduled'],
            default: 'draft',
        },
        published: {
            type: Boolean,
            default: false,
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
        readingTime: {
            type: String,
        },
        // SEO Fields
        metaTitle: {
            type: String,
            maxlength: 60,
        },
        metaDescription: {
            type: String,
            maxlength: 160,
        },
        metaKeywords: {
            type: String,
        },
        ogImage: {
            type: String,
        },
        canonicalUrl: {
            type: String,
        },
        publishedAt: {
            type: Date,
        },
        // Soft Delete
        deleted: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: null,
        }
    },
    {
        timestamps: true,
    }
);

// Create text index for search
blogSchema.index({ title: 'text', excerpt: 'text', content: 'text', tags: 'text' });

// Auto-calculate read time and generate unique slug before saving
blogSchema.pre('save', async function (next) {
    // Reading Time
    if (this.isModified('content') || !this.readingTime) {
        const stats = readingTime(this.content || '');
        this.readingTime = stats.text;
    }

    // Slug generation
    if (!this.slug || this.isModified('title')) {
        let baseSlug = slugify(this.title, { lower: true, strict: true });
        let slug = baseSlug;
        let slugExists = true;
        let counter = 1;
        
        while (slugExists) {
            const existingBlog = await mongoose.models.Blog.findOne({ slug, _id: { $ne: this._id } });
            if (!existingBlog) {
                slugExists = false;
            } else {
                slug = `${baseSlug}-${counter}`;
                counter++;
            }
        }
        this.slug = slug;
    }

    // Published date
    if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
        this.publishedAt = Date.now();
        this.published = true;
    }

    next();
});

module.exports = mongoose.model('Blog', blogSchema);
