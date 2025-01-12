import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './barcode.css'
import JsBarcode from "jsbarcode";
import { jsPDF } from "jspdf";


//Form for submiting the code
function CodeForm({onSubmit}){
    return(
        <>
            <div className='formDiv'>
                <form action="" id='codeForm' onSubmit={onSubmit}>
                    <input type="text" id='codeInput' />
                    <input type="submit"  />
                </form>
            </div>
        </>
    )
}
//Select box
function SelectBox({setBarType, setCode}){
    return(
        <>
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
        </>
    )
}



function App() {
    //State for managing inputed code
    const [code, setCode] = useState(null)
    //State for changin barcode method in future
    const [barType, setBarType] = useState("CODE128")

    const[error, setError] = useState('')


    //useEffect dela to ze se spusti az se element nacte, do listu dozadu muzeme dat zase parametry
    //Creates the bracode
    useEffect(()=>{
        //Checks if code, barcode exist and erro doesnt
        if(code && barType && error==""){
            
            const validFormats = [
                "CODE128", "EAN13", "EAN8", "UPC", "UPC_E", "ISBN", 
                "ITF14", "CODABAR", "MSI", "POSTNET", "GSI_128"
            ];
            
            if (validFormats.includes(barType)) {
                JsBarcode("#barcode", code, { format: barType });
                saveBarcode("barcode")
            } else {
                console.log(barType)
                setError('Invalid barcode format');
            }
        }else{

        }

    },[code, barType, error]);


    function saveBarcode(barcodeId){
        var barcode = document.getElementById(barcodeId)
        var barcodeUrl = barcode.toDataURL("image/png");


        var link = document.getElementById("barcodeDownload");
        var text = document.createTextNode("Download barcode");
        link.appendChild(text);

        link.setAttribute("download", "Barcode.png");
        link.setAttribute("href", barcodeUrl);

        const barcodeWidth = 100;
        const barcodeHeight = (barcode.height / barcode.width) * barcodeWidth;

        const doc = new jsPDF();
        //Image, format of the file, x-cord, y-cord, width, height
        doc.addImage(barcodeUrl, "PNG", 1, 10, barcodeWidth, barcodeHeight );
        doc.addImage(barcodeUrl, "PNG", 110, 10, barcodeWidth, barcodeHeight );
        doc.save("barcode.pdf");


    }
        



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
                    errorMessage = "doesnt contain only digits"
                }
                if (inputLength !== 13) {
                    errorMessage = "invalid length"
                }
                break;
            case "EAN8":
                if(!isnum){
                    errorMessage = "doesnt contain only digits"
                }
                if (inputLength !== 8) {
                    errorMessage = "invalid length"
                }
                break;
            
            case "UPC":
                if(!isnum){
                    errorMessage = "doesnt contain only digits"
                }
                if (inputLength !== 12) {
                    errorMessage = "invalid length"
                }
                break;
            case "UPC_E":
                if(!isnum){
                    errorMessage = "doesnt contain only digits"
                }
                if (inputLength !== 6) {
                    errorMessage = "invalid length"
                }
                break;
            case "ISBN":
                if(!isnum){
                    errorMessage = "doesnt contain only digits"
                }
                if (inputLength !== 10 || inputLength !== 13) {
                    errorMessage = "invalid length"
                }
                break;
            case "ITF14":
                if(!isnum){
                    errorMessage = "doesnt contain only digits"
                }
                if (inputLength !== 14) {
                    errorMessage = "invalid length"
                }
                break;
            case "CODABAR":
                if (inputLength < 10 || inputLength > 16) {
                    errorMessage = "invalid length"
                }
                break;
            case "MSI":
                if(!isnum){
                    errorMessage = "doesnt contain only digits"
                }
                if (inputLength !== 8 || inputLength !== 10) {
                    errorMessage = "invalid length"
                }
                break;
            case "POSTNET":
                if(!isnum){
                    errorMessage = "doesnt contain only digits"
                }
                if (inputLength !== 5 || inputLength !== 9) {
                    errorMessage = "invalid length"
                }
                break;
            case "GSI_128":
                if (inputLength !== 18) {
                    errorMessage = "invalid length"
                }
                break;
        }
        //checks if no format issues occured
        if (errorMessage!=="") {
            //sets error to the error message if yes
            setError(errorMessage)
            //debug
            console.log("Error: "+errorMessage)
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

    const errorElement = () =>{
        if (error) {
            return(
                <>
                    <div className='errorDiv'>
                        <p className='erroMSG'>{error}</p>
                    </div>
                </>
            )
            
        }
    }
    

  return (
    <>
        <div className='wrapper'>
            <div className='barcodeWrap'>
                <canvas id="barcode"></canvas>
            </div>
            <CodeForm onSubmit={formSubmit}/>
            <SelectBox setBarType={setBarType} setCode={setCode}/>
            <a href="" id='barcodeDownload'></a>
            {errorElement()}
        </div>
    </>
  )
}

export default App
