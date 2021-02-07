var mpa = [];var mpa1 = [];

for(var i=0; i<9999;i++){
	mpa.push(i);
}
for(var i=0; i<12;i++){
	mpa1.push(i);
}
for(var one of mpa1){for(var one of mpa){console.log(one)}}
console.log("loop finished");