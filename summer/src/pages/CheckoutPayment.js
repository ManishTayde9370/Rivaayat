import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCart } from '../redux/cart/actions';
import { serverEndpoint } from '../components/config';

function CheckoutPayment() {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Load Razorpay script dynamically
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (document.getElementById('razorpay-script')) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('⚠️ Failed to load Razorpay SDK. Please try again.');
      return;
    }

    try {
      // Create Razorpay order on backend
      const { data: order } = await axios.post(
        `${serverEndpoint}/api/checkout/create-order`,
        { amount: totalAmount },
        { withCredentials: true }
      );

      if (!order || !order.id) {
        alert('Failed to create order. Please try again.');
        return;
      }

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || '', // make sure this is set in .env
        amount: order.amount,
        currency: 'INR',
        name: 'Rivaayaat',
        description: 'Secure Payment',
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post(
              `${serverEndpoint}/api/checkout/verify-and-place-order`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );

            dispatch(clearCart());
            navigate('/checkout-success', {
              state: { order: verifyResponse.data.order },
            });
          } catch (err) {
            console.error('❌ Payment verification error:', err);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: user?.name || 'Customer',
          email: user?.email || '',
        },
        theme: {
          color: '#6366f1',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('❌ Payment initiation error:', err);
      alert('Payment could not be initiated. Please try again.');
    }
  };

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  return (
    <div className="container py-5">
      <h2 className="mb-4">💳 Payment</h2>
      <h4>Total: ₹{totalAmount.toFixed(2)}</h4>
      <button className="btn btn-success mt-3" onClick={handlePayment}>
        Pay with Razorpay
      </button>
    </div>
  );
}

export default CheckoutPayment;
