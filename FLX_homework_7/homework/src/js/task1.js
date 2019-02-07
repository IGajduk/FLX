let loginAnswer = prompt('Please enter your login');
let time = new Date().getHours();
if (loginAnswer === '' || loginAnswer === null) {
    alert('Canceled.');
} else if (loginAnswer.length < 4) {
    alert('I don\'t know any users having name length less than 4 symbols');
} else if (loginAnswer === 'User' || loginAnswer === 'Admin') {
    let passwordAnswer = prompt('Please enter your password');
    if (passwordAnswer === '' || passwordAnswer === null) {
        alert('Canceled.');
    } else if (loginAnswer === 'User' && passwordAnswer === 'UserPass') {
        if (time < 20) {
            alert('Good day, dear User!');
        } else {
            alert('Good evening, dear User!');
        }
    } else if (loginAnswer === 'Admin' && passwordAnswer === 'RootPass') {
        if (time < 20) {
            alert('Good day, dear Admin!');
        } else {
            alert('Good evening, dear Admin!');
        }
    } else {
        alert('Wrong password');
    }
} else {
    alert('I don\'t know you');
}