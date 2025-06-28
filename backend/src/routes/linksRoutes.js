const express = require('express');
const router = express.Router();

const linksController = require('../controller/linksController');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Public Routes
// Fetch all affiliate links
router.get('/', linksController.getAllLinks);

// Fetch a specific affiliate link by ID
router.get('/:id', linksController.getLinkById);

// ✅ Protected Routes (authentication required)

// Create a new affiliate link
router.post('/', authMiddleware.requireAuth, linksController.createLink);

// Update an existing affiliate link
router.put('/:id', authMiddleware.requireAuth, linksController.updateLink);

// Delete an affiliate link
router.delete('/:id', authMiddleware.requireAuth, linksController.deleteLink);

module.exports = router;
