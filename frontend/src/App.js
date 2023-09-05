// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
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

  return (
    <div className="App">
      <Section1 data={data.section1} />
      <Section2 data={data.section2} />
      <Section3 data={data.section3} />
    </div>
  );
}

export default App;
