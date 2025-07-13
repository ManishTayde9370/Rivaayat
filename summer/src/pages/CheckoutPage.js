import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cart/actions';
import { serverEndpoint } from '../components/config';

function CheckoutPage() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const shipping = useSelector((state) => state.shipping.address);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      // Step 1: Create Razorpay order
      const { data: order } = await axios.post(
        `${serverEndpoint}/api/checkout/create-order`,
        { amount: cart.totalPrice },
        { withCredentials: true }
      );

      // Step 2: Razorpay options
      if (!window.Razorpay) {
        alert('Razorpay SDK not loaded');
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Rivaayaat',
        description: 'Order Payment',
        order_id: order.id,
        handler: async function (response) {
          try {
            // Step 3: Verify & place order
            await axios.post(
              `${serverEndpoint}/api/checkout/verify-and-place-order`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            dispatch(clearCart());
            navigate('/order-success');
          } catch (error) {
            console.error('❌ Payment verification failed:', error);
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#6366F1',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error('❌ Checkout error:', err);
      alert('Unable to start checkout. Please try again.');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <p className="mb-2">Items: {cart.items.length}</p>
      <p className="mb-4">Total Amount: ₹{cart.totalPrice}</p>
      <button
        className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        onClick={handleCheckout}
      >
        Pay with Razorpay
      </button>
    </div>
  );
}

export default CheckoutPage;
