import './../css/buttons.css';
import { capitalize } from "./../lib.jsx";

//Page button component (used for changing content of the page)
function PageButtons({page, changePage}) {
    //Function for changing current page to barcode page
    function renderBarcode() {
        changePage("barcode")
    }
     //Function for changing current page to history page
    function renderHistory() {
        changePage("history")
    }
    //Daictionary with functions corresponding to currently loaded page
    const buttonDict = {
        "barcode" : renderHistory,
        "history" : renderBarcode
    }

    const pageName = {
        "barcode" : "history",
        "history" : "barcode"
    }

    //Element which renders corresponding button based on current page
    function ButtonRender() {
        return (
            <>
                <div className='pageChangeButton' onClick={buttonDict[page]}>
                    <p>{capitalize(pageName[page])}</p>    
                </div>
            </>
        )
    }

    return (
        <>
            <ButtonRender  />
        </>
    )
}
export default PageButtons