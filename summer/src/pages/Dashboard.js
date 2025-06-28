import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { serverEndpoint } from '../components/config';
import { SET_USER, CLEAR_USER } from '../redux/user/actions'; // use action constants

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post(`${serverEndpoint}/api/auth/is-user-logged-in`, {}, {
          withCredentials: true,
        });

        if (res.data.userDetails) {
          dispatch({ type: SET_USER, payload: res.data.userDetails }); // dispatch object
        } else {
          dispatch({ type: CLEAR_USER });
          navigate('/login');
        }
      } catch (error) {
        console.error('Not logged in or token expired:', error);
        dispatch({ type: CLEAR_USER });
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    if (!userDetails || !userDetails.username) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [userDetails, dispatch, navigate]);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${serverEndpoint}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      if (response.data.success) {
        dispatch({ type: CLEAR_USER });
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

      {userDetails?.username ? (
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
