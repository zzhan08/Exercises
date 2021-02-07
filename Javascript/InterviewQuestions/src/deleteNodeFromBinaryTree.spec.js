function node(value){
	return{
    value: value,
    left: null,
    right: null
	}
}
function deleteNode(root, n){
  if(root.value === n){
  	if(!root.left && !root.right){
      root = null;
  	}else if(!root.left){
  		let temp = node(root.right.value);
  		temp.left = root.right.left;
  		temp.right = root.right.right;

      root.value = temp.value
      root.left = temp.left;
      root.right = temp.right;
  	}else if(!root.right){
  		let temp = node(root.left.value);
  		temp.left = root.left.left;
  		temp.right = root.left.right;

      root.value = temp.value
      root.left = temp.left
      root.right = temp.right
  	}else{
  		//find minimum number
  		temp = root.right;
  		while(temp.left){
        temp = temp.left;
  		}
  		root.value = temp.value;
  		root.right = deleteNode(root.right, root.value);
  	}
  } else if(root.value < n){
    root.right = deleteNode(root.right, n);
  } else if(root.value > n){
    root.left = deleteNode(root.left, n);
  }
  return root;
}

test('Binary search tree test A: ', () => {
	let n = node(8);
	n.left = node(6);
	n.left.left = node(4);
	n = deleteNode(n, 6);
  expect(n.left.value).toBe(4);
});
