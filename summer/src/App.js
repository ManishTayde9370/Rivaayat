import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';
import About from './pages/About';
import HomePublic from './pages/HomePublic';
import HomePrivate from './pages/HomePrivate';
import Applayout from './Layout/Applayout';

import { useSelector, useDispatch } from 'react-redux';
import { CLEAR_USER } from './redux/user/actions';

function App() {
  const userDetails = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: CLEAR_USER });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Applayout userDetails={userDetails} onLogout={handleLogout}>
            {userDetails ? <HomePrivate /> : <HomePublic />}
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
        path="/login"
        element={
          <Applayout userDetails={userDetails} onLogout={handleLogout}>
            <Login />
          </Applayout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <Applayout userDetails={userDetails} onLogout={handleLogout}>
            <Dashboard />
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
    </Routes>
  );
}

export default App;
