
var then = 4;
var thequery = [ [ 2,3,603 ], [ 1,1,286 ], [ 4,4,882 ] ];
function arrayManip(n, query){
	let thearray = Array(n).fill(0);
  for(let j = 0, m = query.length; j < m; j++){
     for(let i = query[j][0]-1;i<query[j][1]; i++){
       thearray[i] += query[j][2];
     } 
  }
  
	return Math.max.apply(thearray);
}
function arrayManip1(n, queries){
	let thelargest = 0;
	let query = queries;
  for(let j = 0, m = query.length; j < m; j++){
  	let size = query[j][1] - query[j][0] + 1;
  	let current = Array(size).fill(query[j][2]);
    for(let i = 0;i<m; i++){
      if( i !== j && (query[i][0] < query[j][1] || query[j][0] < query[i][1])) {
         for(let z = (query[j][0] < query[i][0] ? query[i][0] - query[j][0] : 0); z <= (Math.min(query[j][1], query[i][1]) - query[j][0]); z++ ){
            current[z]+=query[i][2];
         }
      }
    } 
    let max = Math.max.apply(null, current);
    if(max > thelargest){
      thelargest = max;
    }
  }
  return thelargest;
}
function arrayManip2(n, queries){
	let thelargest = 0;
	let query = queries;
	let sum = 0;
	let collection = []
  for(let j = 0, m = query.length; j < m; j++){
  	collection.push([query[j][0],query[j][2]]);
  	collection.push([query[j][1]+1,query[j][2]*-1]);
  }

  collection.sort(function(a,b){return (a[0]-b[0])==0?(a[1]-b[1]):(a[0]-b[0])});
console.log("collection: ", collection);
  for(let i = 0; i< collection.length;i++){
    sum += collection[i][1];
    if(sum > thelargest){
      thelargest = sum;
    }
  }
  return thelargest;
}
//console.log(arrayManip(then, thequery));
console.log(arrayManip2(then, thequery));