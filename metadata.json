
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Updated to use querySelector for better robustness
const rootElement = document.querySelector('#root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);