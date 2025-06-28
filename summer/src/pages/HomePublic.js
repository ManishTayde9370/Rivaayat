import React from 'react';
import { Link } from 'react-router-dom';


const HomePublic = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Welcome to Rivaayat</h1>
      <p className="lead">
        Rivaayat is a platform that brings together culture, community, and commerce.
        Discover unique products, connect with others, and explore traditions.
      </p>
      <div className="mt-4">
        <Link to="/login" className="btn btn-primary mx-2">Login</Link>
        <Link to="/register" className="btn btn-outline-primary">Register</Link>
      </div>
    </div>
  );
};

export default HomePublic;
