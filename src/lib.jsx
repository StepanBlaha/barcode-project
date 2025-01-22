//Takes a string and makes the first letter capital
export function capitalize(val){
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}