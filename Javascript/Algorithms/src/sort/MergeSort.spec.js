

function mergeSort(arr){
  let end = arr.length;
  if(end <= 1){
    return arr;
  }
	let mid = parseInt(end / 2);
	let farr = arr.slice(0,mid);
	let sarr = arr.slice(mid);
  let first = mergeSort(farr);
  let second = mergeSort(sarr);
  arr = mergeArray(first, second);
	return arr;
}

function mergeArray(first, second){
	let newArray = [];
	let iterFirst = 0;
	let iterSecond = 0;
	while(iterFirst < first.length && iterSecond < second.length){
		let feach = first[iterFirst];
    let seach = second[iterSecond];
    if(feach < seach){
      newArray.push(feach);
      iterFirst++;
    }else{
    	newArray.push(seach);
      iterSecond++;
    }
	}
  if(iterFirst > iterSecond){
    newArray = [...newArray,...second.slice(iterSecond)]
  }else{
    newArray = [...newArray,...first.slice(iterFirst)]
  }
	return newArray;
}

test("test merge sort",()=>{
	let arr = [1,6,2,10,4,5,8,7];
	expect(mergeSort(arr).toString()).toBe([1,2,4,5,6,7,8,10].toString());
})