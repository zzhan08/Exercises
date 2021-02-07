
function binarySmallestPosition(arr, start, end){
   let size = end - start;
   let mid = parseInt(size / 2) + start;
   if (arr[mid] < arr[end]) {

     return arr[mid-1] < arr[mid] ? binarySmallestPosition(arr, start, mid - 1) : mid;
   } else if (arr[mid] > arr[end]){
     return arr[mid] > arr[mid + 1] ? mid + 1 :binarySmallestPosition(arr, mid + 1, end);
   } else {
     return mid;
   }
}
test('rotated times of sorted, pos = 4', () => {
	let a = [12,2,3,5,8,11];
	expect(binarySmallestPosition(a,0,5)).toBe(1);
});
test('rotated times of sorted, pos = 2', () => {
	let a = [11,12,2,3,5,8];
	expect(binarySmallestPosition(a,0,5)).toBe(2);
});
test('rotated times of sorted, pos = 3', () => {
	let a = [8,11,12,2,3,5];
	expect(binarySmallestPosition(a,0,5)).toBe(3);
});
test('rotated times of sorted, pos = 4', () => {
	let a = [5,8,11,12,2,3];
	expect(binarySmallestPosition(a,0,5)).toBe(4);
});
test('rotated times of sorted, pos = 5', () => {
	let a = [3, 5,8,11,12,2];
	expect(binarySmallestPosition(a,0,5)).toBe(5);
});
test('rotated times of sorted, pos = 5', () => {
	let a = [2,3,5,8,11,12];
	expect(binarySmallestPosition(a,0,5)).toBe(0);
});