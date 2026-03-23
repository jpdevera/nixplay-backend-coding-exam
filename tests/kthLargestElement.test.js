'use strict';

const assert = require('assert');
const { findKthLargest } = require('../src/kthLargestElement');

console.log('Running kthLargestElement tests... \n');

// Test 1: Example from the given coding file
assert.strictEqual(
    findKthLargest([3, 2, 1, 5, 6, 4], 2), 5, 
    'Should return 5 as the 2nd largest element in the array'
);
console.log('Test 1 Passed: findKthLargest([3,2,1,5,6,4], 2) === 5');

// Test 2: Array with duplicates
assert.strictEqual(
  findKthLargest([3,2,3,1,2,4,5,5,6], 4),
  4,
  'Should return 4 as the 4th largest element in the array'
);
console.log('Test 2 passed: duplicates [3,2,3,1,2,4,5,5,6], k=4 returns 4');

// Test 3: k=1 should return the largest element
assert.strictEqual(
  findKthLargest([7, 10, 4, 3, 20, 15], 1),
  20,
  'k=1 should return the maximum element'
);
console.log('Test 3 passed: k=1 returns the largest element 20');

// Test 4: k=n should return the smallest element
assert.strictEqual(
  findKthLargest([7, 10, 4, 3, 20, 15], 6),
  3,
  'k=n should return the minimum element'
);
console.log('Test 4 passed: k=n returns the smallest element 3');

// Test 5: Single element array
assert.strictEqual(
  findKthLargest([42], 1),
  42,
  'Single element array should return that element'
);
console.log('Test 5 passed: single element [42]');

// Test 6: Empty array should return null
assert.strictEqual(
  findKthLargest([], 1),
  null,
  'Empty array should return null'
);
console.log('Test 6 passed: empty array return null');

// Test 7: Invalid k (k=0)
assert.strictEqual(
  findKthLargest([1, 2, 3], 0),
  null,
  'k=0 should return null'
);
console.log('Test 7 passed: k=0 return null');

// Test 8: Invalid k (k greater than array length)
assert.strictEqual(
  findKthLargest([1, 2, 3], 5),
  null,
  'k > array length should return null'
);
console.log('Test 8 passed: k > length return null');


// Test 9: Array with negative numbers
assert.strictEqual(
  findKthLargest([-1, -5, -3, -2, -4], 2),
  -2,
  'Should handle negative numbers correctly'
);
console.log('Test 9 passed: negative numbers, k=2 return -2');

// Test 10: All elements are the same
assert.strictEqual(
  findKthLargest([5, 5, 5, 5], 3),
  5,
  'All same elements, any k should return that element'
);
console.log('Test 10 passed: all same elements k=3 returns 5');


// Test 11: Non-array input
assert.strictEqual(
  findKthLargest('not an array', 1),
  null,
  'Non-array input should return null'
);
console.log('Test 11 passed: non-array input returns null');

// Test 12: Non-integer k
assert.strictEqual(
  findKthLargest([1, 2, 3], 1.5),
  null,
  'Non-integer k should return null'
);
console.log('Test 12 passed: non-integer k returns null');

console.log('\n Done Executing Tests for kthLargestElement!');
