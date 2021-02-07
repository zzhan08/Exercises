

function bubbleSort(arr){
	for(let i = 0, size=arr.length; i< size - 1; i++){

		for(let j = 0; j < size - i -1; j++){

		  if(arr[j] > arr[j+1]){
				let temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
		  } 
		}

	}
	return arr;
}


test("test bubble",()=>{
	let arr = [1,6,2,10,4,5,8,7];
	expect(bubbleSort(arr).toString()).toBe([1,2,4,5,6,7,8,10].toString());
})