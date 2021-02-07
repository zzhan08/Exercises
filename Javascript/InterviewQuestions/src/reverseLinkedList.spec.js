
function reverse(prev, current){
	let head = null;

	if(current.next != null){
	  head = reverse(current, current.next);
	}else{
		head = current;
	}

  current.next = !prev ? null : prev;
  return head;
}
function print(list){
	let result=[];
	let nodes = list;
  while(nodes.next != null){
  	result.push(nodes.value);
  	nodes = nodes.next;
  }
  result.push(nodes.value);
  return result;
}
function reversePrint(current){
	let result = [];
	if(current.next != null){
	  result = reversePrint(current.next);
	}
  result.push(current.value);
  return result;
}
test('reverseLinkedList', () => {
  let nodes = {
		value:6,
	  next: {
	  	value: 7,
	  	next: {
	  		value:8,
	  		next: {
	        value:9,
	        next:null
	  		}
	  	}
	  }
	};
  expect(print(nodes).toString()).toBe([6,7,8,9].toString());
  expect(reversePrint(nodes).toString()).toBe([9,8,7,6].toString());
  expect(print(reverse(null, nodes)).toString()).toBe([9,8,7,6].toString());
});