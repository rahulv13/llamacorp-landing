const mongoose = require('mongoose');
const slugify = require('slugify');

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a category name'],
            trim: true,
            unique: true,
            maxlength: [50, 'Name cannot be more than 50 characters'],
        },
        slug: {
            type: String,
            unique: true,
        },
        description: {
            type: String,
            maxlength: [200, 'Description cannot be more than 200 characters'],
        },
        color: {
            type: String,
            default: '#000000',
        },
        icon: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

// Auto-generate unique slug before saving
categorySchema.pre('save', async function () {
    if (!this.slug || this.isModified('name')) {
        let baseSlug = slugify(this.name, { lower: true, strict: true });
        let slug = baseSlug;
        let slugExists = true;
        let counter = 1;
        
        while (slugExists) {
            const existing = await mongoose.models.Category.findOne({ slug, _id: { $ne: this._id } });
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

module.exports = mongoose.model('Category', categorySchema);
