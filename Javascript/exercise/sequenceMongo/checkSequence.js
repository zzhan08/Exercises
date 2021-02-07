const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://admin:innopharma@192.168.1.235:27017';
const options = {
  useNewUrlParser: true, 
  useUnifiedTopology: true
};
let db;
MongoClient.connect(url, options)
  .then(function (client) {
    db = client.db("sequence_table");
    db.collection("test_collection").find({},{_id:1}).count(function (err, count){
      if (err) {
        console.log("count err: ", err);
      }else{
        console.log("total: ", count);
        pages(count).then(function(result){
          console.log("Mission Complete");
          process.exit();
        }).catch(err=>{
          console.error(err);
        });     
      }         
    });
    
  })
  .catch(function (err) {
    console.error('[dbService.Mongo] DB Connection failed: ', err);
    reject(err);
  });
function find(query){
  return new Promise(function(resolve, reject){
    db.collection("test_collection").find(query,{_id:1}).toArray(function(err,result){
      if(err){
        console.error("retrieve err: ",err);
        reject(err);
      }else{
        resolve(result.map(function(id){
          return parseInt(id._id);
        }));

      }
      
    }) 
  });
}
async function pages(count){
  let thesize = count;
  let interval = 5000;
  let start = 0;
  let iteration = thesize / 5000;
  if(iteration > 1){
    start = thesize - 5000;
    for(let i = 0; i < iteration; i++){
      start = i * interval + 1;
      end = start + interval;
      if(end >= thesize){
        end = thesize;
      }
      await paging(start, end).catch(err=>{
        throw err;
      }); 
    } 
    
  }
}
async function paging(start, end){
  console.log("pagein start: ", start, " | end", end);
  let query = {_id: { $lte: end, $gte: start } };
  let result = await find(query).catch(err=>{
    console.log("pagingerr",err );
    throw err;
  });
  let ids = result;
  let size = ids.length;
  if(size > 5001){
    throw new Error("Dupplcattion some where"); 
  }
  for(let i = start; i <= end; i++){
    let position = ids.indexOf(i);
    console.log("position: ", position, "| ", i);
    if(position <0){
      console.log("break: ", position, "| ", i);
      throw new Error("break: "+position+"| "+i);
    }
  }; 
  return ;
}