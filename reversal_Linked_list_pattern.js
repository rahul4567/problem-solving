/*
Given the head of a Singly LinkedList, reverse the LinkedList. Write a function to return the new head of the reversed LinkedList.
*/
class Node {
  constructor(value, next=null){
    this.value = value;
    this.next = next;
  }

  get_list() {
    result = "";
    temp = this;
    while (temp !== null) {
      result += temp.value + " ";
      temp = temp.next;
    }
    return result;
  }
};


const reverse = function(head) {
  let current = head,
      previous = null;

  while(current !== null) {
    let next = current.next;
    current.next = previous;
    previous = current;
    current = next;
  }
  return previous;
};

head = new Node(2);
head.next = new Node(4);
head.next.next = new Node(6);
head.next.next.next = new Node(8);
head.next.next.next.next = new Node(10);

console.log(`Nodes of original LinkedList are: ${head.get_list()}`)
console.log(`Nodes of reversed LinkedList are: ${reverse(head).get_list()}`)

/*
Given the head of a LinkedList and two positions ‘p’ and ‘q’, reverse the LinkedList from position ‘p’ to ‘q’.
*/
const reverse_sub_list = function(head, p, q) {
  // TODO: Write your code here
  if (p == q) {
    return head;
  }
  //current to point p
  let current = head,
      previous = null,
      i = 0;
  while(current != null && i < p-1) {
    previous = current;
    current = current.next;
    i++;
  }
  // we are interested in three parts of the LinkedList, the part before index 'p',
  // the part between 'p' and 'q', and the part after index 'q'
  const last_node_of_first_part = previous;

  // after reversing the LinkedList 'current' will become the last node of the sub-list
  const last_node_of_sub_list = current;
  let next = null; // will be used to temporarily store the next node

  i = 0;

  // reverse nodes between 'p' and 'q'
  while(current != null && i < p-q + 1) {
    next = current.next;
    current.next = previous;
    previous = current;
    current = next;
    i++;
  }

  // connect with the first part
  if (last_node_of_first_part !== null) {
    // 'previous' is now the first node of the sub-list
    last_node_of_first_part.next = previous;
    // this means p === 1 i.e., we are changing the first node (head) of the LinkedList
  } else {
    head = previous;
  }

  // connect with the last part
  last_node_of_sub_list.next = current;

  return head;
};

function reverse_every_k_elements(head, k) {
  if (k <= 1 || head === null) {
    return head;
  }

  let current = head,
    previous = null;
  while (true) {
    const last_node_of_previous_part = previous;
    // after reversing the LinkedList 'current' will become the last node of the sub-list
    const last_node_of_sub_list = current;
    let next = null; // will be used to temporarily store the next node
    let i = 0;
    while (current !== null && i < k) { // reverse 'k' nodes
      next = current.next;
      current.next = previous;
      previous = current;
      current = next;
      i += 1;
    }

    // connect with the previous part
    if (last_node_of_previous_part !== null) {
      last_node_of_previous_part.next = previous;
    } else {
      head = previous;
    }
    // connect with the next part
    last_node_of_sub_list.next = current;

    if (current === null) {
      break;
    }
    previous = last_node_of_sub_list;
  }
  return head;
}
