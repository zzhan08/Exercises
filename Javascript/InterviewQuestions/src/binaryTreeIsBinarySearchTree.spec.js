/*
	binary tree in which for each node, 
	value of all the nodes in left subtree
	is less or equal and value of all the nodes
	in right subtree is greater
*/
function node(value){
	return{
    value: value,
    left: null,
    right: null
	}
}

function ifBinarySubtree(leaf){
  if(!leaf){
    return true;
  }
  if(subLess(leaf.left, leaf.value) && subGreater(leaf.right, leaf.value)
  	&&ifBinarySubtree(leaf.left) && ifBinarySubtree(leaf.right)){
    return true;
  }
  
  return false;
}
function subLess(node, value){
  if(!node){
  	return true;
  }

  if(node.value < value
  	&& subLess(node.left, value) && subLess(node.right, value)){
    return true;
  }
  return false;
}
function subGreater(node, value){
  if(!node){
  	return true;
  }
  if(node.value > value
  	&& subGreater(node.left, value) && subGreater(node.right, value)){
    return true;
  }
  return false;
}

function isBST(leaf, min, max){
  if(!leaf){
  	return true;
  }
  if(leaf.value > min && leaf.value < max 
  	&& isBST(leaf.left, min, leaf.value) && isBST(leaf.right, leaf.value, max)){
    return true;
  }
  return false;
}

test('Binary search tree test A: ', () => {
  let n = node(8);
  n.left = node(6);
  n.left.left = node(4);
	expect(ifBinarySubtree(n)).toBe(true);
	expect(isBST(n, -Infinity, Infinity)).toBe(true);
});

test('Binary search tree test B: ', () => {
  let n = node(10);
  n.left = node(5);
  n.right = node(16);
  n.left.left = node(4);
  n.left.right = node(7);
  n.left.left.left = node(1);
  n.left.right.right = node(11);
	expect(ifBinarySubtree(n)).toBe(false);
  expect(isBST(n, -Infinity, Infinity)).toBe(false);
});

test('Binary search tree test C: ', () => {
  let n = node(7);
  n.left = node(4);
  n.right = node(9);
  n.left.left = node(1);
  n.right.right = node(12);
	expect(ifBinarySubtree(n)).toBe(true);
	expect(isBST(n, -Infinity, Infinity)).toBe(true);
});

test('Binary search tree test D: ', () => {
  let n = node(5);
  n.left = node(1);
  n.right = node(8);
  n.right.left = node(9);
  n.left.right = node(6);
	expect(ifBinarySubtree(n)).toBe(false);
	expect(isBST(n, -Infinity, Infinity)).toBe(false);
});