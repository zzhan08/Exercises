let a = [12,14,18,21,3,6,8,9];
function CircularArraySearch(A, x){
   let n = A.length;
   let low = 0, high = n - 1;
   while(low <= high){
   	  let mid = parseInt((low + high) / 2);
   	  if(x==A[mid]) return mid;
   	  if(A[mid] <= A[high]){
   	  	if(x > A[mid] && x <= A[high])
   	  		low = mid + 1;
   	  	else 
   	  		high = mid - 1;
   	  } else {

   	  	if(A[low] <= x && x < A[mid])
   	  		high = mid -1;
   	  	else 
   	  		low = mid + 1;
   	  }
   }
   return -1;
}
let x = 3;
console.log("find ",x , " at ", CircularArraySearch(a, x));

