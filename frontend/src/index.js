import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App'; // Import your root component
import './App.css';

// Replace ReactDOM.render with ReactDOM.createRoot
const root = createRoot(document.getElementById('root'));
root.render(<App />);
