import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import App from './barcode.jsx'
import HistoryApp from './history.jsx'
import PageButtons from './buttons.jsx'

function App() {
  const [page, setPage] = useState("barcode")
  


  return (
    <>
      <App />
      <HistoryApp />
      <PageButtons page={page} setPage={setPage} />
    </>
  )
}

export default App
