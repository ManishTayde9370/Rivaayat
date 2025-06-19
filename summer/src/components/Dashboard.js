import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ userDetails, updateUserDetails }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    updateUserDetails(null);
    navigate('/login');
  };

  return (
    <div className="container mt-5 text-center">
      <h2 className=" mb-4">Dashboard</h2>

      {userDetails ? (
        <>
          <img
            src={`https://ui-avatars.com/api/?name=${userDetails.username}&background=0D8ABC&color=fff`}
            alt="avatar"
            className="rounded-circle mb-3"
            width={100}
            height={100}
          />
          <h5 className="mb-2">Welcome, <strong>{userDetails.username}</strong></h5>
          <p className="text-muted">You are logged in to <strong>Rivaayat</strong></p>
          <button className="btn btn-outline-danger mt-3 px-4" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p className="text-danger">No user information available.</p>
      )}
    </div>
  );
};

export default Dashboard;
