import { Route, Routes } from 'react-router-dom'; 
import Home from './components/Home';
import Login from './components/Login';
import Applayout from './Layout/Applayout';
import Dashboard from './components/Dashboard';
import { useState } from 'react';

function App() {
  // Corrected variable names
  const [userDetails, setUserDetails] = useState(null);

  const updateUserDetails = (updateData) => {
    setUserDetails(updateData);
  };

  return (
    <Routes>
      <Route path="/" element={<Applayout><Home /></Applayout>} />

      <Route
        path="/login"
        element={<Login updateUserDetails={updateUserDetails} />}
      />

      <Route
        path="/dashboard"
        element={
          <Applayout>
            <Dashboard
              userDetails={userDetails}
              updateUserDetails={setUserDetails}
            />
          </Applayout>
        }
      />
    </Routes>
  );
}

export default App;
