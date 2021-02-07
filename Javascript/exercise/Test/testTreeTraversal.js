let tree = {"a":["b","c"], "c": ["b"], "b":["e"], "d":[], "e":["d"], "c":["d","f"],"f":["a"]};
let visit={"a":false, "b":false, "c":false, "d": false, "e":false, "f":false};

function depthforsearch(key){
	if(!visit[key]){
		visit[key]=true;
		console.log(key);
	  if(tree[key].length > 0){
	      for(let deepkey in tree[key]){
	         depthforsearch(tree[key][deepkey]);
		  }
	  }
	  
	}
  
}
let queue=[];
function breathforsearch(node){
	queue.push(node);

	while(queue.length > 0){
		let current = queue.shift();
		if(!visit[current]){
			console.log(current);
	        visit[current] = true;
	        for(var i = 0, size = tree[current].length; i<size; i++ ){

	        	if(visit[tree[current][i]] === false){
	        		queue.push(tree[current][i]);
	        	}
	        }
		}
		
	}
}
depthforsearch("a");
console.log("===========");
visit={"a":false, "b":false, "c":false, "d": false, "e":false, "f":false};

breathforsearch("a");