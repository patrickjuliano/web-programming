const arrayUtils = require('./arrayUtils');
const stringUtils = require('./stringUtils');
const objUtils = require('./objUtils');

// mean
try {
    // Should pass
    const result = arrayUtils.mean([5, 10, 15]);
    console.log('mean passed successfully')
} catch (e) {
    console.error('mean failed test case')
}
try {
    // Should fail
    const result = arrayUtils.mean(5);
    console.error('mean did not error')
} catch (e) {
    console.log('mean failed successfully')
}

// medianSquared
try {
    // Should pass
    const result = arrayUtils.medianSquared([5, 10, 15]);
    console.log('medianSquared passed successfully')
} catch (e) {
    console.error('medianSquared failed test case')
}
try {
    // Should fail
    const result = arrayUtils.mean(10);
    console.error('medianSquared did not error')
} catch (e) {
    console.log('medianSquared failed successfully')
}

// maxElement
try {
    // Should pass
    const result = arrayUtils.maxElement([5, 10, 15]);
    console.log('maxElement passed successfully')
} catch (e) {
    console.error('maxElement failed test case')
}
try {
    // Should fail
    const result = arrayUtils.maxElement(15);
    console.error('maxElement did not error')
} catch (e) {
    console.log('maxElement failed successfully')
}

// fill
try {
    // Should pass
    const result = arrayUtils.fill(10);
    console.log('fill passed successfully')
} catch (e) {
    console.error('fill failed test case')
}
try {
    // Should fail
    const result = arrayUtils.fill(-10);
    console.error('fill did not error')
} catch (e) {
    console.log('fill failed successfully')
}

// countRepeating
try {
    // Should pass
    const result = arrayUtils.countRepeating(['red', 'blue', 'red', 'green', 'blue', 'red']);
    console.log('countRepeating passed successfully')
} catch (e) {
    console.error('countRepeating failed test case')
}
try {
    // Should fail
    const result = arrayUtils.countRepeating(1, 2, 3);
    console.error('countRepeating did not error')
} catch (e) {
    console.log('countRepeating failed successfully')
}

// isEqual
try {
    // Should pass
    const result = arrayUtils.isEqual([1, 2, 3, 4, 5], [3, 5, 1, 2, 4]);
    console.log('isEqual passed successfully')
} catch (e) {
    console.error('isEqual failed test case')
}
try {
    // Should fail
    const result = arrayUtils.isEqual([1, 2, 3, 4, 5]);
    console.error('isEqual did not error')
} catch (e) {
    console.log('isEqual failed successfully')
}

// camelCase
try {
    // Should pass
    const result = stringUtils.camelCase('patrick juliano');
    console.log('camelCase passed successfully')
} catch (e) {
    console.error('camelCase failed test case')
}
try {
    // Should fail
    const result = stringUtils.camelCase(100);
    console.error('camelCase did not error')
} catch (e) {
    console.log('camelCase failed successfully')
}

// replaceChar
try {
    // Should pass
    const result = stringUtils.replaceChar('abcabcabc');
    console.log('replaceChar passed successfully')
} catch (e) {
    console.error('replaceChar failed test case')
}
try {
    // Should fail
    const result = stringUtils.camelCase('');
    console.error('replaceChar did not error')
} catch (e) {
    console.log('replaceChar failed successfully')
}

// mashUp
try {
    // Should pass
    const result = stringUtils.mashUp('computer', 'science');
    console.log('mashUp passed successfully')
} catch (e) {
    console.error('mashUp failed test case')
}
try {
    // Should fail
    const result = stringUtils.mashUp(1, 2);
    console.error('mashUp did not error')
} catch (e) {
    console.log('mashUp failed successfully')
}

// makeArrays
try {
    // Should pass
    const result = objUtils.makeArrays([{a: 1, b: 2, c: 3}, {d: 4, e: 5, f: 6}]);
    console.log('makeArrays passed successfully')
} catch (e) {
    console.error('makeArrays failed test case')
}
try {
    // Should fail
    const result = objUtils.makeArrays(['a', 'b', 'c']);
    console.error('makeArrays did not error')
} catch (e) {
    console.log('makeArrays failed successfully')
}

// isDeepEqual
try {
    // Should pass
    const result = objUtils.isDeepEqual({a: 1, b: 2, c: 3}, {b: 2, c: 3, a: 1});
    console.log('isDeepEqual passed successfully')
} catch (e) {
    console.error('isDeepEqual failed test case')
}
try {
    // Should fail
    const result = objUtils.isDeepEqual('a', 'b');
    console.error('isDeepEqual did not error')
} catch (e) {
    console.log('isDeepEqual failed successfully')
}

// computeObject
try {
    // Should pass
    const result = objUtils.computeObject({a: 1, b: 2, c: 3}, n => n + 1);
    console.log('computeObject passed successfully')
} catch (e) {
    console.error('computeObject failed test case')
}
try {
    // Should fail
    const result = objUtils.computeObject({a: 1, b: 2, c: 3});
    console.error('computeObject did not error')
} catch (e) {
    console.log('computeObject failed successfully')
}