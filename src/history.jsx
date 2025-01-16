import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import JsBarcode from "jsbarcode";
import { jsPDF } from "jspdf";
import './history.css'




function HistoryApp() {
    const codeRecord = JSON.parse(localStorage.getItem('codeRecord')) || [];

    const recordList = codeRecord.map(record => 
        <div className="record" key={record.id}>
            <div className="barcodeCode">{record.code} </div>
            <div className="barcodeFormat">{record.format}</div>
        </div>
   

    )
    function RecordList() {
        return (
            <div className="recordList">
                {recordList}
            </div>
        )
        
    }


    return (
        <>  
            <RecordList/>
        </>
    )

    
}



export default HistoryApp