const a = prompt("Please enter number a");
const b = prompt("Please enter number b");
discountPrice(a, b);
function discountPrice(a, b) {
    if(isNaN(a) || isNaN(b)) {
        alert('Invalid input data');
    } else if ( a !== null && b !== null && a.length <= 7 && a.length > 0 && b.length <= 2 && b.length > 0) {
        if ((+a) > 0 && (+b) > 0) {
            let x = (((+a) * (+b)) / 100).toFixed(2);
            x = mathFloorNumber(x);
            let priceWithDiscount = +((+a) - x).toFixed(2);
            return alert(
                'Price without discount: ' + (+a) + '\n' +
                'Discount: ' + (+b) + '%' + '\n' +
                'Price with discount: ' + (Math.floor(priceWithDiscount * 100)/100) + '\n' +
                'Saved: ' + (x)
            );
        }else {
            return alert('Invalid input data');
        }
    } else {
        return alert('Invalid input data');
    }
}
function mathFloorNumber(n) {
    return Math.floor(n * 100)/100;
}