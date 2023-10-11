
export function errorMessage(error) {
    return (error.response && error.response.data && error.response.data.message) 
        || error.mesage || error.toString();
}

export function isInCart(arr, product) {
    const newArr = arr.filter((item) => item.product._id === product._id);
    return newArr.length > 0;
}

export function getIndex(arr, product) {
    const newArr = arr.map((item, i) => item.product._id === product._id ? i : null)
    .filter((item) => item !== null);

    return newArr[0];
}

export function formatedDate(utc) {
    const d = new Date(utc);
    const day = (d.getDate()).toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear().toString().padStart(2, '0');
    
    return `${day}/${month}/${year}`;
}