const Link = require('../model/Links');
const { validationResult } = require('express-validator');

const linksController = {
  // ➕ Create a new affiliate link
  createLink: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    const { title, url, category } = req.body;

    try {
      const newLink = new Link({
        title,
        url,
        category,
        createdBy: req.user?.username || 'unknown',
      });

      const savedLink = await newLink.save();
      return res.status(201).json({ success: true, link: savedLink });
    } catch (error) {
      console.error('❌ Error creating link:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  // 📄 Get all links
  getAllLinks: async (req, res) => {
    try {
      const links = await Link.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, links });
    } catch (error) {
      console.error('❌ Error fetching links:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  // 🔍 Get a single link by ID
  getLinkById: async (req, res) => {
    try {
      const link = await Link.findById(req.params.id);
      if (!link) {
        return res.status(404).json({ success: false, message: 'Link not found' });
      }
      return res.status(200).json({ success: true, link });
    } catch (error) {
      console.error('❌ Error fetching link:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  // ✏️ Update a link by ID
  updateLink: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ success: false, errors: errors.array() });
    }

    try {
      const updatedLink = await Link.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedLink) {
        return res.status(404).json({ success: false, message: 'Link not found' });
      }
      return res.status(200).json({ success: true, link: updatedLink });
    } catch (error) {
      console.error('❌ Error updating link:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  // 🗑️ Delete a link by ID
  deleteLink: async (req, res) => {
    try {
      const deleted = await Link.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Link not found' });
      }
      return res.status(200).json({ success: true, message: 'Link deleted successfully' });
    } catch (error) {
      console.error('❌ Error deleting link:', error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  }
};

module.exports = linksController;
