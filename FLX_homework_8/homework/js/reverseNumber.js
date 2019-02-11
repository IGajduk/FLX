function reverseNumber(number) {
        let reversedNum = 0;
        let eachNum;
        while (number) {
            eachNum = number % 10;
            number = (number / 10) - ((number / 10) % 1);
            reversedNum *= 10;
            reversedNum += eachNum;
        }
        return reversedNum;
}
reverseNumber(123);
reverseNumber(-456);
reverseNumber(10000);