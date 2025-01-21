import { useEffect, useState } from 'react'
import './css/app.css'
import './css/index.css'
import BarcodeApp from './barcode.jsx'
import HistoryApp from './history.jsx'
import PageButtons from './components/buttons.jsx'


//The main page component
function App() {
  //state for changing current page content
  const [page, setPage] = useState(() => {
    const currPage = JSON.parse(sessionStorage.getItem('currentPage')) || "barcode";
    return currPage;
  })
  //Dictionary containing possible page content
  const CurrentPage = {
    "barcode" : <BarcodeApp/>,
    "history" : <HistoryApp/>
  }
  //Function for changing current page
  function setPageFunc(page) {
    const newPage = page
    setPage(newPage)
    sessionStorage.setItem('currentPage', JSON.stringify(newPage))
    console.log(`Page ${page} loaded`)
  }
  
  return (
    <>
      <div className='wrapperBarcode'>
        <div className='mainContent'>
          {CurrentPage[page]}
        </div>
        <div className='buttonNav'>
          <PageButtons page={page} changePage={setPageFunc}/>
        </div>
      </div>

    </>
  )
}

export default App