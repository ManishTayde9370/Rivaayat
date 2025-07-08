import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ShippingPage() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    phone: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save shipping info to localStorage or Redux
    localStorage.setItem('shippingInfo', JSON.stringify(formData));
    navigate('/checkout/payment');
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">📦 Shipping Details</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        {['name', 'address', 'city', 'phone'].map((field) => (
          <div className="col-md-6" key={field}>
            <label className="form-label text-capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        ))}

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Continue to Payment
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingPage;
