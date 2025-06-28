import React from 'react';      
import 'bootstrap/dist/css/bootstrap.min.css';


const About = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">About Rivaayat</h2>
      <p className="lead text-muted text-center">
        Rivaayat is a platform that brings tradition and technology together.
      </p>

      <div className="row mt-5">
        <div className="col-md-6">
          <h4>🎯 Our Mission</h4>
          <p>
            Our goal is to preserve and promote cultural heritage through digital innovation.
            Whether it’s traditional crafts, attire, or stories—Rivaayat provides a platform to explore and share it all.
          </p>
        </div>
        <div className="col-md-6">
          <h4>💡 What We Offer</h4>
          <ul>
            <li>Affiliate marketplace for traditional goods</li>
            <li>Storytelling and cultural documentation</li>
            <li>User-friendly dashboards and community tools</li>
            <li>Google and secure login support</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-5">
        <p className="text-muted">
          Built with ❤️ by the Rivaayat Team
        </p>
      </div>
    </div>
  );
};

export default About;
