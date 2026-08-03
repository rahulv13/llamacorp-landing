const mongoose = require('mongoose');

const pricingPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  interval: {
    type: String,
    enum: ['month', 'year', 'one-time'],
    default: 'month',
  },
  description: {
      type: String,
      default: ''
  },
  features: [{
    type: String,
  }],
  isPopular: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('PricingPlan', pricingPlanSchema);