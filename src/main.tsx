import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './styles/fonts.css';

// Add version check and reload logic
const APP_VERSION = '1.0.0'; // Update this with each deployment
const LAST_VERSION = localStorage.getItem('app_version');

// Force reload if version mismatch
if (LAST_VERSION && LAST_VERSION !== APP_VERSION) {
  localStorage.setItem('app_version', APP_VERSION);
  window.location.reload();
} else {
  localStorage.setItem('app_version', APP_VERSION);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);