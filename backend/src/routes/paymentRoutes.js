const express = require('express');
const router = express.Router();

const { createRazorpayOrder } = require('../controller/razorpayController');
const { verifyPaymentAndPlaceOrder } = require('../controller/orderController');
const { requireAuth } = require('../middleware/authMiddleware');

// ✔️ Create Razorpay Order
router.post('/create-order', requireAuth, createRazorpayOrder);

// ✔️ Verify Payment and Place Order
router.post('/verify-payment', requireAuth, verifyPaymentAndPlaceOrder);

module.exports = router;
