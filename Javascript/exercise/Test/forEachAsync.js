let arrayTest = []; var data = 0; var xx = 0;
for(var i = 0; i < 500; i++){
	console.log("add element",i);
  arrayTest.push(i);
}
console.log("arrayTest ",arrayTest.length);
 testfunction(1, data, xx, arrayTest);
console.log("data1",data);
console.log("data1xx",xx);

 testfunction(2, data, xx, arrayTest);
console.log("data2",data);
console.log("data2xx",xx);


 testfunction(3, data, xx, arrayTest)
console.log("data3",data);
console.log("data3xx",xx);


function testfunction(itr, data, xx, arrayTest){
	console.log("====================="+itr+"======================");

	arrayTest.forEach(function(entry){
	  console.log("entry"+itr+":",entry);
	  data = data+entry
	});
    console.log("datainside"+itr+":",data);
    xx++;
}