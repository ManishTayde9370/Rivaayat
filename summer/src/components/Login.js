import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SplashScreen from './SplashScreen';

const Login = ({ updateUserDetails }) => {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [showSplash, setShowSplash] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const err = {};
    const emailRegex = /\S+@\S+\.\S+/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!identity) {
      err.identity = 'This field is required';
    } else if (
      !emailRegex.test(identity) &&
      !phoneRegex.test(identity) &&
      identity.length < 3
    ) {
      err.identity = 'Enter a valid username, email, or phone number';
    }

    if (!password) {
      err.password = 'Password is required';
    } else if (password.length < 6) {
      err.password = 'Password must be at least 6 characters';
    }

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      // Dummy user credentials
      const dummyUser = {
        username: 'Tejas',
        email: 'Tejas17@example.com',
        phone: '9876543210',
        password: 'Tejas17',
      };

      const isValidUser =
        (identity === dummyUser.username ||
          identity === dummyUser.email ||
          identity === dummyUser.phone) &&
        password === dummyUser.password;

      if (isValidUser) {
        setMessage('');
        setShowSplash(true);
        setTimeout(() => {
          setShowSplash(false);
          updateUserDetails({ username: identity });
          navigate('/dashboard');
        }, 3000);
      } else {
        setMessage('Invalid credentials. Please try again.');
      }
    } else {
      setMessage('');
    }
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '420px' }}>
      <h3 className="text-center mb-4">Login to Rivaayat</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Username / Email / Phone</label>
          <input
            type="text"
            className={`form-control ${errors.identity && 'is-invalid'}`}
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
          />
          {errors.identity && <div className="invalid-feedback">{errors.identity}</div>}
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <div className="input-group">
            <input
              type={showPwd ? 'text' : 'password'}
              className={`form-control ${errors.password && 'is-invalid'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="input-group-text"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowPwd(!showPwd)}
            >
              {showPwd ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-success w-100">Login</button>
      </form>

      {message && <div className="alert alert-danger mt-3">{message}</div>}
    </div>
  );
};

export default Login;
