function print2DSpiral(arr){
	let top = 0;
	let right = arr[0].length;
	let left = 0;
	let bottom = arr.length;
	let result = [];
  result = printRectangle(arr, top, right, left, bottom, result);
  return result;
}
function printRectangle(arr, top, right, left, bottom, result){
	let i = left
	if(left === right){
    return result;
  }
  for(; i < right; i++){
    result.push(arr[top][i]);
  }
  top++; 
  if(top === bottom){
    return result;
  }
  for(i = top; i < bottom; i++){
    result.push(arr[i][right -1]);
  }
  right--;
  if(right === left){
    return result;
  }
	for (i = right - 1; i >= left; i-- ) {
    result.push(arr[bottom - 1][i]);
  }
  bottom--;
  if(bottom === top){
    return result;
  }
  for (i = bottom -1; i >= top; i-- ) {
    result.push(arr[i][left]);
  }
  left++;
  return printRectangle(arr, top, right, left, bottom, result);
}
test('print 2d 4x4', () => {
	let arr = [
	  [2,4,6,8],
	  [5,9,12,16],
	  [2,11,5,9],
	  [3,2,1,8]
	];
  expect(print2DSpiral(arr).toString()).toBe([2,4,6,8,16,9,8,1,2,3,2,5,9,12,5,11].toString());
});

test('print 2d 4x5', () => {
	let arr = [
	  [2,4,6,8,1],
	  [5,9,12,16,4],
	  [2,11,5,9,3],
	  [3,2,1,8,5]
	];
  expect(print2DSpiral(arr).toString()).toBe([2,4,6,8,1, 4,3,5,8,1,2,3,2,5,9,12,16,9,5,11].toString());
});