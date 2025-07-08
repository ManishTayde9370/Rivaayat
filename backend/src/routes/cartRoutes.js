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

    return res.status(200).json({ cart: cartDoc.items });
  } catch (err) {
    console.error('❌ Error fetching cart:', err);
    return res.status(500).json({ message: 'Failed to load cart' });
  }
});

// ✅ PUT /api/cart - Save/update current user's cart
router.put('/', requireAuth, async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ message: 'Invalid cart format. Expected an array.' });
  }

  // 🔎 Ensure each cart item includes a productId
  const hasMissingProductId = items.some(item => !item.productId);
  if (hasMissingProductId) {
    return res.status(400).json({ message: 'Each item must have a valid productId' });
  }

  try {
    let cart = await Cart.findOne({ userId: req.user._id });

    if (cart) {
      // 📝 Update existing cart
      cart.items = items;
      await cart.save();
    } else {
      // 🆕 Create new cart
      cart = new Cart({
        userId: req.user._id,
        items,
      });
      await cart.save();
    }

    return res.status(200).json({ message: '✅ Cart saved successfully' });
  } catch (err) {
    console.error('❌ Error saving cart:', err);
    return res.status(500).json({ message: 'Failed to save cart', error: err.message });
  }
});

module.exports = router;
