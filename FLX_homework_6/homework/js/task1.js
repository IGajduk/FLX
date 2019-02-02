const a = prompt("Please enter number a");
const b = prompt("Please enter number b");
const c = prompt("Please enter number c");
quadraticEquation(a, b, c);
function quadraticEquation(a, b, c) {
    if(isNaN(a) || isNaN(b) || isNaN(c)) {
        return alert('Invalid input data');
    } else {
        if (a !== null && b !== null && c !== null) {
            const d = (b * b) - (4 * a * c);
            if (Math.sqrt(d) || d > 0) {
                let x1 = (-b - Math.sqrt(d)) / (2 * a);
                let x2 = (-b + Math.sqrt(d)) / (2 * a);
                return alert(
                    `x1 = ${x1} and x2 = ${x2}`
                );
            } else if (d === 0) {
                if(b === 0) {
                    return alert('no solution');
                } else {
                    let x = (-b / (2 * a));
                    return alert(`x = ${x}`);
                }
            } else {
                return alert('no solution (when Discriminant < 0);');
            }
        } else {
            return alert('Invalid input data');
        }
    }
}

