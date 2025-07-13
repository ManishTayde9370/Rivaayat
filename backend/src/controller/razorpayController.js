const Razorpay = require('razorpay');
require('dotenv').config();

const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

// 🔐 Initialize Razorpay
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// 📦 Create Razorpay Order
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    // ✅ Basic validation
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' });
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
    });
  } catch (err) {
    console.error('❌ Razorpay order error:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to create Razorpay order',
    });
  }
};

// 🌐 Send Razorpay public key to frontend
exports.getRazorpayKey = (req, res) => {
  res.status(200).json({ key: RAZORPAY_KEY_ID });
};
