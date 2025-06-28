const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      default: ''
    },
    createdBy: {
      type: String, // e.g., username or user ID
      default: 'anonymous'
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt fields
  }
);

// Export the model
module.exports = mongoose.model('Link', linkSchema);
