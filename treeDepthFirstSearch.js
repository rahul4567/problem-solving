class TreeNode {

  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
};


const has_path = function(root, sum) {
  if (root === null) {
    return false;
  }
  if (root.val === sum && root.left === null && root.right === null) {
    return true;
  }
  return (has_path(root.left, sum - root.val) || has_path(root.right, sum - root.val)) ;
};
/*
Given a binary tree and a number ‘S’, find all paths from root-to-leaf such
that the sum of all the node values of each path equals ‘S’.
*/
const find_paths_recursive = function (currentNode, sum, currentPath, allPath) {
  if (currentNode === null) {
    return;
  }
  //add current node to path
  currentPath.push(currentNode.val);
  // if the current node is a leaf and its value is equal to sum, save the current path
  if (currentNode.val === sum && currentNode.left === null && currentNode.right === null) {
    allPaths.push(currentPath.toArray());
  } else {
    // traverse the left sub-tree
    find_paths_recursive(currentNode.left, sum - currentNode.val, currentPath, allPaths);
    // traverse the right sub-tree
    find_paths_recursive(currentNode.right, sum - currentNode.val, currentPath, allPaths);
  }
  // remove the current node from the path to backtrack,
  // we need to remove the current node while we are going up the recursive call stack.
  currentPath.pop();
}
const find_paths = function(root, sum) {
  allPaths = [];
  find_paths_recursive(root, sum, new Deque(), allPaths);
  return allPaths;
};

/*
Given a binary tree where each node can only have a digit
(0-9) value, each root-to-leaf path will represent a number.
Find the total sum of all the numbers represented by all paths.
*/
function find_sum_of_path_numbers(root) {
  return find_root_to_leaf_path_numbers(root, 0);
}


function find_root_to_leaf_path_numbers(currentNode, pathSum) {
  if (currentNode === null) {
    return 0;
  }

  // calculate the path number of the current node
  pathSum = 10 * pathSum + currentNode.val;

  // if the current node is a leaf, return the current path sum
  if (currentNode.left === null && currentNode.right === null) {
    return pathSum;
  }

  // traverse the left and the right sub-tree
  return find_root_to_leaf_path_numbers(currentNode.left, pathSum) +
         find_root_to_leaf_path_numbers(currentNode.right, pathSum);
}




var root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.left.left = new TreeNode(9)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)
console.log(`Tree has path: ${has_path(root, 23)}`)
console.log(`Tree has path: ${has_path(root, 16)}`)
