const express = require('express');
const router = express.Router();
const Cart = require('../model/Cart');
const { requireAuth } = require('../middleware/authMiddleware');

// ✅ GET /api/cart - Fetch current user's cart
router.get('/', requireAuth, async (req, res) => {
  try {
    const cartDoc = await Cart.findOne({ userId: req.user._id });

    if (!cartDoc) {
      return res.status(200).json({ cart: [] }); // Return empty cart if none found
    }

    res.status(200).json({ cart: cartDoc.items });
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ message: 'Failed to load cart' });
  }
});
// ✅ PUT /api/cart - Save/update current user's cart
router.put('/', requireAuth, async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ message: 'Invalid cart format' });
  }

  try {
    let cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = new Cart({
        userId: req.user._id,
        items,
      });
      await cart.save();
    }

    res.status(200).json({ message: 'Cart saved successfully' });
  } catch (err) {
    console.error('Error saving cart:', err);
    res.status(500).json({ message: 'Failed to save cart' });
  }
});


module.exports = router;