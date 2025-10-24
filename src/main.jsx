import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext'; // 1. Importe o Provedor

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider> {/* 2. Envolva o <App /> */}
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);