import { useLocation } from 'react-router-dom';

function CheckoutSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="p-5">
      <h1>🎉 Order Placed Successfully!</h1>
      <p>Order ID: {order?._id}</p>
      <p>Total: ₹{order?.total}</p>
    </div>
  );
}

export default CheckoutSuccess;
