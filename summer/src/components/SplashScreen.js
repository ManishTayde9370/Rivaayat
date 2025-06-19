import React from 'react';
import '../css/Splashscreen.css'; // We'll style separately

const SplashScreen = () => {
  return (
    <div className="splash-screen d-flex justify-content-center align-items-center vh-100">
      <div className="text-center fade-in">
        <h1 className="display-5 fw-bold text-light">✨ Welcome to Rivaayat ✨</h1>
        <p className="lead text-warning">Rooted in tradition. Designed for today.</p>
      </div>
    </div>
  );
};

export default SplashScreen;