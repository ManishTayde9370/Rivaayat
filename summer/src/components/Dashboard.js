import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = ({ userDetails, updateUserDetails }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // to show loader during fetch

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/is-user-logged-in', {}, {
  withCredentials: true,
});


        if (res.data.userDetails) {
          updateUserDetails(res.data.userDetails); // set the user info
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Not logged in or token expired:', error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    if (!userDetails) {
      fetchUser(); // call only if userDetails not already available
    } else {
      setLoading(false);
    }
  }, [userDetails, updateUserDetails, navigate]);

 const handleLogout = async () => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/logout',
      {},
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      updateUserDetails(null);
      navigate('/login');
    } else {
      console.error('Unexpected logout response:', response.data);
    }
  } catch (error) {
    console.error('Logout failed:', error.response?.data || error.message);
  }
};


  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5 text-center">
      <h2 className="mb-4">Dashboard</h2>

      {userDetails ? (
        <>
          <img
            src={`https://ui-avatars.com/api/?name=${userDetails.username}&background=0D8ABC&color=fff`}
            alt="avatar"
            className="rounded-circle mb-3"
            width={100}
            height={100}
          />
          <h5 className="mb-2">
            Welcome, <strong>{userDetails.username}</strong>
          </h5>
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
