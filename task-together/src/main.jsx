import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router'; // Adjust path if needed
import './index.css'; // If you have this file
import App from './App';
ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <App />
  //</React.StrictMode>
);