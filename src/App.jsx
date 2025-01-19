import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import BarcodeApp from './barcode.jsx'
import HistoryApp from './history.jsx'
import PageButtons from './buttons.jsx'

function App() {
 
  const [page, setPage] = useState(() => {
    const currPage = JSON.parse(sessionStorage.getItem('currentPage')) || "barcode";
    return currPage;
  })

  function setPageFunc(page) {
    const currentPage = JSON.parse(sessionStorage.getItem('currentPage')) || [];
    const newPage = page
    setPage(newPage)
    sessionStorage.setItem('currentPage', JSON.stringify(newPage))
    console.log(`Deleted record ${id}`)
    
  }
  
  if (page === "barcode") {
    console.log('Je to bar')
    return (
      <>
        <div className='wrapper'>
          <div className='mainContent'>
            <BarcodeApp />
          </div>
          <div className='buttonNav'>
            <PageButtons page={page} changePage={setPageFunc}/>
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
            <PageButtons page={page} changePage={setPageFunc} />
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
            <PageButtons page={page} changePage={setPageFunc} />
          </div>
        </div>
      </>
    )
  }


}

export default App
