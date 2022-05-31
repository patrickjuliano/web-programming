let firstName = 'Patrick';
let lastName = 'Juliano';
let fullName = `${firstName} ${lastName}`;

// charAt()
// Returns the character at the specified index
console.log(firstName.charAt(2));

// charCodeAt()
// Returns the Unicode of the character at the specified index
console.log(firstName.charCodeAt(2));

// concat()
// Joins two or more strings, and returns a new joined strings
console.log(firstName.concat(lastName));

// endsWith()
// Checks whether a string ends with specified string/characters
console.log(firstName.endsWith('ick'));

// fromCharCode()
// Converts Unicode values to characters
console.log(String.fromCharCode(80, 97, 116));

// includes()
// Checks whether a string contains the specified string/characters
console.log(firstName.includes('tri'));

// indexOf()
// Returns the position of the first found occurrence of a specified value in a string
console.log(firstName.indexOf('t'));

// lastIndexOf()
// Returns the position of the last found occurrence of a specified value in a string
console.log(fullName.lastIndexOf('i'));

// localeCompare()
// Compares two strings in the current locale, and returns -1 if sorted before/1 if sorted after/0 if equal
console.log(firstName.localeCompare(lastName));

// match()
// Searches a string for a match against a regular expression, and returns the matches
console.log(fullName.match(/[A-Z]/g));

// repeat()
// Returns a new string with a specified number of copies of an existing string
console.log(firstName.repeat(3));

// replace()
// earches a string for a specified value, or a regular expression, and returns a new string where the specified values are replaced
console.log(firstName.replace('i', '!'));

// search()
// Searches a string for a specified value, or regular expression, and returns the position of the match
console.log(firstName.search('t'));

// slice()
// Extracts a part of a string and returns a new string
console.log(firstName.slice(2));

// split()
// Splits a string into an array of substrings
console.log(fullName.split(' '));

// startsWith()
// Checks whether a string begins with specified characters
console.log(firstName.startsWith('Pat'));

// substr()
// Extracts the characters from a string, beginning at a specified start position, and through the specified number of character
console.log(firstName.substr(2, 3));

// substring()
// Extracts the characters from a string, between two specified indices
console.log(firstName.substring(2, 5));

// toLocaleLowerCase()
// Converts a string to lowercase letters, according to the host's locale
console.log('İSTANBUL'.toLocaleLowerCase())

// toLocaleUpperCase()
// Converts a string to uppercase letters, according to the host's locale
console.log('istanbul'.toLocaleUpperCase('TR'))

// toLowerCase()
// Converts a string to lowercase letters
console.log(firstName.toLowerCase());

// toString()
// Returns the value of a String object
console.log(firstName.toString());

// toUpperCase()
// Converts a string to uppercase letters
console.log(firstName.toUpperCase());

// trim()
// Removes whitespace from both ends of a string
console.log(`   ${fullName}   `.trim());

// valueOf()
// Returns the primitive value of a String object
console.log(firstName.valueOf())