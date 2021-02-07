const PasswordGenerator = require('strict-password-generator').default;
 
const passwordGenerator = new PasswordGenerator();
 
const options = {
  upperCaseAlpha   : false,
  lowerCaseAlpha   : true,
  number           : true,
  specialCharacter : false,
  minimumLength    : 10,
  maximumLength    : 12
}
 
let password = passwordGenerator.generatePassword(options);
 
console.log(password); // example string : qa5859qoz8