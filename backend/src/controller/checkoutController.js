// paymentController.js

const Razorpay = require('razorpay');
const crypto = require('crypto');
const dotenv = require('dotenv');
const Order = require('../model/Order');
const Cart = require('../model/Cart');
const User = require('../model/Users');
const sendOrderConfirmationEmail = require('../utils/sendOrderConfirmationEmail');

dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. Send Razorpay Key to Frontend
exports.getRazorpayKey = (req, res) => {
  if (!process.env.RAZORPAY_KEY_ID) {
    return res.status(500).json({ success: false, message: 'Razorpay key ID not configured' });
  }
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
};

// 2. Create Razorpay Order
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({ success: false, message: 'Valid amount is required' });
    }

    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    if (!order) {
      return res.status(500).json({ success: false, message: 'Failed to create order' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('❌ Razorpay order creation failed:', error);
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
};

// 3. Verify Payment & Place Order
exports.verifyPaymentAndPlaceOrder = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    console.log('Payment verification request body:', req.body);
    console.log('Authenticated user:', req.user);

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Missing payment verification fields' });
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    console.log('Generated signature:', generatedSignature);
    console.log('Received signature:', razorpay_signature);

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // Ensure req.user is set by your auth middleware
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    // Get user's cart and populate products
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty or missing' });
    }

    const user = await User.findById(req.user._id);
    if (!user || !user.shippingAddress) {
      return res.status(400).json({ success: false, message: 'User or shipping address not found' });
    }

    // Estimate delivery date (5 days from now)
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    // Create order in DB
    const order = new Order({
      user: req.user._id,
      products: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      })),
      totalAmount: cart.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0),
      shippingAddress: user.shippingAddress,
      estimatedDelivery,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      paymentStatus: 'Paid',
    });

    await order.save();

    // Send order confirmation email (best effort)
    try {
      await sendOrderConfirmationEmail(user.email, order);
    } catch (emailErr) {
      console.warn('⚠️ Email sending failed:', emailErr.message);
    }

    // Clear user's cart
    await Cart.findOneAndUpdate({ user: req.user._id }, { $set: { items: [] } });

    res.status(200).json({ success: true, message: 'Order placed successfully', order });
  } catch (error) {
    console.error('❌ Payment verification error:', error);
    res.status(500).json({ success: false, message: 'Payment verification failed' });
  }
};
