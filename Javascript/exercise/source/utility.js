'use strict';
function changeSecondPosition(start, i){
  if(start.length > 1){
    // if trible braces 
     start.shift();
  }
  start[1] = i;
  return start;
}
function forwardBraceArrMunipulate(start, i){
  if(i - start[start.length - 1] === 1){
    // if double braces
    return changeSecondPosition(start, i);
  }else{
    // if not double braces 
    start = [i];
    return start;
  }
}
function findSubstr(start, str, copyIter, end, splitedArray, obj){
  if(start.length === 2){
    if(start[0] !== 0){
      // if not fist char
      splitedArray.push(str.substring(copyIter, start[0]));
    }
    copyIter = (end[1] + 1) >= str.length ? str.length : (end[1] + 1);
    splitedArray.push(replaceText(str.substring(start[0], copyIter), obj));
  }
  return copyIter;   
}
function findTextsToReplace(str, obj){
	let start = []; let end = []; 
  let copyIter = 0;
  let splitedArray = [];
  
	const symbolProcessor = {
		"{": (i)=>{
  		if(start.length === 0){
  			start[0] = i;
  			return;
  		}
      start = forwardBraceArrMunipulate(start, i);
		},
		"}": (i)=>{
  		if(end.length === 0){
  			end[0] = i;
  			return;
  		}
			if((i - end[0] === 1)){
      	end[1] = i;
        copyIter = findSubstr(start, str, copyIter, end, splitedArray, obj);
      }
      start = [];
      end = [];
		}
	}

  for(let i = 0; i < str.length; i++){
    if(symbolProcessor[str[i]]){
      symbolProcessor[str[i]](i);
    }else{
      start = start.length === 1? [] : start;
      end = start.length === 1 || end.length === 1 ? [] : end;
    }
  }
  if(copyIter < str.length - 1){
    splitedArray.push(str.substring(copyIter));
  }
  return splitedArray.join("");
}
function replaceText(str, obj){
  if(str.length < 4){
    return str;
  }
  if(str === "{{}}"){
    return "";
  }
  if(str.length === 4 && str !== "{{}}"){
    return str;
  }
  let strs = str.substring(2, str.length - 2).split(".");
  let iter = obj;
  for(let i = 0, size = strs.length; i < size; i++){
    if(iter[strs[i]]){
      iter = iter[strs[i]];
    }else{
      iter = "";
      break;
    }

  }

  return iter || "";
}
module.exports.interpolate = findTextsToReplace;
module.exports.replaceTextTest = replaceText;