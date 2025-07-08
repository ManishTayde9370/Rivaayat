const express = require('express');
const router = express.Router();
const User = require('../model/Users');
const Product = require('../model/Product');
const { requireAuth } = require('../middleware/authMiddleware');

// @POST /api/wishlist/:productId
router.post('/:productId', requireAuth, async (req, res) => {
  const { productId } = req.params;

  try {
    const user = await User.findById(req.user._id);
    const alreadyInWishlist = user.wishlist.includes(productId);

    if (alreadyInWishlist) {
      user.wishlist.pull(productId);
      await user.save();
      return res.json({ message: 'Removed from wishlist' });
    } else {
      user.wishlist.push(productId);
      await user.save();
      return res.json({ message: 'Added to wishlist' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// @GET /api/wishlist
router.get('/', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
