/*
Given an array of sorted numbers and a target sum, find a pair in the array whose sum is equal to the given target.

Write a function to return the indices of the two numbers (i.e. the pair) such that they add up to the given target.

Example 1:

Input: [1, 2, 3, 4, 6], target=6
Output: [1, 3]
Explanation: The numbers at index 1 and 3 add up to 6: 2+4=6
Example 2:

Input: [2, 5, 9, 11], target=11
Output: [0, 2]
Explanation: The numbers at index 0 and 2 add up to 11: 2+9=11
*/
const pair_with_targetsum = function(arr, target_sum) {
  // TODO: Write your code here
  let left = 0,
      right = arr.length - 1;
  while(left < right) {
    let sum = arr[left] + arr[right];
    if (sum === target_sum) {
      return [left, right];
    }

    if (sum > target_sum) {
      right -= 1;
    } else if (sum < target_sum) {
      left += 1;
    }
  }
  return [-1, -1];
}

/* hashMap solution */

function pair_with_target_sum_hashMap(arr, targetSum) {
  const nums = {}; // to store numbers and their indices
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    if (targetSum - num in nums) {
      return [nums[targetSum - num], i];
    }
    nums[arr[i]] = i;
  }
  return [-1, -1];
}

/*
Problem Statement #
Given an array of sorted numbers, remove all duplicates from it. You should not use any extra space; after removing the duplicates in-place return the length of the subarray that has no duplicate in it.

Example 1:

Input: [2, 3, 3, 3, 6, 9, 9]
Output: 4
Explanation: The first four elements after removing the duplicates will be [2, 3, 6, 9].
Example 2:

Input: [2, 2, 2, 11]
Output: 2
Explanation: The first two elements after removing the duplicates will be [2, 11].
*/

const remove_duplicates = function(arr) {
  let nextNonDuplicate = 1,
      i = 1;
    while(i < arr.length) {
      if (arr[nextNonDuplicate-1] !== arr[i]) {
        arr[nextNonDuplicate] = arr[i];
        nextNonDuplicate = i;
      }
      i += 1;
    }
    return nextNonDuplicate;
};

/*
Given a sorted array, create a new array containing squares of all the numbers of the input array in the sorted order.

Example 1:

Input: [-2, -1, 0, 2, 3]
Output: [0, 1, 4, 4, 9]
Example 2:

Input: [-3, -1, 0, 1, 2]
Output: [0, 1, 1, 4, 9]
*/
const make_squares = function(arr) {
  const n = arr.length;
  let squares = Array(n).fill(0);
  let heighestIndex = n - 1;
  let left = 0;
  let right = n - 1;
  while(left <= right) {
    let leftSquare = arr[left] * arr[left],
        rightSquare = arr[right] * arr[right];
    if (leftSquare > rightSquare) {
      squares[heighestIndex] = leftSquare;
      left += 1;
    } else if(rightSquare > leftSquare) {
      squares[heighestIndex] = rightSquare;
      right -= 1;
    }
    heighestIndex -= 1;
  }

  return squares;
};

/*
Given an array of unsorted numbers, find all unique triplets in it that add up to zero.

Example 1:

Input: [-3, 0, 1, 2, -1, 1, -2]
Output: [-3, 1, 2], [-2, 0, 2], [-2, 1, 1], [-1, 0, 1]
Explanation: There are four unique triplets whose sum is equal to zero.
Example 2:

Input: [-5, 2, -1, -2, 3]
Output: [[-5, 2, 3], [-2, -1, 3]]
Explanation: There are two unique triplets whose sum is equal to zero.

*/
const searchPair = function (arr, triplets, target_sum, left) {
  let right = arr.length;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target_sum) { // found the triplet
      triplets.push([-target_sum, arr[left], arr[right]]);
      left += 1;
      right -= 1;
      while (left < right && arr[left] === arr[left - 1]) {
        left += 1; // skip same element to avoid duplicate triplets
      }
      while (left < right && arr[right] === arr[right + 1]) {
        right -= 1; // skip same element to avoid duplicate triplets
      }
    } else if (target_sum > sum) {
      left += 1; // we need a pair with a bigger sum
    } else {
      right -= 1; // we need a pair with a smaller sum
    }
  }
};

const search_triplets = function(arr) {
  const triplets = [];
  arr.sort((a, b) => {
    return a - b;
  })
  for (let i = 0; i < arr.length; i++) {
    if (i > 0 && arr[i] ==== arr[i+1]) {
      continue;
    }
    searchPair(arr, triplets, -arr[i], i+1);
  }
  return triplets;
};

/*
Problem Statement #
Given an array of unsorted numbers and a target number, find a triplet in the array whose sum is as close to the target number as possible, return the sum of the triplet. If there are more than one such triplet, return the sum of the triplet with the smallest sum.

Example 1:

Input: [-2, 0, 1, 2], target=2
Output: 1
Explanation: The triplet [-2, 1, 2] has the closest sum to the target.
Example 2:

Input: [-3, -1, 1, 2], target=1
Output: 0
Explanation: The triplet [-3, 1, 2] has the closest sum to the target.
Example 3:

Input: [1, 0, 1, 1], target=100
Output: 3
Explanation: The triplet [1, 1, 1] has the closest sum to the target.
*/
