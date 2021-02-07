let x = function(name){
	this.name = name;
};
x.getFullName = function(x){
	return this.name +x;
}
x.prototype.getFull = function(x){
	return this.name +x;
}
x("the x");
let b = new x("aass");
//console.log("x getname: ",x.getFullName(" add on"));
//console.log("b getname: ",b.getFullName(" add on 2"));
//console.log("x getname: ",x.getFull(" add on"));
console.log("b getname: ",b.getFull(" add on 2"));
console.log("b getname: ",new x("aaasdd").getFull(" add on 2"));