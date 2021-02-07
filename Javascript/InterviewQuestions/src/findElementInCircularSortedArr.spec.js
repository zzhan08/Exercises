let binarySearch = require("./binarySearch");

function binarySearchCircularSorted(arr, item, start, end){
  if(arr[start] < arr[end] && (item < arr[start] || item > arr[end])){
    return -1;
  }
  let size = end - start;
  let mid = parseInt(size / 2) + start;  
  if (arr[mid] === item) {
    return mid;
  } 
  if (arr[mid] <= arr[end]){
    if(arr[mid] < item && item <= arr[end]){
      return binarySearchCircularSorted(arr, item, mid + 1, end);
    }else{
      return binarySearchCircularSorted(arr, item, start, mid - 1);
    }
  } else {
    if(arr[start] <= item && item < arr[mid]){
      return binarySearchCircularSorted(arr, item, start, mid - 1);
    }else{
      return binarySearchCircularSorted(arr, item, mid + 1, end);
    }
  }
  return -1;
}
test('search circular sorted array, pos = 3', () => {
  let a = [12,2,3,5,8,11];
  expect(binarySearchCircularSorted(a, 3, 0, a.length -1 )).toBe(2);
});

test('search circular sorted array, pos = 12', () => {
  let a = [12,2,3,5,8,11];
  expect(binarySearchCircularSorted(a, 12, 0, a.length -1 )).toBe(0);
});

test('search circular sorted array, pos = 2', () => {
  let a = [12,2,3,5,8,11];
  expect(binarySearchCircularSorted(a, 2, 0, a.length -1 )).toBe(1);
});

test('search circular sorted array, pos = 5', () => {
  let a = [12,2,3,5,8,11];
  expect(binarySearchCircularSorted(a, 5, 0, a.length -1 )).toBe(3);
});
test('search circular sorted array, pos = 8', () => {
  let a = [12,2,3,5,8,11];
  expect(binarySearchCircularSorted(a, 8, 0, a.length -1 )).toBe(4);
});
test('search circular sorted array, pos = 11', () => {
  let a = [12,2,3,5,8,11];
  expect(binarySearchCircularSorted(a, 11, 0, a.length -1 )).toBe(5);
});


test('search circular sorted array, pos = 100', () => {
  let a = [12,2,3,5,8,11];
  expect(binarySearchCircularSorted(a, 100, 0, a.length -1 )).toBe(-1);
});

test('search circular sorted array, pos = 1', () => {
  let a = [12,2,3,5,8,11];
  expect(binarySearchCircularSorted(a, 1, 0, a.length -1 )).toBe(-1);
});
test('search circular sorted array, pos = 4', () => {
  let a = [12,2,3,5,8,11];
  expect(binarySearchCircularSorted(a, 4, 0, a.length -1 )).toBe(-1);
});