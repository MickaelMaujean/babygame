// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate} from 'react-router-dom';
import Login from './auth/login';
import Section1 from './components/Section1';
import Section2 from './components/section2';
import Section3 from './components/section3';
import { fetchData } from './api/api';

function App() {
  const [data, setData] = useState({});


  useEffect(() => {
    fetchData()
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Function to determine the initial redirection
  const initialRedirect = () => {
    // If the user is not logged in, redirect to the login page
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    // If the user is logged in, render the main app page
    return (
      <div>
        <Section1 data={data.section1} />
        <Section2 data={data.section2} />
        <Section3 data={data.section3} />
      </div>
    );
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Use the custom initialRedirect function */}
          <Route path="/" element={initialRedirect()} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
