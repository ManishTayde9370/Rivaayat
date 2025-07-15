import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function CheckoutSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate('/'); // Redirect if user landed here without order
    }
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div className="container py-5 text-center">
      <h2 className="text-success">🎉 Order Placed Successfully!</h2>
      <p className="mt-3">Thank you for shopping with Rivaayaat.</p>
      <div className="mt-4 card p-4 shadow-sm">
        <h4>Order Summary</h4>
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Total:</strong> ₹{order.amountPaid.toFixed(2)}</p>
        <p><strong>Shipping to:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city} - {order.shippingAddress?.postalCode}</p>

        <h5 className="mt-4">Items:</h5>
        <ul className="list-unstyled">
          {order.items?.map((item, idx) => (
            <li key={idx}>
              {item.name} × {item.quantity} — ₹{item.price * item.quantity}
            </li>
          ))}
        </ul>
      </div>

      <button
        className="btn btn-primary mt-4"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </div>
  );
}

export default CheckoutSuccess;
