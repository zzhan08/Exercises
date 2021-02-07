const spawn = require("child_process").spawn;
for(var i = 0; i < 25; i++){
  setTimeout(function(){
    console.log("5s wait to start",i);
    const child = spawn('node', ['mongoClient.js'], {
    detached: true,
    stdio: 'ignore'
    });
    child.unref();
  },5000);
  
}