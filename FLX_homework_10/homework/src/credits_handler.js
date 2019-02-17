const magicNumbers = {
    'maxLengthOfCardsArr': 3,
    'one': 1,
    'two': 2,
    'minLengthOfCardsArr': 0,
    'fifty': 50,
    'threeHundred': 300,
    'fiveHundred': 500,
    'eightHundred': 800
};
function userCard(index) {
    if (index <= magicNumbers.maxLengthOfCardsArr && index > magicNumbers.minLengthOfCardsArr) {
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
        this.cards = []
    }
    addCard() {
        if(this.cards.length === magicNumbers.minLengthOfCardsArr) {
           return this.cards.push(userCard(magicNumbers.one));
        } else if (this.cards.length === magicNumbers.one) {
            return this.cards.push(userCard(magicNumbers.two));
        } else if (this.cards.length === magicNumbers.two) {
            return this.cards.push(userCard(magicNumbers.maxLengthOfCardsArr));
        } else {
            return false;
        }
    }
    getCardByKey(num) {
           return this.cards[num - magicNumbers.one];
        }
}
let user = new UserAccount('Bob');
user.addCard();
user.addCard();

let card1 = user.getCardByKey(magicNumbers.one);
let card2 = user.getCardByKey(magicNumbers.two);

card1.putCredits(magicNumbers.fiveHundred);
card1.setTransactionLimit(magicNumbers.eightHundred);
card1.transferCredits(magicNumbers.threeHundred, card2);

card2.takeCredits(magicNumbers.fifty);

console.log(card1.getCardOptions());
console.log(card2.getCardOptions());