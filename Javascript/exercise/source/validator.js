'use strict';

const path = require('path');
let _ = require('underscore');

function pathResolve(fileName, sourceFoler){
	return path.resolve(__dirname, '..', sourceFoler ? sourceFoler : 'descriptions', fileName);
}
module.exports.pathBuilder = pathResolve;
module.exports.loadFile = function(fileName, sourceFoler){
  try{
		let jsonObj = require(pathResolve(fileName, sourceFoler));

		if(!jsonObj["agents"] || !Array.isArray(jsonObj["agents"]) ){
      return ;
		}
    return jsonObj;
	}catch(e){
    console.log(`${e}`);
    return;
	}
};
module.exports.jParser = function(jsonObj){
  try{
    return JSON.parse(jsonObj);
  }catch(e){
    return jsonObj
  }
}
module.exports.validateAgents = function(Agents){
	let typeValidator = {
		"HTTPRequestAgent": function(options){
      return options["url"] && typeof options["url"] === "string" && options["url"] !== "";
		},
		"PrintAgent":function(options){
      return options["message"] && typeof options["message"] === "string" && options["message"] !== "";
		}
	}
  if(Array.isArray(Agents) && Agents.length > 0){
    for(let i = 0, size = Agents.length; i < size; i++){
    	let agent = Agents[i];
      if(!agent["name"] || typeof agent["name"] !== "string" || agent["name"] === ""){
         return false;
      }
      if(!agent["type"] || typeof agent["type"] !== "string" || agent["type"] === ""){
         return false;
      }
      if(!agent["options"] || typeof agent["options"] !== "object" || _.isEmpty(agent["options"])){
         return false;
      }
      if(typeValidator[agent["type"]] && typeValidator[agent["type"]](agent["options"])){
      	continue;
      }
      return false;
    }
    return true;

  }else{
  	return false;
  }
};
