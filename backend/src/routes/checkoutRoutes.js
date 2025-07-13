const express = require('express');
const router = express.Router();

const {
  getRazorpayKey,
  createOrder, // ✅ this matches your controller
  verifyPaymentAndPlaceOrder,
} = require('../controller/checkoutController');


const { requireAuth } = require('../middleware/authMiddleware');

router.get('/key', getRazorpayKey);
router.post('/create-order', requireAuth, createOrder);
// ❌ Possibly undefined
router.post('/verify-and-place-order', requireAuth, verifyPaymentAndPlaceOrder);

module.exports = router;
