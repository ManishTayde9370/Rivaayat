// src/pages/AdminLogin.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { SET_USER } from '../redux/user/actions'; // ✅ Ensure this is the correct path
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch(); // ✅ Redux dispatch

  const validate = () => {
    const err = {};
    if (!identity) err.identity = 'Username or email is required';
    if (!password) err.password = 'Password is required';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);
    if (Object.keys(formErrors).length > 0) return;

    try {
      // Step 1: Login request
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        { identity, password },
        { withCredentials: true }
      );

      // Step 2: Get user session
      const userRes = await axios.get(
        'http://localhost:5000/api/auth/is-user-logged-in',
        { withCredentials: true }
      );

      const user = userRes.data.userDetails;

      // Step 3: Check if user is admin
      if (user?.isAdmin) {
        dispatch({ type: SET_USER, payload: user }); // ✅ Save to Redux
        toast.success('Admin login successful');
        setTimeout(() => {
          navigate('/admin', { replace: true }); // ✅ Match the route in App.js
        }, 1000);
      } else {
        toast.error('You are not authorized as admin');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <ToastContainer />
      <h2 className="mb-4 text-center">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username / Email</label>
          <input
            type="text"
            className="form-control"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
          />
          {errors.identity && <div className="text-danger">{errors.identity}</div>}
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="text-danger">{errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-dark w-100">Login as Admin</button>
      </form>
    </div>
  );
};

export default AdminLogin;
