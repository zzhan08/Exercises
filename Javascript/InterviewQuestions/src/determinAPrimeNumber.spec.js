function isPrimeNumber(num){
	if(!Number.isInteger(num)){
      return false;
	}
	if (num <= 1) return false;
 	if (num === 2) return true;
 	if (num % 2 === 0) return false;
 	let root = Math.sqrt(num);
	for(var i = 3; i < root; i+=2){
	    if (num % i === 0) {
	  		return false;
	    }
	}
	return true;
	
}
test('determin a prime number', () => {
	expect(isPrimeNumber(1)).toBe(false);
	expect(isPrimeNumber(2)).toBe(true);
	expect(isPrimeNumber(3)).toBe(true);
	expect(isPrimeNumber(5)).toBe(true);
	expect(isPrimeNumber(8)).toBe(false);
	expect(isPrimeNumber(12)).toBe(false);
	expect(isPrimeNumber(29)).toBe(true);
	expect(isPrimeNumber(0)).toBe(false);
	expect(isPrimeNumber(531)).toBe(false);
	expect(isPrimeNumber(547)).toBe(true);
});
