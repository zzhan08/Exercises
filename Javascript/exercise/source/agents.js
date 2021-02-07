'use strict';
const https = require('https');
const http = require('http');
const validator = require('./validator');

module.exports = {
	"HTTPRequestAgent": function(agentInput, callback){
		let requester = http;
    if(agentInput.startsWith("https")){
      requester = https;
    }
		requester.get(agentInput, (resp) => {
		  let data = '';

		  resp.on('data', (chunk) => {
		    data += chunk;
		  });

		  resp.on('end', () => {
		    callback(null, validator.jParser(data));
		  });

		}).on("error", (err) => {
		  callback(err);
		});
	},
	"PrintAgent": function(agentInput, callback){
      console.log(agentInput);
      callback(null);
	}
}