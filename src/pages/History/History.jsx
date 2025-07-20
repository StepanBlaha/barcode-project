import { useEffect, useState } from 'react'
import { NumberSelect } from '../../components/barcodeComponents.jsx';
import { jsPDF } from "jspdf";
import { createBarcode } from '../../utils/barcode.js';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header.jsx';
import './History.css'

//History app component
function History() {
    //State for changing number of barcodes in saved PDF
    const [PDFNumber, setPDFNumber] = useState(1)
    //State for keeping th record history
    const [codeRecord, setCodeRecord] = useState(() => {
        const savedRecord = JSON.parse(localStorage.getItem('codeRecord')) || [];
        return savedRecord;
    })

    //Function from saving pdf from the history table
    function savePDF(id, code, barType) {
        //Create barcode
        createBarcode(`#barcodeHidden`, code, barType);
        //Gets the barcode element
        const barcode = document.getElementById("barcodeHidden")
        //Turns it to DataURL element 
        const barcodeUrl = barcode.toDataURL("image/png");
        //Generated barcode width
        const barcodeWidth = 90;
        //Barcode height to keep the ratio
        const barcodeHeight = (barcode.height / barcode.width) * barcodeWidth;
        //Initialize pdf object
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width - 10;
        let y = 10;
        let x = 10
        for (let index = 0; index < PDFNumber; index++) {
            if (x + barcodeWidth > pageWidth) {
                x = 10;
                y += barcodeHeight + 5;
            }
            if (y + barcodeHeight > doc.internal.pageSize.height - 10) {
                doc.addPage()
                y = 10
                x = 10
            }
            doc.addImage(barcodeUrl, "PNG", x, y, barcodeWidth, barcodeHeight );
            x += barcodeWidth + 10
        }
        doc.save("barcode.pdf");
        console.log(`PDF ${id} downloaded`)
    }

    //Function for saving barcode as png
    function savePNG(id, code, barType) {
        //Create barcode
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

    //Component with list of all records
    const recordList = codeRecord.map(record => (
        <div className="record" key={record.id}>
            <div className='BarcodeInfo'>
                <div className="barcodeCode">{record.code} </div>
                <div className="barcodeFormat">{record.format}</div>
            </div>
            
            <div className='barcodeSaveCenter' >
                <a className='barcodeSave' id={record.id} onClick={() => savePDF(record.id, record.code, record.format)}>Save pdf</a>
                <a className='barcodeSave' id={`${record.id}PNG`} onClick={() => savePNG(`${record.id}PNG`, record.code, record.format)}>Save png</a>
                <a className='barcodeDelete' onClick={()=> deleteRecord(record.id)}><svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="currentColor"  className="icon icon-tabler icons-tabler-filled icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg></a>
                <NumberSelect setPDFNumber={setPDFNumber} PDFNumber={PDFNumber}/>
            </div>
        </div>
    ))


    return (
        <>  
            <div className='BarcodePage'>
                <Header page="Barcode" pageSrc="/barcode"/>
                
                <div className='BarcodeContent'>
                    <div className='Barcode'>
                        <div className="recordList">
                            {recordList}
                        </div>
                        <canvas id="barcodeHidden"></canvas>
                    </div>
                </div>

                <Footer/>
            </div>
        </>
    )
}
export default History