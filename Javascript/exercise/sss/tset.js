var A = [1, 12, 42, 70, 36, -4, 43, 15]; var B = [5, 15, 44, 72, 36, 2, 69, 24]
function solution(A, B) {
  // write your code in JavaScript (Node.js 8.9.4)
  var size = A.length;
  var collection = [];
  var result = [];

  for(var i = 0; i < size; i++){
    collection.push(A[i] < B[i] ? [A[i], B[i]] : [A[i], B[i]]) ;
  }
  collection.sort(function(a,b){return a[1]-b[1]});
  for(var j = 0; j < size; j++){
    if(result.length <= 0){
      result.push(collection[j]);
    } else {
      if(collection[j][0] > result[result.length - 1][1]){
        result.push(collection[j]);
      }else{
        result[result.length - 1][1] = collection[j][1];
        result[result.length - 1][0] = result[result.length - 1][0] > collection[j][0] ? collection[j][0] : result[result.length - 1][0];
      }
    }
  }
  return result.length;
}
solution(A, B);