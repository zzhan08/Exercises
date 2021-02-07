// promise = new Promise(function(onFulfilled, onRejected){
//     onFulfilled('arg1', 'arg2');
// }).then(function(a,b){
//   console.log("a",a);
//     console.log("b",b);

// });
// function makeRangeIterator(start = 0, end = Infinity, step = 1) {
//     let nextIndex = start;
//     let iterationCount = 0;

//     const rangeIterator = {
//        next: function() {
//            let result;
//            if (nextIndex < end) {
//                result = { value: nextIndex, done: false }
//                nextIndex += step;
//                iterationCount++;
//                return result;
//            }
//            return { value: iterationCount, done: true }
//        }
//     };
//     return rangeIterator;
// }
// function* makeRangeGenerator(start = 0, end = Infinity, step = 1) {
//     for (let i = start; i < end; i += step) {
//         yield i;
//     }
// }
// let it = makeRangeIterator(1, 10, 2);// makeRangeGenerator(1, 10, 2);

// let result = it.next();
// while (!result.done) {
//  console.log(result.value); // 1 3 5 7 9
//  result = it.next();
// }
let object = {
	*[Symbol.iterator](){
		yield 1;
		yield 3;
		yield 5;
	}
}

console.log("next", object.Symbol());

console.log("========================");
for (let value of object) { 
    console.log(value); 
}
// let gen = (function *(){
//   // yield 1;
//   // yield 2;
//   // yield 3;
//   yield* [1,2,3,4,5];
// })();


// for (let o of gen) {
//   console.log(o);
//   // break;  // Closes iterator
// }

// // The generator should not be re-used, the following does not make sense!
// for (let o of gen) {
//   console.log(o); // Never called.
// }
// (function() {
//   for (let argument of arguments) {
//     console.log(argument);
//   }
// })(1, 2, 3);
// let iterable = {
//   [Symbol.iterator]() {
//     return {
//       i: 0,
//       next() {
//         if (this.i < 3) {
//           return { value: this.i++, done: false };
//         }
//         return { value: undefined, done: true };
//       }
//     };
//   }
// };

// for (let value of iterable) {
//   console.log(value);
// }
// Object.prototype.objCustom = function() {}; 
// Array.prototype.arrCustom = function() {};

// let iterable = [3, 5, 7];
// iterable.foo = 'hello';

// for (let i in iterable) {
//   console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
// }
// for (let i of iterable) {
//   console.log(i); // logs 3, 5, 7
// }