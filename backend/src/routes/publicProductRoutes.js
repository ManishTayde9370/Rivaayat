const express = require('express');
const router = express.Router();
const Product = require('../model/Product');

// 📄 GET /api/products - Publicly fetch all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, products });
  } catch (err) {
    console.error('❌ Error fetching public products:', err);
    res.status(500).json({ success: false, message: 'Error fetching products' });
  }
});

module.exports = router;
