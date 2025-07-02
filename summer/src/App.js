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
import Product from './pages/Product';

import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import ManageProducts from './admin/ManageProducts';
// import ManageUsers from './admin/ManageUsers'; // ✅ create if not yet
import AddProduct from './admin/AddProduct'; // ✅ create if not yet

import Applayout from './Layout/Applayout';
import AdminLayout from './Layout/AdminLayout';

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
      {/* ✅ Home Route */}
      <Route
        path="/"
        element={
          <Applayout userDetails={userDetails} onLogout={handleLogout}>
            {isLoggedIn && !isAdmin ? <HomePrivate /> : <HomePublic />}
          </Applayout>
        }
      />

      {/* ✅ Public Routes */}
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
      <Route
        path="/adminlogin"
        element={<AdminLogin />}
      />

      {/* ✅ User Dashboard (Protected) */}
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

      {/* ✅ Admin Routes (Protected) */}
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

      {/* <Route
        path="/admin/users"
        element={
          isAdmin ? (
            <AdminLayout userDetails={userDetails} onLogout={handleLogout}>
              <ManageUsers />
            </AdminLayout>
          ) : (
            <Navigate to="/adminlogin" replace />
          )
        }
      /> */}

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

      {/* ✅ Public Pages */}
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
    </Routes>
  );
}

export default App;
