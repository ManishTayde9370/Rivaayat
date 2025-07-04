import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Applayout from './Layout/Applayout';
import AdminLayout from './Layout/AdminLayout';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import HomePublic from './pages/HomePublic';
import HomePrivate from './pages/HomePrivate';
import Product from './pages/Product';
import CartPage from './pages/CartPage';

import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ManageProducts from './admin/ManageProducts';
import AddProduct from './admin/AddProduct';

import { serverEndpoint } from './components/config';
import { SET_USER, CLEAR_USER } from './redux/user/actions';
import { loadCartFromBackend, clearCart } from './redux/cart/actions';

function App() {
  const [sessionChecked, setSessionChecked] = useState(false);
  const userDetails = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await axios.get(`${serverEndpoint}/api/auth/is-user-logged-in`, {
          withCredentials: true,
        });

        if (res.data.success && res.data.userDetails) {
          dispatch({ type: SET_USER, payload: res.data.userDetails });
          dispatch(loadCartFromBackend());
        } else {
          dispatch({ type: CLEAR_USER });
          dispatch(clearCart());
        }
      } catch (err) {
        dispatch({ type: CLEAR_USER });
        dispatch(clearCart());
      } finally {
        setSessionChecked(true);
      }
    };

    restoreSession();
  }, [dispatch]);

  const handleLogout = () => {
    dispatch({ type: CLEAR_USER });
    dispatch(clearCart());
  };

  const isLoggedIn = !!userDetails?.email;
  const isAdmin = userDetails?.isAdmin;

  if (!sessionChecked) {
    return <div>Loading...</div>; // Or a custom spinner
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Applayout userDetails={userDetails} onLogout={handleLogout}>
            {isLoggedIn && !isAdmin ? <HomePrivate /> : <HomePublic />}
          </Applayout>
        }
      />

      <Route
        path="/login"
        element={
          <Applayout userDetails={userDetails} onLogout={handleLogout}>
            <Login />
          </Applayout>
        }
      />
      <Route
        path="/register"
        element={
          <Applayout userDetails={userDetails} onLogout={handleLogout}>
            <Register />
          </Applayout>
        }
      />
      <Route path="/adminlogin" element={<AdminLogin />} />

      <Route
        path="/dashboard"
        element={
          isLoggedIn && !isAdmin ? (
            <Applayout userDetails={userDetails} onLogout={handleLogout}>
              <Dashboard />
            </Applayout>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/product"
        element={
          <Applayout userDetails={userDetails} onLogout={handleLogout}>
            <Product />
          </Applayout>
        }
      />
      <Route
        path="/about"
        element={
          <Applayout userDetails={userDetails} onLogout={handleLogout}>
            <About />
          </Applayout>
        }
      />
      <Route
        path="/contact"
        element={
          <Applayout userDetails={userDetails} onLogout={handleLogout}>
            <Contact />
          </Applayout>
        }
      />
      <Route
        path="/cart"
        element={
          <Applayout userDetails={userDetails} onLogout={handleLogout}>
            <CartPage />
          </Applayout>
        }
      />

      <Route
        path="/admin"
        element={
          isAdmin ? (
            <AdminLayout userDetails={userDetails} onLogout={handleLogout}>
              <AdminDashboard />
            </AdminLayout>
          ) : (
            <Navigate to="/adminlogin" replace />
          )
        }
      />
      <Route
        path="/admin/products"
        element={
          isAdmin ? (
            <AdminLayout userDetails={userDetails} onLogout={handleLogout}>
              <ManageProducts />
            </AdminLayout>
          ) : (
            <Navigate to="/adminlogin" replace />
          )
        }
      />
      <Route
        path="/admin/products/add"
        element={
          isAdmin ? (
            <AdminLayout userDetails={userDetails} onLogout={handleLogout}>
              <AddProduct />
            </AdminLayout>
          ) : (
            <Navigate to="/adminlogin" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
