function InsertionSort(arr){
  for(let i = 1, size = arr.length; i < size; i++){
    let each = arr[i];
    let j = i - 1;
    while(j >= 0 && arr[j] > each){
      arr[j + 1] = arr[j];
      j--;
    }     
    arr[j + 1] = each;
 
  }

  return arr;
}


test("test insertion",()=>{
  let arr = [1,6,2,10,4,5,8,7];
  expect(InsertionSort(arr).toString()).toBe([1,2,4,5,6,7,8,10].toString());
})
test("test insertion",()=>{
  let arr = [12,26,22,10,4,6,5,25,11,8,7];
  expect(InsertionSort(arr).toString()).toBe([4,5,6,7,8,10,11,12,22,25,26].toString());
})
