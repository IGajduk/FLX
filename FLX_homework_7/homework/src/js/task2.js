let prizeValues = {
    attempt3: 2,
    attempt2: 5,
    attempt1: 10
};
let userData = {
    attemptsLeft: 3,
    totalPrize: 0
};
let rangeNumber = 5;
if (confirm('Do you want to play a game?')) {
        let randomNumber = Math.floor((Math.random() * rangeNumber));
            for (; userData.attemptsLeft >= 0;) {
                let userGuess;
                if (userData.attemptsLeft === 3) {
                    userGuess = +prompt(`Please Enter a Number in range 0 to ${rangeNumber}
                              \n Attempts left: ${userData.attemptsLeft}
                              \n Total prize: ${userData.totalPrize}
                              \n Possible prize on current attempt: ${prizeValues.attempt1}`);
                } else if (userData.attemptsLeft === 2) {
                    userGuess = +prompt(`Please Enter a Number in range 0 to ${rangeNumber}
                              \n Attempts left: ${userData.attemptsLeft}
                              \n Total prize: ${userData.totalPrize}
                              \n Possible prize on current attempt: ${prizeValues.attempt2}`)
                } else if (userData.attemptsLeft === 1) {
                    userGuess = +prompt(`Please Enter a Number in range 0 to ${rangeNumber}
                              \n Attempts left: ${userData.attemptsLeft}
                              \n Total prize: ${userData.totalPrize}
                              \n Possible prize on current attempt: ${prizeValues.attempt3}`)
                }
                if (userData.attemptsLeft === 0) {
                    prizeValues = {
                        attempt3: 2,
                        attempt2: 5,
                        attempt1: 10
                    };
                    userData.totalPrize = 0;
                    alert(`Thank you for a game. Your prize is: ${userData.totalPrize}$`);
                    rangeNumber = 5;
                    userData.attemptsLeft = 3;
                    randomNumber = Math.floor((Math.random() * rangeNumber));
                    if (confirm('Do you want to play again?')) {
                        continue;
                    } else {
                        break;
                    }
                } else if (userData.attemptsLeft === 1 && userGuess === randomNumber) {
                    userData.totalPrize += prizeValues.attempt3;
                    if (confirm(`Congratulation!   Your prize is: ${userData.totalPrize}$ Do you want to continue?`)) {
                        userData.attemptsLeft = 3;
                        prizeValues.attempt3 *= 3;
                        prizeValues.attempt1 *= 3;
                        prizeValues.attempt2 *= 3;
                        rangeNumber *= 2;
                        randomNumber = Math.floor((Math.random() * rangeNumber));
                    } else {
                        alert(`Thank you for a game. Your prize is: ${userData.totalPrize}$`);
                        if (confirm('Do you want to play again?')) {
                            userData.attemptsLeft = 3;
                            prizeValues = {
                                attempt3: 2,
                                attempt2: 5,
                                attempt1: 10
                            };
                            userData.totalPrize = 0;
                            rangeNumber = 5;
                            randomNumber = Math.floor((Math.random() * rangeNumber));
                        } else {
                            break;
                        }
                    }
                    continue;
                } else if (userData.attemptsLeft === 2 && userGuess === randomNumber) {
                    userData.totalPrize += prizeValues.attempt2;
                    if (confirm(`Congratulation!   Your prize is: ${userData.totalPrize}$ Do you want to continue?`)) {
                        userData.attemptsLeft = 3;
                        prizeValues.attempt3 *= 3;
                        prizeValues.attempt1 *= 3;
                        prizeValues.attempt2 *= 3;
                        rangeNumber *= 2;
                        randomNumber = Math.floor((Math.random() * rangeNumber));
                    } else {
                        alert(`Thank you for a game. Your prize is: ${userData.totalPrize}$`);
                        if (confirm('Do you want to play again?')) {
                            userData.attemptsLeft = 3;
                            prizeValues = {
                                attempt3: 2,
                                attempt2: 5,
                                attempt1: 10
                            };
                            userData.totalPrize = 0;
                            rangeNumber = 5;
                            randomNumber = Math.floor((Math.random() * rangeNumber));
                        } else {
                            break;
                        }
                    }
                    continue;
                } else if (userData.attemptsLeft === 3 && userGuess === randomNumber) {
                    userData.totalPrize += prizeValues.attempt1;
                    if (confirm(`Congratulation!   Your prize is: ${userData.totalPrize}$ Do you want to continue?`)) {
                        userData.attemptsLeft = 3;
                        prizeValues.attempt3 *= 3;
                        prizeValues.attempt1 *= 3;
                        prizeValues.attempt2 *= 3;
                        rangeNumber *= 2;
                        randomNumber = Math.floor((Math.random() * rangeNumber));
                    } else {
                        alert(`Thank you for a game. Your prize is: ${userData.totalPrize}$`);
                        if (confirm('Do you want to play again?')) {
                            userData.attemptsLeft = 3;
                            prizeValues = {
                                attempt3: 2,
                                attempt2: 5,
                                attempt1: 10
                            };
                            userData.totalPrize = 0;
                            rangeNumber = 5;
                            randomNumber = Math.floor((Math.random() * rangeNumber));
                        } else {
                            break;
                        }
                    }
                    continue;
                } else {
                    userData.attemptsLeft--;
                }
            }
        prizeValues = {};
        rangeNumber = 5;
        randomNumber = undefined;
} else {
    alert(`You did not become a millionaire, but can.`);
}