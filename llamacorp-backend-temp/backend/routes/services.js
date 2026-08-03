const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 60 });

// GET all services (Public)
router.get('/', async (req, res) => {
    try {
        const cachedServices = cache.get("services");
        if (cachedServices) {
            return res.json(cachedServices);
        }

        const services = await Service.find();
        cache.set("services", services);
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching services' });
    }
});

module.exports = router;
