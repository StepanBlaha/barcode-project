import { useEffect, useState } from 'react'
import './Barcode.css'
import JsBarcode from "jsbarcode";
import { jsPDF } from "jspdf";
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

//Barcode app component
function Barcode() {
    //State for changing number of barcodes in saved PDF
    const [PDFNumber, setPDFNumber] = useState(1)
    //State for managing inputed code
    const [code, setCode] = useState(null)
    //State for changin barcode method in future
    const [barType, setBarType] = useState("CODE128")
    //State with errors
    const[error, setError] = useState('')

    //useEffect dela to ze se spusti az se element nacte, do listu dozadu muzeme dat zase parametry
    //Creates the bracode
    useEffect(()=>{
        //Checks if code, barcode exist and erro doesnt
        if(code && barType && error==""){
            //Array containing valid barcode
            const validFormats = [
                "CODE128", "EAN13", "EAN8", "UPC", "UPC_E", "ISBN", 
                "ITF14", "CODABAR", "MSI", "POSTNET", "GSI_128"
            ];
            
            if (validFormats.includes(barType)) {
                JsBarcode("#barcode", code, { format: barType });
                savePNG("barcode")
                barcodeHistory();
            } else {
                setError('Invalid barcode format');
            }
        }

    },[code, barType, error]);

    //Debug message if there is an error
    useEffect(()=>{
        error && console.error(error)
    }, [error]);

    //Function for saving barcode as PNG
    function savePNG(barcodeId){
        //Gets the barcode element
        const barcode = document.getElementById(barcodeId)
        //Turns it to DataURL element 
        const barcodeUrl = barcode.toDataURL("image/png");
        //Gets the a element 
        const link = document.getElementById("barcodeDownload");
        //Sets its attribute to download the barcode dataURL element
        link.setAttribute("download", "Barcode.png");
        link.setAttribute("href", barcodeUrl);
        //Sets the a display to block
        link.style.display="block"
    }

    //Function for updating barcode generator history
    function barcodeHistory() {
        const codeRecord = JSON.parse(localStorage.getItem('codeRecord')) || [];
        const newId = codeRecord.length
        codeRecord.push({
            "id": newId,
            "code": code,
            "format": barType
        });
        localStorage.setItem('codeRecord', JSON.stringify(codeRecord));
    }

    //Function for checking if the input has correct attributs for chosen barcode format
    function lengthCheck(input) {
        //length  of input
        const inputLength = input.length
        //initialize error message
        let errorMessage = '';
        //For checking if all characters of input are numeric
        let isnum = /^\d+$/.test(input);
        //check for any format issue
        switch(barType){
            case "EAN13":
                if(!isnum){
                    errorMessage = "doesnt contain only digits / neobsahuje pouze čísla"
                }
                if (inputLength !== 13) {
                    errorMessage = "invalid length / špatný formát"
                }
                break;
            case "EAN8":
                if(!isnum){
                    errorMessage = "doesnt contain only digits / neobsahuje pouze čísla"
                }
                if (inputLength !== 8) {
                    errorMessage = "invalid length / špatný formát"
                }
                break;
            
            case "UPC":
                if(!isnum){
                    errorMessage = "doesnt contain only digits / neobsahuje pouze čísla"
                }
                if (inputLength !== 12) {
                    errorMessage = "invalid length / špatný formát"
                }
                break;
            case "UPC_E":
                if(!isnum){
                    errorMessage = "doesnt contain only digits / neobsahuje pouze čísla"
                }
                if (inputLength !== 6) {
                    errorMessage = "invalid length / špatný formát"
                }
                break;
            case "ISBN":
                if(!isnum){
                    errorMessage = "doesnt contain only digits / neobsahuje pouze čísla"
                }
                if (inputLength !== 10 && inputLength !== 13) {
                    errorMessage = "invalid length / špatný formát"
                }
                break;
            case "ITF14":
                if(!isnum){
                    errorMessage = "doesnt contain only digits / neobsahuje pouze čísla"
                }
                if (inputLength !== 14) {
                    errorMessage = "invalid length / špatný formát"
                }
                break;
            case "CODABAR":
                if (inputLength < 10 && inputLength > 16) {
                    errorMessage = "invalid length / špatný formát"
                }
                break;
            case "MSI":
                if(!isnum){
                    errorMessage = "doesnt contain only digits / neobsahuje pouze čísla"
                }
                if (inputLength !== 8 && inputLength !== 10) {
                    errorMessage = "invalid length / špatný formát"
                }
                break;
            case "POSTNET":
                if(!isnum){
                    errorMessage = "doesnt contain only digits"
                }
                if (inputLength !== 5 && inputLength !== 9) {
                    errorMessage = "invalid length / špatný formát"
                }
                break;
            case "GSI_128":
                if (inputLength !== 18) {
                    errorMessage = "invalid length / špatný formát"
                }
                break;
        }
        //checks if any format issues occured
        if (errorMessage!=="") {
            //sets error to the error message if yes
            alert(errorMessage)
        }else{
            //sets error to empty if no
            setError('')
            //sets the code for barcode
            setCode(input)
        }
    }

    //Function for sending input value to process
    function formSubmit(event) {
        //Stops the sending and reloading
        event.preventDefault();
        //gets the input value
        const input = document.getElementById('codeInput').value;
        //calls the length check function
        lengthCheck(input);
    }

    //Function for saving barcode as PDF
    function savePDF(barcodeID) {
        //Gets the barcode element
        const barcode = document.getElementById(barcodeID)
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
    }
    
  return (
    <>
    <div className='BarcodePage'>
        <Header page="History" pageSrc="/history"/>
        <div className='BarcodeContent'>
            <div className='Barcode'>

                <div className='BarcodeWrap'>
                    <canvas id="barcode"></canvas>
                </div>

                <div className='formDiv'>
                    <form action="" id='codeForm' >
                        <input type="text" id='codeInput' />
                    </form>
                    <div className='ActionGroup'>
                        <div  type="submit" id='codeSubmit' onClick={(e)=>formSubmit(e)}>Odeslat</div>

                        <div className='selectDiv'>
                            <select name="formatSelect" id='formatSelect' onChange={(e)=> {setBarType(e.target.value); setCode(null)}}>
                                <option value="CODE128" >CODE128</option>
                                <option value="EAN13">EAN13</option>
                                <option value="EAN8">EAN8</option>
                                <option value="UPC">UPC</option>
                                <option value="UPC_E">UPC_E</option>
                                <option value="ISBN">ISBN</option>
                                <option value="ITF14">ITF14</option>
                                <option value="CODABAR">CODABAR</option>
                                <option value="MSI">MSI</option>
                                <option value="POSTNET">POSTNET</option>
                                <option value="GSI_128">GSI_128</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
            <div className='DownloadSection'>
                <div className='selectNumberDiv'>
                    <p>Number of copies</p>
                    <select name="numberSelect" value={PDFNumber} id='numberSelect' onChange={(e) => { setPDFNumber(e.target.value); ; console.log(e.target.value)}}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </div>
                <a id="barcodeDownload">
                    <div className='DownloadButton' id="barcodeDownload" >
                        <p className='downloadPngText'>Download as PNG</p>
                    </div>

                </a>
                <div className='DownloadButton' onClick={()=>savePDF("barcode")}>
                    <p className='downloadPdfText'>Download as PDF</p>
                </div>

            </div>
            

        </div>
        <Footer/>
    </div>
        
    </>
    )
}

export default Barcode
