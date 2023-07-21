import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

if (process.env.NODE_ENV === 'development') {
  document.title = '🗿DEAN.TAXI'
}

// allow scrolling to hide the address bar on ios safari
screen.orientation.addEventListener('change', () => {
  document.body.style.overflowY = 'auto'
})
