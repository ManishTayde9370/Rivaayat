import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
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
            <Home />
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
    </Routes>
  );
}

export default App;
