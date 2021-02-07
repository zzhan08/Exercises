function SelectionSort(arr){
  for(let i = 0, size=arr.length; i< size - 1; i++){
    let minPosition = i;
    let min = arr[minPosition];
    for(let j = i; j < size; j++){

      if(min > arr[j]){
        min = arr[j]
        minPosition = j;
      }
          
    }
    if(minPosition != i){
      let temp = arr[i];
      arr[i] = arr[minPosition];
      arr[minPosition] = temp;
    }

  }
  return arr;
}


test("test selection",()=>{
  let arr = [1,6,2,10,4,5,8,7];
  expect(SelectionSort(arr).toString()).toBe([1,2,4,5,6,7,8,10].toString());
})