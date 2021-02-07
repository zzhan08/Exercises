const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://admin:innopharma@192.168.1.235:27017';
const options = {
  useNewUrlParser: true, 
  useUnifiedTopology: true
};
MongoClient.connect(url, options)
  .then(function (client) {
    try{
      let db = client.db("sequence_table");
      send(db).then(function(result){
        console.log("result",result);
      });
    }catch(e){
      console.error("process err",e);
    }
  })
  .catch(function (err) {
    console.error('[dbService.Mongo] DB Connection failed: ', err);
    reject(err);
  });
async function send(db){
  let sequenceCollection = db.collection("sequence");
  let dataCollection = db.collection("test_collection");
  for(var i = 0 ; i< 200000 ; i++){

    let id =  await getValueForNextSequence(sequenceCollection, "item_id");

    let result = await dataCollection.insert({
      "_id": id,
      "item_short_name": "ABC",
      "specification": "book",
      "category": "fictional",
      "seller": "best_buy",
      "network": "XYZ",
      "plan": "regular"
    })
    console.log("i",i);
    await timeout(1000); 
  }

  return "complete";

}
async function getValueForNextSequence(collection, sequenceOfName){
  var sequenceDoc = await collection.findAndModify ({_id: sequenceOfName },[],
	  {$inc:{sequence_value:1}},{new:true});
    return sequenceDoc.value.sequence_value;
};
function timeout(ms){
  return new Promise(res => setTimeout(res, ms))
}