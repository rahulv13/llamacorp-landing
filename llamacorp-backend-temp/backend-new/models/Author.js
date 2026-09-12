const mongoose = require('mongoose');
const slugify = require('slugify');

const authorSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Please add an author name'],
            trim: true,
            maxlength: [100, 'Name cannot be more than 100 characters'],
        },
        slug: {
            type: String,
            unique: true,
        },
        jobTitle: {
            type: String,
            trim: true,
            maxlength: [100, 'Job title cannot exceed 100 characters'],
        },
        bio: {
            type: String, // Rich text or markdown
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
            select: false, // Optional, admin only by default unless explicitly selected
        },
        website: { type: String },
        linkedin: { type: String },
        x: { type: String }, // Twitter/X
        instagram: { type: String },
        github: { type: String },
        youtube: { type: String },
        featured: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        seoTitle: {
            type: String,
            maxlength: [60, 'SEO Title cannot exceed 60 characters'],
        },
        seoDescription: {
            type: String,
            maxlength: [160, 'SEO Description cannot exceed 160 characters'],
        },
        deleted: {
            type: Boolean,
            default: false,
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// Reverse populate with virtuals to get blogs by this author easily if needed
authorSchema.virtual('blogs', {
    ref: 'Blog',
    localField: '_id',
    foreignField: 'author',
    justOne: false
});

// Auto-generate unique slug before saving
authorSchema.pre('save', async function () {
    if (!this.slug || this.isModified('fullName')) {
        let baseSlug = slugify(this.fullName, { lower: true, strict: true });
        let slug = baseSlug;
        let slugExists = true;
        let counter = 1;
        
        while (slugExists) {
            const existing = await mongoose.models.Author.findOne({ slug, _id: { $ne: this._id } });
            if (!existing) {
                slugExists = false;
            } else {
                slug = `${baseSlug}-${counter}`;
                counter++;
            }
        }
        this.slug = slug;
    }
});

module.exports = mongoose.model('Author', authorSchema);
