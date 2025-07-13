import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShippingAddress } from '../redux/shipping';

function CheckoutShipping() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storedAddress = useSelector((state) => state.shipping.address);
  const currentUser = useSelector((state) => state.user.currentUser);

  const [shipping, setShipping] = useState({
    fullName: '',
    email: '',
    phone: '',
    pincode: '',
    address: '',
    city: '',
    state: '',
  });

  const inputRefs = useRef({});

  useEffect(() => {
    if (storedAddress) {
      setShipping(storedAddress);
    } else if (currentUser?.email) {
      setShipping((prev) => ({
        ...prev,
        email: currentUser.email,
      }));
    }
  }, [storedAddress, currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    const { fullName, email, phone, pincode, address, city, state } = shipping;

    const phoneRegex = /^[6-9]\d{9}$/;
    const pincodeRegex = /^\d{6}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const [key, value] of Object.entries(shipping)) {
      if (!value.trim()) {
        alert(`Please enter your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        inputRefs.current[key]?.focus();
        return;
      }
    }

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      inputRefs.current.email?.focus();
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert('Please enter a valid 10-digit phone number');
      inputRefs.current.phone?.focus();
      return;
    }

    if (!pincodeRegex.test(pincode)) {
      alert('Please enter a valid 6-digit pincode');
      inputRefs.current.pincode?.focus();
      return;
    }

    dispatch(setShippingAddress(shipping));
    navigate('/checkout/payment');
  };

  const isFormComplete = Object.values(shipping).every((val) => val.trim() !== '');

  return (
    <div className="container py-5">
      <h2 className="mb-4">🚚 Shipping Details</h2>

      <div className="row g-3">
        {[
          { label: 'Full Name', name: 'fullName', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Phone Number', name: 'phone', type: 'tel' },
          { label: 'Pincode', name: 'pincode', type: 'text' },
          { label: 'City', name: 'city', type: 'text' },
          { label: 'State', name: 'state', type: 'text' },
        ].map(({ label, name, type }) => (
          <div key={name} className="col-md-6">
            <label className="form-label">{label}</label>
            <input
              ref={(el) => (inputRefs.current[name] = el)}
              type={type}
              name={name}
              value={shipping[name]}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        ))}

        <div className="col-md-12">
          <label className="form-label">Shipping Address</label>
          <textarea
            ref={(el) => (inputRefs.current.address = el)}
            name="address"
            value={shipping.address}
            onChange={handleChange}
            rows={3}
            className="form-control"
            required
          />
        </div>
      </div>

      <button
        className="btn btn-primary mt-4"
        onClick={handleContinue}
        disabled={!isFormComplete}
      >
        Continue to Payment
      </button>
    </div>
  );
}

export default CheckoutShipping;
