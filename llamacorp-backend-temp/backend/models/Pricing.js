const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  billingType: {
    type: String,
    enum: ['monthly', 'one-time', 'annual'],
    default: 'one-time',
  },
  features: [{
    type: String,
  }],
  isPopular: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Pricing', pricingSchema);
