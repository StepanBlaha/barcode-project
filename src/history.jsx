import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import JsBarcode from "jsbarcode";
import { jsPDF } from "jspdf";
import './history.css'




function HistoryApp() {
    //State for keeping th record history
    const [codeRecord, setCodeRecord] = useState(() => {
        const savedRecord = JSON.parse(localStorage.getItem('codeRecord')) || [];
        return savedRecord;
    })

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
        console.log(`PDF ${id} downloaded`)
    }


    //Function for saving barcode as png
    function savePNG(id, code, barType) {
        function createBarcode(canvasId, code, format) {
            try {
                JsBarcode(canvasId, code, { format: format });
            } catch (error) {
                console.error("Error creating barcode:", error);
            }
        }
        createBarcode(`#barcodeHidden`, code, barType);

        const barcodeCanvas = document.getElementById("barcodeHidden");
        if (!barcodeCanvas) {
            console.error('Canvas with ID "barcodeHidden" not found.');
            return;
        }

        const barcodeUrl = barcodeCanvas.toDataURL("image/png");

        const downloadLink = document.getElementById(id);
        if (!downloadLink) {
            console.error(`Link element with ID "${id}" not found.`);
            return;
        }

        downloadLink.setAttribute("download", "Barcode.png");
        downloadLink.setAttribute("href", barcodeUrl);

        console.log(`PNG ${id} downloaded`);
    }

    //Function for deleing a history record
    function deleteRecord(id) {
        const codeHistory = JSON.parse(localStorage.getItem('codeRecord')) || [];
        const newHistory = codeHistory.filter(record => record.id != id)
        setCodeRecord(newHistory)
        localStorage.setItem('codeRecord', JSON.stringify(newHistory));
        console.log(`Deleted record ${id}`)
        

        
    }


    const recordList = codeRecord.map(record => (
        <div className="record" key={record.id}>
            <div className="barcodeCode">{record.code} </div>
            <div className="barcodeFormat">{record.format}</div>
            <div className='barcodeSaveCenter' >
                <a className='barcodeSave' id={record.id} onClick={() => savePDF(record.id, record.code, record.format)}>Save pdf</a>
                <a className='barcodeSave' id={`${record.id}PNG`} onClick={() => savePNG(`${record.id}PNG`, record.code, record.format)}>Save png</a>
                <a className='barcodeDelete' onClick={()=> deleteRecord(record.id)}><svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg></a>
            </div>
        </div>
    ))

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