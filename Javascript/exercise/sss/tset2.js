let str1 = "0100000"; //1 1+0 =0
let str2 = "0100001"; //2 1+1 = 1
let str3 = "0111000"; //4 2+2   3
let str4 = "0111100"; //7 4 + 3 = 6
function cal(str){
	let sum = 0;
	let count = 0;
	for(let i = 0; i< str.length; i++){

		if(str[i] == '1'){
	        sum += count++;
		}
	}
    return sum;
}

console.log("sum", cal(str1));
console.log("sum", cal(str2));
console.log("sum", cal(str3));
console.log("sum", cal(str4));


