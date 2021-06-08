/*
Given the head of a Singly LinkedList, write a function to determine
if the LinkedList has a cycle in it or not.
*/
class Node {
  constructor(value, next=null){
    this.value = value;
    this.next = next;
  }
}

const has_cycle = function(head) {
  // TODO: Write your code here
  let fast = head,
      slow = head;
  while(fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next
    if (fast === slow) {
      console.log('Cycle length '+calculate_cycle_length(slow));
      return true
    }
  }
  return false
}

function calculate_cycle_length(slow) {
  let current = slow,
    cycle_length = 0;
  while (true) {
    current = current.next;
    cycle_length += 1;
    if (current === slow) {
      break;
    }
  }
  return cycle_length;
}

const find_cycle_start = function(head, cycle_length){
  let pointer1 = head,
    pointer2 = head;
  // move pointer2 ahead 'cycle_length' nodes
  while (cycle_length > 0) {
    pointer2 = pointer2.next;
    cycle_length -= 1;
  }
  // increment both pointers until they meet at the start of the cycle
  while (pointer1 !== pointer2) {
    pointer1 = pointer1.next;
    pointer2 = pointer2.next;
  }

  return pointer1;
};

head = new Node(1)
head.next = new Node(2)
head.next.next = new Node(3)
head.next.next.next = new Node(4)
head.next.next.next.next = new Node(5)
head.next.next.next.next.next = new Node(6)
console.log(`LinkedList has cycle: ${has_cycle(head)}`)

head.next.next.next.next.next.next = head.next.next
console.log(`LinkedList has cycle: ${has_cycle(head)}`)

head.next.next.next.next.next.next = head.next.next.next
console.log(`LinkedList has cycle: ${has_cycle(head)}`)

/*

Any number will be called a happy number if, after repeatedly replacing it with a number equal to the sum of the square of all of its digits, leads us to number ‘1’. All other (not-happy) numbers will never reach ‘1’. Instead, they will be stuck in a cycle of numbers which does not include ‘1’.

Example 1:

Input: 23
Output: true (23 is a happy number)
Explanations: Here are the steps to find out that 23 is a happy number:
2^2 + 3 ^22
​2
​​ +3
​2
​​  = 4 + 9 = 13
1^2 + 3^21
​2
​​ +3
​2
​​  = 1 + 9 = 10
1^2 + 0^21
​2
​​ +0
​2
​​  = 1 + 0 = 1
Example 2:

Input: 12
Output: false (12 is not a happy number)
Explanations: Here are the steps to find out that 12 is not a happy number:
1^2 + 2 ^21
​2
​​ +2
​2
​​  = 1 + 4 = 5
5^25
​2
​​  = 25
2^2 + 5^22
​2
​​ +5
​2
​​  = 4 + 25 = 29
2^2 + 9^22
​2
​​ +9
​2
​​  = 4 + 81 = 85
8^2 + 5^28
​2
​​ +5
​2
​​  = 64 + 25 = 89
8^2 + 9^28
​2
​​ +9
​2
​​  = 64 + 81 = 145
1^2 + 4^2 + 5^21
​2
​​ +4
​2
​​ +5
​2
​​  = 1 + 16 + 25 = 42
4^2 + 2^24
​2
​​ +2
​2
​​  = 16 + 4 = 20
2^2 + 0^22
​2
​​ +0
​2
​​  = 4 + 0 = 4
4^24
​2
​​  = 16
1^2 + 6^21
​2
​​ +6
​2
​​  = 1 + 36 = 37
3^2 + 7^23
​2
​​ +7
​2
​​  = 9 + 49 = 58
5^2 + 8^25
​2
​​ +8
​2
​​  = 25 + 64 = 89
Step ‘13’ leads us back to step ‘5’ as the number becomes equal to ‘89’, this means that we can never reach ‘1’, therefore, ‘12’ is not a happy number.
*/

const find_square_sum = function () {
  let sum = 0;
  while(num > 0) {
    let digit = num % 10;
    sum += digit * digit;
    num = Math.floor(num/10);
  }
  return sum;
}
const find_happy_number = function(num) {
  let slow = num,
      fast = num;
  while(true) {
    slow = find_square_sum(slow);
    fast = find_square_sum(find_square_sum(fast));
    if (slow === fast) {
      break;
    }

    return slow === 1;
  }
};

/*
Given the head of a Singly LinkedList, write a method to return the middle node of the LinkedList.

If the total number of nodes in the LinkedList is even, return the second middle node.

Example 1:

Input: 1 -> 2 -> 3 -> 4 -> 5 -> null
Output: 3
Example 2:

Input: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null
Output: 4
Example 3:

Input: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> null
Output: 4
*/

function find_middle_of_linked_list(head) {
  let slow = head,
      fast = head;
  while ((fast !== null && fast.next !== null)) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}
