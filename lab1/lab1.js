// I pledge my honor that I have abided by the Stevens Honor System.

const questionOne = function questionOne(arr) {
    // Implement question 1 here
    let sum = 0;
    arr.forEach(element => sum += (element * element));
    return sum;
}

const questionTwo = function questionTwo(num) { 
    // Implement question 2 here
    if (num < 1) {
        return 0;
    } else if (num == 1) {
        return 1;
    } else {
        return questionTwo(num - 1) + questionTwo(num - 2);
    }
}

const questionThree = function questionThree(text) {
    // Implement question 3 here
    let vowels = 0;
    for (const c of text.toLowerCase()) {
        if (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u') vowels++;
    }
    return vowels;
}

const questionFour = function questionFour(num) {
    // Implement question 4 here
    if (num < 0) {
        return NaN;
    } else if (num == 0) {
        return 1;
    } else {
        return num * questionFour(num - 1);
    }
}

module.exports = {
    firstName: "Patrick", 
    lastName: "Juliano", 
    studentId: "10451206",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};