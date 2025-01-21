//Form for submiting the code
export const CodeForm = function CodeForm({onSubmit}){
    return(
        <>
            <div className='formDiv'>
                <form action="" id='codeForm' onSubmit={onSubmit}>
                    <input type="text" id='codeInput' />
                    <input type="submit" id='codeSubmit' />
                </form>
            </div>
        </>
    )
}
//Format select box
export const FormatSelect = function FormatSelect({setBarType, setCode}){
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
//PDF download button
export const PdfDownloadButton = function PdfDownloadButton({saveFunc}) {
    return(
        <>
            <div className='downloadPdfButton' onClick={saveFunc}>
                <p className='downloadPdfText'>Download as PDF</p>
            </div>
        </>
    )
}
//PNG download button
export const PngDownloadButton = function PngDownloadButton() {
    return(
        <>
            <a  id='barcodeDownload'>
                <div className='downloadPngButton'>
                    <p className='downloadPngText'>Download as PNG</p>
                </div>
            </a>
        </>
    )
}
//Div Containing all the download buttons
export const DownloadButtons = function DownloadButtons({func}) {
    return(
        <>
            <div id='downloadButtonWrapper'>
                <PdfDownloadButton saveFunc = {func}/>
                <PngDownloadButton/>
            </div>
        </>
    )
}

//Number select box
export const NumberSelect = function NumberSelect({setPDFNumber, PDFNumber}) {
    return(
        <>
            <div className='selectNumberDiv'>
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
        </>
    )
}
