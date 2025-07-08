import React from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Normally you’d process payment here
    navigate('/checkout/confirmation');
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">💳 Payment</h2>

      <div className="mb-3">
        <label className="form-label">Select Payment Method</label>
        <select className="form-select">
          <option value="cod">Cash on Delivery</option>
          <option value="card">Credit/Debit Card</option>
        </select>
      </div>

      <button onClick={handlePlaceOrder} className="btn btn-success">
        Place Order
      </button>
    </div>
  );
}

export default PaymentPage;
