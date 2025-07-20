import JsBarcode from "jsbarcode";

//Function for creating barcode
export function createBarcode(canvasId, code, format) {
        try {
            JsBarcode(canvasId, code, { format: format });
        } catch (error) {
            console.error("Error creating barcode:", error);
        }
    }