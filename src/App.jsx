import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import BarcodeApp from './barcode.jsx'
import HistoryApp from './history.jsx'
import PageButtons from './buttons.jsx'

function App() {
  const [page, setPage] = useState("history")
  
  if (page === "barcode") {
    console.log('Je to bar')
    return (
      <>
        <div className='wrapper'>
          <div className='mainContent'>
            <BarcodeApp />
          </div>
          <div className='buttonNav'>
            <PageButtons page={page} setPage={setPage} />
          </div>
        </div>
      </>
    )
  }

  if(page === "history"){
    return (
      <>
        <div className='wrapper'>
          <div className='mainContent'>
            <HistoryApp />
          </div>
          <div className='buttonNav'>
            <PageButtons page={page} setPage={setPage} />
          </div>
        </div>
      </>
    )
  }
  else{
    return (
      <>
        <div className='wrapper'>
          <div className='mainContent'>
            <BarcodeApp />
            <HistoryApp />
          </div>
          <div className='buttonNav'>
            <PageButtons page={page} setPage={setPage} />
          </div>
        </div>
      </>
    )
  }


}

export default App
