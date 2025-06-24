const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    unique: true,
    sparse: true // Allows multiple users with no phone (null/undefined)
  },
  password: {
    type: String,
    // Password is required only if the user is NOT logging in via Google
    required: function () {
      return !this.isGoogleUser;
    }
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  isGoogleUser: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Create the User model from schema
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
