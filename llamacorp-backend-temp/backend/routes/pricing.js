const express = require('express');
const router = express.Router();
const PricingPlan = require('../models/PricingPlan');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// GET all pricing plans (Public - active only)
router.get('/', async (req, res) => {
  try {
    const plans = await PricingPlan.find({ isActive: true }).sort({ price: 1 });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching pricing plans' });
  }
});

// GET all pricing plans (Admin - including inactive)
router.get('/admin', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const plans = await PricingPlan.find().sort({ price: 1 });
        res.json(plans);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching pricing plans' });
    }
});

// GET a single pricing plan
router.get('/:id', async (req, res) => {
    try {
        const plan = await PricingPlan.findById(req.params.id);
        if (!plan) return res.status(404).json({ message: 'Plan not found' });
        res.json(plan);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching plan' });
    }
});

// POST a new pricing plan (Admin only)
router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { name, price, interval, description, features, isPopular, isActive } = req.body;
        const newPlan = new PricingPlan({
            name, price, interval, description, features, isPopular, isActive
        });
        const savedPlan = await newPlan.save();
        res.status(201).json(savedPlan);
    } catch (err) {
        console.error('Error creating pricing plan:', err);
        res.status(500).json({ message: 'Error creating pricing plan' });
    }
});

// PUT update a pricing plan (Admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const { name, price, interval, description, features, isPopular, isActive } = req.body;
        const updatedPlan = await PricingPlan.findByIdAndUpdate(
            req.params.id,
            { name, price, interval, description, features, isPopular, isActive },
            { new: true, runValidators: true }
        );

        if (!updatedPlan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.json(updatedPlan);
    } catch (err) {
        console.error('Error updating pricing plan:', err);
        res.status(500).json({ message: 'Error updating pricing plan' });
    }
});

// DELETE a pricing plan (Admin only)
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const deletedPlan = await PricingPlan.findByIdAndDelete(req.params.id);
        if (!deletedPlan) {
            return res.status(404).json({ message: 'Plan not found' });
        }
        res.json({ message: 'Pricing plan deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting pricing plan' });
    }
});

module.exports = router;