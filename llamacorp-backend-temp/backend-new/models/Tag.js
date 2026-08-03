const mongoose = require('mongoose');
const slugify = require('slugify');

const tagSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a tag name'],
            trim: true,
            unique: true,
            maxlength: [30, 'Name cannot be more than 30 characters'],
        },
        slug: {
            type: String,
            unique: true,
        }
    },
    {
        timestamps: true,
    }
);

// Auto-generate unique slug before saving
tagSchema.pre('save', async function (next) {
    if (!this.slug || this.isModified('name')) {
        let baseSlug = slugify(this.name, { lower: true, strict: true });
        let slug = baseSlug;
        let slugExists = true;
        let counter = 1;
        
        while (slugExists) {
            const existing = await mongoose.models.Tag.findOne({ slug, _id: { $ne: this._id } });
            if (!existing) {
                slugExists = false;
            } else {
                slug = `${baseSlug}-${counter}`;
                counter++;
            }
        }
        this.slug = slug;
    }
    next();
});

module.exports = mongoose.model('Tag', tagSchema);
