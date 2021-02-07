function compareMark(markStack, item, mark){
  if(item == mark){
    markStack.pop();
  }else{
  	return false;
  }
  return true;
}
function balancedParentheses(str){
  if(typeof str !== "string"){
    return false;
  }
  let markStack = [];
  for(let a = 0; a < str.length; a++){
    let char = str.charAt(a);
    if(markStack.length == 0){
      markStack.push(char);
      continue;
    }
    if(char === "(" || char === "["|| char === "{"){
    	markStack.push(char);
    }else if(char === ")" || char === "]"|| char === "}"){
      if(char === ")"){
        if(!compareMark(markStack, markStack[markStack.length - 1], "(")){
          return false;
        }
      }else if(char === "]"){
        if(!compareMark(markStack, markStack[markStack.length - 1], "[")){
          return false;
        }
      }else if(char === "}"){
        if(!compareMark(markStack, markStack[markStack.length - 1], "{")){
          return false;
        }
      }
    }
  }
  return markStack.length === 0;
}


test('(a+b)', () => {
	let a = "(a+b)";
	expect(balancedParentheses(a)).toBe(true);
});


test('{(a+b)+(c+d)}', () => {
	let a = "{(a+b)+(c+d)}";
	expect(balancedParentheses(a)).toBe(true);
});

test('{(a+b)*(z)', () => {
	let a = "{(a+b)*(z)";
	expect(balancedParentheses(a)).toBe(false);
});

test('[2*3]+(A)]', () => {
	let a = "[2*3]+(A)]";
	expect(balancedParentheses(a)).toBe(false);
});

test('{a+Z]', () => {
	let a = "{a+Z]";
	expect(balancedParentheses(a)).toBe(false);
});

test('{a+Z]', () => {
	let a = "{a+Z]";
	expect(balancedParentheses(a)).toBe(false);
});
test('a+b)+(x+y)+(c+D', () => {
	let a = "{a+Z]";
	expect(balancedParentheses(a)).toBe(false);
});

test('c+[a+b+(c+d]*f)+a+b', () => {
	let a = "{a+Z]";
	expect(balancedParentheses(a)).toBe(false);
});