import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import JsBarcode from "jsbarcode";
import { jsPDF } from "jspdf";
import './buttons.css';




function PageButtons({page, changePage}) {
    

    function renderBarcode() {
        changePage("barcode")
        console.log("Barcode page loaded")
    }
    function renderHistory() {
        changePage("history")
        console.log("History page loaded")
    }


    function ButtonRender({ barcodeRender, historyRender}) {
        if (page === "barcode") {
            return (
                <>
                    <div className='pageChangeButton' onClick={historyRender}>
                        <p>History</p>    
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div className='pageChangeButton' onClick={barcodeRender}>
                        <p>Barcode</p>    
                    </div>
                </>
            )
        }

    }
    return (
        <>
            <ButtonRender barcodeRender={renderBarcode} historyRender={renderHistory } />
        </>
    )

}



export default PageButtons