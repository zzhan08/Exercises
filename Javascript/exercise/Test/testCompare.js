
function arrGenerator(size) {
// Create random array
  let alphabet = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
  let randNamesArr = [];
  for (let x = 0; x < size; x++) {
    let random = Math.floor(Math.random() * (alphabet.length - 1));
    randNamesArr.push({name:alphabet[random]});
  }
  //console.log(randNamesArr);
  return randNamesArr;
}

// Check using SET
let phaseNameUniqueCheck = (phases) => {
  let phaseNames = new Set();
  //	console.log(phases.length,"1name length:", phaseNames.size);

  for(let item of phases) {
  	if(phaseNames.has(item.name)){
  //		console.log("return");
      return false;
  	}
    phaseNames.add(item.name);
  }
  return true;
}

let phaseNameExistsCheck = (phases) => {
  let usedNames = [];
  for(let item of phases) {
  	console.log("2name length:", usedNames.length);
    if ( usedNames.length < 1 || -1 == usedNames.indexOf(item.name) ) {
      usedNames.push(item.name);
    }
    else {return false;}
  }
  return true;
}

const containsDuplicates = (phases) => {
  let i = 0;
  let j = 0;
  do {
    do {
      if(i != j && phases[i].name.toLowerCase() === phases[j].name.toLowerCase()) {
        return true;
      }
      j++;
    } while (j < phases.length);
    i++;
  } while (i < phases.length);
  return false;
}

// Code
let testDataArr = [];
const iterations = 500000;
for(let i = 0; i < iterations; i++ ){
  testDataArr.push(arrGenerator(40));
}
console.time('Function #phaseNameUniqueCheck');
for(let i = 0; i < testDataArr.length; i++ ){
  phaseNameUniqueCheck(testDataArr[i]);
}
console.timeEnd('Function #phaseNameUniqueCheck')
console.time('Function #phaseNameExistsCheck');
for(let i = 0; i < testDataArr.length; i++ ){
  phaseNameExistsCheck(testDataArr[i]);
}
console.timeEnd('Function #phaseNameExistsCheck')




/*
console.time('Function #containsDuplicates');
for(let i = 0; i < testDataArr.length; i++ ){
  containsDuplicates(testDataArr[i]);
}
console.timeEnd('Function #containsDuplicates')
*/
