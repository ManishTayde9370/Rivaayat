import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaEyeSlash, FaUserAlt, FaLock } from 'react-icons/fa';
import SplashScreen from './SplashScreen';
import bgImage from '../assets/bg-login1.jpeg';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

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
          'http://localhost:5000/api/auth/login',
          { identity, password },
          { withCredentials: true }
        );

        if (response.data.success) {
          setShowSplash(true);

          setTimeout(async () => {
            try {
              const userRes = await axios.get(
                'http://localhost:5000/api/auth/is-user-logged-in',
                { withCredentials: true }
              );
              updateUserDetails(userRes.data.userDetails);
              setShowSplash(false);
              navigate('/dashboard');
            } catch (err) {
              console.error('User check error:', err);
              setShowSplash(false);
              setMessage('Could not fetch user info.');
            }
          }, 2000);
        } else {
          setMessage(response.data.message || 'Login failed.');
        }
      } catch (err) {
        console.error('Login error:', err);
        setMessage(err.response?.data?.message || 'Server error. Try again.');
      }
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    const googleCredentialFromClient = credentialResponse.credential;
    const decoded = jwtDecode(googleCredentialFromClient);
    setShowSplash(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ credential: googleCredentialFromClient }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const userRes = await axios.get(
          'http://localhost:5000/api/auth/is-user-logged-in',
          { withCredentials: true }
        );
        updateUserDetails(userRes.data.userDetails);
        navigate('/dashboard');
      } else {
        setMessage(data.message || 'Google login failed.');
      }
    } catch (err) {
      console.error('Google login error:', err);
      setMessage('Google login failed. Please try again.');
    } finally {
      setShowSplash(false);
    }
  };

  const handleGoogleFailure = () => {
    setMessage('Google authentication failed. Please try again.');
  };

  if (showSplash) return <SplashScreen />;

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div
        className="p-4 shadow-lg rounded"
        style={{
          width: '100%',
          maxWidth: '420px',
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          color: '#fcecc5',
          border: '1px solid #fcecc5',
          borderRadius: '15px',
        }}
      >
        <h2 className="text-center mb-1" style={{ fontFamily: 'Georgia', fontWeight: 'bold' }}>
          RIVAAYAT
        </h2>
        <p className="text-center mb-4" style={{ letterSpacing: '1px' }}>
          LOGIN
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label className="mb-1">Username / Email / Phone</label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-light text-light">
                <FaUserAlt />
              </span>
              <input
                type="text"
                className={`form-control bg-transparent border-light text-light ${errors.identity ? 'is-invalid' : ''}`}
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
              />
            </div>
            {errors.identity && <div className="text-danger small mt-1">{errors.identity}</div>}
          </div>

          <div className="form-group mb-4">
            <label className="mb-1">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-light text-light">
                <FaLock />
              </span>
              <input
                type={showPwd ? 'text' : 'password'}
                className={`form-control bg-transparent border-light text-light ${errors.password ? 'is-invalid' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="input-group-text bg-transparent border-light text-light"
                onClick={() => setShowPwd(!showPwd)}
                style={{ cursor: 'pointer' }}
              >
                {showPwd ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
          </div>

          <button
            type="submit"
            className="btn w-100 mb-3"
            style={{ backgroundColor: '#fcecc5', color: '#000', fontWeight: 'bold' }}
          >
            LOGIN
          </button>
        </form>

        <div className="d-flex justify-content-center mb-2">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleFailure} />
        </div>

        {message && <div className="alert alert-danger mt-3">{message}</div>}
      </div>
    </div>
  );
};

export default Login;
