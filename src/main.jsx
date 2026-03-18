/**
 * main.jsx — Application entry point
 * ─────────────────────────────────────────────────────────────────────────────
 * Mounts the React application into the <div id="root"> element defined in
 * index.html.  Nothing else lives here — all app logic is in App.jsx.
 *
 * INSTALLATION
 * ─────────────
 * Requirements: Node.js 18+ (check with `node -v`).
 *
 * 1. Install dependencies (only needed once):
 *      npm install
 *
 * 2. Start the development server (hot-reload on save):
 *      npm run dev
 *    Then open http://localhost:5173 in your browser.
 *
 * 3. Build for production (outputs to /dist):
 *      npm run build
 *
 * 4. Preview the production build locally:
 *      npm run preview
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
