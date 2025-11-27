import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { getSavedTheme, applyTheme } from './utils/theme'

// Apply saved theme on startup (defaults to dark)
if (typeof document !== 'undefined') {
  applyTheme(getSavedTheme());
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
