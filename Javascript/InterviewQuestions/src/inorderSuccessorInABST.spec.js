/*
Inorder
1). visit left subtree
2). vist root
3). visit right subtree

function node(value){
	return{
		value: value,
		left: null,
		right: null
	}
}
function nodeDouble(value){
	return{
		value: value,
		left: null,
		right: null,
		parent: null
	}
}
function binaryInorder(root, list){
	if(!root){
    return;
	}
  binaryInorder(root.left,list);
  list.push(root.value);
  binaryInorder(root.right,list);
  
}
function findSuccessor(root, value){
  let node = find(root,value);
  if(!node){
  	return ;
  } 
  if(node.right!=null){
    return findmin(node.right);
  }
  else{
    let temp = null;
    let prev = root;
    while(prev.value != node.value){
    	if(node.value < prev.value){
        temp = prev;
        prev = prev.left;
    	}else{
    		prev = prev.right;
    	}
    }
    return temp;

  }
}
test('inorder successor bst', () => {
	let reader = [];
	let n = node(15);
	n.left = node(10);
	n.right = node(20);
	n.left.left = node(8);
	n.left.right = node(12);
	n.left.left.left = node(6);
	n.left.right.left=node(11);
	n.right.left = node(17);
	n.right.left.left = node(16);
	n.right.right = node(25);
	n.right.right.right=node(27);
	binaryInorder(n, reader)
	expect(reader.toString()).toBe("6,8,10,11,12,15,16,17,20,25,27");
});
test('inorder successor double bst', () => {
	let reader = [];
	let n = node(15);
	n.left = node(10);
	n.right = node(20);
	n.left.left = node(8);
	n.left.right = node(12);
	n.left.parent = n;
	n.left.left.left = node(6);
	n.left.left.parent = n.left;
	n.left.right.left=node(11);
	n.left.right.parent=n.left;

	n.right.left = node(17);
	n.right.right = node(25);
	n.right.parent = n;
	n.right.left.left = node(16);
  n.right.left.parent = n.right;
	n.right.right.right=node(27);
	n.right.right.parent = n.right;

	expect(findSuccessor(n,6)).toBe("6,8,10,11,12,15,16,17,20,25,27");
});
*/
test('inorder successor double bst', () => {

});