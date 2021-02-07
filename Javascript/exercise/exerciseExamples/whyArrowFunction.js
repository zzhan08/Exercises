const profile = {
  first:"",
  last:"",
  setName: function(name){
    let splitName = function(n){
      let nameArray = n.split(" ");
      this.first = nameArray[0];
      this.last = nameArray[1];
    }
    splitName(name);
  }	
}
profile.setName("xxxx yyyy");
console.log(`profile first ${profile.first}`);
console.log(`window first ${global.first}`);
const profile2 = {
  first2:"",
  last:"",
  setName: (name)=>{
    let splitName = function(n){
      let nameArray = n.split(" ");
      this.first2 = nameArray[0];
      this.last = nameArray[1];
    }
    splitName(name);
  }	
}
profile2.setName("xxxx yyyy");
console.log(`profile2 first ${profile2.first2}`);
console.log(`window2 first ${global.first2}`);
