const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const { upload } = require('../utils/cloudinary');

// GET all blogs (Public - published only)
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' }).sort({ createdAt: -1 }).populate('author', 'name role avatar');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

// GET all blogs for Admin (Including drafts)
router.get('/admin', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).populate('author', 'name role avatar');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
});

// GET single blog by slug (Public)
router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' }).populate('author', 'name role avatar');
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blog' });
  }
});

// GET single blog by ID for Admin
router.get('/admin/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.json(blog);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching blog' });
    }
});

// POST create a new blog (Admin only)
// Expected to handle multipart/form-data for image upload
router.post('/', authMiddleware, adminMiddleware, upload.single('coverImage'), async (req, res) => {
  try {
    const { 
      title, content, status, slug, category, author, 
      excerpt, readTime, tags, featured, featuredOrder, views, 
      metaTitle, metaDescription, metaKeywords, ogImage, canonicalUrl, publishedAt 
    } = req.body;
    let coverImageUrl = '';

    if (req.file) {
      coverImageUrl = req.file.path; // Cloudinary URL
    }

    const newBlog = new Blog({
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      content,
      category: category || 'Uncategorized',
      author,
      coverImage: coverImageUrl,
      status: status || 'draft',
      publishedDate: status === 'published' ? new Date() : null,
      publishedAt: publishedAt || (status === 'published' ? new Date() : null),
      excerpt,
      readTime,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
      featured: featured === 'true' || featured === true,
      featuredOrder: parseInt(featuredOrder) || 0,
      views: parseInt(views) || 0,
      metaTitle,
      metaDescription,
      metaKeywords,
      ogImage,
      canonicalUrl
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    console.error('Error creating blog:', err);
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Slug must be unique' });
    }
    res.status(500).json({ message: 'Error creating blog' });
  }
});

// PUT update an existing blog (Admin only)
router.put('/:id', authMiddleware, adminMiddleware, upload.single('coverImage'), async (req, res) => {
  try {
    const { 
      title, content, status, slug, category, author,
      excerpt, readTime, tags, featured, featuredOrder, views, 
      metaTitle, metaDescription, metaKeywords, ogImage, canonicalUrl, publishedAt 
    } = req.body;

    const updateData = {
        title,
        content,
        slug: slug,
        category,
        author,
        status,
        publishedDate: status === 'published' ? new Date() : null,
        excerpt,
        readTime,
        metaTitle,
        metaDescription,
        metaKeywords,
        ogImage,
        canonicalUrl
    };

    if (publishedAt) updateData.publishedAt = publishedAt;
    if (tags) updateData.tags = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim());
    if (featured !== undefined) updateData.featured = featured === 'true' || featured === true;
    if (featuredOrder !== undefined) updateData.featuredOrder = parseInt(featuredOrder) || 0;
    if (views !== undefined) updateData.views = parseInt(views) || 0;

    if (req.file) {
      updateData.coverImage = req.file.path;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(updatedBlog);
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({ message: 'Error updating blog' });
  }
});

// DELETE a blog (Admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog' });
  }
});

// POST endpoint specifically for rich text editor inline image uploads
router.post('/upload-image', authMiddleware, adminMiddleware, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
             return res.status(400).json({ message: 'No image uploaded' });
        }
        res.json({ url: req.file.path });
    } catch (err) {
        res.status(500).json({ message: 'Error uploading image' });
    }
});

module.exports = router;