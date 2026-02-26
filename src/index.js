import React from 'react';
import ReactDOM from 'react-dom'; // Changed from 'react-dom/client' for React 17
import App from './App';

// Use ReactDOM.render for React 17
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
