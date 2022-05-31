// NOTE: Every time an empty string '' is passed in as an argument, it throws 'Input not supplied or undefined'
//       rather than 'String must be of length greater than 0' due to the ordering. Figure out if this is a problem!

function camelCase(string) {
    if (!string) throw 'Input not supplied or undefined';
    if (typeof string != "string") throw 'Input is not a string';
    string = string.trim();
    if (string.length == 0) throw 'String must be of length greater than 0';

    let newString = '';
    const words = string.split(' ');
    for (const e of words) {
        if (e) {
            let newWord = e.toLowerCase();
            if (newString) newWord = newWord[0].toUpperCase().concat(newWord.slice(1));
            newString = newString.concat(newWord);
        }
    }
    return newString;
}

// console.log(camelCase('my function rocks')); // Returns: "myFunctionRocks"
// console.log(camelCase('FOO BAR')); // Returns: "fooBar"
// console.log(camelCase("How now brown cow")); // Returns: "howNowBrownCow"
// console.log(camelCase()); // Throws Error
// console.log(camelCase('')); // Throws Error
// console.log(camelCase(123)); // Throws Error
// console.log(camelCase(["Hello", "World"])); // Throws Error

function replaceChar(string) {
    if (!string) throw 'Input not supplied or undefined';
    if (typeof string != "string") throw 'Input is not a string';
    string = string.trim();
    if (string.length == 0) throw 'String must be of length greater than 0';

    let newString = string[0];
    let newChar = '*';
    for (let i = 1; i < string.length; i++) {
        if (string[i].toLowerCase() === string[0].toLowerCase()) {
            newString = newString.concat(newChar);
            newChar === '*' ? newChar = '$' : newChar = '*';
        } else {
            newString = newString.concat(string[i]);
        }
    }
    return newString;
}

// console.log(replaceChar("Daddy")); // Returns: "Da*$y"
// console.log(replaceChar("Mommy")); // Returns: "Mo*$y" 
// console.log(replaceChar("Hello, How are you? I hope you are well")); // Returns: "Hello, *ow are you? I $ope you are well"
// console.log(replaceChar("babbbbble")); // Returns: "ba*$*$*le"
// console.log(replaceChar("")); // Throws Error
// console.log(replaceChar(123)); // Throws Error

function mashUp(string1, string2) {
    if (!string1 || !string2) throw 'Input not supplied or undefined';
    if (typeof string1 != "string" || typeof string2 != "string") throw 'Input is not a string';
    string1 = string1.trim();
    string2 = string2.trim();
    if (string1.length < 2 || string2.length < 2) throw 'String must be of length at least 2';

    const temp = string1.substring(0, 2);
    string1 = string2.substring(0, 2).concat(string1.slice(2));
    string2 = temp.concat(string2.slice(2));
    return `${string1} ${string2}`;
}

// console.log(mashUp("Patrick", "Hill")); //Returns "Hitrick Pall"
// console.log(mashUp("hello", "world")); //Returns "wollo herld"
// console.log(mashUp("Patrick", "")); //Throws error
// console.log(mashUp()); // Throws Error
// console.log(mashUp("John")) // Throws error
// console.log(mashUp ("h", "Hello")) // Throws Error
// console.log(mashUp ("h","e")) // Throws Error

module.exports = {
    camelCase,
    replaceChar,
    mashUp
}