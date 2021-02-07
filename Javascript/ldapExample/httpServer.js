var express      = require('express'),
    bodyParser   = require('body-parser');
var ldap = require('ldapjs');
var assert = require('assert');

var client = ldap.createClient({
  url: 'ldap://127.0.0.1:1389'
});
client.bind('cn=root', 'secret', function(err) {
  assert.ifError(err);
  console.log("bind server with Error: ",err);
  var app = express();
 
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
	app.get('/', function(req, res) {
	
      res.sendfile("index.html");

	});
     app.get('/success', function(req, res) {
	
      res.sendfile("success.html");

	});
      app.get('/fail', function(req, res) {
	
      res.sendfile("fail.html");

	});
    app.post('/login', function(req, res) {
       var user_name=req.body.user;
      var password=req.body.password;
        client.compare('cn=root, o=joyent', user_name, password, function(err, matched) {// 'sn', 'bar'
        	
		  if(matched){
		   	  res.send({status: 'login'});

          }else if(!matched || err){

		   	  res.send({status: 'fail'});

	  	  }

		});
      
	  
	}); 
	app.listen(8080, () => console.log(`Example app listening on port 8080!`))
});

