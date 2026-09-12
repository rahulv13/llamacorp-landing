const Author = require('../models/Author');

// @desc    Get all active authors (Public) or all authors (Admin)
// @route   GET /api/authors
// @access  Public / Private Admin
exports.getAuthors = async (req, res) => {
    try {
        const query = { deleted: false };

        if (!req.user || req.user.role !== 'Admin') {
            query.isActive = true;
        }

        if (req.query.search) {
            query.fullName = { $regex: req.query.search, $options: 'i' };
        }

        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 50;
        const startIndex = (page - 1) * limit;

        const total = await Author.countDocuments(query);
        const authors = await Author.find(query)
            .populate('blogs')
            .skip(startIndex)
            .limit(limit)
            .sort('-createdAt');

        res.status(200).json({
            success: true,
            count: authors.length,
            total,
            data: authors,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Get single author by slug
// @route   GET /api/authors/:slug
// @access  Public
exports.getAuthorBySlug = async (req, res) => {
    try {
        const author = await Author.findOne({ slug: req.params.slug, deleted: false, isActive: true })
            .populate({
                path: 'blogs',
                match: { deleted: false, status: 'published' },
                options: { sort: { publishedAt: -1 } },
                populate: { path: 'category', select: 'name slug color' }
            });

        if (!author) {
            return res.status(404).json({ success: false, message: 'Author not found' });
        }
        res.status(200).json({ success: true, data: author });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Get single author by ID
// @route   GET /api/authors/id/:id
// @access  Private Admin
exports.getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);

        if (!author || author.deleted) {
            return res.status(404).json({ success: false, message: 'Author not found' });
        }
        res.status(200).json({ success: true, data: author });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Create new author
// @route   POST /api/authors
// @access  Private (Admin)
exports.createAuthor = async (req, res) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json({ success: true, data: author });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message).join(', ');
            return res.status(400).json({ success: false, message });
        }
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Update author
// @route   PUT /api/authors/:id
// @access  Private (Admin)
exports.updateAuthor = async (req, res) => {
    try {
        let author = await Author.findById(req.params.id);

        if (!author || author.deleted) {
            return res.status(404).json({ success: false, message: 'Author not found' });
        }

        author = await Author.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({ success: true, data: author });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};

// @desc    Delete author
// @route   DELETE /api/authors/:id
// @access  Private (Admin)
exports.deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);

        if (!author) {
            return res.status(404).json({ success: false, message: 'Author not found' });
        }

        author.deleted = true;
        author.isActive = false;
        await author.save();

        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};
