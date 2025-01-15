import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './barcode.jsx'
import HistoryApp from './history.jsx'
import PageButtons from './buttons.jsx'

createRoot(document.getElementById('root')).render(
    
  <StrictMode>
    <App />
    <HistoryApp />
    <PageButtons/>

  </StrictMode>,
)
