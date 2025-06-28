import React from 'react';
import About from './About'; // Component created below

const HomePrivate = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Welcome Back to Rivaayat 👋</h1>
      <p className="text-muted mb-5">
        Here's what’s new in your world.
      </p>
      
      {/* About Our Product Section */}
      <About />
    </div>
  );
};

export default HomePrivate;
