const express = require('express');
const router = express.Router();
const seoService = require('../services/seoService');

// @desc    Get dynamic sitemap.xml
// @route   GET /sitemap.xml
// @access  Public
router.get('/sitemap.xml', async (req, res) => {
    try {
        const xml = await seoService.getSitemapXml();
        res.header('Content-Type', 'application/xml');
        // Set Cache-Control header for client/CDN caching
        res.header('Cache-Control', 'public, max-age=300'); // 5 minutes
        res.status(200).send(xml);
    } catch (err) {
        console.error('Sitemap Generation Error:', err);
        res.status(500).send('Error generating sitemap');
    }
});

// @desc    Get dynamic robots.txt
// @route   GET /robots.txt
// @access  Public
router.get('/robots.txt', (req, res) => {
    try {
        const robotsTxt = seoService.getRobotsTxt();
        res.header('Content-Type', 'text/plain');
        res.header('Cache-Control', 'public, max-age=86400'); // 1 day
        res.status(200).send(robotsTxt);
    } catch (err) {
        console.error('Robots.txt Generation Error:', err);
        res.status(500).send('Error generating robots.txt');
    }
});

module.exports = router;
