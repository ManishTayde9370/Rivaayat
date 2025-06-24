import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Applayout from './Layout/Applayout';
import { useState } from 'react';

function App() {
  const [userDetails, setUserDetails] = useState(null);

  const updateUserDetails = (updateData) => {
    setUserDetails(updateData);
  };

  const handleLogout = () => {
    setUserDetails(null);
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
            <Register updateUserDetails={updateUserDetails} />
          </Applayout>
        }
      />

      <Route
        path="/login"
        element={
          <Applayout userDetails={userDetails} onLogout={handleLogout}>
            <Login updateUserDetails={updateUserDetails} />
          </Applayout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <Applayout userDetails={userDetails} onLogout={handleLogout}>
            <Dashboard
              userDetails={userDetails}
              updateUserDetails={updateUserDetails}
            />
          </Applayout>
        }
      />
    </Routes>
  );
}

export default App;
