function userCard(index) {
        const maxLengthOfCardsArr = 3,
            minLengthOfCardsArr = 0;
    if (index <= maxLengthOfCardsArr && index > minLengthOfCardsArr) {
    return {
       options: {
            'balance': 100,
            'transactionLimit': 100,
            'historyLogs': [],
            'key': index
        },
        findPercentNumbers: {
           'transactionPercent': 0.5,
            'oneHundred': 100
        },
        getCardOptions: function () {
        return this.options;
        },
        putCredits: function (num) {
            this.options.balance += num;
            this.options.historyLogs.push({
                'operationType': 'Received credits',
                'credits': num,
                'operationTime': new Date().toLocaleString('en-GB', {timeZone: 'UTC'})
            });
            return this.options;
        },
        takeCredits: function (num) {
            if (this.options.transactionLimit >= num && this.options.balance >= num) {
                this.options.balance -= num;
                this.options.historyLogs.push({
                    'operationType': 'Withdrawal of credit',
                    'credits': num,
                    'operationTime': new Date().toLocaleString('en-GB', {timeZone: 'UTC'})
                });
                return this.options;
            } else {
                console.error(
                    `You can't take credits your transaction limit or remaining balance are lower than credits you want
                     to take`
                );
            }
        },
        setTransactionLimit: function (num) {
            this.options.transactionLimit = num;
            this.options.historyLogs.push({
                'operationType': 'Transaction limit change',
                'credits': num,
                'operationTime': new Date().toLocaleString('en-GB', {timeZone: 'UTC'})
            });
        },
        transferCredits: function (num, card) {
           const taxes = num * this.findPercentNumbers.transactionPercent / this.findPercentNumbers.oneHundred;
           console.log(card);
            if (
                this.options.transactionLimit >= num &&
                this.options.balance - taxes >= num
            ) {
                this.options.balance -= num + taxes;
                this.options.historyLogs.push({
                    'operationType': 'Withdrawal of credit',
                    'credits': num + taxes,
                    'operationTime': new Date().toLocaleString('en-GB', {timeZone: 'UTC'})
                });
                card.putCredits(num);
                return this.options;
            } else {
                console.error(
                    `You can't take credits your transaction limit or remaining balance are lower than credits you want
                     to take`
                );
            }

        }
    }
    }
}
class UserAccount {
    constructor (name) {
        this.name = name,
        this.cards = [],
        this.mimLengthOfCardsArr = 0,
        this.cardNumber1 = 1,
        this.cardNumber2 = 2,
        this.maxLengthOfCardsArr = 3
    }
    addCard() {
        if(this.cards.length === this.mimLengthOfCardsArr) {
           return this.cards.push(userCard(this.cardNumber1));
        } else if (this.cards.length === this.cardNumber1) {
            return this.cards.push(userCard(this.cardNumber1));
        } else if (this.cards.length === this.cardNumber2) {
            return this.cards.push(userCard(this.maxLengthOfCardsArr));
        } else {
            return false;
        }
    }
    getCardByKey(num) {
           return this.cards[num - this.cardNumber1];
        }
}
// let user = new UserAccount('Bob');
// user.addCard();
// user.addCard();
//
// let card1 = user.getCardByKey(1);
// let card2 = user.getCardByKey(2);
// console.log(user);
// card1.putCredits(500);
// card1.setTransactionLimit(800);
// card1.transferCredits(300, card2);
//
// card2.takeCredits(50);
//
// console.log(card1.getCardOptions());
// console.log(card2.getCardOptions());
