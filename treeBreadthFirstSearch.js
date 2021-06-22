/*
Given a binary tree, populate an array to represent its level-by-level traversal.
You should populate the values of all nodes of each level from left
to right in separate sub-arrays.
*/
const Deque = require('./collections/deque'); //http://www.collectionsjs.com
class TreeNode {

  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
};


const traverse = function(root) {
  result = [];
  if (root === null) {
    return root;
  }
  const queue = new Deque();
  queue.push(root);
  while(queue.length > 0) {
    const levelSize = queue.length;
    currentLevel = [];
    for (let i = 0; i < levelSize; i++) {
      currentNode = queue.shift();
      //add the node to current level
      currentLevel.push(currentNode.val);
      //insert the children of current node in the queue
      if (currentNode.left != null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right != null) {
        queue.push(currentNode.right);
      }
    }
    result.push(currentLevel);
  }
  return result;
};


var root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
console.log(`Level order traversal: ${traverse(root)}`);

/*
Given a binary tree, populate an array to represent its level-by-level
traversal in reverse order, i.e., the lowest level comes first.
You should populate the values of all nodes in each level from left to right
in separate sub-arrays.
*/
const traverse_reverse = function(root) {
  result = [];
  if (root === null) {
    return root;
  }
  const queue = new Deque();
  queue.push(root);
  while(queue.length > 0) {
    const levelSize = queue.length;
    currentLevel = [];
    for (let i = 0; i < levelSize; i++) {
      currentNode = queue.shift();
      //add the node to current level
      currentLevel.push(currentNode.val);
      //insert the children of current node in the queue
      if (currentNode.left != null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right != null) {
        queue.push(currentNode.right);
      }
    }
    result.unshift(currentLevel);
  }
  return result;
}
/*
Given a binary tree, populate an array to represent its zigzag level
order traversal. You should populate the values of all nodes of the
first level from left to right, then right to left for the next level
and keep alternating in the same manner for the following levels.
*/
const traverse_zig_zag = function(root) {
  result = [];
  if (root === null) {
    return result;
  }

  const queue = new Deque();
  queue.push(root);
  leftToRight = true;
  while (queue.length > 0) {
    levelSize = queue.length;
    currentLevel = new Deque();
    for (i = 0; i < levelSize; i++) {
      currentNode = queue.shift();

      // add the node to the current level based on the traverse direction
      if (leftToRight) {
        currentLevel.push(currentNode.val);
      } else {
        currentLevel.unshift(currentNode.val);
      }

      // insert the children of current node in the queue
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
    result.push(currentLevel.toArray());
    // reverse the traversal direction
    leftToRight = !leftToRight;
  }

  return result;
};

/*
Given a binary tree, populate an array to represent the averages of
all of its levels.
*/

const find_level_averages = function(root) {
  result = [];
  if (root === null) {
    return result;
  }

  const queue = new Deque();
  queue.push(root);
  while (queue.length > 0) {
    let levelSize = queue.length,
      levelSum = 0.0;
    for (i = 0; i < levelSize; i++) {
      currentNode = queue.shift();
      // add the node's value to the running sum
      levelSum += currentNode.val;
      // insert the children of current node to the queue
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
    // append the current level's average to the result array
    result.push(levelSum / levelSize);
  }

  return result;
};

const find_minimum_depth = function(root) {
  if (root === null) {
    return 0;
  }
  const queue = new Deque();
  queue.push(root);
  let minimumTreeDepth = 0;
  while(queue.length > 0) {
    minimumTreeDepth++;
    levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      currentNode = queue.shift();
      if (currentNode.left === null && currentNode.right === null) {
        return minimumTreeDepth;
      }
      // insert the children of current node to the queue
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }
  return -1;
};

function find_maximum_depth(root) {
  if (root === null) {
    return 0;
  }

  const queue = new Deque();
  queue.push(root);
  let maximumTreeDepth = 0;
  while (queue.length > 0) {
    maximumTreeDepth += 1;
    const levelSize = queue.length;
    for (i = 0; i < levelSize; i++) {
      currentNode = queue.shift();

      // insert the children of current node in the queue
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }
  return maximumTreeDepth;
}

/*
Given a binary tree and a node, find the level order s
uccessor of the given node in the tree. The level order successor
is the node that appears right after the given node in the level
order traversal.
*/
const find_successor = function(root, key) {
  if (root === null) {
    return null;
  }

  const queue = new Deque();
  queue.push(root);
  while (queue.length > 0) {
    currentNode = queue.shift();
    // insert the children of current node in the queue
    if (currentNode.left !== null) {
      queue.push(currentNode.left);
    }
    if (currentNode.right !== null) {
      queue.push(currentNode.right);
    }
    // break if we have found the key
    if (currentNode.val === key) {
      break;
    }
  }

  if (queue.length > 0) {
    return queue.peek();
  }
  return null;
};

// level order traversal using 'next' pointer
  print_level_order() {
    console.log("Level order traversal using 'next' pointer: ");
    let nextLevelRoot = this;
    while (nextLevelRoot !== null) {
      let current = nextLevelRoot;
      nextLevelRoot = null;
      while (current != null) {
        process.stdout.write(`${current.val} `);
        if (nextLevelRoot === null) {
          if (current.left !== null) {
            nextLevelRoot = current.left;
          } else if (current.right !== null) {
            nextLevelRoot = current.right;
          }
        }
        current = current.next;
      }
      console.log();
    }
  }
};

const connect_level_order_siblings = function(root) {
  if (root === null) {
    return;
  }

  const queue = new Deque();
  queue.push(root);
  while (queue.length > 0) {
    let previousNode = null,
      levelSize = queue.length;
    // connect all nodes of this level
    for (i = 0; i < levelSize; i++) {
      currentNode = queue.shift();
      if (previousNode !== null) {
        previousNode.next = currentNode;
      }
      previousNode = currentNode;
      // insert the children of current node in the queue
      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }
};

const root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(9);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);
connect_level_order_siblings(root);

root.print_level_order();
