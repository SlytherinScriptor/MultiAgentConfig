import React from 'react';
import ReactDOM from 'react-dom/client'; // Changed to 'react-dom/client' for React 18
import App from './App';

// Use ReactDOM.createRoot for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
