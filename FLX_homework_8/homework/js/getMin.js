function getMin() {
    let result = arguments[0];
    for(let i = 0; i < arguments.length; i++) {
        if (parseInt(arguments[i], 10) < result) {
            result = parseInt(arguments[i], 10);
        }
    }
    return result;
}
getMin(3, 0, -3);