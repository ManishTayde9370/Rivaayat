const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String], // Now supports multiple image paths
    default: []
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt
});

module.exports = mongoose.model('Product', productSchema);
