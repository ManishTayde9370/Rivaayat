import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser,FaUserAlt, FaEnvelope, FaPhone, FaLock, FaUserTag } from 'react-icons/fa';


import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgImage from '../assets/bg-login1.jpeg'; // ✅ your uploaded wallpaper

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData, {
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message || "Registration successful!");
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed.";
      toast.error(msg);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'serif',
      }}
    >
      <ToastContainer />
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container p-4 rounded"
        style={{
          maxWidth: '450px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          color: '#f8f1e7',
          boxShadow: '0 0 15px rgba(0,0,0,0.3)'
        }}
      >
        <h3 className="text-center mb-4" style={{ fontWeight: 'bold', letterSpacing: '2px' }}>REGISTER</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 d-flex align-items-center">
            <FaUser className="me-2" />
            <input type="text" name="name" placeholder="Name" className="form-control bg-transparent text-white border-0 border-bottom" required value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group mb-3 d-flex align-items-center">
            <FaUserTag className="me-2" />
            <input type="text" name="username" placeholder="Username" className="form-control bg-transparent text-white border-0 border-bottom" required value={formData.username} onChange={handleChange} />
          </div>
          <div className="form-group mb-3 d-flex align-items-center">
            <FaEnvelope className="me-2" />
            <input type="email" name="email" placeholder="Email" className="form-control bg-transparent text-white border-0 border-bottom" required value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group mb-3 d-flex align-items-center">
            <FaPhone className="me-2" />
            <input type="text" name="phone" placeholder="Phone" className="form-control bg-transparent text-white border-0 border-bottom" required value={formData.phone} onChange={handleChange} />
          </div>
          <div className="form-group mb-4 d-flex align-items-center">
            <FaLock className="me-2" />
            <input type="password" name="password" placeholder="Password" className="form-control bg-transparent text-white border-0 border-bottom" required value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-outline-light w-100 fw-bold">Register</button>
          <p className="text-center mt-3">
            Already have an account? <a href="/login" className="text-warning text-decoration-none">Login</a>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
