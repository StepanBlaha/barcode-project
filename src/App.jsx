import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import BarcodeApp from './barcode.jsx'
import HistoryApp from './history.jsx'
import PageButtons from './buttons.jsx'

function App() {
  const [page, setPage] = useState("barcode")
  
  if(page ==="barcode"){
    return (
      <>
        <BarcodeApp />
        <PageButtons page={page} setPage={setPage} />
      </>
    )
  }

  if(page === "history"){
    return (
      <>
        <HistoryApp />
        <PageButtons page={page} setPage={setPage} />
      </>
    )
  }
  else{
    return (
      <>
        <BarcodeApp />
        <HistoryApp />
        <PageButtons page={page} setPage={setPage} />
      </>
    )
  }


}

export default App
