import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import JsBarcode from "jsbarcode";
import { jsPDF } from "jspdf";
import './history.css'




function HistoryApp() {
    const codeRecord = JSON.parse(localStorage.getItem('codeRecord')) || [];

    //Function from saving pdf from the history table
    function savePDF(id, code, barType) {
        //Creates the barcode
        try {
            JsBarcode("#barcodeHidden", code, { format: barType });
        } catch (error) {
            console.error(error)
        }
        //Gets the barcode element
        var barcode = document.getElementById("barcodeHidden")
        //Turns it to DataURL element 
        var barcodeUrl = barcode.toDataURL("image/png");
        //Generated barcode width
        const barcodeWidth = 100;
        //Barcode height to keep the ratio
        const barcodeHeight = (barcode.height / barcode.width) * barcodeWidth;
        //Initialize pdf object
        const doc = new jsPDF();
        //Add the barcode DataUrl to it in format of PNG
        //Image, format of the file, x-cord, y-cord, width, height
        doc.addImage(barcodeUrl, "PNG", 1, 10, barcodeWidth, barcodeHeight );
        doc.addImage(barcodeUrl, "PNG", 110, 10, barcodeWidth, barcodeHeight );
        //Save the pdf
        doc.save("barcode.pdf");
    }


    //Function for saving barcode as png
    function savePNG(id, code, barType) {
        //Creates the barcode
        async function createBarcode(id, code, format) {
            try {
                JsBarcode(id, code, { format: format });
            } catch (error) {
                console.error(error)
                return
            }

        }
        createBarcode("#barcodeHidden", code, barType).then(() => {
            console.log('dssd')

            //Gets the barcode element
            var barcode = document.getElementById("barcodeHidden")
            //Turns it to DataURL element 
            var barcodeUrl = barcode.toDataURL("image/png");
    
            //Gets the a element 
            var link = document.getElementById(id);
            //Sets its attribute to download the barcode dataURL element
            link.setAttribute("download", "Barcode.png");
            link.setAttribute("href", barcodeUrl);
            //Sets the a display to block
            link.style.display = "block"
            
        })
        

    }

    const recordList = codeRecord.map(record => 
        
        <div className="record" key={record.id}>
            <div className="barcodeCode">{record.code} </div>
            <div className="barcodeFormat">{record.format}</div>
            <div className='barcodeSaveCenter' >
                <div className='barcodeSave' id={record.id} onClick={() => savePDF(record.id, record.code, record.format)}>Save pdf</div>
                <div className='barcodeSave' id={record.id} onClick={() => savePNG(record.id, record.code, record.format)}>Save png</div>

            </div>
        </div>
   

    )
    function RecordList() {
        return (
            <>
            <div className="recordList">
                {recordList}
            </div>
            <canvas id="barcodeHidden"></canvas>
            </>
        )
        
    }


    return (
        <>  
            <RecordList/>
        </>
    )

    
}



export default HistoryApp