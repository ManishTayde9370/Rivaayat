import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_USER } from './redux/user/actions';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import HomePublic from './pages/HomePublic';
import HomePrivate from './pages/HomePrivate';
import AdminDashboard from './admin/AdminDashboard';
import Product from './pages/Product';
import Applayout from './Layout/Applayout';

function App() {
  const userDetails = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: CLEAR_USER });
  };

  const isLoggedIn = !!userDetails;
  const isAdmin = userDetails?.isAdmin;

  return (
    <Routes>
      {/* Home Route */}
      <Route
        path="/"
        element={
          <Applayout userDetails={userDetails} onLogout={handleLogout}>
            {isAdmin ? <AdminDashboard /> : isLoggedIn ? <HomePrivate /> : <HomePublic />}
          </Applayout>
        }
      />

      {/* Public Routes */}
      <Route
        path="/register"
        element={
          <Applayout userDetails={userDetails} onLogout={handleLogout}>
            <Register />
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

      {/* User Protected Routes */}
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
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
        path="/contact"
        element={
          <Applayout userDetails={userDetails} onLogout={handleLogout}>
            <Contact />
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

      {/* Admin Route Protection */}
      <Route
        path="/admin"
        element={
          isAdmin ? (
            <Applayout userDetails={userDetails} onLogout={handleLogout}>
              <AdminDashboard />
            </Applayout>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
