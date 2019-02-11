function pipe(x) {
    let result = x;
    for (let i = 1; i < arguments.length; i++) {
        result = arguments[i](result);
    }
    return result;
}
function addOne(x) {
    return x + 1;
}
pipe(1, addOne);
pipe(1, addOne, addOne);