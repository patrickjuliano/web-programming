function makeArrays(objects) {
    if (!objects) throw 'Input not supplied or undefined';
    if (!Array.isArray(objects)) throw 'Input is not an array';
    if (objects.length === 0) throw 'Array is empty';
    for (const o of objects) {
        if ((typeof o !== 'object') || (Array.isArray(o))) throw 'Element in array is not an object';
        if (o.length === 0) throw 'Objects cannot be empty';
    }
    if (objects.length < 2) throw 'Array must contain at least 2 objects';

    let array = [];
    for (const o of objects) {
        for (const k in o) {
            array.push([k, o[k]]);
        }
    }
    return array;
}

// const first = { x: 2, y: 3};
// const second = { a: 70, x: 4, z: 5 };
// const third = { x: 0, y: 9, q: 10 };
// const firstSecondThird = makeArrays([first, second, third]);
// console.log(firstSecondThird)
// [ ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5], ['x',0], ['y',9], ['q',10] ]
// const secondThird = makeArrays([second, third]);
// console.log(secondThird)
// [ ['a',70], ['x', 4], ['z', 5], ['x',0], ['y',9], ['q',10] ]
// const thirdFirstSecond = makeArrays([third, first, second]);
// console.log(thirdFirstSecond)
// [  ['x',0], ['y',9], ['q',10], ['x',2],['y',3], ['a',70], ['x', 4], ['z', 5] ]

function isEqual(arrayOne, arrayTwo) {
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

function isDeepEqual(obj1, obj2) {
    if (!obj1) throw 'Input not supplied or undefined for obj1';
    if (!obj2) throw 'Input not supplied or undefined for obj2';
    if ((typeof obj1 !== 'object') || (Array.isArray(obj1))) throw 'obj1 is not an object';
    if ((typeof obj2 !== 'object') || (Array.isArray(obj2))) throw 'obj2 is not an object';

    if (Object.keys(obj1).length === Object.keys(obj2).length) {
        for (const k in obj1) {
            if (obj2[k]) {
                if (Array.isArray(obj1[k]) || Array.isArray(obj2[k])) {
                    if (Array.isArray(obj1[k]) && Array.isArray(obj2[k])) {
                        if (!isEqual(obj1[k], obj2[k])) return false;
                    } else {
                        return false;
                    }
                } else if ((typeof obj1[k] === 'object') || (typeof obj2[k] === 'object')) {
                    if ((typeof obj1[k] === 'object') && (typeof obj2[k] === 'object')) {
                        if (!isDeepEqual(obj1[k], obj2[k])) return false;
                    } else {
                        return false;
                    }
                } else if (obj1[k] !== obj2[k]) {
                    return false;
                }
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
    return true;
}

// const first = {a: 2, b: 3};
// const second = {a: 2, b: 4};
// const third = {a: 2, b: 3};
// const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
// const fifth = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
// ///// const sixth = {a: [1, 2, 3], z: [4, 5, 6, 7]}
// ///// const seventh = {z: [5, 7, 4, 6], a: [3, 1, 2]}
// console.log(isDeepEqual(first, second)); // false
// console.log(isDeepEqual(forth, fifth)); // true
// console.log(isDeepEqual(forth, third)); // false
// console.log(isDeepEqual({}, {})); // true
// ///// console.log(isDeepEqual(sixth, seventh)); // true
// console.log(isDeepEqual([1,2,3], [1,2,3])); // throws error 
// console.log(isDeepEqual("foo", "bar")); // throws error

function computeObject(object, func) {
    if (!object) throw 'Input not supplied or undefined for object';
    if ((typeof object !== 'object') || Array.isArray(object)) throw 'Input is not an object';
    if (!func) throw 'Input not supplied or undefined for func';
    if (typeof func !== 'function') throw 'Input is not a function';
    for (const [k, v] of Object.entries(object)) {
        if (typeof v !== 'number') throw 'Object values must be numbers';
    }

    for (const [k, v] of Object.entries(object)) {
        object[k] = func(v);
    }
    return object;
}

console.log(computeObject({ a: 3, b: 7, c: 5 }, n => n * 2));
/* Returns:
{
  a: 6,
  b: 14,
  c: 10
}
*/

module.exports = {
    makeArrays,
    isDeepEqual,
    computeObject
}