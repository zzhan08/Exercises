/* 
 * store file: single json obj, single key agents, type is array of agents
 * agent object: keys(type, name, action)
 * agent-name: string => valid json key
 * agent-options:
 *   1. HTTPRequestAgent (http get request against url)
 *         single option, url value must be string
 *         invalid response or network failure => termination
 *         response is json bodies and parsed as output
 *   2. PrintAgent - print a given message
 *         single option,message, value is string.
 * a pair of curly braces value reference
 *   curly braces not match => no interpolation
*/
'use strict';
const validator = require('./source/validator.js');
const utility = require('./source/utility.js');
const agentsMethod = require('./source/agents.js');
const eventsbus = require('./source/eventsbus.js').eventsbus;
let inputStr = {
	"HTTPRequestAgent": function(options, obj){
    if(obj){
      return utility.interpolate(options.url, obj);
    }else{
    	return options.url;
    }
	},
	"PrintAgent": function(options, obj){
    if(obj){
      return utility.interpolate(options.message, obj);
    }else{
    	return options.url;
    }
	}
}
let events = {
	"test_data":function(agent){
    eventsbus.addHandler("start", function(istart, obj){
			if(istart){
				let agentInput = inputStr[agent.type](agent.options, obj);
        agentsMethod[agent.type](agentInput,function(err, result){
        	if(err){
          	console.error(err);
          	return;
          }
          if(!result){
            return;
          }
          let output = {"test_data": result};
          eventsbus.emitEvent("test_data", [true, obj ? {...obj, ...output} : output]);
        });
			}
	  });
	},
	"datetime": function(agent){
    eventsbus.addHandler("start", function(istart, obj){
			if(istart){
				let agentInput = inputStr[agent.type](agent.options, obj);
        agentsMethod[agent.type](agentInput,function(err, result){
        	if(err){
          	console.error(err);
          	return;
          }
          if(!result){
            return;
          }
          let output = {"datetime": result};
          eventsbus.emitEvent("datetime", [true, obj ? {...obj, ...output} : output]);
        });
			}
	  });
	},
	"print_time": function(agent){
		eventsbus.addHandler("datetime", function(istart, obj){
			if(istart){
				let agentInput = inputStr[agent.type](agent.options, obj);
        agentsMethod[agent.type](agentInput, function(err, result){
          if(err){
          	console.error(err);
          	return;
          } 
          if(!result){
            return;
          }  
        });
			}
	  });
	},
	"fact": function(agent){
		eventsbus.addHandler("datetime", function(istart, obj){
			if(istart){
				if(!obj["datetime"]){
           return;
				}
				let agentInput = inputStr[agent.type](agent.options, obj);
        agentsMethod[agent.type](agentInput, function(err, result){
          if(err){
          	console.error(err);
          	return;
          }
          if(!result){
            return;
          }
          let output = {"fact":  result};
          eventsbus.emitEvent("fact", [true, obj ? {...obj, ...output} : output]);
        });
			}
	  });
	},
	"print_fact": function(agent){
		eventsbus.addHandler("fact", function(istart, obj){
			if(istart){
				if(!obj["fact"]){
           return;
				}
				let agentInput = inputStr[agent.type](agent.options, obj);
        agentsMethod[agent.type](agentInput, function(err, result){
          if(err){
          	console.error(err);
          	return;
          }   
          if(!result){
            return;
          }
        });
			}
	  });
	},
	"location": function(agent){
		eventsbus.addHandler("start", function(istart, obj){
			if(istart){

				let agentInput = inputStr[agent.type](agent.options, obj);
        agentsMethod[agent.type](agentInput,function(err, result){
        	if(err){
          	console.error(err);
          	return;
          }
          if(!result){
            return;
          }
          let output = {"location": result};
          eventsbus.emitEvent("location", [true, obj ? {...obj, ...output} : output]);
        });
			}
	  });
	},
	"sunset": function(agent){
		eventsbus.addHandler("test_data", function(istart, obj){
			if(istart){
				if(!obj["test_data"]){
           return;
				}
				let agentInput = inputStr[agent.type](agent.options, obj);
        agentsMethod[agent.type](agentInput, function(err, result){
          if(err){
          	console.error(err);
          	return;
          }
          if(!result){
            return;
          }
          let output = {"sunset": result};
          eventsbus.emitEvent("sunset", [true, obj ? {...obj, ...output} : output]);
        });
			}
	  });
		eventsbus.addHandler("location", function(istart, obj){
			if(istart){
				if(!obj["location"]){
           return;
				}
				let agentInput = inputStr[agent.type](agent.options, obj);
        agentsMethod[agent.type](agentInput, function(err, result){
          if(err){
          	console.error(err);
          	return;
          }
          if(!result){
            return;
          }
          let output = {"sunset": result};
          eventsbus.emitEvent("sunset", [true, obj ? {...obj, ...output} : output]);
        });
			}
	  });
	},
	"print": function(agent){
		eventsbus.addHandler("sunset", function(istart, obj){
			if(istart){
				if(!obj["sunset"]){
           return;
				}
				let agentInput = inputStr[agent.type](agent.options, obj);
        agentsMethod[agent.type](agentInput, function(err, result){
          if(err){
          	console.error(err);
          	return;
          }
          if(!result){
            return;
          }
        });
        
			}
	  });
	},
	"print_sunset": function(agent){
		eventsbus.addHandler("sunset", function(istart, obj){
			if(istart){
				if(!obj["sunset"]){
           return;
				}
				let agentInput = inputStr[agent.type](agent.options, obj);
        agentsMethod[agent.type](agentInput, function(err, result){
          if(err){
          	console.error(err);
          	return;
          }
          if(!result){
            return;
          }
        });
        
			}
	  });
	},
	"submit": function(agent){
		eventsbus.addHandler("sunset", function(istart, obj){
			if(istart){
				if(!obj["sunset"]){
           return;
				}
				let agentInput = inputStr[agent.type](agent.options, obj);
        agentsMethod[agent.type](agentInput, function(err, result){
          if(err){
          	console.error(err);
          	return;
          }
          let output = {"submit": result};
          eventsbus.emitEvent("submit", [true, obj ? {...obj, ...output} : output]);
        });
			}
	  });
	},
}
function Execute(args){
	let obj = validator.loadFile(args[0]);
	if(obj && validator.validateAgents(obj.agents)){
    for(let i = 0, size = obj.agents.length; i < size; i++){
    	events[obj.agents[i].name](obj.agents[i]);
    }
    eventsbus.emitEvent("start", true);
	}else{
		return console.log("ERROR: Invalid file or path");
	}

}
let args = process.argv.slice(2);
Execute(args);
module.exports.eventsTest = events;
module.exports.inputStrTest = inputStr;