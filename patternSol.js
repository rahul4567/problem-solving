/* In many problems dealing with an array (or a LinkedList), we are asked to find or calculate something among all the contiguous subarrays (or sublists) of a given size. For example, take a look at this problem:

Given an array, find the average of all contiguous subarrays of size ‘K’ in it.

Array: [1, 3, 2, 6, -1, 4, 1, 8, 2], K=5
Output: [2.2, 2.8, 2.4, 3.6, 2.8]
9-7 +1 = 3
*/

/* brute-force algorithm */
/* Time Complexity  O(N*K)O(N∗K) where ‘N’ is the number of elements in the input array.*/
function find_averages_of_subarrays(K, arr) {
  const result = [];
  for (let i=0; i < arr.length - K + 1; i++) {
    var sum = 0.0;
    for (let j=i; j < i + K; j++) {
      sum += arr[j];
    }
    result.push(sum/K);
  }
}
const result = find_averages_of_subarrays(5, [1, 3, 2, 6, -1, 4, 1, 8, 2]);
console.log(`Averages of subarrays of size K: ${result}`);
/* Slidding window */
function find_averages_of_subarrays_slidding(K, arr) {
  const result = [];
  let startWindow = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (i >= K-1) {
      result.push(sum/K);
      sum = sum - arr[startWindow];
      startWindow++;
    }
  }
}
const result = find_averages_of_subarrays_slidding(5, [1, 3, 2, 6, -1, 4, 1, 8, 2]);
console.log(`Averages of subarrays of size K: ${result}`);

/* Question 2
Given an array of positive numbers and a positive number ‘k,’ find the maximum sum of any contiguous subarray of size ‘k’.
*/
const max_sub_array_of_size_k = function(k, arr) {
    let maxSum = 0,
        windowSum = 0;
        startWindow = 0;
    for(let i=0; i < arr.length; i++) {
      windowSum += arr[i];
      if(i >= k-1) {
        if (maxSum < windowSum) {
          maxSum = windowSum;
        }
        windowSum = windowSum - arr[startWindow];
        startWindow++;
      }
    }
    return maxSum;
};
console.log(`Maximum sum of a subarray of size K: ${max_sub_array_of_size_k(3, [2, 1, 5, 1, 3, 2])}`);
console.log(`Maximum sum of a subarray of size K: ${max_sub_array_of_size_k(2, [2, 3, 4, 1, 5])}`);

/*
Given an array of positive numbers and a positive number ‘S,’ find the length of the smallest contiguous subarray
whose sum is greater than or equal to ‘S’. Return 0 if no such subarray exists.
*/
const smallest_subarray_with_given_sum = function(s, arr) {
  let windowSum = 0,
      minLength = Infinity,
      windowStart = 0;
  for(let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd];
    while(windowSum >= s) {
      minLength = Math.min(minLength, windowEnd - windowStart + 1);
      windowSum = windowSum - arr[startWindow];
      windowStart = windowStart + 1;
    }
  }
  if (minLength === Infinity) {
    return 0;
  }
};
console.log(`Smallest subarray length: ${smallest_subarray_with_given_sum(7, [2, 1, 5, 2, 3, 2])}`);
console.log(`Smallest subarray length: ${smallest_subarray_with_given_sum(7, [2, 1, 5, 2, 8])}`);
console.log(`Smallest subarray length: ${smallest_subarray_with_given_sum(8, [3, 4, 1, 1, 6])}`);


/*
Given a string, find the length of the longest substring in it with no more than K distinct characters.

You can assume that K is less than or equal to the length of the given string.

Example 1:

Input: String="araaci", K=2
Output: 4
Explanation: The longest substring with no more than '2' distinct characters is "araa".
Example 2:

Input: String="araaci", K=1
Output: 2
Explanation: The longest substring with no more than '1' distinct characters is "aa".
Example 3:

Input: String="cbbebi", K=3
Output: 5
Explanation: The longest substrings with no more than '3' distinct characters are "cbbeb" & "bbebi".*/

const longest_substring_with_k_distinct = function(str, k) {
  // TODO: Write your code here
  let maxLength = 0,
      windowStart = 0,
      frequencyChar = {};
  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const rightChar = str[windowEnd];
    if (!frequencyChar[rightChar]) {
      frequencyChar[rightChar] = 0;
    }
    frequencyChar[rightChar] += 1;
    while(Object.keys(frequencyChar).length > k) {
      const leftChar = str[windowStart];
      frequencyChar[leftChar] -= 1;
      if (frequencyChar[leftChar] === 0) {
        delete frequencyChar[leftChar];
      }
      windowStart += 1;
    }
    // remember the maximum length so far
    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }
  return maxLength;
};

/*
Problem Statement #
Given an array of characters where each character represents a fruit tree, you are given two baskets, and your goal is to put maximum number of fruits in each basket. The only restriction is that each basket can have only one type of fruit.

You can start with any tree, but you can’t skip a tree once you have started. You will pick one fruit from each tree until you cannot, i.e., you will stop when you have to pick from a third fruit type.

Write a function to return the maximum number of fruits in both baskets.

Example 1:

Input: Fruit=['A', 'B', 'C', 'A', 'C']
Output: 3
Explanation: We can put 2 'C' in one basket and one 'A' in the other from the subarray ['C', 'A', 'C']
Example 2:

Input: Fruit=['A', 'B', 'C', 'B', 'B', 'C']
Output: 5
Explanation: We can put 3 'B' in one basket and two 'C' in the other basket.
This can be done if we start with the second letter: ['B', 'C', 'B', 'B', 'C']
*/

const fruits_into_baskets = function(fruits) {
  // TODO: Write your code here
  let windowStart = 0,
      fruitsTypeFrequency = {},
      maxLength = 0,
      k = 2;

  for(let windowEnd = 0; windowEnd < fruits.length; windowEnd++) {
    let rightFruit = fruits[windowEnd];
    if (!fruitsTypeFrequency[rightFruit]) {
      fruitsTypeFrequency[rightFruit] = 0;
    }
    fruitsTypeFrequency[rightFruit] += 1;
    while (Object.keys(fruitsTypeFrequency).length > 2) {
      const leftFruit = fruitsTypeFrequency[windowStart];
      fruitsTypeFrequency[leftFruit] -= 1;
      windowStart += 1;
    }
    maxLength = Math.max(maxLength, windowEnd - windowStart +1);
  }
  return maxLength;
};


/* find all anagaram */
let angagrams = [];
let generateAnagram = (word, anagram = '') => {

}
