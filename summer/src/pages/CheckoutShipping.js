import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setShippingAddress } from '../redux/shipping/actions';
import { useNavigate } from 'react-router-dom';

const CheckoutShipping = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address.trim() || !city.trim() || !postalCode.trim()) {
      alert('Please fill out all fields');
      return;
    }

    // ✅ Include all fields expected by backend
    dispatch(setShippingAddress({
      address,
      city,
      postalCode,
      state: 'Maharashtra',  // Hardcoded for now; can be made dynamic
      country: 'India',
    }));

    navigate('/checkout/payment');
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Shipping Address</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3" style={{ maxWidth: '400px' }}>
        <div>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St"
            required
          />
        </div>

        <div>
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City Name"
            required
          />
        </div>

        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            id="postalCode"
            type="text"
            className="form-control"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="400001"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutShipping;
