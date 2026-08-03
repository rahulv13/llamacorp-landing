const Blog = require('../models/Blog');

// @desc    Get dashboard stats
// @route   GET /api/dashboard
// @access  Private/Admin
exports.getDashboardStats = async (req, res) => {
    try {
        const totalBlogs = await Blog.countDocuments({ deleted: false });
        const published = await Blog.countDocuments({ status: 'published', deleted: false });
        const drafts = await Blog.countDocuments({ status: 'draft', deleted: false });
        const scheduled = await Blog.countDocuments({ status: 'scheduled', deleted: false });
        
        // Sum of all views across blogs
        const viewsAggregation = await Blog.aggregate([
            { $match: { deleted: false } },
            { $group: { _id: null, totalViews: { $sum: "$views" } } }
        ]);
        const views = viewsAggregation.length > 0 ? viewsAggregation[0].totalViews : 0;

        // Recent blogs
        const recentBlogs = await Blog.find({ deleted: false })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate('author', 'name avatar');

        res.status(200).json({
            success: true,
            data: {
                totalBlogs,
                published,
                drafts,
                scheduled,
                views,
                subscribers: 0, // Placeholder for Phase 3
                comments: 0, // Placeholder for Phase 3
                recentBlogs
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Server Error', error: err.message });
    }
};
