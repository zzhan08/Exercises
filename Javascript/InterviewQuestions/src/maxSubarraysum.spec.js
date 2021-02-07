function findMaxSubArr(arr){
	let size =  arr.length;
	let sum = 0;
	for(let i = 1; i < size; i++){
		let add = 0;
    let x=0;
    for(let j = 0; j < size; j++){
      let each = arr[j];
      add+=each;
      if(j>=i){

        add-=arr[x];
        x++;

      }
      if(sum < add){
        sum = add;

      }
    }
	}
	return sum; 
}
function findBestMaxSubArr(arr){
	let size =  arr.length;
	let sum = 0;
	let ans = 0;
	for(let i = 0; i < size; i++){
		if(sum + arr[i] > 0){
			sum+=arr[i]
		}else{
			sum=0;
		}
		ans = Math.max(ans,sum);
	}
	return ans; 
}
test('find max Sub arr', () => {
	expect(findMaxSubArr([3,-2,5,-1])).toBe(6);
	expect(findMaxSubArr([1,-3,2,-5,7,6,-1,-4,11,-23])).toBe(19);
});

test('find max Sub arr2', () => {
	expect(findBestMaxSubArr([3,-2,5,-1])).toBe(6);
	expect(findBestMaxSubArr([1,-3,2,-5,7,6,-1,-4,11,-23])).toBe(19);
});