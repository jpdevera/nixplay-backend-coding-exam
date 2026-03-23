'use strict';

/**
 * Finds the kth largest element in an unsorted array of integers
 * 
 * @param {number[]} nums - The unsorted array of integers
 * @param {number} k - The position of the desired largest element
 * 
 * @return {number} - The kth largest element in the array
 */
var findKthLargest = function(nums, k) {
    if (!Array.isArray(nums) || nums.length === 0) {
        console.error('Invalid input: nums should be a non-empty array');
        return null;
    }

    if (typeof k !== 'number' || k <= 0 || k > nums.length) {
        console.error('Invalid input: k should be a positive integer less than or equal to the length of nums');
        return null;
    }

    const arr = nums.slice();
    const targetIndex = k - 1;

    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const pivotIndex = partition(arr, left, right);

        if (pivotIndex === targetIndex) {
            return arr[pivotIndex];
        } else if (pivotIndex < targetIndex) {
            left = pivotIndex + 1;
        } else {
            right = pivotIndex - 1;
        }
    }

    return null;
};

/**
 * Swaps two elements in an array by their indices
 *
 * @param {number[]} arr - The array in which to swap elements
 * @param {number} i - The index of first element to swap
 * @param {number} j - The index of second element to swap
 */
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

/**
 * Partitions the array around a pivot element and returns the final index of the pivot
 *
 * @param {number[]} nums - The array to partition
 * @param {number} left - The starting index of the partition
 * @param {number} right - The ending index of the partition
 * 
 * @return {number} The final index of the pivot element after partitioning
 */
function partition(nums, left, right) {
  const mid = Math.floor((left + right) / 2);

  if (nums[left] < nums[mid]) {
    swap(nums, left, mid);
  }

  if (nums[left] < nums[right]) {
    swap(nums, left, right);
  }

  if (nums[mid] < nums[right]) {
    swap(nums, mid, right);
  }

  swap(nums, mid, right);

  const pivot = nums[right];
  let index = left;

  for (let j = left; j < right; j++) {
    // Descending order so that the index 0 = largest element
    if (nums[j] > pivot) {
      swap(nums, index, j);
      index++;
    }
  }

  swap(nums, index, right);
  return index;
}

module.exports = { findKthLargest };
