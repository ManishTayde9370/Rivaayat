const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Cart = require('../model/Cart');

// ✅ Save or update cart
router.post('/save', authMiddleware.requireAuth, async (req, res) => {
  try {
    const userId = req.user._id || req.user.id; // Extract from decoded JWT

    const { cartItems } = req.body;
    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ success: false, message: 'Invalid cart data' });
    }

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items: cartItems },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json({ success: true, cart });
  } catch (err) {
    console.error('❌ Error saving cart:', err.message);
    res.status(500).json({ success: false, message: 'Failed to save cart' });
  }
});

module.exports = router;
