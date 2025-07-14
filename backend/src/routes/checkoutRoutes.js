const express = require('express');
const router = express.Router();

const {
  createOrder,
  verifyPaymentAndPlaceOrder,
  getRazorpayKey,
} = require('../controller/checkoutController');

const { requireAuth } = require('../middleware/authMiddleware');

// ✅ PUBLIC: Get Razorpay key (no auth required)
router.get('/razorpay-key', getRazorpayKey);

// ✅ AUTH: Create Razorpay order (user must be logged in)
router.post('/create-order', requireAuth, createOrder);

// ✅ AUTH: Verify payment and place order (cart comes from frontend)
router.post('/verify-and-place-order', requireAuth, verifyPaymentAndPlaceOrder);

module.exports = router;
