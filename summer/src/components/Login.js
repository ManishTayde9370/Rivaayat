import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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
    if (!identity) err.identity = 'Identity is required';
    if (!password) err.password = 'Password is required';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);
    setMessage('');

    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await axios.post(
          'http://localhost:5000/auth/login',
          { identity, password },
          { withCredentials: true }
        );

        const data = response.data;
        if (data.success) {
          setShowSplash(true);
          setTimeout(() => {
            setShowSplash(false);
            updateUserDetails({ username: data.username });
            navigate('/dashboard');
          }, 2000);
        } else {
          setMessage(data.message || 'Login failed.');
        }
      } catch (err) {
        console.error('Login error:', err);
        setMessage(err.response?.data?.message || 'Server error. Try again.');
      }
    }
  };

  if (showSplash) return <SplashScreen />;

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
            <span className="input-group-text" onClick={() => setShowPwd(!showPwd)} style={{ cursor: 'pointer' }}>
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
