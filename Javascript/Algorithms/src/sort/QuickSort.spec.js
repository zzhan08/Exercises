function QuickSortFirst(arr, low, high){
 var index;
  if (arr.length > 1) {
      index = Partition(arr, low, high); //index returned from partition
      if (low < index - 1) { //more elements on the left side of the pivot
        arr = QuickSortFirst(arr, low, index - 1);
      }
      if (index < high) { //more elements on the right side of the pivot
        arr = QuickSortFirst(arr, index, high);
      }
  }
  return arr;
}
function Partition(arr, low, high){
 var pivot   = arr[Math.floor((high + low) / 2)], //middle element
      i       = low, //left pointer
      j       = high; //right pointer
  while (i <= j) {
      while (arr[i] < pivot) {
          i++;
      }
      while (arr[j] > pivot) {
          j--;
      }
      if (i <= j) {
          swap(arr, i, j); //sawpping two elements
          i++;
          j--;
      }
  }
  return i;
}
function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}
test("test QuickSort",()=>{
  let arr = [1,6,2,10,4,5,8,7];
  expect(QuickSortFirst(arr, 0, arr.length -1 ).toString()).toBe([1,2,4,5,6,7,8,10].toString());
})
test("test QuickSort",()=>{
  let arr = [12,26,22,10,4,6,5,25,11,8,7];
  expect(QuickSortFirst(arr, 0, arr.length-1).toString()).toBe([4,5,6,7,8,10,11,12,22,25,26].toString());
})

test("test patition",()=>{
   let arr = [1,2,3,9,6,7,8,10,11,12,13,14];
   expect(QuickSortFirst(arr, 0, arr.length-1).toString()).toBe([1,2,3,6,7,8,9,10,11,12,13,14].toString());
})