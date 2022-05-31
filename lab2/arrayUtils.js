function mean(array) {
    if (!array) throw 'Input not supplied or undefined';
    if (!Array.isArray(array)) throw 'Input is not an array';
    if (array.length === 0) throw 'Array is empty';

    let sum = 0;
    for (const e of array) {
        if (typeof(e) != 'number') throw 'Array contains non-number element';
        sum += e;
    }
    return sum / array.length;
}

// console.log(mean([1, 2, 3]));
// console.log(mean([]));
// console.log(mean("banana"));
// console.log(mean(["guitar", 1, 3, "apple"]));
// console.log(mean());

function sortHelper(a, b) {
    return a - b;
}

function medianSquared(array) {
    if (!array) throw 'Input not supplied or undefined';
    if (!Array.isArray(array)) throw 'Input is not an array';
    if (array.length === 0) throw 'Array is empty';

    for (const e of array) {
        if (typeof(e) != 'number') throw 'Array contains non-number element';
    }
    array.sort(sortHelper);
    let median;
    if (array.length % 2 === 0) {
        median = (array[(array.length / 2) - 1] + array[array.length / 2]) / 2;
    } else {
        median = array[(array.length - 1) / 2]
    }
    return median * median;
}

// console.log(medianSquared([4, 1, 2])); // Returns: 4
// console.log(medianSquared([])); // throws an error
// console.log(medianSquared("banana")); // throws an error
// console.log(medianSquared(1,2,3)); // throws an error
// console.log(medianSquared(["guitar", 1, 3, "apple"])); // throws an error
// console.log(medianSquared()); // throws an error

function maxElement(array) {
    if (!array) throw 'Input not supplied or undefined';
    if (!Array.isArray(array)) throw 'Input is not an array';
    if (array.length === 0) throw 'Array is empty';

    let maxE = array[0];
    let maxI = 0;
    for (const [i, e] of array.entries()) {
        if (typeof(e) != 'number') throw 'Array contains non-number element';
        if (e > maxE) {
            maxE = e;
            maxI = i;
        }
    }
    return {[maxE]: maxI};
}

// console.log(maxElement([5, 6, 7])); // Returns: {'7': 2}
// console.log(maxElement(5, 6, 7)); // throws error
// console.log(maxElement([])); // throws error
// console.log(maxElement()); // throws error
// console.log(maxElement("test")); // throws error
// console.log(maxElement([1,2,"nope"])); // throws error

function fill(end, value) {
    if (!end) throw 'Input not supplied or undefined';  // THROWS WHEN end === 0
    if (typeof(end) != 'number') throw 'Input is not a number';
    if (end <= 0) throw 'Input must be a positive number greater than 0';

    let array = [];
    for (let i = 0; i < end; i++) {
        value ? array.push(value) : array.push(i);
    }
    return array;
}

// console.log(fill(6, "BACON")); // Returns: [0, 1, 2, 3, 4, 5]
// console.log(fill(3, 'Welcome')); // Returns: ['Welcome', 'Welcome', 'Welcome']
// console.log(fill()); // Throws error
// console.log(fill("test")); // Throws error
// console.log(fill(0)); // Throws Error
// console.log(fill(-4)); // Throws Error

function countRepeating(array) {
    if (!array) throw 'Input not supplied or undefined';
    if (!Array.isArray(array)) throw 'Input is not an array';

    let repeating = {}
    for (const [i, e] of array.entries()) {
        let count = 1;
        for (const [i2, e2] of array.entries()) {
            if (e == e2 && i !== i2) count++;
        }
        if (count > 1) repeating[e] = count;
    }
    return repeating;
}

// console.log(countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]));
/* Returns: 
{
  "7": 2,
  true: 3,
  "Hello": 2,
}
*/
// console.log(countRepeating("foobar")) //throws an error
// console.log(countRepeating()) //throws an error
// console.log(countRepeating([])) //returns {}
// console.log(countRepeating({a: 1, b: 2, c: "Patrick"})) //throws an error

function isEqual(arrayOne, arrayTwo) {
    if (!arrayOne || !arrayTwo) throw 'Input not supplied or undefined';
    if (!Array.isArray(arrayOne) || !Array.isArray(arrayTwo)) throw 'Input is not an array';

    if (arrayOne.length !== arrayTwo.length) return false;
    arrayOne.sort();
    arrayTwo.sort();
    for (const [i, e] of arrayOne.entries()) {
        if (Array.isArray(e) || Array.isArray(arrayTwo[i])) {
            if (Array.isArray(e) && Array.isArray(arrayTwo[i])) {
                if (!isEqual(e, arrayTwo[i])) return false;
            } else {
                return false;
            }
        } else if (e !== arrayTwo[i]) {
            return false;
        }
    }
    return true;
}

// console.log(isEqual([1, 2, 3], [3, 1, 2])); // Returns: true
// console.log(isEqual([ 'Z', 'R', 'B', 'C', 'A' ], ['R', 'B', 'C', 'A', 'Z'])); // Returns: true
// console.log(isEqual([1, 2, 3], [4, 5, 6])); // Returns: false
// console.log(isEqual([1, 3, 2], [1, 2, 3, 4])); // Returns: false
// console.log(isEqual([1, 2], [1, 2, 3])); // Returns: false
// console.log(isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 6 ], [ 9, 7, 8 ]])); // Returns: true
// console.log(isEqual([[ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ]], [[ 3, 1, 2 ], [ 5, 4, 11 ], [ 9, 7, 8 ]])); // Returns: false

module.exports = {
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
}