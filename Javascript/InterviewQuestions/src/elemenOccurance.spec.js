let a = [2,4,5,10,10,10,13,13, 13,18,20];

let binarySearch = require("./binarySearch");
test('find occurance of 10', () => {
	let first = binarySearch(a, 10, 0, 10, true);
	let last = binarySearch(a, 10, 0, 10, false);
  expect(first).toBe(3);
  expect(last).toBe(5);
  expect(last - first + 1).toBe(3);
});