import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Agar aapne styling ke liye CSS file banayi hai
import App from './App'; // Apna main App component
import reportWebVitals from './reportWebVitals'; // Web vitals ke liye (optional)

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Agar aap web vitals ko measure karna chahte hain, toh yeh run karo
reportWebVitals();