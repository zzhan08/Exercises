let async = require("async");
let i = 0;
let arrayItems = [...Array(10).keys()];
let dateTimeNow = new Date().getTime();
async.each(arrayItems, 
  function(item, cb){
    setTimeout(function(){
      console.log("item: ", item);
      cb();
    }, 1000)
    
  }, function(err, result){
    console.log("err",err);
    let dateTimeFiniesh = new Date().getTime();
    console.log("result",dateTimeFiniesh - dateTimeNow);

  })