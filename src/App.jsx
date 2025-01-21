import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import BarcodeApp from './barcode.jsx'
import HistoryApp from './history.jsx'
import PageButtons from './buttons.jsx'
import { fetchData, postData } from "./api.js";

function App() {
  const [data, setData] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
      const loadData = async () => {
          const fetchedData = await fetchData();
          setData(fetchedData);
      };
      loadData();
  }, []);

  const handleAdd = async () => {
      if (newItem.trim() !== "") {
          const result = await postData({ name: newItem });
          setData((prev) => [...prev, result]);
          setNewItem("");
      }
  };



  const [page, setPage] = useState(() => {
    const currPage = JSON.parse(sessionStorage.getItem('currentPage')) || "barcode";
    return currPage;
  })

  function setPageFunc(page) {
    const newPage = page
    setPage(newPage)
    sessionStorage.setItem('currentPage', JSON.stringify(newPage))
    console.log(`Page ${page} loaded`)
    
  }
  
  if (page === "barcode") {
    return (
      <>
        <div className='wrapperBarcode'>
          <div className='mainContent'>
            <BarcodeApp />
          </div>
          <div className='buttonNav'>
            <PageButtons page={page} changePage={setPageFunc}/>
          </div>
        </div>



        <div>
            <h1>MongoDB Data</h1>
            <ul>
                {data.map((item) => (
                    <li key={item._id}>{item.name}</li>
                ))}
            </ul>
            <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button onClick={handleAdd}>Add Item</button>
        </div>
      </>
    )
  }

  if(page === "history"){
    return (
      <>
        <div className='wrapperHistory'>
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
