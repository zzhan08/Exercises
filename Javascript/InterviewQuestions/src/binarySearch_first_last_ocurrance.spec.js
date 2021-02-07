let a = [2,4,5,10,10,10,13,13, 13,18,20];

let binarySearch = require("./binarySearch");

test('find last 13', () => {
  expect(binarySearch(a, 13, 0, 10, false)).toBe(8);
});
test('find first 13', () => {
  expect(binarySearch(a, 13, 0, 10, true)).toBe(6);
});
test('find 13', () => {
  expect(binarySearch(a, 13, 0, 10)).toBe(8);
});
test('find last 10', () => {
  expect(binarySearch(a, 10, 0, 10, false)).toBe(5);
});
test('find first 10', () => {
  expect(binarySearch(a, 10, 0, 10, true)).toBe(3);
});
test('find 10', () => {
  expect(binarySearch(a, 10, 0, 10)).toBe(5);
});
test('find 4', () => {
  expect(binarySearch(a, 4, 0, 10)).toBe(1);
});

test('find 11', () => {
  expect(binarySearch(a, 11, 0, 10)).toBe(-1);
});
