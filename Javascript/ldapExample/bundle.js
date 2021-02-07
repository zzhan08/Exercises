(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
(function (global){
'use strict';

// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
// original notice:

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
function compare(a, b) {
  if (a === b) {
    return 0;
  }

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) {
    return -1;
  }
  if (y < x) {
    return 1;
  }
  return 0;
}
function isBuffer(b) {
  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
    return global.Buffer.isBuffer(b);
  }
  return !!(b != null && b._isBuffer);
}

// based on node assert, original notice:

// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
  return function foo() {}.name === 'foo';
}());
function pToString (obj) {
  return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
  if (isBuffer(arrbuf)) {
    return false;
  }
  if (typeof global.ArrayBuffer !== 'function') {
    return false;
  }
  if (typeof ArrayBuffer.isView === 'function') {
    return ArrayBuffer.isView(arrbuf);
  }
  if (!arrbuf) {
    return false;
  }
  if (arrbuf instanceof DataView) {
    return true;
  }
  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
    return true;
  }
  return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
  if (!util.isFunction(func)) {
    return;
  }
  if (functionsHaveNames) {
    return func.name;
  }
  var str = func.toString();
  var match = str.match(regex);
  return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = getName(stackStartFunction);
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function truncate(s, n) {
  if (typeof s === 'string') {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}
function inspect(something) {
  if (functionsHaveNames || !util.isFunction(something)) {
    return util.inspect(something);
  }
  var rawname = getName(something);
  var name = rawname ? ': ' + rawname : '';
  return '[Function' +  name + ']';
}
function getMessage(self) {
  return truncate(inspect(self.actual), 128) + ' ' +
         self.operator + ' ' +
         truncate(inspect(self.expected), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
  }
};

function _deepEqual(actual, expected, strict, memos) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (isBuffer(actual) && isBuffer(expected)) {
    return compare(actual, expected) === 0;

  // 7.2. If the expected value is a Date object, the actual value is
  // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

  // 7.3 If the expected value is a RegExp object, the actual value is
  // equivalent if it is also a RegExp object with the same source and
  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source &&
           actual.global === expected.global &&
           actual.multiline === expected.multiline &&
           actual.lastIndex === expected.lastIndex &&
           actual.ignoreCase === expected.ignoreCase;

  // 7.4. Other pairs that do not both pass typeof value == 'object',
  // equivalence is determined by ==.
  } else if ((actual === null || typeof actual !== 'object') &&
             (expected === null || typeof expected !== 'object')) {
    return strict ? actual === expected : actual == expected;

  // If both values are instances of typed arrays, wrap their underlying
  // ArrayBuffers in a Buffer each to increase performance
  // This optimization requires the arrays to have the same type as checked by
  // Object.prototype.toString (aka pToString). Never perform binary
  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
  // bit patterns are not identical.
  } else if (isView(actual) && isView(expected) &&
             pToString(actual) === pToString(expected) &&
             !(actual instanceof Float32Array ||
               actual instanceof Float64Array)) {
    return compare(new Uint8Array(actual.buffer),
                   new Uint8Array(expected.buffer)) === 0;

  // 7.5 For all other Object pairs, including Array objects, equivalence is
  // determined by having the same number of owned properties (as verified
  // with Object.prototype.hasOwnProperty.call), the same set of keys
  // (although not necessarily the same order), equivalent values for every
  // corresponding key, and an identical 'prototype' property. Note: this
  // accounts for both named and indexed properties on Arrays.
  } else if (isBuffer(actual) !== isBuffer(expected)) {
    return false;
  } else {
    memos = memos || {actual: [], expected: []};

    var actualIndex = memos.actual.indexOf(actual);
    if (actualIndex !== -1) {
      if (actualIndex === memos.expected.indexOf(expected)) {
        return true;
      }
    }

    memos.actual.push(actual);
    memos.expected.push(expected);

    return objEquiv(actual, expected, strict, memos);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b, strict, actualVisitedObjects) {
  if (a === null || a === undefined || b === null || b === undefined)
    return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b))
    return a === b;
  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
    return false;
  var aIsArgs = isArguments(a);
  var bIsArgs = isArguments(b);
  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
    return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b, strict);
  }
  var ka = objectKeys(a);
  var kb = objectKeys(b);
  var key, i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length !== kb.length)
    return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] !== kb[i])
      return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
      return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, false)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
  if (_deepEqual(actual, expected, true)) {
    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
  }
}


// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  }

  try {
    if (actual instanceof expected) {
      return true;
    }
  } catch (e) {
    // Ignore.  The instanceof check doesn't work for arrow functions.
  }

  if (Error.isPrototypeOf(expected)) {
    return false;
  }

  return expected.call({}, actual) === true;
}

function _tryBlock(block) {
  var error;
  try {
    block();
  } catch (e) {
    error = e;
  }
  return error;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (typeof block !== 'function') {
    throw new TypeError('"block" argument must be a function');
  }

  if (typeof expected === 'string') {
    message = expected;
    expected = null;
  }

  actual = _tryBlock(block);

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
            (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  var userProvidedMessage = typeof message === 'string';
  var isUnwantedException = !shouldThrow && util.isError(actual);
  var isUnexpectedException = !shouldThrow && actual && !expected;

  if ((isUnwantedException &&
      userProvidedMessage &&
      expectedException(actual, expected)) ||
      isUnexpectedException) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if ((shouldThrow && actual && expected &&
      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
  _throws(true, block, error, message);
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
  _throws(false, block, error, message);
};

assert.ifError = function(err) { if (err) throw err; };

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"util/":5}],3:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],4:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}
},{}],5:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":4,"_process":17,"inherits":3}],6:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],7:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],8:[function(require,module,exports){
(function (Buffer){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this,require("buffer").Buffer)
},{"base64-js":6,"buffer":8,"ieee754":11}],9:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})
},{"../../is-buffer/index.js":13}],10:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}],11:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],12:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],13:[function(require,module,exports){
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

},{}],14:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],15:[function(require,module,exports){
exports.endianness = function () { return 'LE' };

exports.hostname = function () {
    if (typeof location !== 'undefined') {
        return location.hostname
    }
    else return '';
};

exports.loadavg = function () { return [] };

exports.uptime = function () { return 0 };

exports.freemem = function () {
    return Number.MAX_VALUE;
};

exports.totalmem = function () {
    return Number.MAX_VALUE;
};

exports.cpus = function () { return [] };

exports.type = function () { return 'Browser' };

exports.release = function () {
    if (typeof navigator !== 'undefined') {
        return navigator.appVersion;
    }
    return '';
};

exports.networkInterfaces
= exports.getNetworkInterfaces
= function () { return {} };

exports.arch = function () { return 'javascript' };

exports.platform = function () { return 'browser' };

exports.tmpdir = exports.tmpDir = function () {
    return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
	return '/'
};

},{}],16:[function(require,module,exports){
(function (process){
'use strict';

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}


}).call(this,require('_process'))
},{"_process":17}],17:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],18:[function(require,module,exports){
(function (global){
/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define('punycode', function() {
			return punycode;
		});
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],19:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],20:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],21:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":19,"./encode":20}],22:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');

},{"./lib/_stream_duplex.js":23}],23:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');

util.inherits(Duplex, Readable);

{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  pna.nextTick(cb, err);
};
},{"./_stream_readable":25,"./_stream_writable":27,"core-util-is":9,"inherits":12,"process-nextick-args":16}],24:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.

'use strict';

module.exports = PassThrough;

var Transform = require('./_stream_transform');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};
},{"./_stream_transform":26,"core-util-is":9,"inherits":12}],25:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = require('events').EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = require('./internal/streams/BufferList');
var destroyImpl = require('./internal/streams/destroy');
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;

  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_stream_duplex":23,"./internal/streams/BufferList":28,"./internal/streams/destroy":29,"./internal/streams/stream":30,"_process":17,"core-util-is":9,"events":10,"inherits":12,"isarray":14,"process-nextick-args":16,"safe-buffer":36,"string_decoder/":31,"util":7}],26:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.

'use strict';

module.exports = Transform;

var Duplex = require('./_stream_duplex');

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);

  cb(er);

  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}
},{"./_stream_duplex":23,"core-util-is":9,"inherits":12}],27:[function(require,module,exports){
(function (process,global,setImmediate){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.

'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: require('util-deprecate')
};
/*</replacement>*/

/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

var destroyImpl = require('./internal/streams/destroy');

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || require('./_stream_duplex');

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || require('./_stream_duplex');

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  pna.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("timers").setImmediate)
},{"./_stream_duplex":23,"./internal/streams/destroy":29,"./internal/streams/stream":30,"_process":17,"core-util-is":9,"inherits":12,"process-nextick-args":16,"safe-buffer":36,"timers":38,"util-deprecate":41}],28:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = require('safe-buffer').Buffer;
var util = require('util');

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}
},{"safe-buffer":36,"util":7}],29:[function(require,module,exports){
'use strict';

/*<replacement>*/

var pna = require('process-nextick-args');
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};
},{"process-nextick-args":16}],30:[function(require,module,exports){
module.exports = require('events').EventEmitter;

},{"events":10}],31:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

/*<replacement>*/

var Buffer = require('safe-buffer').Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}
},{"safe-buffer":36}],32:[function(require,module,exports){
module.exports = require('./readable').PassThrough

},{"./readable":33}],33:[function(require,module,exports){
exports = module.exports = require('./lib/_stream_readable.js');
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = require('./lib/_stream_writable.js');
exports.Duplex = require('./lib/_stream_duplex.js');
exports.Transform = require('./lib/_stream_transform.js');
exports.PassThrough = require('./lib/_stream_passthrough.js');

},{"./lib/_stream_duplex.js":23,"./lib/_stream_passthrough.js":24,"./lib/_stream_readable.js":25,"./lib/_stream_transform.js":26,"./lib/_stream_writable.js":27}],34:[function(require,module,exports){
module.exports = require('./readable').Transform

},{"./readable":33}],35:[function(require,module,exports){
module.exports = require('./lib/_stream_writable.js');

},{"./lib/_stream_writable.js":27}],36:[function(require,module,exports){
/* eslint-disable node/no-deprecated-api */
var buffer = require('buffer')
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

},{"buffer":8}],37:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = require('events').EventEmitter;
var inherits = require('inherits');

inherits(Stream, EE);
Stream.Readable = require('readable-stream/readable.js');
Stream.Writable = require('readable-stream/writable.js');
Stream.Duplex = require('readable-stream/duplex.js');
Stream.Transform = require('readable-stream/transform.js');
Stream.PassThrough = require('readable-stream/passthrough.js');

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

},{"events":10,"inherits":12,"readable-stream/duplex.js":22,"readable-stream/passthrough.js":32,"readable-stream/readable.js":33,"readable-stream/transform.js":34,"readable-stream/writable.js":35}],38:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)
},{"process/browser.js":17,"timers":38}],39:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var punycode = require('punycode');
var util = require('./util');

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = require('querystring');

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};

},{"./util":40,"punycode":18,"querystring":21}],40:[function(require,module,exports){
'use strict';

module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};

},{}],41:[function(require,module,exports){
(function (global){

/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],42:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],43:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"./support/isBuffer":42,"_process":17,"dup":5,"inherits":12}],44:[function(require,module,exports){
var ldap = require('ldapjs');
var assert = require('assert');

var client = ldap.createClient({
  url: 'ldap://127.0.0.1:1389'
});
client.bind('cn=root', 'secret', function(err) {
  assert.ifError(err);
  console.log("bind server with Error: ",err);
});
var entry = {
  cn: 'foo',
  sn: 'bar',
  email: ['foo@bar.com', 'foo1@bar.com'],
  objectclass: 'fooPerson'
};
client.add('cn=root, o=joyent', entry, function(err) {
  assert.ifError(err);
});
client.compare('cn=root, o=joyent', 'snx', 'bar1', function(err, matched) {
  assert.ifError(err);
  console.log('matched: ' + matched);
});
},{"assert":2,"ldapjs":75}],45:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js")})
},{"../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js":13}],46:[function(require,module,exports){
// Copyright 2015 Joyent, Inc.

var assert = require('assert');
var util = require('util');

var isDN = require('./dn').DN.isDN;
var isAttribute = require('./attribute').isAttribute;


///--- Helpers

// Copied from mcavage/node-assert-plus
function _assert(arg, type, name) {
  name = name || type;
  throw new assert.AssertionError({
    message: util.format('%s (%s) required', name, type),
    actual: typeof (arg),
    expected: type,
    operator: '===',
    stackStartFunction: _assert.caller
  });
}


///--- API

function stringDN(input, name) {
  if (isDN(input) || typeof (input) === 'string')
    return;
  _assert(input, 'DN or string', name);
}

function optionalStringDN(input, name) {
  if (input === undefined || isDN(input) || typeof (input) === 'string')
    return;
  _assert(input, 'DN or string', name);
}

function optionalDN(input, name) {
  if (input !== undefined && !isDN(input))
    _assert(input, 'DN', name);
}

function optionalArrayOfAttribute(input, name) {
  if (input === undefined)
    return;
  if (!Array.isArray(input) ||
      input.some(function (v) { return !isAttribute(v); })) {
  _assert(input, 'array of Attribute', name);
  }
}


///--- Exports

module.exports = {
  stringDN: stringDN,
  optionalStringDN: optionalStringDN,
  optionalDN: optionalDN,
  optionalArrayOfAttribute: optionalArrayOfAttribute
};

},{"./attribute":47,"./dn":59,"assert":2,"util":43}],47:[function(require,module,exports){
(function (Buffer){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert');

var asn1 = require('asn1');

var Protocol = require('./protocol');


///--- API

function Attribute(options) {
  if (options) {
    if (typeof (options) !== 'object')
      throw new TypeError('options must be an object');
    if (options.type && typeof (options.type) !== 'string')
      throw new TypeError('options.type must be a string');
  } else {
    options = {};
  }

  this.type = options.type || '';
  this._vals = [];

  if (options.vals !== undefined && options.vals !== null)
    this.vals = options.vals;
}

module.exports = Attribute;

Object.defineProperties(Attribute.prototype, {
  buffers: {
    get: function getBuffers() {
      return this._vals;
    },
    configurable: false
  },
  json: {
    get: function getJson() {
      return {
        type: this.type,
        vals: this.vals
      };
    },
    configurable: false
  },
  vals: {
    get: function getVals() {
      var eType = _bufferEncoding(this.type);
      return this._vals.map(function (v) {
        return v.toString(eType);
      });
    },
    set: function setVals(vals) {
      var self = this;
      this._vals = [];
      if (Array.isArray(vals)) {
        vals.forEach(function (v) {
          self.addValue(v);
        });
      } else {
        self.addValue(vals);
      }
    },
    configurable: false
  }
});


Attribute.prototype.addValue = function addValue(val) {
  if (Buffer.isBuffer(val)) {
    this._vals.push(val);
  } else {
    this._vals.push(new Buffer(val + '', _bufferEncoding(this.type)));
  }
};


/* BEGIN JSSTYLED */
Attribute.compare = function compare(a, b) {
  if (!(Attribute.isAttribute(a)) || !(Attribute.isAttribute(b))) {
    throw new TypeError('can only compare Attributes');
  }

  if (a.type < b.type) return -1;
  if (a.type > b.type) return 1;
  if (a.vals.length < b.vals.length) return -1;
  if (a.vals.length > b.vals.length) return 1;

  for (var i = 0; i < a.vals.length; i++) {
    if (a.vals[i] < b.vals[i]) return -1;
    if (a.vals[i] > b.vals[i]) return 1;
  }

  return 0;
};
/* END JSSTYLED */


Attribute.prototype.parse = function parse(ber) {
  assert.ok(ber);

  ber.readSequence();
  this.type = ber.readString();

  if (ber.peek() === Protocol.LBER_SET) {
    if (ber.readSequence(Protocol.LBER_SET)) {
      var end = ber.offset + ber.length;
      while (ber.offset < end)
        this._vals.push(ber.readString(asn1.Ber.OctetString, true));
    }
  }

  return true;
};


Attribute.prototype.toBer = function toBer(ber) {
  assert.ok(ber);

  ber.startSequence();
  ber.writeString(this.type);
  ber.startSequence(Protocol.LBER_SET);
  if (this._vals.length) {
    this._vals.forEach(function (b) {
      ber.writeByte(asn1.Ber.OctetString);
      ber.writeLength(b.length);
      for (var i = 0; i < b.length; i++)
        ber.writeByte(b[i]);
    });
  } else {
    ber.writeStringArray([]);
  }
  ber.endSequence();
  ber.endSequence();

  return ber;
};


Attribute.prototype.toString = function () {
  return JSON.stringify(this.json);
};


Attribute.toBer = function (attr, ber) {
  return Attribute.prototype.toBer.call(attr, ber);
};


Attribute.isAttribute = function isAttribute(attr) {
  if (!attr || typeof (attr) !== 'object') {
    return false;
  }
  if (attr instanceof Attribute) {
    return true;
  }
  if ((typeof (attr.toBer) === 'function') &&
      (typeof (attr.type) === 'string') &&
      (Array.isArray(attr.vals)) &&
      (attr.vals.filter(function (item) {
         return (typeof (item) === 'string' ||
                  Buffer.isBuffer(item));
       }).length === attr.vals.length)) {
    return true;
  }
  return false;
};


function _bufferEncoding(type) {
  /* JSSTYLED */
  return /;binary$/.test(type) ? 'base64' : 'utf8';
}

}).call(this,require("buffer").Buffer)
},{"./protocol":103,"asn1":111,"assert":2,"buffer":8}],48:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');

var Attribute = require('./attribute');
var Protocol = require('./protocol');


///--- API

function Change(options) {
  if (options) {
    assert.object(options);
    assert.optionalString(options.operation);
  } else {
    options = {};
  }

  this._modification = false;
  this.operation = options.operation || options.type || 'add';
  this.modification = options.modification || {};
}
Object.defineProperties(Change.prototype, {
  operation: {
    get: function getOperation() {
      switch (this._operation) {
      case 0x00: return 'add';
      case 0x01: return 'delete';
      case 0x02: return 'replace';
      default:
        throw new Error('0x' + this._operation.toString(16) + ' is invalid');
      }
    },
    set: function setOperation(val) {
      assert.string(val);
      switch (val.toLowerCase()) {
      case 'add':
        this._operation = 0x00;
        break;
      case 'delete':
        this._operation = 0x01;
        break;
      case 'replace':
        this._operation = 0x02;
        break;
      default:
        throw new Error('Invalid operation type: 0x' + val.toString(16));
      }
    },
    configurable: false
  },
  modification: {
    get: function getModification() {
      return this._modification;
    },
    set: function setModification(val) {
      if (Attribute.isAttribute(val)) {
        this._modification = val;
        return;
      }
      // Does it have an attribute-like structure
      if (Object.keys(val).length == 2 &&
          typeof (val.type) === 'string' &&
          Array.isArray(val.vals)) {
        this._modification = new Attribute({
          type: val.type,
          vals: val.vals
        });
        return;
      }

      var keys = Object.keys(val);
      if (keys.length > 1) {
        throw new Error('Only one attribute per Change allowed');
      } else if (keys.length === 0) {
        return;
      }

      var k = keys[0];
      var _attr = new Attribute({type: k});
      if (Array.isArray(val[k])) {
        val[k].forEach(function (v) {
          _attr.addValue(v.toString());
        });
      } else {
        _attr.addValue(val[k].toString());
      }
      this._modification = _attr;
    },
    configurable: false
  },
  json: {
    get: function getJSON() {
      return {
        operation: this.operation,
        modification: this._modification ? this._modification.json : {}
      };
    },
    configurable: false
  }
});

Change.isChange = function isChange(change) {
  if (!change || typeof (change) !== 'object') {
    return false;
  }
  if ((change instanceof Change) ||
      ((typeof (change.toBer) === 'function') &&
      (change.modification !== undefined) &&
      (change.operation !== undefined))) {
    return true;
  }
  return false;
};

Change.compare = function (a, b) {
  if (!Change.isChange(a) || !Change.isChange(b))
    throw new TypeError('can only compare Changes');

  if (a.operation < b.operation)
    return -1;
  if (a.operation > b.operation)
    return 1;

  return Attribute.compare(a.modification, b.modification);
};

/**
 * Apply a Change to properties of an object.
 *
 * @param {Object} change the change to apply.
 * @param {Object} obj the object to apply it to.
 * @param {Boolean} scalar convert single-item arrays to scalars. Default: false
 */
Change.apply = function apply(change, obj, scalar) {
  assert.string(change.operation);
  assert.string(change.modification.type);
  assert.ok(Array.isArray(change.modification.vals));
  assert.object(obj);

  var type = change.modification.type;
  var vals = change.modification.vals;
  var data = obj[type];
  if (data !== undefined) {
    if (!Array.isArray(data)) {
      data = [data];
    }
  } else {
    data = [];
  }
  switch (change.operation) {
  case 'replace':
    if (vals.length === 0) {
      // replace empty is a delete
      delete obj[type];
      return obj;
    } else {
      data = vals;
    }
    break;
  case 'add':
    // add only new unique entries
    var newValues = vals.filter(function (entry) {
      return (data.indexOf(entry) === -1);
    });
    data = data.concat(newValues);
    break;
  case 'delete':
    data = data.filter(function (entry) {
      return (vals.indexOf(entry) === -1);
    });
    if (data.length === 0) {
      // Erase the attribute if empty
      delete obj[type];
      return obj;
    }
    break;
  default:
    break;
  }
  if (scalar && data.length === 1) {
    // store single-value outputs as scalars, if requested
    obj[type] = data[0];
  } else {
    obj[type] = data;
  }
  return obj;
};


Change.prototype.parse = function (ber) {
  assert.ok(ber);

  ber.readSequence();
  this._operation = ber.readEnumeration();
  this._modification = new Attribute();
  this._modification.parse(ber);

  return true;
};


Change.prototype.toBer = function (ber) {
  assert.ok(ber);

  ber.startSequence();
  ber.writeEnumeration(this._operation);
  ber = this._modification.toBer(ber);
  ber.endSequence();

  return ber;
};


///--- Exports

module.exports = Change;

},{"./attribute":47,"./protocol":103,"assert-plus":112}],49:[function(require,module,exports){
(function (Buffer){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var EventEmitter = require('events').EventEmitter;
var net = require('net');
var tls = require('tls');
var util = require('util');

var once = require('once');
var backoff = require('backoff');
var vasync = require('vasync');
var assert = require('assert-plus');
var VError = require('verror').VError;

var Attribute = require('../attribute');
var Change = require('../change');
var Control = require('../controls/index').Control;
var SearchPager = require('./search_pager');
var Protocol = require('../protocol');
var dn = require('../dn');
var errors = require('../errors');
var filters = require('../filters');
var messages = require('../messages');
var url = require('../url');



///--- Globals

var AbandonRequest = messages.AbandonRequest;
var AddRequest = messages.AddRequest;
var BindRequest = messages.BindRequest;
var CompareRequest = messages.CompareRequest;
var DeleteRequest = messages.DeleteRequest;
var ExtendedRequest = messages.ExtendedRequest;
var ModifyRequest = messages.ModifyRequest;
var ModifyDNRequest = messages.ModifyDNRequest;
var SearchRequest = messages.SearchRequest;
var UnbindRequest = messages.UnbindRequest;
var UnbindResponse = messages.UnbindResponse;

var LDAPResult = messages.LDAPResult;
var SearchEntry = messages.SearchEntry;
var SearchReference = messages.SearchReference;
var SearchResponse = messages.SearchResponse;
var Parser = messages.Parser;

var PresenceFilter = filters.PresenceFilter;

var ConnectionError = errors.ConnectionError;

var CMP_EXPECT = [errors.LDAP_COMPARE_TRUE, errors.LDAP_COMPARE_FALSE];
var MAX_MSGID = Math.pow(2, 31) - 1;

// node 0.6 got rid of FDs, so make up a client id for logging
var CLIENT_ID = 0;



///--- Internal Helpers

function nextClientId() {
  if (++CLIENT_ID === MAX_MSGID)
    return 1;

  return CLIENT_ID;
}

function validateControls(controls) {
  if (Array.isArray(controls)) {
    controls.forEach(function (c) {
      if (!(c instanceof Control))
        throw new TypeError('controls must be [Control]');
    });
  } else if (controls instanceof Control) {
    controls = [controls];
  } else {
    throw new TypeError('controls must be [Control]');
  }

  return controls;
}

function ensureDN(input, strict) {
  if (dn.DN.isDN(input)) {
    return dn;
  } else if (strict) {
    return dn.parse(input);
  } else if (typeof (input) === 'string') {
    return input;
  } else {
    throw new Error('invalid DN');
  }
}

/**
 * Queue to contain LDAP requests.
 *
 * @param {Object} opts queue options
 *
 * Accepted Options:
 * - size: Maximum queue size
 * - timeout: Set timeout between first queue insertion and queue flush.
 */
function RequestQueue(opts) {
  if (!opts || typeof (opts) !== 'object') {
    opts = {};
  }
  this.size = (opts.size > 0) ? opts.size : Infinity;
  this.timeout = (opts.timeout > 0) ? opts.timeout : 0;
  this._queue = [];
  this._timer = null;
  this._frozen = false;
}

/**
 * Insert request into queue.
 *
 */
RequestQueue.prototype.enqueue = function enqueue(msg, expect, emitter, cb) {
  if (this._queue.length >= this.size || this._frozen) {
    return false;
  }
  var self = this;
  this._queue.push([msg, expect, emitter, cb]);
  if (this.timeout > 0) {
    if (this._timer !== null) {
      this._timer = setTimeout(function () {
          // If queue times out, don't allow new entries until thawed
          self.freeze();
          self.purge();
      }, this.timeout);
    }
  }
  return true;
};

/**
 * Process all queued requests with callback.
 */
RequestQueue.prototype.flush = function flush(cb) {
  if (this._timer) {
    clearTimeout(this._timer);
    this._timer = null;
  }
  var items = this._queue;
  this._queue = [];
  items.forEach(function (req) {
    cb(req[0], req[1], req[2], req[3]);
  });
};

/**
 * Purge all queued requests with an error.
 */
RequestQueue.prototype.purge = function purge() {
  this.flush(function (msg, expect, emitter, cb) {
    cb(new errors.TimeoutError('request queue timeout'));
  });
};

/**
 * Freeze queue, refusing any new entries.
 */
RequestQueue.prototype.freeze = function freeze() {
  this._frozen = true;
};

/**
 * Thaw queue, allowing new entries again.
 */
RequestQueue.prototype.thaw = function thaw() {
  this._frozen = false;
};


/**
 * Track message callback by messageID.
 */
function MessageTracker(opts) {
  assert.object(opts);
  assert.string(opts.id);
  assert.object(opts.parser);

  this.id = opts.id;
  this._msgid = 0;
  this._messages = {};
  this._abandoned = {};
  this.parser = opts.parser;

  var self = this;
  this.__defineGetter__('pending', function () {
    return Object.keys(self._messages);
  });
}

/**
 * Record a messageID and callback.
 */
MessageTracker.prototype.track = function track(message, callback) {
  var msgid = this._nextID();
  message.messageID = msgid;
  this._messages[msgid] = callback;
  return msgid;
};

/**
 * Fetch callback based on messageID.
 */
MessageTracker.prototype.fetch = function fetch(msgid) {
  var msg = this._messages[msgid];
  if (msg) {
    this._purgeAbandoned(msgid);
    return msg;
  }
  // It's possible that the server has not received the abandon request yet.
  // While waiting for evidence that the abandon has been received, incoming
  // messages that match the abandoned msgid will be handled as normal.
  msg = this._abandoned[msgid];
  if (msg) {
    return msg.cb;
  }
  return null;
};

/**
 * Cease tracking for a given messageID.
 */
MessageTracker.prototype.remove = function remove(msgid) {
  if (this._messages[msgid]) {
    delete this._messages[msgid];
  } else if (this._abandoned[msgid]) {
    delete this._abandoned[msgid];
  }
};

/**
 * Mark a messageID as abandoned.
 */
MessageTracker.prototype.abandon = function abandonMsg(msgid) {
  if (this._messages[msgid]) {
    // Keep track of "when" the message was abandoned
    this._abandoned[msgid] = {
      age: this._msgid,
      cb: this._messages[msgid]
    };
    delete this._messages[msgid];
  }
};

/**
 * Purge old items from abandoned list.
 */
MessageTracker.prototype._purgeAbandoned = function _purgeAbandoned(msgid) {
  var self = this;
  // Is (comp >= ref) according to sliding window
  function geWindow(ref, comp) {
    var max = ref + (MAX_MSGID/2);
    var min = ref;
    if (max >= MAX_MSGID) {
      // Handle roll-over
      max = max - MAX_MSGID - 1;
      return ((comp <= max) || (comp >= min));
    } else {
      return ((comp <= max) && (comp >= min));
    }
  }

  Object.keys(this._abandoned).forEach(function (id) {
    // Abandoned messageIDs can be forgotten if a received messageID is "newer"
    if (geWindow(self._abandoned[id].age, msgid)) {
      self._abandoned[id].cb(new errors.AbandonedError(
        'client request abandoned'));
      delete self._abandoned[id];
    }
  });
};

/**
 * Allocate the next messageID according to a sliding window.
 */
MessageTracker.prototype._nextID = function _nextID() {
  if (++this._msgid >= MAX_MSGID)
    this._msgid = 1;

  return this._msgid;
};

///--- API

/**
 * Constructs a new client.
 *
 * The options object is required, and must contain either a URL (string) or
 * a socketPath (string); the socketPath is only if you want to talk to an LDAP
 * server over a Unix Domain Socket.  Additionally, you can pass in a bunyan
 * option that is the result of `new Logger()`, presumably after you've
 * configured it.
 *
 * @param {Object} options must have either url or socketPath.
 * @throws {TypeError} on bad input.
 */
function Client(options) {
  assert.ok(options);

  EventEmitter.call(this, options);

  var self = this;
  var _url;
  if (options.url)
    _url = url.parse(options.url);
  this.host = _url ? _url.hostname : undefined;
  this.port = _url ? _url.port : false;
  this.secure = _url ? _url.secure : false;
  this.url = _url;
  this.tlsOptions = options.tlsOptions;
  this.socketPath = options.socketPath || false;

  this.log = options.log.child({clazz: 'Client'}, true);

  this.timeout = parseInt((options.timeout || 0), 10);
  this.connectTimeout = parseInt((options.connectTimeout || 0), 10);
  this.idleTimeout = parseInt((options.idleTimeout || 0), 10);
  if (options.reconnect) {
    // Fall back to defaults if options.reconnect === true
    var rOpts = (typeof (options.reconnect) === 'object') ?
      options.reconnect : {};
    this.reconnect = {
      initialDelay: parseInt(rOpts.initialDelay || 100, 10),
      maxDelay: parseInt(rOpts.maxDelay || 10000, 10),
      failAfter: parseInt(rOpts.failAfter, 10) || Infinity
    };
  }
  this.strictDN = (options.strictDN !== undefined) ? options.strictDN : true;

  this.queue = new RequestQueue({
    size: parseInt((options.queueSize || 0), 10),
    timeout: parseInt((options.queueTimeout || 0), 10)
  });
  if (options.queueDisable) {
    this.queue.freeze();
  }

  // Implicitly configure setup action to bind the client if bindDN and
  // bindCredentials are passed in.  This will more closely mimic PooledClient
  // auto-login behavior.
  if (options.bindDN !== undefined &&
      options.bindCredentials !== undefined) {
    this.on('setup', function (clt, cb) {
      clt.bind(options.bindDN, options.bindCredentials, function (err) {
        if (err) {
          self.emit('error', err);
        }
        cb(err);
      });
    });
  }

  this._socket = null;
  this.connected = false;
  this.connect();
}
util.inherits(Client, EventEmitter);
module.exports = Client;


/**
 * Sends an abandon request to the LDAP server.
 *
 * The callback will be invoked as soon as the data is flushed out to the
 * network, as there is never a response from abandon.
 *
 * @param {Number} messageID the messageID to abandon.
 * @param {Control} controls (optional) either a Control or [Control].
 * @param {Function} callback of the form f(err).
 * @throws {TypeError} on invalid input.
 */
Client.prototype.abandon = function abandon(messageID, controls, callback) {
  assert.number(messageID, 'messageID');
  if (typeof (controls) === 'function') {
    callback = controls;
    controls = [];
  } else {
    controls = validateControls(controls);
  }
  assert.func(callback, 'callback');

  var req = new AbandonRequest({
    abandonID: messageID,
    controls: controls
  });

  return this._send(req, 'abandon', null, callback);
};


/**
 * Adds an entry to the LDAP server.
 *
 * Entry can be either [Attribute] or a plain JS object where the
 * values are either a plain value or an array of values.  Any value (that's
 * not an array) will get converted to a string, so keep that in mind.
 *
 * @param {String} name the DN of the entry to add.
 * @param {Object} entry an array of Attributes to be added or a JS object.
 * @param {Control} controls (optional) either a Control or [Control].
 * @param {Function} callback of the form f(err, res).
 * @throws {TypeError} on invalid input.
 */
Client.prototype.add = function add(name, entry, controls, callback) {
  assert.ok(name !== undefined, 'name');
  assert.object(entry, 'entry');
  if (typeof (controls) === 'function') {
    callback = controls;
    controls = [];
  } else {
    controls = validateControls(controls);
  }
  assert.func(callback, 'callback');

  if (Array.isArray(entry)) {
    entry.forEach(function (a) {
      if (!Attribute.isAttribute(a))
        throw new TypeError('entry must be an Array of Attributes');
    });
  } else {
    var save = entry;

    entry = [];
    Object.keys(save).forEach(function (k) {
      var attr = new Attribute({type: k});
      if (Array.isArray(save[k])) {
        save[k].forEach(function (v) {
          attr.addValue(v.toString());
        });
      } else {
        attr.addValue(save[k].toString());
      }
      entry.push(attr);
    });
  }

  var req = new AddRequest({
    entry: ensureDN(name, this.strictDN),
    attributes: entry,
    controls: controls
  });

  return this._send(req, [errors.LDAP_SUCCESS], null, callback);
};


/**
 * Performs a simple authentication against the server.
 *
 * @param {String} name the DN to bind as.
 * @param {String} credentials the userPassword associated with name.
 * @param {Control} controls (optional) either a Control or [Control].
 * @param {Function} callback of the form f(err, res).
 * @throws {TypeError} on invalid input.
 */
Client.prototype.bind = function bind(name,
                                      credentials,
                                      controls,
                                      callback,
                                      _bypass) {
  if (typeof (name) !== 'string' && !(name instanceof dn.DN))
    throw new TypeError('name (string) required');
  assert.optionalString(credentials, 'credentials');
  if (typeof (controls) === 'function') {
    callback = controls;
    controls = [];
  } else {
    controls = validateControls(controls);
  }
  assert.func(callback, 'callback');

  var req = new BindRequest({
    name: name || '',
    authentication: 'Simple',
    credentials: credentials || '',
    controls: controls
  });

  return this._send(req, [errors.LDAP_SUCCESS], null, callback, _bypass);
};


/**
 * Compares an attribute/value pair with an entry on the LDAP server.
 *
 * @param {String} name the DN of the entry to compare attributes with.
 * @param {String} attr name of an attribute to check.
 * @param {String} value value of an attribute to check.
 * @param {Control} controls (optional) either a Control or [Control].
 * @param {Function} callback of the form f(err, boolean, res).
 * @throws {TypeError} on invalid input.
 */
Client.prototype.compare = function compare(name,
                                            attr,
                                            value,
                                            controls,
                                            callback) {
  assert.ok(name !== undefined, 'name');
  assert.string(attr, 'attr');
  assert.string(value, 'value');
  if (typeof (controls) === 'function') {
    callback = controls;
    controls = [];
  } else {
    controls = validateControls(controls);
  }
  assert.func(callback, 'callback');

  var req = new CompareRequest({
    entry: ensureDN(name, this.strictDN),
    attribute: attr,
    value: value,
    controls: controls
  });

  return this._send(req, CMP_EXPECT, null, function (err, res) {
    if (err)
      return callback(err);

    return callback(null, (res.status === errors.LDAP_COMPARE_TRUE), res);
  });
};


/**
 * Deletes an entry from the LDAP server.
 *
 * @param {String} name the DN of the entry to delete.
 * @param {Control} controls (optional) either a Control or [Control].
 * @param {Function} callback of the form f(err, res).
 * @throws {TypeError} on invalid input.
 */
Client.prototype.del = function del(name, controls, callback) {
  assert.ok(name !== undefined, 'name');
  if (typeof (controls) === 'function') {
    callback = controls;
    controls = [];
  } else {
    controls = validateControls(controls);
  }
  assert.func(callback, 'callback');

  var req = new DeleteRequest({
    entry: ensureDN(name, this.strictDN),
    controls: controls
  });

  return this._send(req, [errors.LDAP_SUCCESS], null, callback);
};


/**
 * Performs an extended operation on the LDAP server.
 *
 * Pretty much none of the LDAP extended operations return an OID
 * (responseName), so I just don't bother giving it back in the callback.
 * It's on the third param in `res` if you need it.
 *
 * @param {String} name the OID of the extended operation to perform.
 * @param {String} value value to pass in for this operation.
 * @param {Control} controls (optional) either a Control or [Control].
 * @param {Function} callback of the form f(err, value, res).
 * @throws {TypeError} on invalid input.
 */
Client.prototype.exop = function exop(name, value, controls, callback) {
  assert.string(name, 'name');
  if (typeof (value) === 'function') {
    callback = value;
    controls = [];
    value = '';
  }
  if (!(Buffer.isBuffer(value) || typeof (value) === 'string'))
    throw new TypeError('value (Buffer || string) required');
  if (typeof (controls) === 'function') {
    callback = controls;
    controls = [];
  } else {
    controls = validateControls(controls);
  }
  assert.func(callback, 'callback');

  var req = new ExtendedRequest({
    requestName: name,
    requestValue: value,
    controls: controls
  });

  return this._send(req, [errors.LDAP_SUCCESS], null, function (err, res) {
    if (err)
      return callback(err);

    return callback(null, res.responseValue || '', res);
  });
};


/**
 * Performs an LDAP modify against the server.
 *
 * @param {String} name the DN of the entry to modify.
 * @param {Change} change update to perform (can be [Change]).
 * @param {Control} controls (optional) either a Control or [Control].
 * @param {Function} callback of the form f(err, res).
 * @throws {TypeError} on invalid input.
 */
Client.prototype.modify = function modify(name, change, controls, callback) {
  assert.ok(name !== undefined, 'name');
  assert.object(change, 'change');

  var changes = [];

  function changeFromObject(change) {
    if (!change.operation && !change.type)
      throw new Error('change.operation required');
    if (typeof (change.modification) !== 'object')
      throw new Error('change.modification (object) required');

    if (Object.keys(change.modification).length == 2 &&
        typeof (change.modification.type) === 'string' &&
        Array.isArray(change.modification.vals)) {
      // Use modification directly if it's already normalized:
      changes.push(new Change({
        operation: change.operation || change.type,
        modification: change.modification
      }));
    } else {
      // Normalize the modification object
      Object.keys(change.modification).forEach(function (k) {
        var mod = {};
        mod[k] = change.modification[k];
        changes.push(new Change({
          operation: change.operation || change.type,
          modification: mod
        }));
      });
    }
  }

  if (Change.isChange(change)) {
    changes.push(change);
  } else if (Array.isArray(change)) {
    change.forEach(function (c) {
      if (Change.isChange(c)) {
        changes.push(c);
      } else {
        changeFromObject(c);
      }
    });
  } else {
    changeFromObject(change);
  }

  if (typeof (controls) === 'function') {
    callback = controls;
    controls = [];
  } else {
    controls = validateControls(controls);
  }
  assert.func(callback, 'callback');

  var req = new ModifyRequest({
    object: ensureDN(name, this.strictDN),
    changes: changes,
    controls: controls
  });

  return this._send(req, [errors.LDAP_SUCCESS], null, callback);
};


/**
 * Performs an LDAP modifyDN against the server.
 *
 * This does not allow you to keep the old DN, as while the LDAP protocol
 * has a facility for that, it's stupid. Just Search/Add.
 *
 * This will automatically deal with "new superior" logic.
 *
 * @param {String} name the DN of the entry to modify.
 * @param {String} newName the new DN to move this entry to.
 * @param {Control} controls (optional) either a Control or [Control].
 * @param {Function} callback of the form f(err, res).
 * @throws {TypeError} on invalid input.
 */
Client.prototype.modifyDN = function modifyDN(name,
                                              newName,
                                              controls,
                                              callback) {
  assert.ok(name !== undefined, 'name');
  assert.string(newName, 'newName');
  if (typeof (controls) === 'function') {
    callback = controls;
    controls = [];
  } else {
    controls = validateControls(controls);
  }
  assert.func(callback);

  var DN = ensureDN(name);
  // TODO: is non-strict handling desired here?
  var newDN = dn.parse(newName);

  var req = new ModifyDNRequest({
    entry: DN,
    deleteOldRdn: true,
    controls: controls
  });

  if (newDN.length !== 1) {
    req.newRdn = dn.parse(newDN.rdns.shift().toString());
    req.newSuperior = newDN;
  } else {
    req.newRdn = newDN;
  }

  return this._send(req, [errors.LDAP_SUCCESS], null, callback);
};


/**
 * Performs an LDAP search against the server.
 *
 * Note that the defaults for options are a 'base' search, if that's what
 * you want you can just pass in a string for options and it will be treated
 * as the search filter.  Also, you can either pass in programatic Filter
 * objects or a filter string as the filter option.
 *
 * Note that this method is 'special' in that the callback 'res' param will
 * have two important events on it, namely 'entry' and 'end' that you can hook
 * to.  The former will emit a SearchEntry object for each record that comes
 * back, and the latter will emit a normal LDAPResult object.
 *
 * @param {String} base the DN in the tree to start searching at.
 * @param {Object} options parameters:
 *                           - {String} scope default of 'base'.
 *                           - {String} filter default of '(objectclass=*)'.
 *                           - {Array} attributes [string] to return.
 *                           - {Boolean} attrsOnly whether to return values.
 * @param {Control} controls (optional) either a Control or [Control].
 * @param {Function} callback of the form f(err, res).
 * @throws {TypeError} on invalid input.
 */
Client.prototype.search = function search(base,
                                          options,
                                          controls,
                                          callback,
                                          _bypass) {
  assert.ok(base !== undefined, 'search base');
  if (Array.isArray(options) || (options instanceof Control)) {
    controls = options;
    options = {};
  } else if (typeof (options) === 'function') {
    callback = options;
    controls = [];
    options = {
      filter: new PresenceFilter({attribute: 'objectclass'})
    };
  } else if (typeof (options) === 'string') {
    options = {filter: filters.parseString(options)};
  } else if (typeof (options) !== 'object') {
    throw new TypeError('options (object) required');
  }
  if (typeof (options.filter) === 'string') {
    options.filter = filters.parseString(options.filter);
  } else if (!options.filter) {
    options.filter = new PresenceFilter({attribute: 'objectclass'});
  } else if (!filters.isFilter(options.filter)) {
    throw new TypeError('options.filter (Filter) required');
  }
  if (typeof (controls) === 'function') {
    callback = controls;
    controls = [];
  } else {
    controls = validateControls(controls);
  }
  assert.func(callback, 'callback');

  if (options.attributes) {
    if (!Array.isArray(options.attributes)) {
      if (typeof (options.attributes) === 'string') {
        options.attributes = [options.attributes];
      } else {
        throw new TypeError('options.attributes must be an Array of Strings');
      }
    }
  }

  var self = this;
  var baseDN = ensureDN(base, this.strictDN);

  function sendRequest(ctrls, emitter, cb) {
    var req = new SearchRequest({
      baseObject: baseDN,
      scope: options.scope || 'base',
      filter: options.filter,
      derefAliases: options.derefAliases || Protocol.NEVER_DEREF_ALIASES,
      sizeLimit: options.sizeLimit || 0,
      timeLimit: options.timeLimit || 10,
      typesOnly: options.typesOnly || false,
      attributes: options.attributes || [],
      controls: ctrls
    });

    return self._send(req,
        [errors.LDAP_SUCCESS],
        emitter,
        cb,
        _bypass);
  }

  if (options.paged) {
    // Perform automated search paging
    var pageOpts = typeof (options.paged) === 'object' ? options.paged : {};
    var size = 100; // Default page size
    if (pageOpts.pageSize > 0) {
      size = pageOpts.pageSize;
    } else if (options.sizeLimit > 1)  {
      // According to the RFC, servers should ignore the paging control if
      // pageSize >= sizelimit.  Some might still send results, but it's safer
      // to stay under that figure when assigning a default value.
      size = options.sizeLimit - 1;
    }

    var pager = new SearchPager({
      callback: callback,
      controls: controls,
      pageSize: size,
      pagePause: pageOpts.pagePause
    });
    pager.on('search', sendRequest);
    pager.begin();
  } else {
    sendRequest(controls, new EventEmitter(), callback);
  }
};


/**
 * Unbinds this client from the LDAP server.
 *
 * Note that unbind does not have a response, so this callback is actually
 * optional; either way, the client is disconnected.
 *
 * @param {Function} callback of the form f(err).
 * @throws {TypeError} if you pass in callback as not a function.
 */
Client.prototype.unbind = function unbind(callback) {
  if (!callback)
    callback = function () {};

  if (typeof (callback) !== 'function')
    throw new TypeError('callback must be a function');

  // When the socket closes, it is useful to know whether it was due to a
  // user-initiated unbind or something else.
  this.unbound = true;

  if (!this._socket)
    return callback();

  var req = new UnbindRequest();
  return this._send(req, 'unbind', null, callback);
};


/**
 * Attempt to secure connection with StartTLS.
 */
Client.prototype.starttls = function starttls(options,
                                              controls,
                                              callback,
                                              _bypass) {
  assert.optionalObject(options);
  options = options || {};
  callback = once(callback);
  var self = this;

  if (this._starttls) {
    return callback(new Error('STARTTLS already in progress or active'));
  }

  function onSend(err, emitter) {
    if (err) {
      callback(err);
      return;
    }
    /*
     * Now that the request has been sent, block all outgoing messages
     * until an error is received or we successfully complete the setup.
     */
    // TODO: block traffic
    self._starttls = {
      started: true
    };

    emitter.on('error', function (err) {
      self._starttls = null;
      callback(err);
    });
    emitter.on('end', function (res) {
      var sock = self._socket;
      /*
       * Unplumb socket data during SSL negotiation.
       * This will prevent the LDAP parser from stumbling over the TLS
       * handshake and raising a ruckus.
       */
      sock.removeAllListeners('data');

      options.socket = sock;
      var secure = tls.connect(options);
      secure.once('secureConnect', function () {
        /*
         * Wire up 'data' and 'error' handlers like the normal socket.
         * Handling 'end' events isn't necessary since the underlying socket
         * will handle those.
         */
        secure.removeAllListeners('error');
        secure.on('data', function onData(data) {
          if (self.log.trace())
            self.log.trace('data event: %s', util.inspect(data));

          self._tracker.parser.write(data);
        });
        secure.on('error', function (err)  {
          if (self.log.trace())
            self.log.trace({err: err}, 'error event: %s', new Error().stack);

          self.emit('error', err);
          sock.destroy();
        });
        callback(null);
      });
      secure.once('error', function (err) {
        // If the SSL negotiation failed, to back to plain mode.
        self._starttls = null;
        secure.removeAllListeners();
        callback(err);
      });
      self._starttls.success = true;
      self._socket = secure;
    });
  }

  var req = new ExtendedRequest({
    requestName: '1.3.6.1.4.1.1466.20037',
    requestValue: null,
    controls: controls
  });

  return this._send(req,
      [errors.LDAP_SUCCESS],
      new EventEmitter(),
      onSend,
      _bypass);
};


/**
 * Disconnect from the LDAP server and do not allow reconnection.
 *
 * If the client is instantiated with proper reconnection options, it's
 * possible to initiate new requests after a call to unbind since the client
 * will attempt to reconnect in order to fulfill the request.
 *
 * Calling destroy will prevent any further reconnection from occurring.
 *
 * @param {Object} err (Optional) error that was cause of client destruction
 */
Client.prototype.destroy = function destroy(err) {
  this.destroyed = true;
  this.queue.freeze();
  // Purge any queued requests which are now meaningless
  this.queue.flush(function (msg, expect, emitter, cb) {
    if (typeof (cb) === 'function') {
      cb(new Error('client destroyed'));
      }
  });
  if (this.connected) {
    this.unbind();
  } else if (this._socket) {
    this._socket.destroy();
  }
  this.emit('destroy', err);
};


/**
 * Initiate LDAP connection.
 */
Client.prototype.connect = function connect() {
  if (this.connecting || this.connected) {
    return;
  }
  var self = this;
  var log = this.log;
  var socket;
  var tracker;

  // Establish basic socket connection
  function connectSocket(cb) {
    cb = once(cb);

    function onResult(err, res) {
      if (err) {
        if (self.connectTimer) {
          clearTimeout(self.connectTimer);
          self.connectTimer = null;
        }
        self.emit('connectError', err);
      }
      cb(err, res);
    }
    function onConnect() {
      if (self.connectTimer) {
        clearTimeout(self.connectTimer);
        self.connectTimer = null;
      }
      socket.removeAllListeners('error')
        .removeAllListeners('connect')
        .removeAllListeners('secureConnect');

      tracker.id = nextClientId() + '__' + tracker.id;
      self.log = self.log.child({ldap_id: tracker.id}, true);

      // Move on to client setup
      setupClient(cb);
    }

    var port = (self.port || self.socketPath);
    if (self.secure) {
      socket = tls.connect(port, self.host, self.tlsOptions);
      socket.once('secureConnect', onConnect);
    } else {
      socket = net.connect(port, self.host);
      socket.once('connect', onConnect);
    }
    socket.once('error', onResult);
    initSocket();

    // Setup connection timeout handling, if desired
    if (self.connectTimeout) {
      self.connectTimer = setTimeout(function onConnectTimeout() {
        if (!socket || !socket.readable || !socket.writeable) {
          socket.destroy();
          self._socket = null;
          onResult(new ConnectionError('connection timeout'));
        }
      }, self.connectTimeout);
    }
  }

  // Initialize socket events and LDAP parser.
  function initSocket() {
    tracker = new MessageTracker({
      id: self.url ? self.url.href : self.socketPath,
      parser: new Parser({log: log})
    });

    // This won't be set on TLS. So. Very. Annoying.
    if (typeof (socket.setKeepAlive) !== 'function') {
      socket.setKeepAlive = function setKeepAlive(enable, delay) {
        return socket.socket ?
          socket.socket.setKeepAlive(enable, delay) : false;
      };
    }

    socket.on('data', function onData(data) {
      if (log.trace())
        log.trace('data event: %s', util.inspect(data));

      tracker.parser.write(data);
    });

    // The "router"
    tracker.parser.on('message', function onMessage(message) {
      message.connection = self._socket;
      var callback = tracker.fetch(message.messageID);

      if (!callback) {
        log.error({message: message.json}, 'unsolicited message');
        return false;
      }

      return callback(message);
    });

    tracker.parser.on('error', function onParseError(err) {
      self.emit('error', new VError(err, 'Parser error for %s',
            tracker.id));
      self.connected = false;
      socket.end();
    });
  }

  // After connect, register socket event handlers and run any setup actions
  function setupClient(cb) {
    cb = once(cb);

    // Indicate failure if anything goes awry during setup
    function bail(err) {
      socket.destroy();
      cb(err || new Error('client error during setup'));
    }
    // Work around lack of close event on tls.socket in node < 0.11
    ((socket.socket) ? socket.socket : socket).once('close', bail);
    socket.once('error', bail);
    socket.once('end', bail);
    socket.once('timeout', bail);

    self._socket = socket;
    self._tracker = tracker;

    // Run any requested setup (such as automatically performing a bind) on
    // socket before signalling successful connection.
    // This setup needs to bypass the request queue since all other activity is
    // blocked until the connection is considered fully established post-setup.
    // Only allow bind/search/starttls for now.
    var basicClient = {
      bind: function bindBypass(name, credentials, controls, callback) {
        return self.bind(name, credentials, controls, callback, true);
      },
      search: function searchBypass(base, options, controls, callback) {
        return self.search(base, options, controls, callback, true);
      },
      starttls: function starttlsBypass(options, controls, callback) {
        return self.starttls(options, controls, callback, true);
      },
      unbind: self.unbind.bind(self)
    };
    vasync.forEachPipeline({
      func: function (f, callback) {
        f(basicClient, callback);
      },
      inputs: self.listeners('setup')
    }, function (err, res) {
      if (err) {
        self.emit('setupError', err);
      }
      cb(err);
    });
  }

  // Wire up "official" event handlers after successful connect/setup
  function postSetup() {
    socket.removeAllListeners('error')
      .removeAllListeners('close')
      .removeAllListeners('end')
      .removeAllListeners('timeout');

    // Work around lack of close event on tls.socket in node < 0.11
    ((socket.socket) ? socket.socket : socket).once('close',
      self._onClose.bind(self));
    socket.on('end', function onEnd() {
      if (log.trace())
        log.trace('end event');

      self.emit('end');
      socket.end();
    });
    socket.on('error', function onSocketError(err) {
      if (log.trace())
        log.trace({err: err}, 'error event: %s', new Error().stack);

      self.emit('error', err);
      socket.destroy();
    });
    socket.on('timeout', function onTimeout() {
      if (log.trace())
        log.trace('timeout event');

      self.emit('socketTimeout');
      socket.end();
    });
  }

  var retry;
  var failAfter;
  if (this.reconnect) {
    retry = backoff.exponential({
      initialDelay: this.reconnect.initialDelay,
      maxDelay: this.reconnect.maxDelay
    });
    failAfter = this.reconnect.failAfter;
  } else {
    retry = backoff.exponential({
      initialDelay: 1,
      maxDelay: 2
    });
    failAfter = 1;
  }
  retry.failAfter(failAfter);

  retry.on('ready', function (num, delay) {
    if (self.destroyed) {
      // Cease connection attempts if destroyed
      return;
    }
    connectSocket(function (err) {
      if (!err) {
        postSetup();
        self.connecting = false;
        self.connected = true;
        self.emit('connect', socket);
        self.log.debug('connected after %d attempt(s)', num+1);
        // Flush any queued requests
        self._flushQueue();
        self._connectRetry = null;
      } else {
        retry.backoff(err);
      }
    });
  });
  retry.on('fail', function (err) {
    if (self.destroyed) {
      // Silence any connect/setup errors if destroyed
      return;
    }
    self.log.debug('failed to connect after %d attempts', failAfter);
    // Communicate the last-encountered error
    if (err instanceof ConnectionError) {
      self.emit('connectTimeout', err);
    } else {
      self.emit('error', err);
    }
  });

  this._connectRetry = retry;
  this.connecting = true;
  retry.backoff();
};



///--- Private API

/**
 * Flush queued requests out to the socket.
 */
Client.prototype._flushQueue = function _flushQueue() {
  // Pull items we're about to process out of the queue.
  this.queue.flush(this._send.bind(this));
};

/**
 * Clean up socket/parser resources after socket close.
 */
Client.prototype._onClose = function _onClose(had_err) {
  var socket = this._socket;
  var tracker = this._tracker;
  socket.removeAllListeners('connect')
    .removeAllListeners('data')
    .removeAllListeners('drain')
    .removeAllListeners('end')
    .removeAllListeners('error')
    .removeAllListeners('timeout');
  this._socket = null;
  this.connected = false;

  ((socket.socket) ? socket.socket : socket).removeAllListeners('close');

  if (this.log.trace())
    this.log.trace('close event had_err=%s', had_err ? 'yes' : 'no');

  this.emit('close', had_err);
  // On close we have to walk the outstanding messages and go invoke their
  // callback with an error.
  tracker.pending.forEach(function (msgid) {
    var cb = tracker.fetch(msgid);
    tracker.remove(msgid);

    if (socket.unbindMessageID !== parseInt(msgid, 10)) {
      return cb(new ConnectionError(tracker.id + ' closed'));
    } else {
      // Unbinds will be communicated as a success since we're closed
      var unbind = new UnbindResponse({messageID: msgid});
      unbind.status = 'unbind';
      return cb(unbind);
    }
  });

  // Trash any parser or starttls state
  this._tracker = null;
  delete this._starttls;

  // Automatically fire reconnect logic if the socket was closed for any reason
  // other than a user-initiated unbind.
  if (this.reconnect && !this.unbound) {
    this.connect();
  }
  this.unbound = false;
  return false;
};

/**
 * Maintain idle timer for client.
 *
 * Will start timer to fire 'idle' event if conditions are satisfied.  If
 * conditions are not met and a timer is running, it will be cleared.
 *
 * @param {Boolean} override explicitly disable timer.
 */
Client.prototype._updateIdle = function _updateIdle(override) {
  if (this.idleTimeout === 0) {
    return;
  }
  // Client must be connected but not waiting on any request data
  var self = this;
  function isIdle(disable) {
    return ((disable !== true) &&
      (self._socket && self.connected) &&
      (self._tracker.pending.length === 0));
  }
  if (isIdle(override)) {
    if (!this._idleTimer) {
      this._idleTimer = setTimeout(function () {
        // Double-check idleness in case socket was torn down
        if (isIdle()) {
          self.emit('idle');
        }
      }, this.idleTimeout);
    }
  } else {
    if (this._idleTimer) {
      clearTimeout(this._idleTimer);
      this._idleTimer = null;
    }
  }
};

/**
 * Attempt to send an LDAP request.
 */
Client.prototype._send = function _send(message,
                                        expect,
                                        emitter,
                                        callback,
                                        _bypass) {
  assert.ok(message);
  assert.ok(expect);
  assert.optionalObject(emitter);
  assert.ok(callback);

  // Allow connect setup traffic to bypass checks
  if (_bypass && this._socket && this._socket.writable) {
    return this._sendSocket(message, expect, emitter, callback);
  }
  if (!this._socket || !this.connected) {
    if (!this.queue.enqueue(message, expect, emitter, callback)) {
      callback(new ConnectionError('connection unavailable'));
    }
    // Initiate reconnect if needed
    if (this.reconnect) {
      this.connect();
    }
    return false;
  } else {
    this._flushQueue();
    return this._sendSocket(message, expect, emitter, callback);
  }
};

Client.prototype._sendSocket = function _sendSocket(message,
                                                    expect,
                                                    emitter,
                                                    callback) {
  var conn = this._socket;
  var tracker = this._tracker;
  var log = this.log;
  var self = this;
  var timer = false;
  var sentEmitter = false;

  function sendResult(event, obj) {
    if (event === 'error' && self.listeners('resultError')) {
      self.emit('resultError', obj);
    }
    if (emitter) {
      if (event === 'error') {
        // Error will go unhandled if emitter hasn't been sent via callback.
        // Execute callback with the error instead.
        if (!sentEmitter)
          return callback(obj);
      }
      return emitter.emit(event, obj);
    }

    if (event === 'error')
      return callback(obj);

    return callback(null, obj);
  }

  function messageCallback(msg) {
    if (timer)
      clearTimeout(timer);

    if (log.trace())
      log.trace({msg: msg ? msg.json : null}, 'response received');

    if (expect === 'abandon')
      return sendResult('end', null);

    if (msg instanceof SearchEntry || msg instanceof SearchReference) {
      var event = msg.constructor.name;
      event = event[0].toLowerCase() + event.slice(1);
      return sendResult(event, msg);
    } else {
      tracker.remove(message.messageID);
      // Potentially mark client as idle
      self._updateIdle();

      if (msg instanceof LDAPResult) {
        if (expect.indexOf(msg.status) === -1) {
          return sendResult('error', errors.getError(msg));
        }
        return sendResult('end', msg);
      } else if (msg instanceof Error) {
        return sendResult('error', msg);
      } else {
        return sendResult('error', new errors.ProtocolError(msg.type));
      }
    }
  }

  function onRequestTimeout() {
    self.emit('timeout', message);
    var cb = tracker.fetch(message.messageID);
    if (cb) {
      //FIXME: the timed-out request should be abandoned
      cb(new errors.TimeoutError('request timeout (client interrupt)'));
    }
  }

  function writeCallback() {
    if (expect === 'abandon') {
      // Mark the messageID specified as abandoned
      tracker.abandon(message.abandonID);
      // No need to track the abandon request itself
      tracker.remove(message.id);
      return callback(null);
    } else if (expect === 'unbind') {
      conn.unbindMessageID = message.id;
      // Mark client as disconnected once unbind clears the socket
      self.connected = false;
      // Some servers will RST the connection after receiving an unbind.
      // Socket errors are blackholed since the connection is being closed.
      conn.removeAllListeners('error');
      conn.on('error', function () {});
      conn.end();
    } else if (emitter) {
      sentEmitter = true;
      return callback(null, emitter);
    }
    return false;
  }

  // Start actually doing something...
  tracker.track(message, messageCallback);
  // Mark client as active
  this._updateIdle(true);

  if (self.timeout) {
    log.trace('Setting timeout to %d', self.timeout);
    timer = setTimeout(onRequestTimeout, self.timeout);
  }

  if (log.trace())
    log.trace('sending request %j', message.json);

  try {
    return conn.write(message.toBer(), writeCallback);
  } catch (e) {
    if (timer)
      clearTimeout(timer);

    log.trace({err: e}, 'Error writing message to socket');
    return callback(e);
  }
};

}).call(this,{"isBuffer":require("../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js")})
},{"../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js":13,"../attribute":47,"../change":48,"../controls/index":54,"../dn":59,"../errors":62,"../filters":69,"../messages":88,"../protocol":103,"../url":105,"./search_pager":51,"assert-plus":112,"backoff":113,"events":10,"net":1,"once":135,"tls":1,"util":43,"vasync":136,"verror":138}],50:[function(require,module,exports){
(function (process){
// Copyright 2012 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert');

var Logger = require('bunyan');

var Client = require('./client');


///--- Globals

var DEF_LOG = new Logger({
  name: 'ldapjs',
  component: 'client',
  stream: process.stderr,
  serializers: Logger.stdSerializers
});


///--- Functions

function xor() {
  var b = false;
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] && !b) {
      b = true;
    } else if (arguments[i] && b) {
      return false;
    }
  }
  return b;
}



///--- Exports

module.exports = {
  Client: Client,
  createClient: function createClient(options) {
    if (typeof (options) !== 'object')
      throw new TypeError('options (object) required');
    if (options.url && typeof (options.url) !== 'string')
      throw new TypeError('options.url (string) required');
    if (options.socketPath && typeof (options.socketPath) !== 'string')
      throw new TypeError('options.socketPath must be a string');
    if (!xor(options.url, options.socketPath))
      throw new TypeError('options.url ^ options.socketPath (String) required');
    if (!options.log)
      options.log = DEF_LOG;
    if (typeof (options.log) !== 'object')
      throw new TypeError('options.log must be an object');

    return new Client(options);
  }
};

}).call(this,require('_process'))
},{"./client":49,"_process":17,"assert":2,"bunyan":119}],51:[function(require,module,exports){
// Copyright 2014 Joyent, Inc.  All rights reserved.

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var assert = require('assert-plus');

var dn = require('../dn');
var messages = require('../messages/index');
var Protocol = require('../protocol');
var PagedControl = require('../controls/paged_results_control.js');


///--- API


/**
 * Handler object for paged search operations.
 *
 * Provided to consumers in place of the normal search EventEmitter it adds the
 * following new events:
 * 1. page      - Emitted whenever the end of a result page is encountered.
 *                If this is the last page, 'end' will also be emitted.
 *                The event passes two arguments:
 *                1. The result object (similar to 'end')
 *                2. A callback function optionally used to continue the search
 *                   operation if the pagePause option was specified during
 *                   initialization.
 * 2. pageError - Emitted if the server does not support paged search results
 *                If there are no listeners for this event, the 'error' event
 *                will be emitted (and 'end' will not be).  By listening to
 *                'pageError', a successful search that lacks paging will be
 *                able to emit 'end'.
 * 3. search    - Emitted as an internal event to trigger another client search.
 */
function SearchPager(opts) {
  assert.object(opts);
  assert.func(opts.callback);
  assert.number(opts.pageSize);

  EventEmitter.call(this, {});

  this.callback = opts.callback;
  this.controls = opts.controls;
  this.pageSize = opts.pageSize;
  this.pagePause = opts.pagePause;

  this.controls.forEach(function (control) {
    if (control.type === PagedControl.OID) {
      // The point of using SearchPager is not having to do this.
      // Toss an error if the pagedResultsControl is present
      throw new Error('redundant pagedResultControl');
    }
  });

  this.finished = false;
  this.started = false;

  var emitter = new EventEmitter();
  emitter.on('searchEntry', this.emit.bind(this, 'searchEntry'));
  emitter.on('end', this._onEnd.bind(this));
  emitter.on('error',  this._onError.bind(this));
  this.childEmitter = emitter;
}
util.inherits(SearchPager, EventEmitter);
module.exports = SearchPager;

/**
 * Start the paged search.
 */
SearchPager.prototype.begin = function begin() {
  // Starting first page
  this._nextPage(null);
};

SearchPager.prototype._onEnd = function _onEnd(res) {
  var self = this;
  var cookie = null;
  res.controls.forEach(function (control) {
    if (control.type === PagedControl.OID) {
      cookie = control.value.cookie;
    }
  });
  // Pass a noop callback by default for page events
  var nullCb = function () { };

  if (cookie === null) {
    // paged search not supported
    this.finished = true;
    this.emit('page', res, nullCb);
    var err = new Error('missing paged control');
    err.name = 'PagedError';
    if (this.listeners('pageError').length > 0) {
      this.emit('pageError', err);
      // If the consumer as subscribed to pageError, SearchPager is absolved
      // from deliverying the fault via the 'error' event.  Emitting an 'end'
      // event after 'error' breaks the contract that the standard client
      // provides, so it's only a possibility if 'pageError' is used instead.
      this.emit('end', res);
    } else {
      this.emit('error', err);
      // No end event possible per explaination above.
    }
    return;
  }

  if (cookie.length === 0) {
    // end of paged results
    this.finished = true;
    this.emit('page', nullCb);
    this.emit('end', res);
  } else {
    if (this.pagePause) {
      // Wait to fetch next page until callback is invoked
      // Halt page fetching if called with error
      this.emit('page', res, function (err) {
        if (!err) {
          self._nextPage(cookie);
        } else {
          // the paged search has been canceled so emit an end
          self.emit('end', res);
        }
      });
    } else {
      this.emit('page', res, nullCb);
      this._nextPage(cookie);
    }
  }
};

SearchPager.prototype._onError = function _onError(err) {
  this.finished = true;
  this.emit('error', err);
};

/**
 * Initiate a search for the next page using the returned cookie value.
 */
SearchPager.prototype._nextPage = function _nextPage(cookie) {
  var controls = this.controls.slice(0);
  controls.push(new PagedControl({
    value: {
      size: this.pageSize,
      cookie: cookie
    }
  }));

  this.emit('search', controls, this.childEmitter,
      this._sendCallback.bind(this));
};

/**
 * Callback provided to the client API for successful transmission.
 */
SearchPager.prototype._sendCallback = function _sendCallback(err, res) {
  if (err) {
    this.finished = true;
    if (!this.started) {
      // EmitSend error during the first page, bail via callback
      this.callback(err, null);
    } else {
      this.emit('error', err);
    }
  } else {
    // search successfully send
    if (!this.started) {
      this.started = true;
      // send self as emitter as the client would
      this.callback(null, this);
    }
  }
};

},{"../controls/paged_results_control.js":55,"../dn":59,"../messages/index":88,"../protocol":103,"assert-plus":112,"events":10,"util":43}],52:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var asn1 = require('asn1');

var Protocol = require('../protocol');


///--- Globals

var Ber = asn1.Ber;


///--- API

function Control(options) {
  assert.optionalObject(options);
  options = options || {};
  assert.optionalString(options.type);
  assert.optionalBool(options.criticality);
  if (options.value) {
    assert.buffer(options.value);
  }

  this.type = options.type || '';
  this.criticality = options.critical || options.criticality || false;
  this.value = options.value || null;
}
Object.defineProperties(Control.prototype, {
  json: {
    get: function getJson() {
      var obj = {
        controlType: this.type,
        criticality: this.criticality,
        controlValue: this.value
      };
      return (typeof (this._json) === 'function' ? this._json(obj) : obj);
    }
  }
});

Control.prototype.toBer = function toBer(ber) {
  assert.ok(ber);

  ber.startSequence();
  ber.writeString(this.type || '');
  ber.writeBoolean(this.criticality);
  if (typeof (this._toBer) === 'function') {
    this._toBer(ber);
  } else {
    if (this.value)
      ber.writeString(this.value);
  }

  ber.endSequence();
  return;
};

Control.prototype.toString = function toString() {
  return this.json;
};


///--- Exports
module.exports = Control;

},{"../protocol":103,"asn1":111,"assert-plus":112,"util":43}],53:[function(require,module,exports){
(function (Buffer){
var assert = require('assert-plus');
var util = require('util');

var asn1 = require('asn1');

var Control = require('./control');


///--- Globals

var BerReader = asn1.BerReader;
var BerWriter = asn1.BerWriter;


///--- API

function EntryChangeNotificationControl(options) {
  assert.optionalObject(options);
  options = options || {};
  options.type = EntryChangeNotificationControl.OID;
  if (options.value) {
    if (Buffer.isBuffer(options.value)) {
      this.parse(options.value);
    } else if (typeof (options.value) === 'object') {
      this._value = options.value;
    } else {
      throw new TypeError('options.value must be a Buffer or Object');
    }
    options.value = null;
  }
  Control.call(this, options);
}
util.inherits(EntryChangeNotificationControl, Control);
Object.defineProperties(EntryChangeNotificationControl.prototype, {
  value: {
    get: function () { return this._value || {}; },
    configurable: false
  }
});

EntryChangeNotificationControl.prototype.parse = function parse(buffer) {
  assert.ok(buffer);

  var ber = new BerReader(buffer);
  if (ber.readSequence()) {
    this._value = {
      changeType: ber.readInt()
    };

    // if the operation was moddn, then parse the optional previousDN attr
    if (this._value.changeType === 8)
      this._value.previousDN = ber.readString();

    this._value.changeNumber = ber.readInt();

    return true;
  }

  return false;
};

EntryChangeNotificationControl.prototype._toBer = function (ber) {
  assert.ok(ber);

  if (!this._value)
    return;

  var writer = new BerWriter();
  writer.startSequence();
  writer.writeInt(this.value.changeType);
  if (this.value.previousDN)
    writer.writeString(this.value.previousDN);

  writer.writeInt(parseInt(this.value.changeNumber, 10));
  writer.endSequence();

  ber.writeBuffer(writer.buffer, 0x04);
};

EntryChangeNotificationControl.prototype._json = function (obj) {
  obj.controlValue = this.value;
  return obj;
};

EntryChangeNotificationControl.OID = '2.16.840.1.113730.3.4.7';


///--- Exports
module.exports = EntryChangeNotificationControl;

}).call(this,{"isBuffer":require("../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js")})
},{"../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js":13,"./control":52,"asn1":111,"assert-plus":112,"util":43}],54:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert');
var Ber = require('asn1').Ber;

var Control = require('./control');
var EntryChangeNotificationControl =
  require('./entry_change_notification_control');
var PersistentSearchControl = require('./persistent_search_control');
var PagedResultsControl = require('./paged_results_control');
var ServerSideSortingRequestControl =
  require('./server_side_sorting_request_control.js');
var ServerSideSortingResponseControl =
  require('./server_side_sorting_response_control.js');



///--- API

module.exports = {

  getControl: function getControl(ber) {
    assert.ok(ber);

    if (ber.readSequence() === null)
      return null;

    var type;
    var opts = {
      criticality: false,
      value: null
    };

    if (ber.length) {
      var end = ber.offset + ber.length;

      type = ber.readString();
      if (ber.offset < end) {
        if (ber.peek() === Ber.Boolean)
          opts.criticality = ber.readBoolean();
      }

      if (ber.offset < end)
        opts.value = ber.readString(Ber.OctetString, true);
    }

    var control;
    switch (type) {
    case PersistentSearchControl.OID:
      control = new PersistentSearchControl(opts);
      break;
    case EntryChangeNotificationControl.OID:
      control = new EntryChangeNotificationControl(opts);
      break;
    case PagedResultsControl.OID:
      control = new PagedResultsControl(opts);
      break;
    case ServerSideSortingRequestControl.OID:
      control = new ServerSideSortingRequestControl(opts);
      break;
    case ServerSideSortingResponseControl.OID:
      control = new ServerSideSortingResponseControl(opts);
      break;
    default:
      opts.type = type;
      control = new Control(opts);
      break;
    }

    return control;
  },

  Control: Control,
  EntryChangeNotificationControl: EntryChangeNotificationControl,
  PagedResultsControl: PagedResultsControl,
  PersistentSearchControl: PersistentSearchControl,
  ServerSideSortingRequestControl: ServerSideSortingRequestControl,
  ServerSideSortingResponseControl: ServerSideSortingResponseControl
};

},{"./control":52,"./entry_change_notification_control":53,"./paged_results_control":55,"./persistent_search_control":56,"./server_side_sorting_request_control.js":57,"./server_side_sorting_response_control.js":58,"asn1":111,"assert":2}],55:[function(require,module,exports){
(function (Buffer){
var assert = require('assert-plus');
var util = require('util');

var asn1 = require('asn1');

var Control = require('./control');


///--- Globals

var BerReader = asn1.BerReader;
var BerWriter = asn1.BerWriter;


///--- API

function PagedResultsControl(options) {
  assert.optionalObject(options);
  options = options || {};
  options.type = PagedResultsControl.OID;
  if (options.value) {
    if (Buffer.isBuffer(options.value)) {
      this.parse(options.value);
    } else if (typeof (options.value) === 'object') {
      this._value = options.value;
    } else {
      throw new TypeError('options.value must be a Buffer or Object');
    }
    options.value = null;
  }
  Control.call(this, options);
}
util.inherits(PagedResultsControl, Control);
Object.defineProperties(PagedResultsControl.prototype, {
  value: {
    get: function () { return this._value || {}; },
    configurable: false
  }
});

PagedResultsControl.prototype.parse = function parse(buffer) {
  assert.ok(buffer);

  var ber = new BerReader(buffer);
  if (ber.readSequence()) {
    this._value = {};
    this._value.size = ber.readInt();
    this._value.cookie = ber.readString(asn1.Ber.OctetString, true);
     //readString returns '' instead of a zero-length buffer
    if (!this._value.cookie)
      this._value.cookie = new Buffer(0);

    return true;
  }

  return false;
};

PagedResultsControl.prototype._toBer = function (ber) {
  assert.ok(ber);

  if (!this._value)
    return;

  var writer = new BerWriter();
  writer.startSequence();
  writer.writeInt(this.value.size);
  if (this.value.cookie && this.value.cookie.length > 0) {
    writer.writeBuffer(this.value.cookie, asn1.Ber.OctetString);
  } else {
    writer.writeString(''); //writeBuffer rejects zero-length buffers
  }
  writer.endSequence();

  ber.writeBuffer(writer.buffer, 0x04);
};

PagedResultsControl.prototype._json = function (obj) {
  obj.controlValue = this.value;
  return obj;
};

PagedResultsControl.OID = '1.2.840.113556.1.4.319';


///--- Exports
module.exports = PagedResultsControl;

}).call(this,require("buffer").Buffer)
},{"./control":52,"asn1":111,"assert-plus":112,"buffer":8,"util":43}],56:[function(require,module,exports){
(function (Buffer){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var asn1 = require('asn1');

var Control = require('./control');


///--- Globals

var BerReader = asn1.BerReader;
var BerWriter = asn1.BerWriter;


///--- API

function PersistentSearchControl(options) {
  assert.optionalObject(options);
  options = options || {};
  options.type = PersistentSearchControl.OID;

  if (options.value) {
    if (Buffer.isBuffer(options.value)) {
      this.parse(options.value);
    } else if (typeof (options.value) === 'object') {
      this._value = options.value;
    } else {
      throw new TypeError('options.value must be a Buffer or Object');
    }
    options.value = null;
  }
  Control.call(this, options);
}
util.inherits(PersistentSearchControl, Control);
Object.defineProperties(PersistentSearchControl.prototype, {
  value: {
    get: function () { return this._value || {}; },
    configurable: false
  }
});

PersistentSearchControl.prototype.parse = function parse(buffer) {
  assert.ok(buffer);

  var ber = new BerReader(buffer);
  if (ber.readSequence()) {
    this._value = {
      changeTypes: ber.readInt(),
      changesOnly: ber.readBoolean(),
      returnECs: ber.readBoolean()
    };

    return true;
  }

  return false;
};

PersistentSearchControl.prototype._toBer = function (ber) {
  assert.ok(ber);

  if (!this._value)
    return;

  var writer = new BerWriter();
  writer.startSequence();
  writer.writeInt(this.value.changeTypes);
  writer.writeBoolean(this.value.changesOnly);
  writer.writeBoolean(this.value.returnECs);
  writer.endSequence();

  ber.writeBuffer(writer.buffer, 0x04);
};

PersistentSearchControl.prototype._json = function (obj) {
  obj.controlValue = this.value;
  return obj;
};

PersistentSearchControl.OID = '2.16.840.1.113730.3.4.3';

///--- Exports
module.exports = PersistentSearchControl;

}).call(this,{"isBuffer":require("../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js")})
},{"../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js":13,"./control":52,"asn1":111,"assert-plus":112,"util":43}],57:[function(require,module,exports){
(function (Buffer){
var assert = require('assert-plus');
var util = require('util');

var asn1 = require('asn1');

var Control = require('./control');


///--- Globals

var BerReader = asn1.BerReader;
var BerWriter = asn1.BerWriter;


///--- API

function ServerSideSortingRequestControl(options) {
  assert.optionalObject(options);
  options = options || {};
  options.type = ServerSideSortingRequestControl.OID;
  if (options.value) {
    if (Buffer.isBuffer(options.value)) {
      this.parse(options.value);
    } else if (Array.isArray(options.value)) {
      assert.arrayOfObject(options.value, 'options.value must be Objects');
      for (var i = 0; i < options.value.length; i++) {
        if (!options.value[i].hasOwnProperty('attributeType')) {
          throw new Error('Missing required key: attributeType');
        }
      }
      this._value = options.value;
    } else if (typeof (options.value) === 'object') {
      if (!options.value.hasOwnProperty('attributeType')) {
        throw new Error('Missing required key: attributeType');
      }
      this._value = [options.value];
    } else {
      throw new TypeError('options.value must be a Buffer, Array or Object');
    }
    options.value = null;
  }
  Control.call(this, options);
}
util.inherits(ServerSideSortingRequestControl, Control);
Object.defineProperties(ServerSideSortingRequestControl.prototype, {
  value: {
    get: function () { return this._value || []; },
    configurable: false
  }
});

ServerSideSortingRequestControl.prototype.parse = function parse(buffer) {
  assert.ok(buffer);

  var ber = new BerReader(buffer);
  var item;
  if (ber.readSequence(0x30)) {
    this._value = [];

    while (ber.readSequence(0x30)) {
      item = {};
      item.attributeType = ber.readString(asn1.Ber.OctetString);
      if (ber.peek() == 0x80) {
        item.orderingRule = ber.readString(0x80);
      }
      if (ber.peek() == 0x81) {
        item.reverseOrder = (ber._readTag(0x81) === 0 ? false : true);
      }
      this._value.push(item);
    }
    return true;
  }
  return false;
};

ServerSideSortingRequestControl.prototype._toBer = function (ber) {
  assert.ok(ber);

  if (!this._value || this.value.length === 0)
    return;

  var writer = new BerWriter();
  writer.startSequence(0x30);
  for (var i = 0; i < this.value.length; i++) {
    var item = this.value[i];
    writer.startSequence(0x30);
    if (item.attributeType) {
      writer.writeString(item.attributeType, asn1.Ber.OctetString);
    }
    if (item.orderingRule) {
      writer.writeString(item.orderingRule, 0x80);
    }
    if (item.reverseOrder) {
      writer.writeBoolean(item.reverseOrder, 0x81);
    }
    writer.endSequence();
  }
  writer.endSequence();
  ber.writeBuffer(writer.buffer, 0x04);
};

ServerSideSortingRequestControl.prototype._json = function (obj) {
  obj.controlValue = this.value;
  return obj;
};

ServerSideSortingRequestControl.OID = '1.2.840.113556.1.4.473';


///---Exports

module.exports = ServerSideSortingRequestControl;

}).call(this,{"isBuffer":require("../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js")})
},{"../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js":13,"./control":52,"asn1":111,"assert-plus":112,"util":43}],58:[function(require,module,exports){
(function (Buffer){
var assert = require('assert-plus');
var util = require('util');

var asn1 = require('asn1');

var Control = require('./control');
var CODES = require('../errors/codes');


///--- Globals

var BerReader = asn1.BerReader;
var BerWriter = asn1.BerWriter;

var VALID_CODES = [
  CODES.LDAP_SUCCESS,
  CODES.LDAP_OPERATIONS_ERROR,
  CODES.LDAP_TIME_LIMIT_EXCEEDED,
  CODES.LDAP_STRONG_AUTH_REQUIRED,
  CODES.LDAP_ADMIN_LIMIT_EXCEEDED,
  CODES.LDAP_NO_SUCH_ATTRIBUTE,
  CODES.LDAP_INAPPROPRIATE_MATCHING,
  CODES.LDAP_INSUFFICIENT_ACCESS_RIGHTS,
  CODES.LDAP_BUSY,
  CODES.LDAP_UNWILLING_TO_PERFORM,
  CODES.LDAP_OTHER
];

function ServerSideSortingResponseControl(options) {
  assert.optionalObject(options);
  options = options || {};
  options.type = ServerSideSortingResponseControl.OID;
  options.criticality = false;

  if (options.value) {
    if (Buffer.isBuffer(options.value)) {
      this.parse(options.value);
    } else if (typeof (options.value) === 'object') {
      if (VALID_CODES.indexOf(options.value.result) === -1) {
        throw new Error('Invalid result code');
      }
      if (options.value.failedAttribute &&
          typeof (options.value.failedAttribute) !== 'string') {
        throw new Error('failedAttribute must be String');
      }

      this._value = options.value;
    } else {
      throw new TypeError('options.value must be a Buffer or Object');
    }
    options.value = null;
  }
  Control.call(this, options);
}
util.inherits(ServerSideSortingResponseControl, Control);
Object.defineProperties(ServerSideSortingResponseControl.prototype, {
  value: {
    get: function () { return this._value || {}; },
    configurable: false
  }
});

ServerSideSortingResponseControl.prototype.parse = function parse(buffer) {
  assert.ok(buffer);

  var ber = new BerReader(buffer);
  if (ber.readSequence(0x30)) {
    this._value = {};
    this._value.result = ber.readEnumeration();
    if (ber.peek() == 0x80) {
      this._value.failedAttribute = ber.readString(0x80);
    }
    return true;
  }
  return false;
};

ServerSideSortingResponseControl.prototype._toBer = function (ber) {
  assert.ok(ber);

  if (!this._value || this.value.length === 0)
    return;

  var writer = new BerWriter();
  writer.startSequence(0x30);
  writer.writeEnumeration(this.value.result);
  if (this.value.result !== CODES.LDAP_SUCCESS && this.value.failedAttribute) {
    writer.writeString(this.value.failedAttribute, 0x80);
  }
  writer.endSequence();
  ber.writeBuffer(writer.buffer, 0x04);
};

ServerSideSortingResponseControl.prototype._json = function (obj) {
  obj.controlValue = this.value;
  return obj;
};

ServerSideSortingResponseControl.OID = '1.2.840.113556.1.4.474';


///--- Exports
module.exports = ServerSideSortingResponseControl;

}).call(this,{"isBuffer":require("../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js")})
},{"../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js":13,"../errors/codes":61,"./control":52,"asn1":111,"assert-plus":112,"util":43}],59:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.


var assert = require('assert-plus');


///--- Helpers

function invalidDN(name) {
  var e = new Error();
  e.name = 'InvalidDistinguishedNameError';
  e.message = name;
  return e;
}

function isAlphaNumeric(c) {
  var re = /[A-Za-z0-9]/;
  return re.test(c);
}

function isWhitespace(c) {
  var re = /\s/;
  return re.test(c);
}

function repeatChar(c, n) {
  var out = '';
  var max = n ? n : 0;
  for (var i = 0; i < max; i++)
    out += c;
  return out;
}

///--- API

function RDN(obj) {
  var self = this;
  this.attrs = {};

  if (obj) {
    Object.keys(obj).forEach(function (k) {
      self.set(k, obj[k]);
    });
  }
}

RDN.prototype.set = function rdnSet(name, value, opts) {
  assert.string(name, 'name (string) required');
  assert.string(value, 'value (string) required');

  var self = this;
  var lname = name.toLowerCase();
  this.attrs[lname] = {
    value: value,
    name: name
  };
  if (opts && typeof (opts) === 'object') {
    Object.keys(opts).forEach(function (k) {
      if (k !== 'value')
        self.attrs[lname][k] = opts[k];
    });
  }
};

RDN.prototype.equals = function rdnEquals(rdn) {
  if (typeof (rdn) !== 'object')
    return false;

  var ourKeys = Object.keys(this.attrs);
  var theirKeys = Object.keys(rdn.attrs);
  if (ourKeys.length !== theirKeys.length)
    return false;

  ourKeys.sort();
  theirKeys.sort();

  for (var i = 0; i < ourKeys.length; i++) {
    if (ourKeys[i] !== theirKeys[i])
      return false;
    if (this.attrs[ourKeys[i]].value !== rdn.attrs[ourKeys[i]].value)
      return false;
  }
  return true;
};


/**
 * Convert RDN to string according to specified formatting options.
 * (see: DN.format for option details)
 */
RDN.prototype.format = function rdnFormat(options) {
  assert.optionalObject(options, 'options must be an object');
  options = options || {};

  var self = this;
  var str = '';

  function escapeValue(val, forceQuote) {
    var out = '';
    var cur = 0;
    var len = val.length;
    var quoted = false;
    /* BEGIN JSSTYLED */
    var escaped = /[\\\"]/;
    var special = /[,=+<>#;]/;
    /* END JSSTYLED */

    if (len > 0) {
      // Wrap strings with trailing or leading spaces in quotes
      quoted = forceQuote || (val[0] == ' ' || val[len-1] == ' ');
    }

    while (cur < len) {
      if (escaped.test(val[cur]) || (!quoted && special.test(val[cur]))) {
        out += '\\';
      }
      out += val[cur++];
    }
    if (quoted)
      out = '"' + out + '"';
    return out;
  }
  function sortParsed(a, b) {
    return self.attrs[a].order - self.attrs[b].order;
  }
  function sortStandard(a, b) {
    var nameCompare = a.localeCompare(b);
    if (nameCompare === 0) {
      // TODO: Handle binary values
      return self.attrs[a].value.localeCompare(self.attrs[b].value);
    } else {
      return nameCompare;
    }
  }

  var keys = Object.keys(this.attrs);
  if (options.keepOrder) {
    keys.sort(sortParsed);
  } else {
    keys.sort(sortStandard);
  }

  keys.forEach(function (key) {
    var attr = self.attrs[key];
    if (str.length)
      str += '+';

    if (options.keepCase) {
      str += attr.name;
    } else {
      if (options.upperName)
        str += key.toUpperCase();
      else
        str += key;
    }

    str += '=' + escapeValue(attr.value, (options.keepQuote && attr.quoted));
  });

  return str;
};

RDN.prototype.toString = function rdnToString() {
  return this.format();
};


// Thank you OpenJDK!
function parse(name) {
  if (typeof (name) !== 'string')
    throw new TypeError('name (string) required');

  var cur = 0;
  var len = name.length;

  function parseRdn() {
    var rdn = new RDN();
    var order = 0;
    rdn.spLead = trim();
    while (cur < len) {
      var opts = {
        order: order
      };
      var attr = parseAttrType();
      trim();
      if (cur >= len || name[cur++] !== '=')
        throw invalidDN(name);

      trim();
      // Parameters about RDN value are set in 'opts' by parseAttrValue
      var value = parseAttrValue(opts);
      rdn.set(attr, value, opts);
      rdn.spTrail = trim();
      if (cur >= len || name[cur] !== '+')
        break;
      ++cur;
      ++order;
    }
    return rdn;
  }


  function trim() {
    var count = 0;
    while ((cur < len) && isWhitespace(name[cur])) {
      ++cur;
      count++;
    }
    return count;
  }

  function parseAttrType() {
    var beg = cur;
    while (cur < len) {
      var c = name[cur];
      if (isAlphaNumeric(c) ||
          c == '.' ||
          c == '-' ||
          c == ' ') {
        ++cur;
      } else {
        break;
      }
    }
    // Back out any trailing spaces.
    while ((cur > beg) && (name[cur - 1] == ' '))
      --cur;

    if (beg == cur)
      throw invalidDN(name);

    return name.slice(beg, cur);
  }

  function parseAttrValue(opts) {
    if (cur < len && name[cur] == '#') {
      opts.binary = true;
      return parseBinaryAttrValue();
    } else if (cur < len && name[cur] == '"') {
      opts.quoted = true;
      return parseQuotedAttrValue();
    } else {
      return parseStringAttrValue();
    }
  }

  function parseBinaryAttrValue() {
    var beg = cur++;
    while (cur < len && isAlphaNumeric(name[cur]))
      ++cur;

    return name.slice(beg, cur);
  }

  function parseQuotedAttrValue() {
    var str = '';
    ++cur; // Consume the first quote

    while ((cur < len) && name[cur] != '"') {
      if (name[cur] === '\\')
        cur++;
      str += name[cur++];
    }
    if (cur++ >= len) // no closing quote
      throw invalidDN(name);

    return str;
  }

  function parseStringAttrValue() {
    var beg = cur;
    var str = '';
    var esc = -1;

    while ((cur < len) && !atTerminator()) {
      if (name[cur] === '\\') {
        // Consume the backslash and mark its place just in case it's escaping
        // whitespace which needs to be preserved.
        esc = cur++;
      }
      if (cur === len) // backslash followed by nothing
        throw invalidDN(name);
      str += name[cur++];
    }

    // Trim off (unescaped) trailing whitespace and rewind cursor to the end of
    // the AttrValue to record whitespace length.
    for (; cur > beg; cur--) {
      if (!isWhitespace(name[cur - 1]) || (esc === (cur - 1)))
        break;
    }
    return str.slice(0, cur - beg);
  }

  function atTerminator() {
    return (cur < len &&
            (name[cur] === ',' ||
             name[cur] === ';' ||
             name[cur] === '+'));
  }

  var rdns = [];

  // Short-circuit for empty DNs
  if (len === 0)
    return new DN(rdns);

  rdns.push(parseRdn());
  while (cur < len) {
    if (name[cur] === ',' || name[cur] === ';') {
      ++cur;
      rdns.push(parseRdn());
    } else {
      throw invalidDN(name);
    }
  }

  return new DN(rdns);
}


function DN(rdns) {
  assert.optionalArrayOfObject(rdns, '[object] required');

  this.rdns = rdns ? rdns.slice() : [];
  this._format = {};
}
Object.defineProperties(DN.prototype, {
  length: {
    get: function getLength() { return this.rdns.length; },
    configurable: false
  }
});

/**
 * Convert DN to string according to specified formatting options.
 *
 * Parameters:
 * - options: formatting parameters (optional, details below)
 *
 * Options are divided into two types:
 * - Preservation options: Using data recorded during parsing, details of the
 *   original DN are preserved when converting back into a string.
 * - Modification options: Alter string formatting defaults.
 *
 * Preservation options _always_ take precedence over modification options.
 *
 * Preservation Options:
 * - keepOrder: Order of multi-value RDNs.
 * - keepQuote: RDN values which were quoted will remain so.
 * - keepSpace: Leading/trailing spaces will be output.
 * - keepCase: Parsed attr name will be output instead of lowercased version.
 *
 * Modification Options:
 * - upperName: RDN names will be uppercased instead of lowercased.
 * - skipSpace: Disable trailing space after RDN separators
 */
DN.prototype.format = function dnFormat(options) {
  assert.optionalObject(options, 'options must be an object');
  options = options || this._format;

  var str = '';
  this.rdns.forEach(function (rdn) {
    var rdnString = rdn.format(options);
    if (str.length !== 0) {
      str += ',';
    }
    if (options.keepSpace) {
      str += (repeatChar(' ', rdn.spLead) +
        rdnString + repeatChar(' ', rdn.spTrail));
    } else if (options.skipSpace === true || str.length === 0) {
      str += rdnString;
    } else {
      str += ' ' + rdnString;
    }
  });
  return str;
};

/**
 * Set default string formatting options.
 */
DN.prototype.setFormat = function setFormat(options) {
  assert.object(options, 'options must be an object');

  this._format = options;
};

DN.prototype.toString = function dnToString() {
  return this.format();
};

DN.prototype.parentOf = function parentOf(dn) {
  if (typeof (dn) !== 'object')
    dn = parse(dn);

  if (this.rdns.length >= dn.rdns.length)
    return false;

  var diff = dn.rdns.length - this.rdns.length;
  for (var i = this.rdns.length - 1; i >= 0; i--) {
    var myRDN = this.rdns[i];
    var theirRDN = dn.rdns[i + diff];

    if (!myRDN.equals(theirRDN))
      return false;
  }

  return true;
};

DN.prototype.childOf = function childOf(dn) {
  if (typeof (dn) !== 'object')
    dn = parse(dn);
  return dn.parentOf(this);
};

DN.prototype.isEmpty = function isEmpty() {
  return (this.rdns.length === 0);
};

DN.prototype.equals = function dnEquals(dn) {
  if (typeof (dn) !== 'object')
    dn = parse(dn);

  if (this.rdns.length !== dn.rdns.length)
    return false;

  for (var i = 0; i < this.rdns.length; i++) {
    if (!this.rdns[i].equals(dn.rdns[i]))
      return false;
  }

  return true;
};

DN.prototype.parent = function dnParent() {
  if (this.rdns.length !== 0) {
    var save = this.rdns.shift();
    var dn = new DN(this.rdns);
    this.rdns.unshift(save);
    return dn;
  }

  return null;
};

DN.prototype.clone = function dnClone() {
  var dn = new DN(this.rdns);
  dn._format = this._format;
  return dn;
};

DN.prototype.reverse = function dnReverse() {
  this.rdns.reverse();
  return this;
};

DN.prototype.pop = function dnPop() {
  return this.rdns.pop();
};

DN.prototype.push = function dnPush(rdn) {
  assert.object(rdn, 'rdn (RDN) required');

  return this.rdns.push(rdn);
};

DN.prototype.shift = function dnShift() {
  return this.rdns.shift();
};

DN.prototype.unshift = function dnUnshift(rdn) {
  assert.object(rdn, 'rdn (RDN) required');

  return this.rdns.unshift(rdn);
};

DN.isDN = function isDN(dn) {
  if (!dn || typeof (dn) !== 'object') {
    return false;
  }
  if (dn instanceof DN) {
    return true;
  }
  if (Array.isArray(dn.rdns)) {
    // Really simple duck-typing for now
    return true;
  }
  return false;
};


///--- Exports

module.exports = {
  parse: parse,
  DN: DN,
  RDN: RDN
};

},{"assert-plus":112}],60:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.s



///--- Globals

var SERVER_PROVIDER;
var DTRACE_ID = 0;
var MAX_INT = 4294967295;

/*
 * Args:
 * server-*-start:
 * 0 -> id
 * 1 -> remoteIP
 * 2 -> bindDN
 * 3 -> req.dn
 * 4,5 -> op specific
 *
 * server-*-done:
 * 0 -> id
 * 1 -> remoteIp
 * 2 -> bindDN
 * 3 -> requsetDN
 * 4 -> status
 * 5 -> errorMessage
 *
 */
var SERVER_PROBES = {

  // 4: attributes.length
  'server-add-start': ['int', 'char *', 'char *', 'char *', 'int'],
  'server-add-done': ['int', 'char *', 'char *', 'char *', 'int', 'char *'],

  'server-bind-start': ['int', 'char *', 'char *', 'char *'],
  'server-bind-done': ['int', 'char *', 'char *', 'char *', 'int', 'char *'],

  // 4: attribute, 5: value
  'server-compare-start': ['int', 'char *', 'char *', 'char *',
                           'char *', 'char *'],
  'server-compare-done': ['int', 'char *', 'char *', 'char *', 'int', 'char *'],

  'server-delete-start': ['int', 'char *', 'char *', 'char *'],
  'server-delete-done': ['int', 'char *', 'char *', 'char *', 'int', 'char *'],

  // 4: requestName, 5: requestValue
  'server-exop-start': ['int', 'char *', 'char *', 'char *', 'char *',
                        'char *'],
  'server-exop-done': ['int', 'char *', 'char *', 'char *', 'int', 'char *'],

  // 4: changes.length
  'server-modify-start': ['int', 'char *', 'char *', 'char *', 'int'],
  'server-modify-done': ['int', 'char *', 'char *', 'char *', 'int', 'char *'],

  // 4: newRdn, 5: newSuperior
  'server-modifydn-start': ['int', 'char *', 'char *', 'char *', 'char *',
                            'char *'],
  'server-modifydn-done': ['int', 'char *', 'char *', 'char *', 'int',
                           'char *'],

  // 4: scope, 5: filter
  'server-search-start': ['int', 'char *', 'char *', 'char *', 'char *',
                          'char *'],
  'server-search-done': ['int', 'char *', 'char *', 'char *', 'int', 'char *'],
  // Last two are searchEntry.DN and seachEntry.attributes.length
  'server-search-entry': ['int', 'char *', 'char *', 'char *', 'char *', 'int'],

  'server-unbind-start': ['int', 'char *', 'char *', 'char *'],
  'server-unbind-done': ['int', 'char *', 'char *', 'char *', 'int', 'char *'],

  'server-abandon-start': ['int', 'char *', 'char *', 'char *'],
  'server-abandon-done': ['int', 'char *', 'char *', 'char *', 'int', 'char *'],

  // remote IP
  'server-connection': ['char *']
};


///--- API

module.exports = function () {
  if (!SERVER_PROVIDER) {
    try {
      var dtrace = require('dtrace-provider');
      SERVER_PROVIDER = dtrace.createDTraceProvider('ldapjs');

      Object.keys(SERVER_PROBES).forEach(function (p) {
        var args = SERVER_PROBES[p].splice(0);
        args.unshift(p);

        dtrace.DTraceProvider.prototype.addProbe.apply(SERVER_PROVIDER, args);
      });
    } catch (e) {
      SERVER_PROVIDER = {
          fire: function () {
          },
          enable: function () {
          },
          addProbe: function () {
              var p = {
                  fire: function () {
                  }
              };
              return (p);
          },
          removeProbe: function () {
          },
          disable: function () {
          }
      };
    }

    SERVER_PROVIDER.enable();

    SERVER_PROVIDER._nextId = function () {
      if (DTRACE_ID === MAX_INT)
        DTRACE_ID = 0;

      return ++DTRACE_ID;
    };
  }

  return SERVER_PROVIDER;
}();

},{"dtrace-provider":120}],61:[function(require,module,exports){
// Copyright 2014 Joyent, Inc.  All rights reserved.

module.exports = {
  LDAP_SUCCESS: 0,
  LDAP_OPERATIONS_ERROR: 1,
  LDAP_PROTOCOL_ERROR: 2,
  LDAP_TIME_LIMIT_EXCEEDED: 3,
  LDAP_SIZE_LIMIT_EXCEEDED: 4,
  LDAP_COMPARE_FALSE: 5,
  LDAP_COMPARE_TRUE: 6,
  LDAP_AUTH_METHOD_NOT_SUPPORTED: 7,
  LDAP_STRONG_AUTH_REQUIRED: 8,
  LDAP_REFERRAL: 10,
  LDAP_ADMIN_LIMIT_EXCEEDED: 11,
  LDAP_UNAVAILABLE_CRITICAL_EXTENSION: 12,
  LDAP_CONFIDENTIALITY_REQUIRED: 13,
  LDAP_SASL_BIND_IN_PROGRESS: 14,
  LDAP_NO_SUCH_ATTRIBUTE: 16,
  LDAP_UNDEFINED_ATTRIBUTE_TYPE: 17,
  LDAP_INAPPROPRIATE_MATCHING: 18,
  LDAP_CONSTRAINT_VIOLATION: 19,
  LDAP_ATTRIBUTE_OR_VALUE_EXISTS: 20,
  LDAP_INVALID_ATTRIBUTE_SYNTAX: 21,
  LDAP_NO_SUCH_OBJECT: 32,
  LDAP_ALIAS_PROBLEM: 33,
  LDAP_INVALID_DN_SYNTAX: 34,
  LDAP_ALIAS_DEREF_PROBLEM: 36,
  LDAP_INAPPROPRIATE_AUTHENTICATION: 48,
  LDAP_INVALID_CREDENTIALS: 49,
  LDAP_INSUFFICIENT_ACCESS_RIGHTS: 50,
  LDAP_BUSY: 51,
  LDAP_UNAVAILABLE: 52,
  LDAP_UNWILLING_TO_PERFORM: 53,
  LDAP_LOOP_DETECT: 54,
  LDAP_NAMING_VIOLATION: 64,
  LDAP_OBJECTCLASS_VIOLATION: 65,
  LDAP_NOT_ALLOWED_ON_NON_LEAF: 66,
  LDAP_NOT_ALLOWED_ON_RDN: 67,
  LDAP_ENTRY_ALREADY_EXISTS: 68,
  LDAP_OBJECTCLASS_MODS_PROHIBITED: 69,
  LDAP_AFFECTS_MULTIPLE_DSAS: 71,
  LDAP_OTHER: 80,
  LDAP_PROXIED_AUTHORIZATION_DENIED: 123
};

},{}],62:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var util = require('util');
var assert = require('assert-plus');

var LDAPResult = require('../messages').LDAPResult;


///--- Globals

var CODES = require('./codes');
var ERRORS = [];


///--- Error Base class

function LDAPError(message, dn, caller) {
  if (Error.captureStackTrace)
    Error.captureStackTrace(this, caller || LDAPError);

  this.lde_message = message;
  this.lde_dn = dn;
}
util.inherits(LDAPError, Error);
Object.defineProperties(LDAPError.prototype, {
  name: {
    get: function getName() { return 'LDAPError'; },
    configurable: false
  },
  code: {
    get: function getCode() { return CODES.LDAP_OTHER; },
    configurable: false
  },
  message: {
    get: function getMessage() {
      return this.lde_message || this.name;
    },
    configurable: false
  },
  dn: {
    get: function getDN() {
      return (this.lde_dn ? this.lde_dn.toString() : '');
    },
    configurable: false
  }
});


///--- Exported API

module.exports = {};
module.exports.LDAPError = LDAPError;

// Some whacky games here to make sure all the codes are exported
Object.keys(CODES).forEach(function (code) {
  module.exports[code] = CODES[code];
  if (code === 'LDAP_SUCCESS')
    return;

  var err = '';
  var msg = '';
  var pieces = code.split('_').slice(1);
  for (var i = 0; i < pieces.length; i++) {
    var lc = pieces[i].toLowerCase();
    var key = lc.charAt(0).toUpperCase() + lc.slice(1);
    err += key;
    msg += key + ((i + 1) < pieces.length ? ' ' : '');
  }

  if (!/\w+Error$/.test(err))
    err += 'Error';

  // At this point LDAP_OPERATIONS_ERROR is now OperationsError in $err
  // and 'Operations Error' in $msg
  module.exports[err] = function (message, dn, caller) {
    LDAPError.call(this, message, dn, caller || module.exports[err]);
  };
  module.exports[err].constructor = module.exports[err];
  util.inherits(module.exports[err], LDAPError);
  Object.defineProperties(module.exports[err].prototype, {
    name: {
      get: function getName() { return err; },
      configurable: false
    },
    code: {
      get: function getCode() { return CODES[code]; },
      configurable: false
    }
  });

  ERRORS[CODES[code]] = {
    err: err,
    message: msg
  };
});

module.exports.getError = function (res) {
  assert.ok(res instanceof LDAPResult, 'res (LDAPResult) required');

  var errObj = ERRORS[res.status];
  var E = module.exports[errObj.err];
  return new E(res.errorMessage || errObj.message,
               res.matchedDN || null,
               module.exports.getError);
};

module.exports.getMessage = function (code) {
  assert.number(code, 'code (number) required');

  var errObj = ERRORS[code];
  return (errObj && errObj.message ? errObj.message : '');
};


///--- Custom application errors

function ConnectionError(message) {
  LDAPError.call(this, message, null, ConnectionError);
}
util.inherits(ConnectionError, LDAPError);
module.exports.ConnectionError = ConnectionError;
Object.defineProperties(ConnectionError.prototype, {
  name: {
    get: function () { return 'ConnectionError'; },
    configurable: false
  }
});

function AbandonedError(message) {
  LDAPError.call(this, message, null, AbandonedError);
}
util.inherits(AbandonedError, LDAPError);
module.exports.AbandonedError = AbandonedError;
Object.defineProperties(AbandonedError.prototype, {
  name: {
    get: function () { return 'AbandonedError'; },
    configurable: false
  }
});

function TimeoutError(message) {
  LDAPError.call(this, message, null, TimeoutError);
}
util.inherits(TimeoutError, LDAPError);
module.exports.TimeoutError = TimeoutError;
Object.defineProperties(TimeoutError.prototype, {
  name: {
    get: function () { return 'TimeoutError'; },
    configurable: false
  }
});

},{"../messages":88,"./codes":61,"assert-plus":112,"util":43}],63:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert');
var util = require('util');

var parents = require('ldap-filter');

var Filter = require('./filter');



///--- API

function AndFilter(options) {
  parents.AndFilter.call(this, options);
}
util.inherits(AndFilter, parents.AndFilter);
Filter.mixin(AndFilter);
module.exports = AndFilter;


AndFilter.prototype._toBer = function (ber) {
  assert.ok(ber);

  this.filters.forEach(function (f) {
    ber = f.toBer(ber);
  });

  return ber;
};

},{"./filter":67,"assert":2,"ldap-filter":128,"util":43}],64:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert');
var util = require('util');

var parents = require('ldap-filter');

var Filter = require('./filter');



///--- API

function ApproximateFilter(options) {
  parents.ApproximateFilter.call(this, options);
}
util.inherits(ApproximateFilter, parents.ApproximateFilter);
Filter.mixin(ApproximateFilter);
module.exports = ApproximateFilter;


ApproximateFilter.prototype.parse = function (ber) {
  assert.ok(ber);

  this.attribute = ber.readString().toLowerCase();
  this.value = ber.readString();

  return true;
};


ApproximateFilter.prototype._toBer = function (ber) {
  assert.ok(ber);

  ber.writeString(this.attribute);
  ber.writeString(this.value);

  return ber;
};

},{"./filter":67,"assert":2,"ldap-filter":128,"util":43}],65:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var ASN1 = require('asn1').Ber;
var parents = require('ldap-filter');

var Filter = require('./filter');



///--- API

function EqualityFilter(options) {
  parents.EqualityFilter.call(this, options);
}
util.inherits(EqualityFilter, parents.EqualityFilter);
Filter.mixin(EqualityFilter);
module.exports = EqualityFilter;


EqualityFilter.prototype.matches = function (target, strictAttrCase) {
  assert.object(target, 'target');

  var tv = parents.getAttrValue(target, this.attribute, strictAttrCase);
  var value = this.value;

  if (this.attribute.toLowerCase() === 'objectclass') {
    /*
     * Perform case-insensitive match for objectClass since nearly every LDAP
     * implementation behaves in this manner.
     */
    value = value.toLowerCase();
    return parents.testValues(function (v) {
      return value === v.toLowerCase();
    }, tv);
  } else {
    return parents.testValues(function (v) {
      return value === v;
    }, tv);
  }
};


EqualityFilter.prototype.parse = function (ber) {
  assert.ok(ber);

  this.attribute = ber.readString().toLowerCase();
  this.value = ber.readString(ASN1.OctetString, true);

  if (this.attribute === 'objectclass')
    this.value = this.value.toLowerCase();

  return true;
};


EqualityFilter.prototype._toBer = function (ber) {
  assert.ok(ber);

  ber.writeString(this.attribute);
  ber.writeBuffer(this.raw, ASN1.OctetString);

  return ber;
};

},{"./filter":67,"asn1":111,"assert-plus":112,"ldap-filter":128,"util":43}],66:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert');
var util = require('util');

var parents = require('ldap-filter');

var Filter = require('./filter');



// THIS IS A STUB!
//
// ldapjs does not support server side extensible matching.
// This class exists only for the client to send them.

///--- API

function ExtensibleFilter(options) {
  parents.ExtensibleFilter.call(this, options);
}
util.inherits(ExtensibleFilter, parents.ExtensibleFilter);
Filter.mixin(ExtensibleFilter);
module.exports = ExtensibleFilter;


ExtensibleFilter.prototype.parse = function (ber) {
  var end = ber.offset + ber.length;
  while (ber.offset < end) {
    var tag = ber.peek();
    switch (tag) {
    case 0x81:
      this.rule = ber.readString(tag);
      break;
    case 0x82:
      this.matchType = ber.readString(tag);
      break;
    case 0x83:
      this.value = ber.readString(tag);
      break;
    case 0x84:
      this.dnAttributes = ber.readBoolean(tag);
      break;
    default:
      throw new Error('Invalid ext_match filter type: 0x' + tag.toString(16));
    }
  }

  return true;
};


ExtensibleFilter.prototype._toBer = function (ber) {
  assert.ok(ber);

  if (this.rule)
    ber.writeString(this.rule, 0x81);
  if (this.matchType)
    ber.writeString(this.matchType, 0x82);

  ber.writeString(this.value, 0x83);
  if (this.dnAttributes)
    ber.writeBoolean(this.dnAttributes, 0x84);

  return ber;
};

},{"./filter":67,"assert":2,"ldap-filter":128,"util":43}],67:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert');

var asn1 = require('asn1');

var Protocol = require('../protocol');


///--- Globals

var BerWriter = asn1.BerWriter;

var TYPES = {
  'and':       Protocol.FILTER_AND,
  'or':        Protocol.FILTER_OR,
  'not':       Protocol.FILTER_NOT,
  'equal':     Protocol.FILTER_EQUALITY,
  'substring': Protocol.FILTER_SUBSTRINGS,
  'ge':        Protocol.FILTER_GE,
  'le':        Protocol.FILTER_LE,
  'present':   Protocol.FILTER_PRESENT,
  'approx':    Protocol.FILTER_APPROX,
  'ext':       Protocol.FILTER_EXT
};


///--- API

function isFilter(filter) {
  if (!filter || typeof (filter) !== 'object') {
    return false;
  }
  // Do our best to duck-type it
  if (typeof (filter.toBer) === 'function' &&
      typeof (filter.matches) === 'function' &&
      TYPES[filter.type] !== undefined) {
    return true;
  }
  return false;
}

function mixin(target) {
  target.prototype.toBer = function toBer(ber) {
    if (!ber || !(ber instanceof BerWriter))
      throw new TypeError('ber (BerWriter) required');

    ber.startSequence(TYPES[this.type]);
    ber = this._toBer(ber);
    ber.endSequence();
    return ber;
  };
}

module.exports = {
  isFilter: isFilter,
  mixin: mixin
};

},{"../protocol":103,"asn1":111,"assert":2}],68:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert');
var util = require('util');

var parents = require('ldap-filter');

var Filter = require('./filter');


///--- API

function GreaterThanEqualsFilter(options) {
  parents.GreaterThanEqualsFilter.call(this, options);
}
util.inherits(GreaterThanEqualsFilter, parents.GreaterThanEqualsFilter);
Filter.mixin(GreaterThanEqualsFilter);
module.exports = GreaterThanEqualsFilter;


GreaterThanEqualsFilter.prototype.parse = function (ber) {
  assert.ok(ber);

  this.attribute = ber.readString().toLowerCase();
  this.value = ber.readString();

  return true;
};


GreaterThanEqualsFilter.prototype._toBer = function (ber) {
  assert.ok(ber);

  ber.writeString(this.attribute);
  ber.writeString(this.value);

  return ber;
};

},{"./filter":67,"assert":2,"ldap-filter":128,"util":43}],69:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert');

var asn1 = require('asn1');

var parents = require('ldap-filter');

var Protocol = require('../protocol');

var Filter = require('./filter');
var AndFilter = require('./and_filter');
var ApproximateFilter = require('./approx_filter');
var EqualityFilter = require('./equality_filter');
var ExtensibleFilter = require('./ext_filter');
var GreaterThanEqualsFilter = require('./ge_filter');
var LessThanEqualsFilter = require('./le_filter');
var NotFilter = require('./not_filter');
var OrFilter = require('./or_filter');
var PresenceFilter = require('./presence_filter');
var SubstringFilter = require('./substr_filter');



///--- Globals

var BerReader = asn1.BerReader;


///--- Internal Parsers

/*
 * A filter looks like this coming in:
 *      Filter ::= CHOICE {
 *              and             [0]     SET OF Filter,
 *              or              [1]     SET OF Filter,
 *              not             [2]     Filter,
 *              equalityMatch   [3]     AttributeValueAssertion,
 *              substrings      [4]     SubstringFilter,
 *              greaterOrEqual  [5]     AttributeValueAssertion,
 *              lessOrEqual     [6]     AttributeValueAssertion,
 *              present         [7]     AttributeType,
 *              approxMatch     [8]     AttributeValueAssertion,
 *              extensibleMatch [9]     MatchingRuleAssertion --v3 only
 *      }
 *
 *      SubstringFilter ::= SEQUENCE {
 *              type               AttributeType,
 *              SEQUENCE OF CHOICE {
 *                      initial          [0] IA5String,
 *                      any              [1] IA5String,
 *                      final            [2] IA5String
 *              }
 *      }
 *
 * The extensibleMatch was added in LDAPv3:
 *
 *      MatchingRuleAssertion ::= SEQUENCE {
 *              matchingRule    [1] MatchingRuleID OPTIONAL,
 *              type            [2] AttributeDescription OPTIONAL,
 *              matchValue      [3] AssertionValue,
 *              dnAttributes    [4] BOOLEAN DEFAULT FALSE
 *      }
 */
function _parse(ber) {
  assert.ok(ber);

  function parseSet(f) {
    var end = ber.offset + ber.length;
    while (ber.offset < end)
      f.addFilter(_parse(ber));
  }

  var f;

  var type = ber.readSequence();
  switch (type) {

  case Protocol.FILTER_AND:
    f = new AndFilter();
    parseSet(f);
    break;

  case Protocol.FILTER_APPROX:
    f = new ApproximateFilter();
    f.parse(ber);
    break;

  case Protocol.FILTER_EQUALITY:
    f = new EqualityFilter();
    f.parse(ber);
    return f;

  case Protocol.FILTER_EXT:
    f = new ExtensibleFilter();
    f.parse(ber);
    return f;

  case Protocol.FILTER_GE:
    f = new GreaterThanEqualsFilter();
    f.parse(ber);
    return f;

  case Protocol.FILTER_LE:
    f = new LessThanEqualsFilter();
    f.parse(ber);
    return f;

  case Protocol.FILTER_NOT:
    var _f = _parse(ber);
    f = new NotFilter({
      filter: _f
    });
    break;

  case Protocol.FILTER_OR:
    f = new OrFilter();
    parseSet(f);
    break;

  case Protocol.FILTER_PRESENT:
    f = new PresenceFilter();
    f.parse(ber);
    break;

  case Protocol.FILTER_SUBSTRINGS:
    f = new SubstringFilter();
    f.parse(ber);
    break;

  default:
    throw new Error('Invalid search filter type: 0x' + type.toString(16));
  }


  assert.ok(f);
  return f;
}


function cloneFilter(input) {
  var child;
  if (input.type === 'and' || input.type === 'or') {
    child = input.filters.map(cloneFilter);
  } else if (input.type === 'not') {
    child = cloneFilter(input.filter);
  }
  switch (input.type) {
  case 'and':
    return new AndFilter({filters: child});
  case 'or':
    return new OrFilter({filters: child});
  case 'not':
    return new NotFilter({filter: child});
  case 'equal':
    return new EqualityFilter(input);
  case 'substring':
    return new SubstringFilter(input);
  case 'ge':
    return new GreaterThanEqualsFilter(input);
  case 'le':
    return new LessThanEqualsFilter(input);
  case 'present':
    return new PresenceFilter(input);
  case 'approx':
    return new ApproximateFilter(input);
  case 'ext':
    return new ExtensibleFilter(input);
  default:
    throw new Error('invalid filter type:' + input.type);
  }
}


function parseString(str) {
  var generic = parents.parse(str);
  // The filter object(s) return from ldap-filter.parse lack the toBer/parse
  // decoration that native ldapjs filter possess.  cloneFilter adds that back.
  return cloneFilter(generic);
}


///--- API

module.exports = {
  parse: function (ber) {
    if (!ber || !(ber instanceof BerReader))
      throw new TypeError('ber (BerReader) required');

    return _parse(ber);
  },

  parseString: parseString,

  isFilter: Filter.isFilter,

  AndFilter: AndFilter,
  ApproximateFilter: ApproximateFilter,
  EqualityFilter: EqualityFilter,
  ExtensibleFilter: ExtensibleFilter,
  GreaterThanEqualsFilter: GreaterThanEqualsFilter,
  LessThanEqualsFilter: LessThanEqualsFilter,
  NotFilter: NotFilter,
  OrFilter: OrFilter,
  PresenceFilter: PresenceFilter,
  SubstringFilter: SubstringFilter
};

},{"../protocol":103,"./and_filter":63,"./approx_filter":64,"./equality_filter":65,"./ext_filter":66,"./filter":67,"./ge_filter":68,"./le_filter":70,"./not_filter":71,"./or_filter":72,"./presence_filter":73,"./substr_filter":74,"asn1":111,"assert":2,"ldap-filter":128}],70:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert');
var util = require('util');

var parents = require('ldap-filter');

var Filter = require('./filter');


///--- API

function LessThanEqualsFilter(options) {
  parents.LessThanEqualsFilter.call(this, options);
}
util.inherits(LessThanEqualsFilter, parents.LessThanEqualsFilter);
Filter.mixin(LessThanEqualsFilter);
module.exports = LessThanEqualsFilter;


LessThanEqualsFilter.prototype.parse = function (ber) {
  assert.ok(ber);

  this.attribute = ber.readString().toLowerCase();
  this.value = ber.readString();

  return true;
};


LessThanEqualsFilter.prototype._toBer = function (ber) {
  assert.ok(ber);

  ber.writeString(this.attribute);
  ber.writeString(this.value);

  return ber;
};

},{"./filter":67,"assert":2,"ldap-filter":128,"util":43}],71:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert');
var util = require('util');

var parents = require('ldap-filter');

var Filter = require('./filter');


///--- API

function NotFilter(options) {
  parents.NotFilter.call(this, options);
}
util.inherits(NotFilter, parents.NotFilter);
Filter.mixin(NotFilter);
module.exports = NotFilter;


NotFilter.prototype._toBer = function (ber) {
  assert.ok(ber);

  return this.filter.toBer(ber);
};

},{"./filter":67,"assert":2,"ldap-filter":128,"util":43}],72:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert');
var util = require('util');

var parents = require('ldap-filter');

var Filter = require('./filter');


///--- API

function OrFilter(options) {
  parents.OrFilter.call(this, options);
}
util.inherits(OrFilter, parents.OrFilter);
Filter.mixin(OrFilter);
module.exports = OrFilter;


OrFilter.prototype._toBer = function (ber) {
  assert.ok(ber);

  this.filters.forEach(function (f) {
    ber = f.toBer(ber);
  });

  return ber;
};

},{"./filter":67,"assert":2,"ldap-filter":128,"util":43}],73:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert');
var util = require('util');

var parents = require('ldap-filter');

var Filter = require('./filter');


///--- API

function PresenceFilter(options) {
  parents.PresenceFilter.call(this, options);
}
util.inherits(PresenceFilter, parents.PresenceFilter);
Filter.mixin(PresenceFilter);
module.exports = PresenceFilter;


PresenceFilter.prototype.parse = function (ber) {
  assert.ok(ber);

  this.attribute =
    ber.buffer.slice(0, ber.length).toString('utf8').toLowerCase();

  ber._offset += ber.length;

  return true;
};


PresenceFilter.prototype._toBer = function (ber) {
  assert.ok(ber);

  for (var i = 0; i < this.attribute.length; i++)
    ber.writeByte(this.attribute.charCodeAt(i));

  return ber;
};

},{"./filter":67,"assert":2,"ldap-filter":128,"util":43}],74:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert');
var util = require('util');

var parents = require('ldap-filter');

var Filter = require('./filter');


///--- API

function SubstringFilter(options) {
  parents.SubstringFilter.call(this, options);
}
util.inherits(SubstringFilter, parents.SubstringFilter);
Filter.mixin(SubstringFilter);
module.exports = SubstringFilter;


SubstringFilter.prototype.parse = function (ber) {
  assert.ok(ber);

  this.attribute = ber.readString().toLowerCase();
  ber.readSequence();
  var end = ber.offset + ber.length;

  while (ber.offset < end) {
    var tag = ber.peek();
    switch (tag) {
    case 0x80: // Initial
      this.initial = ber.readString(tag);
      if (this.attribute === 'objectclass')
        this.initial = this.initial.toLowerCase();
      break;
    case 0x81: // Any
      var anyVal = ber.readString(tag);
      if (this.attribute === 'objectclass')
        anyVal = anyVal.toLowerCase();
      this.any.push(anyVal);
      break;
    case 0x82: // Final
      this.final = ber.readString(tag);
      if (this.attribute === 'objectclass')
        this.final = this.final.toLowerCase();
      break;
    default:
      throw new Error('Invalid substrings filter type: 0x' + tag.toString(16));
    }
  }

  return true;
};


SubstringFilter.prototype._toBer = function (ber) {
  assert.ok(ber);

  ber.writeString(this.attribute);
  ber.startSequence();

  if (this.initial)
    ber.writeString(this.initial, 0x80);

  if (this.any && this.any.length)
    this.any.forEach(function (s) {
      ber.writeString(s, 0x81);
    });

  if (this.final)
    ber.writeString(this.final, 0x82);

  ber.endSequence();

  return ber;
};

},{"./filter":67,"assert":2,"ldap-filter":128,"util":43}],75:[function(require,module,exports){
(function (process){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var Logger = require('bunyan');

var client = require('./client');
var Attribute = require('./attribute');
var Change = require('./change');
var Protocol = require('./protocol');
var Server = require('./server');

var assert = require('assert');
var controls = require('./controls');
var persistentSearch = require('./persistent_search');
var dn = require('./dn');
var errors = require('./errors');
var filters = require('./filters');
var messages = require('./messages');
var url = require('./url');


///--- API

module.exports = {
  Client: client.Client,
  createClient: client.createClient,

  Server: Server,
  createServer: function (options) {
    if (options === undefined)
      options = {};

    if (typeof (options) !== 'object')
      throw new TypeError('options (object) required');

    if (!options.log) {
      options.log = new Logger({
        name: 'ldapjs',
        component: 'client',
        stream: process.stderr
      });
    }

    return new Server(options);
  },

  Attribute: Attribute,
  Change: Change,

  dn: dn,
  DN: dn.DN,
  RDN: dn.RDN,
  parseDN: dn.parse,

  persistentSearch: persistentSearch,
  PersistentSearchCache: persistentSearch.PersistentSearchCache,

  filters: filters,
  parseFilter: filters.parseString,

  url: url,
  parseURL: url.parse
};


///--- Export all the childrenz

var k;

for (k in Protocol) {
  if (Protocol.hasOwnProperty(k))
    module.exports[k] = Protocol[k];
}

for (k in messages) {
  if (messages.hasOwnProperty(k))
    module.exports[k] = messages[k];
}

for (k in controls) {
  if (controls.hasOwnProperty(k))
    module.exports[k] = controls[k];
}

for (k in filters) {
  if (filters.hasOwnProperty(k)) {
    if (k !== 'parse' && k !== 'parseString')
      module.exports[k] = filters[k];
  }
}

for (k in errors) {
  if (errors.hasOwnProperty(k)) {
    module.exports[k] = errors[k];
  }
}

}).call(this,require('_process'))
},{"./attribute":47,"./change":48,"./client":50,"./controls":54,"./dn":59,"./errors":62,"./filters":69,"./messages":88,"./persistent_search":102,"./protocol":103,"./server":104,"./url":105,"_process":17,"assert":2,"bunyan":119}],76:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var LDAPMessage = require('./message');
var Protocol = require('../protocol');


///--- API

function AbandonRequest(options) {
  options = options || {};
  assert.object(options);
  assert.optionalNumber(options.abandonID);

  options.protocolOp = Protocol.LDAP_REQ_ABANDON;
  LDAPMessage.call(this, options);

  this.abandonID = options.abandonID || 0;
}
util.inherits(AbandonRequest, LDAPMessage);
Object.defineProperties(AbandonRequest.prototype, {
  type: {
    get: function getType() { return 'AbandonRequest'; },
    configurable: false
  }
});

AbandonRequest.prototype._parse = function (ber, length) {
  assert.ok(ber);
  assert.ok(length);

  // What a PITA - have to replicate ASN.1 integer logic to work around the
  // way abandon is encoded and the way ldapjs framework handles "normal"
  // messages

  var buf = ber.buffer;
  var offset = 0;
  var value = 0;

  var fb = buf[offset++];
  value = fb & 0x7F;
  for (var i = 1; i < length; i++) {
    value <<= 8;
    value |= (buf[offset++] & 0xff);
  }
  if ((fb & 0x80) == 0x80)
    value = -value;

  ber._offset += length;

  this.abandonID = value;

  return true;
};

AbandonRequest.prototype._toBer = function (ber) {
  assert.ok(ber);

  var i = this.abandonID;
  var sz = 4;

  while ((((i & 0xff800000) === 0) || ((i & 0xff800000) === 0xff800000)) &&
         (sz > 1)) {
    sz--;
    i <<= 8;
  }
  assert.ok(sz <= 4);

  while (sz-- > 0) {
    ber.writeByte((i & 0xff000000) >> 24);
    i <<= 8;
  }

  return ber;
};

AbandonRequest.prototype._json = function (j) {
  assert.ok(j);

  j.abandonID = this.abandonID;

  return j;
};


///--- Exports

module.exports = AbandonRequest;

},{"../protocol":103,"./message":89,"assert-plus":112,"util":43}],77:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var LDAPMessage = require('./result');
var Protocol = require('../protocol');


///--- API

function AbandonResponse(options) {
  options = options || {};
  assert.object(options);

  options.protocolOp = 0;
  LDAPMessage.call(this, options);
}
util.inherits(AbandonResponse, LDAPMessage);
Object.defineProperties(AbandonResponse.prototype, {
  type: {
    get: function getType() { return 'AbandonResponse'; },
    configurable: false
  }
});

AbandonResponse.prototype.end = function (status) {};

AbandonResponse.prototype._json = function (j) {
  return j;
};


///--- Exports

module.exports = AbandonResponse;

},{"../protocol":103,"./result":95,"assert-plus":112,"util":43}],78:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var LDAPMessage = require('./message');
var Attribute = require('../attribute');
var Protocol = require('../protocol');
var lassert = require('../assert');


///--- API

function AddRequest(options) {
  options = options || {};
  assert.object(options);
  lassert.optionalStringDN(options.entry);
  lassert.optionalArrayOfAttribute(options.attributes);

  options.protocolOp = Protocol.LDAP_REQ_ADD;
  LDAPMessage.call(this, options);

  this.entry = options.entry || null;
  this.attributes = options.attributes ? options.attributes.slice(0) : [];
}
util.inherits(AddRequest, LDAPMessage);
Object.defineProperties(AddRequest.prototype, {
  type: {
    get: function getType() { return 'AddRequest'; },
    configurable: false
  },
  _dn: {
    get: function getDN() { return this.entry; },
    configurable: false
  }
});

AddRequest.prototype._parse = function (ber) {
  assert.ok(ber);

  this.entry = ber.readString();

  ber.readSequence();

  var end = ber.offset + ber.length;
  while (ber.offset < end) {
    var a = new Attribute();
    a.parse(ber);
    a.type = a.type.toLowerCase();
    if (a.type === 'objectclass') {
      for (var i = 0; i < a.vals.length; i++)
        a.vals[i] = a.vals[i].toLowerCase();
    }
    this.attributes.push(a);
  }

  this.attributes.sort(Attribute.compare);
  return true;
};

AddRequest.prototype._toBer = function (ber) {
  assert.ok(ber);

  ber.writeString(this.entry.toString());
  ber.startSequence();
  this.attributes.forEach(function (a) {
    a.toBer(ber);
  });
  ber.endSequence();

  return ber;
};

AddRequest.prototype._json = function (j) {
  assert.ok(j);

  j.entry = this.entry.toString();
  j.attributes = [];

  this.attributes.forEach(function (a) {
    j.attributes.push(a.json);
  });

  return j;
};

AddRequest.prototype.indexOf = function (attr) {
  if (!attr || typeof (attr) !== 'string')
    throw new TypeError('attr (string) required');

  for (var i = 0; i < this.attributes.length; i++) {
    if (this.attributes[i].type === attr)
      return i;
  }

  return -1;
};

AddRequest.prototype.attributeNames = function () {
  var attrs = [];

  for (var i = 0; i < this.attributes.length; i++)
    attrs.push(this.attributes[i].type.toLowerCase());

  return attrs;
};

AddRequest.prototype.getAttribute = function (name) {
  if (!name || typeof (name) !== 'string')
    throw new TypeError('attribute name (string) required');

  name = name.toLowerCase();

  for (var i = 0; i < this.attributes.length; i++) {
    if (this.attributes[i].type === name)
      return this.attributes[i];
  }

  return null;
};

AddRequest.prototype.addAttribute = function (attr) {
  if (!(attr instanceof Attribute))
    throw new TypeError('attribute (Attribute) required');

  return this.attributes.push(attr);
};

/**
 * Returns a "pure" JS representation of this object.
 *
 * An example object would look like:
 *
 * {
 *   "dn": "cn=unit, dc=test",
 *   "attributes": {
 *     "cn": ["unit", "foo"],
 *     "objectclass": ["top", "person"]
 *   }
 * }
 *
 * @return {Object} that looks like the above.
 */
AddRequest.prototype.toObject = function () {
  var self = this;

  var obj = {
    dn: self.entry ? self.entry.toString() : '',
    attributes: {}
  };

  if (!this.attributes || !this.attributes.length)
    return obj;

  this.attributes.forEach(function (a) {
    if (!obj.attributes[a.type])
      obj.attributes[a.type] = [];

    a.vals.forEach(function (v) {
      if (obj.attributes[a.type].indexOf(v) === -1)
        obj.attributes[a.type].push(v);
    });
  });

  return obj;
};


///--- Exports

module.exports = AddRequest;

},{"../assert":46,"../attribute":47,"../protocol":103,"./message":89,"assert-plus":112,"util":43}],79:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var LDAPResult = require('./result');
var Protocol = require('../protocol');


///--- API

function AddResponse(options) {
  options = options || {};
  assert.object(options);

  options.protocolOp = Protocol.LDAP_REP_ADD;
  LDAPResult.call(this, options);
}
util.inherits(AddResponse, LDAPResult);


///--- Exports

module.exports = AddResponse;

},{"../protocol":103,"./result":95,"assert-plus":112,"util":43}],80:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var asn1 = require('asn1');

var LDAPMessage = require('./message');
var Protocol = require('../protocol');


///--- Globals

var Ber = asn1.Ber;
var LDAP_BIND_SIMPLE = 'simple';
var LDAP_BIND_SASL = 'sasl';


///--- API

function BindRequest(options) {
  options = options || {};
  assert.object(options);

  options.protocolOp = Protocol.LDAP_REQ_BIND;
  LDAPMessage.call(this, options);

  this.version = options.version || 0x03;
  this.name = options.name || null;
  this.authentication = options.authentication || LDAP_BIND_SIMPLE;
  this.credentials = options.credentials || '';
}
util.inherits(BindRequest, LDAPMessage);
Object.defineProperties(BindRequest.prototype, {
  type: {
    get: function getType() { return 'BindRequest'; },
    configurable: false
  },
  _dn: {
    get: function getDN() { return this.name; },
    configurable: false
  }
});

BindRequest.prototype._parse = function (ber) {
  assert.ok(ber);

  this.version = ber.readInt();
  this.name = ber.readString();

  var t = ber.peek();

  // TODO add support for SASL et al
  if (t !== Ber.Context)
    throw new Error('authentication 0x' + t.toString(16) + ' not supported');

  this.authentication = LDAP_BIND_SIMPLE;
  this.credentials = ber.readString(Ber.Context);

  return true;
};

BindRequest.prototype._toBer = function (ber) {
  assert.ok(ber);

  ber.writeInt(this.version);
  ber.writeString((this.name || '').toString());
  // TODO add support for SASL et al
  ber.writeString((this.credentials || ''), Ber.Context);

  return ber;
};

BindRequest.prototype._json = function (j) {
  assert.ok(j);

  j.version = this.version;
  j.name = this.name;
  j.authenticationType = this.authentication;
  j.credentials = this.credentials;

  return j;
};


///--- Exports

module.exports = BindRequest;

},{"../protocol":103,"./message":89,"asn1":111,"assert-plus":112,"util":43}],81:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var LDAPResult = require('./result');
var Protocol = require('../protocol');


///--- API

function BindResponse(options) {
  options = options || {};
  assert.object(options);

  options.protocolOp = Protocol.LDAP_REP_BIND;
  LDAPResult.call(this, options);
}
util.inherits(BindResponse, LDAPResult);


///--- Exports

module.exports = BindResponse;

},{"../protocol":103,"./result":95,"assert-plus":112,"util":43}],82:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var LDAPMessage = require('./message');
var Protocol = require('../protocol');
var lassert = require('../assert');


///--- API

function CompareRequest(options) {
  options = options || {};
  assert.object(options);
  assert.optionalString(options.attribute);
  assert.optionalString(options.value);
  lassert.optionalStringDN(options.entry);

  options.protocolOp = Protocol.LDAP_REQ_COMPARE;
  LDAPMessage.call(this, options);

  this.entry = options.entry || null;
  this.attribute = options.attribute || '';
  this.value = options.value || '';
}
util.inherits(CompareRequest, LDAPMessage);
Object.defineProperties(CompareRequest.prototype, {
  type: {
    get: function getType() { return 'CompareRequest'; },
    configurable: false
  },
  _dn: {
    get: function getDN() { return this.entry; },
    configurable: false
  }
});

CompareRequest.prototype._parse = function (ber) {
  assert.ok(ber);

  this.entry = ber.readString();

  ber.readSequence();
  this.attribute = ber.readString().toLowerCase();
  this.value = ber.readString();

  return true;
};

CompareRequest.prototype._toBer = function (ber) {
  assert.ok(ber);

  ber.writeString(this.entry.toString());
  ber.startSequence();
  ber.writeString(this.attribute);
  ber.writeString(this.value);
  ber.endSequence();

  return ber;
};

CompareRequest.prototype._json = function (j) {
  assert.ok(j);

  j.entry = this.entry.toString();
  j.attribute = this.attribute;
  j.value = this.value;

  return j;
};


///--- Exports

module.exports = CompareRequest;

},{"../assert":46,"../protocol":103,"./message":89,"assert-plus":112,"util":43}],83:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var LDAPResult = require('./result');
var Protocol = require('../protocol');


///--- API

function CompareResponse(options) {
  options = options || {};
  assert.object(options);

  options.protocolOp = Protocol.LDAP_REP_COMPARE;
  LDAPResult.call(this, options);
}
util.inherits(CompareResponse, LDAPResult);

CompareResponse.prototype.end = function (matches) {
  var status = 0x06;
  if (typeof (matches) === 'boolean') {
    if (!matches)
      status = 0x05; // Compare false
  } else {
    status = matches;
  }

  return LDAPResult.prototype.end.call(this, status);
};


///--- Exports

module.exports = CompareResponse;

},{"../protocol":103,"./result":95,"assert-plus":112,"util":43}],84:[function(require,module,exports){
(function (Buffer){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var LDAPMessage = require('./message');
var Protocol = require('../protocol');
var lassert = require('../assert');


///--- API

function DeleteRequest(options) {
  options = options || {};
  assert.object(options);
  lassert.optionalStringDN(options.entry);

  options.protocolOp = Protocol.LDAP_REQ_DELETE;
  LDAPMessage.call(this, options);

  this.entry = options.entry || null;
}
util.inherits(DeleteRequest, LDAPMessage);
Object.defineProperties(DeleteRequest.prototype, {
  type: {
    get: function getType() { return 'DeleteRequest'; },
    configurable: false
  },
  _dn: {
    get: function getDN() { return this.entry; },
    configurable: false
  }
});

DeleteRequest.prototype._parse = function (ber, length) {
  assert.ok(ber);

  this.entry = ber.buffer.slice(0, length).toString('utf8');
  ber._offset += ber.length;

  return true;
};

DeleteRequest.prototype._toBer = function (ber) {
  assert.ok(ber);

  var buf = new Buffer(this.entry.toString());
  for (var i = 0; i < buf.length; i++)
    ber.writeByte(buf[i]);

  return ber;
};

DeleteRequest.prototype._json = function (j) {
  assert.ok(j);

  j.entry = this.entry;

  return j;
};


///--- Exports

module.exports = DeleteRequest;

}).call(this,require("buffer").Buffer)
},{"../assert":46,"../protocol":103,"./message":89,"assert-plus":112,"buffer":8,"util":43}],85:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var LDAPResult = require('./result');
var Protocol = require('../protocol');


///--- API

function DeleteResponse(options) {
  options = options || {};
  assert.object(options);

  options.protocolOp = Protocol.LDAP_REP_DELETE;
  LDAPResult.call(this, options);
}
util.inherits(DeleteResponse, LDAPResult);


///--- Exports

module.exports = DeleteResponse;

},{"../protocol":103,"./result":95,"assert-plus":112,"util":43}],86:[function(require,module,exports){
(function (Buffer){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var LDAPMessage = require('./message');
var Protocol = require('../protocol');


///--- API

function ExtendedRequest(options) {
  options = options || {};
  assert.object(options);
  assert.optionalString(options.requestName);
  if (options.requestValue &&
      !(Buffer.isBuffer(options.requestValue) ||
      typeof (options.requestValue) === 'string')) {
    throw new TypeError('options.requestValue must be a buffer or a string');
  }

  options.protocolOp = Protocol.LDAP_REQ_EXTENSION;
  LDAPMessage.call(this, options);

  this.requestName = options.requestName || '';
  this.requestValue = options.requestValue;
}
util.inherits(ExtendedRequest, LDAPMessage);
Object.defineProperties(ExtendedRequest.prototype, {
  type: {
    get: function getType() { return 'ExtendedRequest'; },
    configurable: false
  },
  _dn: {
    get: function getDN() { return this.requestName; },
    configurable: false
  },
  name: {
    get: function getName() { return this.requestName; },
    set: function setName(val) {
      assert.string(val);
      this.requestName = val;
    },
    configurable: false
  },
  value: {
    get: function getValue() { return this.requestValue; },
    set: function setValue(val) {
      if (!(Buffer.isBuffer(val) || typeof (val) === 'string'))
        throw new TypeError('value must be a buffer or a string');

      this.requestValue = val;
    },
    configurable: false
  }
});

ExtendedRequest.prototype._parse = function (ber) {
  assert.ok(ber);

  this.requestName = ber.readString(0x80);
  if (ber.peek() === 0x81)
    try {
      this.requestValue = ber.readString(0x81);
    } catch (e) {
      this.requestValue = ber.readBuffer(0x81);
    }

  return true;
};

ExtendedRequest.prototype._toBer = function (ber) {
  assert.ok(ber);

  ber.writeString(this.requestName, 0x80);
  if (Buffer.isBuffer(this.requestValue)) {
    ber.writeBuffer(this.requestValue, 0x81);
  } else if (typeof (this.requestValue) === 'string') {
    ber.writeString(this.requestValue, 0x81);
  }

  return ber;
};

ExtendedRequest.prototype._json = function (j) {
  assert.ok(j);

  j.requestName = this.requestName;
  j.requestValue = (Buffer.isBuffer(this.requestValue)) ?
    this.requestValue.toString('hex') : this.requestValue;

  return j;
};


///--- Exports

module.exports = ExtendedRequest;

}).call(this,{"isBuffer":require("../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js")})
},{"../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js":13,"../protocol":103,"./message":89,"assert-plus":112,"util":43}],87:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var LDAPResult = require('./result');
var Protocol = require('../protocol');


///--- API

function ExtendedResponse(options) {
  options = options || {};
  assert.object(options);
  assert.optionalString(options.responseName);
  assert.optionalString(options.responsevalue);

  this.responseName = options.responseName || undefined;
  this.responseValue = options.responseValue || undefined;

  options.protocolOp = Protocol.LDAP_REP_EXTENSION;
  LDAPResult.call(this, options);
}
util.inherits(ExtendedResponse, LDAPResult);
Object.defineProperties(ExtendedResponse.prototype, {
  type: {
    get: function getType() { return 'ExtendedResponse'; },
    configurable: false
  },
  _dn: {
    get: function getDN() { return this.responseName; },
    configurable: false
  },
  name: {
    get: function getName() { return this.responseName; },
    set: function setName(val) {
      assert.string(val);
      this.responseName = val;
    },
    configurable: false
  },
  value: {
    get: function getValue() { return this.responseValue; },
    set: function (val) {
      assert.string(val);
      this.responseValue = val;
    },
    configurable: false
  }
});

ExtendedResponse.prototype._parse = function (ber) {
  assert.ok(ber);

  if (!LDAPResult.prototype._parse.call(this, ber))
    return false;

  if (ber.peek() === 0x8a)
    this.responseName = ber.readString(0x8a);
  if (ber.peek() === 0x8b)
    this.responseValue = ber.readString(0x8b);

  return true;
};

ExtendedResponse.prototype._toBer = function (ber) {
  assert.ok(ber);

  if (!LDAPResult.prototype._toBer.call(this, ber))
    return false;

  if (this.responseName)
    ber.writeString(this.responseName, 0x8a);
  if (this.responseValue)
    ber.writeString(this.responseValue, 0x8b);

  return ber;
};

ExtendedResponse.prototype._json = function (j) {
  assert.ok(j);

  j = LDAPResult.prototype._json.call(this, j);

  j.responseName = this.responseName;
  j.responseValue = this.responseValue;

  return j;
};


///--- Exports

module.exports = ExtendedResponse;

},{"../protocol":103,"./result":95,"assert-plus":112,"util":43}],88:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var LDAPMessage = require('./message');
var LDAPResult = require('./result');
var Parser = require('./parser');

var AbandonRequest = require('./abandon_request');
var AbandonResponse = require('./abandon_response');
var AddRequest = require('./add_request');
var AddResponse = require('./add_response');
var BindRequest = require('./bind_request');
var BindResponse = require('./bind_response');
var CompareRequest = require('./compare_request');
var CompareResponse = require('./compare_response');
var DeleteRequest = require('./del_request');
var DeleteResponse = require('./del_response');
var ExtendedRequest = require('./ext_request');
var ExtendedResponse = require('./ext_response');
var ModifyRequest = require('./modify_request');
var ModifyResponse = require('./modify_response');
var ModifyDNRequest = require('./moddn_request');
var ModifyDNResponse = require('./moddn_response');
var SearchRequest = require('./search_request');
var SearchEntry = require('./search_entry');
var SearchReference = require('./search_reference');
var SearchResponse = require('./search_response');
var UnbindRequest = require('./unbind_request');
var UnbindResponse = require('./unbind_response');


///--- API

module.exports = {

  LDAPMessage: LDAPMessage,
  LDAPResult: LDAPResult,
  Parser: Parser,

  AbandonRequest: AbandonRequest,
  AbandonResponse: AbandonResponse,
  AddRequest: AddRequest,
  AddResponse: AddResponse,
  BindRequest: BindRequest,
  BindResponse: BindResponse,
  CompareRequest: CompareRequest,
  CompareResponse: CompareResponse,
  DeleteRequest: DeleteRequest,
  DeleteResponse: DeleteResponse,
  ExtendedRequest: ExtendedRequest,
  ExtendedResponse: ExtendedResponse,
  ModifyRequest: ModifyRequest,
  ModifyResponse: ModifyResponse,
  ModifyDNRequest: ModifyDNRequest,
  ModifyDNResponse: ModifyDNResponse,
  SearchRequest: SearchRequest,
  SearchEntry: SearchEntry,
  SearchReference: SearchReference,
  SearchResponse: SearchResponse,
  UnbindRequest: UnbindRequest,
  UnbindResponse: UnbindResponse

};

},{"./abandon_request":76,"./abandon_response":77,"./add_request":78,"./add_response":79,"./bind_request":80,"./bind_response":81,"./compare_request":82,"./compare_response":83,"./del_request":84,"./del_response":85,"./ext_request":86,"./ext_response":87,"./message":89,"./moddn_request":90,"./moddn_response":91,"./modify_request":92,"./modify_response":93,"./parser":94,"./result":95,"./search_entry":96,"./search_reference":97,"./search_request":98,"./search_response":99,"./unbind_request":100,"./unbind_response":101}],89:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var asn1 = require('asn1');

var Control = require('../controls').Control;
var Protocol = require('../protocol');


///--- Globals

var Ber = asn1.Ber;
var BerReader = asn1.BerReader;
var BerWriter = asn1.BerWriter;
var getControl = require('../controls').getControl;


///--- API


/**
 * LDAPMessage structure.
 *
 * @param {Object} options stuff.
 */
function LDAPMessage(options) {
  assert.object(options);

  this.messageID = options.messageID || 0;
  this.protocolOp = options.protocolOp || undefined;
  this.controls = options.controls ? options.controls.slice(0) : [];

  this.log = options.log;
}
Object.defineProperties(LDAPMessage.prototype, {
  id: {
    get: function getId() { return this.messageID; },
    configurable: false
  },
  dn: {
    get: function getDN() { return this._dn || ''; },
    configurable: false
  },
  type: {
    get: function getType() { return 'LDAPMessage'; },
    configurable: false
  },
  json: {
    get: function () {
      var out = this._json({
        messageID: this.messageID,
        protocolOp: this.type
      });
      out.controls = this.controls;
      return out;
    },
    configurable: false
  }
});

LDAPMessage.prototype.toString = function () {
  return JSON.stringify(this.json);
};

LDAPMessage.prototype.parse = function (ber) {
  assert.ok(ber);

  if (this.log.trace())
    this.log.trace('parse: data=%s', util.inspect(ber.buffer));

  // Delegate off to the specific type to parse
  this._parse(ber, ber.length);

  // Look for controls
  if (ber.peek() === 0xa0) {
    ber.readSequence();
    var end = ber.offset + ber.length;
    while (ber.offset < end) {
      var c = getControl(ber);
      if (c)
        this.controls.push(c);
    }
  }

  if (this.log.trace())
    this.log.trace('Parsing done: %j', this.json);
  return true;
};

LDAPMessage.prototype.toBer = function () {
  var writer = new BerWriter();
  writer.startSequence();
  writer.writeInt(this.messageID);

  writer.startSequence(this.protocolOp);
  if (this._toBer)
    writer = this._toBer(writer);
  writer.endSequence();

  if (this.controls && this.controls.length) {
    writer.startSequence(0xa0);
    this.controls.forEach(function (c) {
      c.toBer(writer);
    });
    writer.endSequence();
  }

  writer.endSequence();
  return writer.buffer;
};


///--- Exports

module.exports = LDAPMessage;

},{"../controls":54,"../protocol":103,"asn1":111,"assert-plus":112,"util":43}],90:[function(require,module,exports){
(function (Buffer){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var LDAPMessage = require('./message');
var Protocol = require('../protocol');
var dn = require('../dn');
var lassert = require('../assert');


///--- API

function ModifyDNRequest(options) {
  options = options || {};
  assert.object(options);
  assert.optionalBool(options.deleteOldRdn);
  lassert.optionalStringDN(options.entry);
  lassert.optionalDN(options.newRdn);
  lassert.optionalDN(options.newSuperior);

  options.protocolOp = Protocol.LDAP_REQ_MODRDN;
  LDAPMessage.call(this, options);

  this.entry = options.entry || null;
  this.newRdn = options.newRdn || null;
  this.deleteOldRdn = options.deleteOldRdn || true;
  this.newSuperior = options.newSuperior || null;
}
util.inherits(ModifyDNRequest, LDAPMessage);
Object.defineProperties(ModifyDNRequest.prototype, {
  type: {
    get: function getType() { return 'ModifyDNRequest'; },
    configurable: false
  },
  _dn: {
    get: function getDN() { return this.entry; },
    configurable: false
  }
});

ModifyDNRequest.prototype._parse = function (ber) {
  assert.ok(ber);

  this.entry = ber.readString();
  this.newRdn = dn.parse(ber.readString());
  this.deleteOldRdn = ber.readBoolean();
  if (ber.peek() === 0x80)
    this.newSuperior = dn.parse(ber.readString(0x80));

  return true;
};

ModifyDNRequest.prototype._toBer = function (ber) {
  //assert.ok(ber);

  ber.writeString(this.entry.toString());
  ber.writeString(this.newRdn.toString());
  ber.writeBoolean(this.deleteOldRdn);
  if (this.newSuperior) {
    var s = this.newSuperior.toString();
    var len = Buffer.byteLength(s);

    ber.writeByte(0x80); // MODIFY_DN_REQUEST_NEW_SUPERIOR_TAG
    ber.writeByte(len);
    ber._ensure(len);
    ber._buf.write(s, ber._offset);
    ber._offset += len;
  }

  return ber;
};

ModifyDNRequest.prototype._json = function (j) {
  assert.ok(j);

  j.entry = this.entry.toString();
  j.newRdn = this.newRdn.toString();
  j.deleteOldRdn = this.deleteOldRdn;
  j.newSuperior = this.newSuperior ? this.newSuperior.toString() : '';

  return j;
};


///--- Exports

module.exports = ModifyDNRequest;

}).call(this,require("buffer").Buffer)
},{"../assert":46,"../dn":59,"../protocol":103,"./message":89,"assert-plus":112,"buffer":8,"util":43}],91:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var LDAPResult = require('./result');
var Protocol = require('../protocol');


///--- API

function ModifyDNResponse(options) {
  options = options || {};
  assert.object(options);

  options.protocolOp = Protocol.LDAP_REP_MODRDN;
  LDAPResult.call(this, options);
}
util.inherits(ModifyDNResponse, LDAPResult);


///--- Exports

module.exports = ModifyDNResponse;

},{"../protocol":103,"./result":95,"assert-plus":112,"util":43}],92:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var LDAPMessage = require('./message');
var Change = require('../change');
var Protocol = require('../protocol');
var lassert = require('../assert');


///--- API

function ModifyRequest(options) {
  options = options || {};
  assert.object(options);
  lassert.optionalStringDN(options.object);
  lassert.optionalArrayOfAttribute(options.attributes);

  options.protocolOp = Protocol.LDAP_REQ_MODIFY;
  LDAPMessage.call(this, options);

  this.object = options.object || null;
  this.changes = options.changes ? options.changes.slice(0) : [];
}
util.inherits(ModifyRequest, LDAPMessage);
Object.defineProperties(ModifyRequest.prototype, {
  type: {
    get: function getType() { return 'ModifyRequest'; },
    configurable: false
  },
  _dn: {
    get: function getDN() { return this.object; },
    configurable: false
  }
});

ModifyRequest.prototype._parse = function (ber) {
  assert.ok(ber);

  this.object = ber.readString();

  ber.readSequence();
  var end = ber.offset + ber.length;
  while (ber.offset < end) {
    var c = new Change();
    c.parse(ber);
    c.modification.type = c.modification.type.toLowerCase();
    this.changes.push(c);
  }

  this.changes.sort(Change.compare);
  return true;
};

ModifyRequest.prototype._toBer = function (ber) {
  assert.ok(ber);

  ber.writeString(this.object.toString());
  ber.startSequence();
  this.changes.forEach(function (c) {
    c.toBer(ber);
  });
  ber.endSequence();

  return ber;
};

ModifyRequest.prototype._json = function (j) {
  assert.ok(j);

  j.object = this.object;
  j.changes = [];

  this.changes.forEach(function (c) {
    j.changes.push(c.json);
  });

  return j;
};


///--- Exports

module.exports = ModifyRequest;

},{"../assert":46,"../change":48,"../protocol":103,"./message":89,"assert-plus":112,"util":43}],93:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var LDAPResult = require('./result');
var Protocol = require('../protocol');


///--- API

function ModifyResponse(options) {
  options = options || {};
  assert.object(options);

  options.protocolOp = Protocol.LDAP_REP_MODIFY;
  LDAPResult.call(this, options);
}
util.inherits(ModifyResponse, LDAPResult);


///--- Exports

module.exports = ModifyResponse;

},{"../protocol":103,"./result":95,"assert-plus":112,"util":43}],94:[function(require,module,exports){
(function (Buffer){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var EventEmitter = require('events').EventEmitter;
var util = require('util');

var assert = require('assert-plus');
var asn1 = require('asn1');
var VError = require('verror').VError;

var AbandonRequest = require('./abandon_request');
var AddRequest = require('./add_request');
var AddResponse = require('./add_response');
var BindRequest = require('./bind_request');
var BindResponse = require('./bind_response');
var CompareRequest = require('./compare_request');
var CompareResponse = require('./compare_response');
var DeleteRequest = require('./del_request');
var DeleteResponse = require('./del_response');
var ExtendedRequest = require('./ext_request');
var ExtendedResponse = require('./ext_response');
var ModifyRequest = require('./modify_request');
var ModifyResponse = require('./modify_response');
var ModifyDNRequest = require('./moddn_request');
var ModifyDNResponse = require('./moddn_response');
var SearchRequest = require('./search_request');
var SearchEntry = require('./search_entry');
var SearchReference = require('./search_reference');
var SearchResponse = require('./search_response');
var UnbindRequest = require('./unbind_request');
var UnbindResponse = require('./unbind_response');

var LDAPResult = require('./result');
var Message = require('./message');

var Protocol = require('../protocol');


///--- Globals

var Ber = asn1.Ber;
var BerReader = asn1.BerReader;


///--- API

function Parser(options) {
  assert.object(options);
  assert.object(options.log);

  EventEmitter.call(this);

  this.buffer = null;
  this.log = options.log;
}
util.inherits(Parser, EventEmitter);

Parser.prototype.write = function (data) {
  if (!data || !Buffer.isBuffer(data))
    throw new TypeError('data (buffer) required');

  var nextMessage = null;
  var self = this;

  function end() {
    if (nextMessage)
      return self.write(nextMessage);

    return true;
  }

  self.buffer = (self.buffer ? Buffer.concat([self.buffer, data]) : data);

  var ber = new BerReader(self.buffer);

  var foundSeq = false;
  try {
    foundSeq = ber.readSequence();
  } catch (e) {
    this.emit('error', e);
  }

  if (!foundSeq || ber.remain < ber.length) {
    // ENOTENOUGH
    return false;
  } else if (ber.remain > ber.length) {
    // ETOOMUCH
    // This is sort of ugly, but allows us to make miminal copies
    nextMessage = self.buffer.slice(ber.offset + ber.length);
    ber._size = ber.offset + ber.length;
    assert.equal(ber.remain, ber.length);
  }

  // If we're here, ber holds the message, and nextMessage is temporarily
  // pointing at the next sequence of data (if it exists)
  self.buffer = null;

  var message;
  try {
    // Bail here if peer isn't speaking protocol at all
    message = this.getMessage(ber);

    if (!message) {
      return end();
    }
    message.parse(ber);
  } catch (e) {
    this.emit('error', e, message);
    return false;
  }

  this.emit('message', message);
  return end();
};

Parser.prototype.getMessage = function (ber) {
  assert.ok(ber);

  var self = this;

  var messageID = ber.readInt();
  var type = ber.readSequence();

  var Message;
  switch (type) {

  case Protocol.LDAP_REQ_ABANDON:
    Message = AbandonRequest;
    break;

  case Protocol.LDAP_REQ_ADD:
    Message = AddRequest;
    break;

  case Protocol.LDAP_REP_ADD:
    Message = AddResponse;
    break;

  case Protocol.LDAP_REQ_BIND:
    Message = BindRequest;
    break;

  case Protocol.LDAP_REP_BIND:
    Message = BindResponse;
    break;

  case Protocol.LDAP_REQ_COMPARE:
    Message = CompareRequest;
    break;

  case Protocol.LDAP_REP_COMPARE:
    Message = CompareResponse;
    break;

  case Protocol.LDAP_REQ_DELETE:
    Message = DeleteRequest;
    break;

  case Protocol.LDAP_REP_DELETE:
    Message = DeleteResponse;
    break;

  case Protocol.LDAP_REQ_EXTENSION:
    Message = ExtendedRequest;
    break;

  case Protocol.LDAP_REP_EXTENSION:
    Message = ExtendedResponse;
    break;

  case Protocol.LDAP_REQ_MODIFY:
    Message = ModifyRequest;
    break;

  case Protocol.LDAP_REP_MODIFY:
    Message = ModifyResponse;
    break;

  case Protocol.LDAP_REQ_MODRDN:
    Message = ModifyDNRequest;
    break;

  case Protocol.LDAP_REP_MODRDN:
    Message = ModifyDNResponse;
    break;

  case Protocol.LDAP_REQ_SEARCH:
    Message = SearchRequest;
    break;

  case Protocol.LDAP_REP_SEARCH_ENTRY:
    Message = SearchEntry;
    break;

  case Protocol.LDAP_REP_SEARCH_REF:
    Message = SearchReference;
    break;

  case Protocol.LDAP_REP_SEARCH:
    Message = SearchResponse;
    break;

  case Protocol.LDAP_REQ_UNBIND:
    Message = UnbindRequest;
    break;

  default:
    this.emit('error',
              new Error('Op 0x' + (type ? type.toString(16) : '??') +
                        ' not supported'),
              new LDAPResult({
                messageID: messageID,
                protocolOp: type || Protocol.LDAP_REP_EXTENSION
              }));

    return false;
  }


  return new Message({
    messageID: messageID,
    log: self.log
  });
};


///--- Exports

module.exports = Parser;

}).call(this,require("buffer").Buffer)
},{"../protocol":103,"./abandon_request":76,"./add_request":78,"./add_response":79,"./bind_request":80,"./bind_response":81,"./compare_request":82,"./compare_response":83,"./del_request":84,"./del_response":85,"./ext_request":86,"./ext_response":87,"./message":89,"./moddn_request":90,"./moddn_response":91,"./modify_request":92,"./modify_response":93,"./result":95,"./search_entry":96,"./search_reference":97,"./search_request":98,"./search_response":99,"./unbind_request":100,"./unbind_response":101,"asn1":111,"assert-plus":112,"buffer":8,"events":10,"util":43,"verror":138}],95:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var asn1 = require('asn1');

var dtrace = require('../dtrace');
var LDAPMessage = require('./message');
var Protocol = require('../protocol');


///--- Globals

var Ber = asn1.Ber;
var BerWriter = asn1.BerWriter;


///--- API

function LDAPResult(options) {
  options = options || {};
  assert.object(options);
  assert.optionalNumber(options.status);
  assert.optionalString(options.matchedDN);
  assert.optionalString(options.errorMessage);
  assert.optionalArrayOfString(options.referrals);

  LDAPMessage.call(this, options);

  this.status = options.status || 0; // LDAP SUCCESS
  this.matchedDN = options.matchedDN || '';
  this.errorMessage = options.errorMessage || '';
  this.referrals = options.referrals || [];

  this.connection = options.connection || null;
}
util.inherits(LDAPResult, LDAPMessage);
Object.defineProperties(LDAPResult.prototype, {
  type: {
    get: function getType() { return 'LDAPResult'; },
    configurable: false
  }
});

LDAPResult.prototype.end = function (status) {
  assert.ok(this.connection);

  if (typeof (status) === 'number')
    this.status = status;

  var ber = this.toBer();
  if (this.log.debug())
    this.log.debug('%s: sending:  %j', this.connection.ldap.id, this.json);

  try {
    var self = this;
    this.connection.write(ber);

    if (self._dtraceOp && self._dtraceId) {
      dtrace.fire('server-' + self._dtraceOp + '-done', function () {
        var c = self.connection || {ldap: {}};
        return [
          self._dtraceId || 0,
          (c.remoteAddress || ''),
          c.ldap.bindDN ? c.ldap.bindDN.toString() : '',
          (self.requestDN ? self.requestDN.toString() : ''),
          status || self.status,
          self.errorMessage
        ];
      });
    }

  } catch (e) {
    this.log.warn(e, '%s failure to write message %j',
                  this.connection.ldap.id, this.json);
  }

};

LDAPResult.prototype._parse = function (ber) {
  assert.ok(ber);

  this.status = ber.readEnumeration();
  this.matchedDN = ber.readString();
  this.errorMessage = ber.readString();

  var t = ber.peek();

  if (t === Protocol.LDAP_REP_REFERRAL) {
    var end = ber.offset + ber.length;
    while (ber.offset < end)
      this.referrals.push(ber.readString());
  }

  return true;
};

LDAPResult.prototype._toBer = function (ber) {
  assert.ok(ber);

  ber.writeEnumeration(this.status);
  ber.writeString(this.matchedDN || '');
  ber.writeString(this.errorMessage || '');

  if (this.referrals.length) {
    ber.startSequence(Protocol.LDAP_REP_REFERRAL);
    ber.writeStringArray(this.referrals);
    ber.endSequence();
  }

  return ber;
};

LDAPResult.prototype._json = function (j) {
  assert.ok(j);

  j.status = this.status;
  j.matchedDN = this.matchedDN;
  j.errorMessage = this.errorMessage;
  j.referrals = this.referrals;

  return j;
};


///--- Exports

module.exports = LDAPResult;

},{"../dtrace":60,"../protocol":103,"./message":89,"asn1":111,"assert-plus":112,"util":43}],96:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var asn1 = require('asn1');

var LDAPMessage = require('./message');
var Attribute = require('../attribute');
var Protocol = require('../protocol');
var lassert = require('../assert');


///--- Globals

var BerWriter = asn1.BerWriter;


///--- API

function SearchEntry(options) {
  options = options || {};
  assert.object(options);
  lassert.optionalStringDN(options.objectName);

  options.protocolOp = Protocol.LDAP_REP_SEARCH_ENTRY;
  LDAPMessage.call(this, options);

  this.objectName = options.objectName || null;
  this.setAttributes(options.attributes || []);
}
util.inherits(SearchEntry, LDAPMessage);
Object.defineProperties(SearchEntry.prototype, {
  type: {
    get: function getType() { return 'SearchEntry'; },
    configurable: false
  },
  _dn: {
    get: function getDN() { return this.objectName; },
    configurable: false
  },
  object: {
    get: function getObject() {
      var obj = {
        dn: this.dn.toString(),
        controls: []
      };
      this.attributes.forEach(function (a) {
        if (a.vals && a.vals.length) {
          if (a.vals.length > 1) {
            obj[a.type] = a.vals.slice();
          } else {
            obj[a.type] = a.vals[0];
          }
        } else {
          obj[a.type] = [];
        }
      });
      this.controls.forEach(function (element, index, array) {
        obj.controls.push(element.json);
      });
      return obj;
    },
    configurable: false
  },
  raw: {
    get: function getRaw() {
      var obj = {
        dn: this.dn.toString(),
        controls: []
      };

      this.attributes.forEach(function (a) {
        if (a.buffers && a.buffers.length) {
          if (a.buffers.length > 1) {
            obj[a.type] = a.buffers.slice();
          } else {
            obj[a.type] = a.buffers[0];
          }
        } else {
          obj[a.type] = [];
        }
          });
      this.controls.forEach(function (element, index, array) {
        obj.controls.push(element.json);
      });
      return obj;
    },
    configurable: false
  }
});

SearchEntry.prototype.addAttribute = function (attr) {
  if (!attr || typeof (attr) !== 'object')
    throw new TypeError('attr (attribute) required');

  this.attributes.push(attr);
};

SearchEntry.prototype.toObject = function () {
  return this.object;
};

SearchEntry.prototype.fromObject = function (obj) {
  if (typeof (obj) !== 'object')
    throw new TypeError('object required');

  var self = this;
  if (obj.controls)
    this.controls = obj.controls;

  if (obj.attributes)
    obj = obj.attributes;
  this.attributes = [];

  Object.keys(obj).forEach(function (k) {
    self.attributes.push(new Attribute({type: k, vals: obj[k]}));
  });

  return true;
};

SearchEntry.prototype.setAttributes = function (obj) {
  if (typeof (obj) !== 'object')
    throw new TypeError('object required');

  if (Array.isArray(obj)) {
    obj.forEach(function (a) {
      if (!Attribute.isAttribute(a))
        throw new TypeError('entry must be an Array of Attributes');
    });
    this.attributes = obj;
  } else {
    var self = this;

    self.attributes = [];
    Object.keys(obj).forEach(function (k) {
      var attr = new Attribute({type: k});
      if (Array.isArray(obj[k])) {
        obj[k].forEach(function (v) {
          attr.addValue(v.toString());
        });
      } else {
        attr.addValue(obj[k].toString());
      }
      self.attributes.push(attr);
    });
  }
};

SearchEntry.prototype._json = function (j) {
  assert.ok(j);

  j.objectName = this.objectName.toString();
  j.attributes = [];
  this.attributes.forEach(function (a) {
    j.attributes.push(a.json || a);
  });

  return j;
};

SearchEntry.prototype._parse = function (ber) {
  assert.ok(ber);

  this.objectName = ber.readString();
  assert.ok(ber.readSequence());

  var end = ber.offset + ber.length;
  while (ber.offset < end) {
    var a = new Attribute();
    a.parse(ber);
    this.attributes.push(a);
  }

  return true;
};

SearchEntry.prototype._toBer = function (ber) {
  assert.ok(ber);

  ber.writeString(this.objectName.toString());
  ber.startSequence();
  this.attributes.forEach(function (a) {
    // This may or may not be an attribute
    ber = Attribute.toBer(a, ber);
  });
  ber.endSequence();

  return ber;
};


///--- Exports

module.exports = SearchEntry;

},{"../assert":46,"../attribute":47,"../protocol":103,"./message":89,"asn1":111,"assert-plus":112,"util":43}],97:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var asn1 = require('asn1');

var LDAPMessage = require('./message');
var Protocol = require('../protocol');
var dn = require('../dn');
var url = require('../url');


///--- Globals

var BerWriter = asn1.BerWriter;
var parseURL = url.parse;


///--- API

function SearchReference(options) {
  options = options || {};
  assert.object(options);

  options.protocolOp = Protocol.LDAP_REP_SEARCH_REF;
  LDAPMessage.call(this, options);

  this.uris = options.uris || [];
}
util.inherits(SearchReference, LDAPMessage);
Object.defineProperties(SearchReference.prototype, {
  type: {
    get: function getType() { return 'SearchReference'; },
    configurable: false
  },
  _dn: {
    get: function getDN() { return new dn.DN(''); },
    configurable: false
  },
  object: {
    get: function getObject() {
      return {
        dn: this.dn.toString(),
        uris: this.uris.slice()
      };
    },
    configurable: false
  },
  urls: {
    get: function getUrls() { return this.uris; },
    set: function setUrls(val) {
      assert.ok(val);
      assert.ok(Array.isArray(val));
      this.uris = val.slice();
    },
    configurable: false
  }
});

SearchReference.prototype.toObject = function () {
  return this.object;
};

SearchReference.prototype.fromObject = function (obj) {
  if (typeof (obj) !== 'object')
    throw new TypeError('object required');

  this.uris = obj.uris ? obj.uris.slice() : [];

  return true;
};

SearchReference.prototype._json = function (j) {
  assert.ok(j);
  j.uris = this.uris.slice();
  return j;
};

SearchReference.prototype._parse = function (ber, length) {
  assert.ok(ber);

  while (ber.offset < length) {
    var _url = ber.readString();
    parseURL(_url);
    this.uris.push(_url);
  }

  return true;
};

SearchReference.prototype._toBer = function (ber) {
  assert.ok(ber);

  this.uris.forEach(function (u) {
    ber.writeString(u.href || u);
  });

  return ber;
};


///--- Exports

module.exports = SearchReference;

},{"../dn":59,"../protocol":103,"../url":105,"./message":89,"asn1":111,"assert-plus":112,"util":43}],98:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var asn1 = require('asn1');

var LDAPMessage = require('./message');
var LDAPResult = require('./result');
var dn = require('../dn');
var filters = require('../filters');
var Protocol = require('../protocol');


///--- Globals

var Ber = asn1.Ber;


///--- API

function SearchRequest(options) {
  options = options || {};
  assert.object(options);

  options.protocolOp = Protocol.LDAP_REQ_SEARCH;
  LDAPMessage.call(this, options);

  if (options.baseObject !== undefined) {
    this.baseObject = options.baseObject;
  } else {
    this.baseObject = dn.parse('');
  }
  this.scope = options.scope || 'base';
  this.derefAliases = options.derefAliases || Protocol.NEVER_DEREF_ALIASES;
  this.sizeLimit = options.sizeLimit || 0;
  this.timeLimit = options.timeLimit || 0;
  this.typesOnly = options.typesOnly || false;
  this.filter = options.filter || null;
  this.attributes = options.attributes ? options.attributes.slice(0) : [];
}
util.inherits(SearchRequest, LDAPMessage);
Object.defineProperties(SearchRequest.prototype, {
  type: {
    get: function getType() { return 'SearchRequest'; },
    configurable: false
  },
  _dn: {
    get: function getDN() { return this.baseObject; },
    configurable: false
  },
  scope: {
    get: function getScope() {
      switch (this._scope) {
      case Protocol.SCOPE_BASE_OBJECT: return 'base';
      case Protocol.SCOPE_ONE_LEVEL: return 'one';
      case Protocol.SCOPE_SUBTREE: return 'sub';
      default:
        throw new Error(this._scope + ' is an invalid search scope');
      }
    },
    set: function setScope(val) {
      if (typeof (val) === 'string') {
        switch (val) {
        case 'base':
          this._scope = Protocol.SCOPE_BASE_OBJECT;
          break;
        case 'one':
          this._scope = Protocol.SCOPE_ONE_LEVEL;
          break;
        case 'sub':
          this._scope = Protocol.SCOPE_SUBTREE;
          break;
        default:
          throw new Error(val + ' is an invalid search scope');
        }
      } else {
        this._scope = val;
      }
    },
    configurable: false
  }
});

SearchRequest.prototype._parse = function (ber) {
  assert.ok(ber);

  this.baseObject = ber.readString();
  this.scope = ber.readEnumeration();
  this.derefAliases = ber.readEnumeration();
  this.sizeLimit = ber.readInt();
  this.timeLimit = ber.readInt();
  this.typesOnly = ber.readBoolean();

  this.filter = filters.parse(ber);

  // look for attributes
  if (ber.peek() === 0x30) {
    ber.readSequence();
    var end = ber.offset + ber.length;
    while (ber.offset < end)
      this.attributes.push(ber.readString().toLowerCase());
  }

  return true;
};

SearchRequest.prototype._toBer = function (ber) {
  assert.ok(ber);

  ber.writeString(this.baseObject.toString());
  ber.writeEnumeration(this._scope);
  ber.writeEnumeration(this.derefAliases);
  ber.writeInt(this.sizeLimit);
  ber.writeInt(this.timeLimit);
  ber.writeBoolean(this.typesOnly);

  var f = this.filter || new filters.PresenceFilter({attribute: 'objectclass'});
  ber = f.toBer(ber);

  ber.startSequence(Ber.Sequence | Ber.Constructor);
  if (this.attributes && this.attributes.length) {
    this.attributes.forEach(function (a) {
      ber.writeString(a);
    });
  }
  ber.endSequence();

  return ber;
};

SearchRequest.prototype._json = function (j) {
  assert.ok(j);

  j.baseObject = this.baseObject;
  j.scope = this.scope;
  j.derefAliases = this.derefAliases;
  j.sizeLimit = this.sizeLimit;
  j.timeLimit = this.timeLimit;
  j.typesOnly = this.typesOnly;
  j.filter = this.filter.toString();
  j.attributes = this.attributes;

  return j;
};


///--- Exports

module.exports = SearchRequest;

},{"../dn":59,"../filters":69,"../protocol":103,"./message":89,"./result":95,"asn1":111,"assert-plus":112,"util":43}],99:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var LDAPResult = require('./result');
var SearchEntry = require('./search_entry');
var SearchReference = require('./search_reference');

var dtrace = require('../dtrace');
var parseDN = require('../dn').parse;
var parseURL = require('../url').parse;
var Protocol = require('../protocol');


///--- API

function SearchResponse(options) {
  options = options || {};
  assert.object(options);

  options.protocolOp = Protocol.LDAP_REP_SEARCH;
  LDAPResult.call(this, options);

  this.attributes = options.attributes ? options.attributes.slice() : [];
  this.notAttributes = [];
  this.sentEntries = 0;
}
util.inherits(SearchResponse, LDAPResult);

/**
 * Allows you to send a SearchEntry back to the client.
 *
 * @param {Object} entry an instance of SearchEntry.
 * @param {Boolean} nofiltering skip filtering notAttributes and '_' attributes.
 *                  Defaults to 'false'.
 */
SearchResponse.prototype.send = function (entry, nofiltering) {
  if (!entry || typeof (entry) !== 'object')
    throw new TypeError('entry (SearchEntry) required');
  if (nofiltering === undefined)
    nofiltering = false;
  if (typeof (nofiltering) !== 'boolean')
    throw new TypeError('noFiltering must be a boolean');

  var self = this;

  if (entry instanceof SearchEntry || entry instanceof SearchReference) {
    if (!entry.messageID)
      entry.messageID = this.messageID;
    if (entry.messageID !== this.messageID)
      throw new Error('SearchEntry messageID mismatch');
  } else {
    if (!entry.attributes)
      throw new Error('entry.attributes required');

    var savedAttrs = {};
    var all = (self.attributes.indexOf('*') !== -1);
    Object.keys(entry.attributes).forEach(function (a) {
      var _a = a.toLowerCase();
      if (!nofiltering && _a.length && _a[0] === '_') {
        savedAttrs[a] = entry.attributes[a];
        delete entry.attributes[a];
      } else if (!nofiltering && self.notAttributes.indexOf(_a) !== -1) {
        savedAttrs[a] = entry.attributes[a];
        delete entry.attributes[a];
      } else if (all) {
        return;
      } else if (self.attributes.length && self.attributes.indexOf(_a) === -1) {
        savedAttrs[a] = entry.attributes[a];
        delete entry.attributes[a];
      }
    });

    var save = entry;
    entry = new SearchEntry({
      objectName: typeof (save.dn) === 'string' ? parseDN(save.dn) : save.dn,
      messageID: self.messageID,
      log: self.log
    });
    entry.fromObject(save);
  }

  try {
    if (this.log.debug())
      this.log.debug('%s: sending:  %j', this.connection.ldap.id, entry.json);

    this.connection.write(entry.toBer());
    this.sentEntries++;

    if (self._dtraceOp && self._dtraceId) {
      dtrace.fire('server-search-entry', function () {
        var c = self.connection || {ldap: {}};
        return [
          self._dtraceId || 0,
          (c.remoteAddress || ''),
          c.ldap.bindDN ? c.ldap.bindDN.toString() : '',
          (self.requestDN ? self.requestDN.toString() : ''),
          entry.objectName.toString(),
          entry.attributes.length
        ];
      });
    }

    // Restore attributes
    Object.keys(savedAttrs || {}).forEach(function (k) {
      save.attributes[k] = savedAttrs[k];
    });

  } catch (e) {
    this.log.warn(e, '%s failure to write message %j',
                  this.connection.ldap.id, this.json);
  }
};

SearchResponse.prototype.createSearchEntry = function (object) {
  assert.object(object);

  var entry = new SearchEntry({
    messageID: this.messageID,
    log: this.log,
    objectName: object.objectName || object.dn
  });
  entry.fromObject((object.attributes || object));
  return entry;
};

SearchResponse.prototype.createSearchReference = function (uris) {
  if (!uris)
    throw new TypeError('uris ([string]) required');

  if (!Array.isArray(uris))
    uris = [uris];

  for (var i = 0; i < uris.length; i++) {
    if (typeof (uris[i]) == 'string')
      uris[i] = parseURL(uris[i]);
  }

  var self = this;
  return new SearchReference({
    messageID: self.messageID,
    log: self.log,
    uris: uris
  });
};


///--- Exports

module.exports = SearchResponse;

},{"../dn":59,"../dtrace":60,"../protocol":103,"../url":105,"./result":95,"./search_entry":96,"./search_reference":97,"assert-plus":112,"util":43}],100:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var LDAPMessage = require('./message');
var dn = require('../dn');
var Protocol = require('../protocol');


///--- Globals

var DN = dn.DN;
var RDN = dn.RDN;


///--- API

function UnbindRequest(options) {
  options = options || {};
  assert.object(options);

  options.protocolOp = Protocol.LDAP_REQ_UNBIND;
  LDAPMessage.call(this, options);
}
util.inherits(UnbindRequest, LDAPMessage);
Object.defineProperties(UnbindRequest.prototype, {
  type: {
    get: function getType() { return 'UnbindRequest'; },
    configurable: false
  },
  _dn: {
    get: function getDN() {
      if (this.connection) {
        return this.connection.ldap.bindDN;
      } else {
        return new DN([new RDN({cn: 'anonymous'})]);
      }
    },
    configurable: false
  }
});

UnbindRequest.prototype._parse = function (ber) {
  assert.ok(ber);

  return true;
};

UnbindRequest.prototype._toBer = function (ber) {
  assert.ok(ber);

  return ber;
};

UnbindRequest.prototype._json = function (j) {
  assert.ok(j);

  return j;
};


///--- Exports

module.exports = UnbindRequest;

},{"../dn":59,"../protocol":103,"./message":89,"assert-plus":112,"util":43}],101:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert-plus');
var util = require('util');

var dtrace = require('../dtrace');

var LDAPMessage = require('./result');
var Protocol = require('../protocol');


///--- API
// Ok, so there's really no such thing as an unbind 'response', but to make
// the framework not suck, I just made this up, and have it stubbed so it's
// not such a one-off.

function UnbindResponse(options) {
  options = options || {};
  assert.object(options);

  options.protocolOp = 0;
  LDAPMessage.call(this, options);
}
util.inherits(UnbindResponse, LDAPMessage);
Object.defineProperties(UnbindResponse.prototype, {
  type: {
    get: function getType() { return 'UnbindResponse'; },
    configurable: false
  }
});

/**
 * Special override that just ends the connection, if present.
 *
 * @param {Number} status completely ignored.
 */
UnbindResponse.prototype.end = function (status) {
  assert.ok(this.connection);

  this.log.trace('%s: unbinding!', this.connection.ldap.id);

  this.connection.end();

  var self = this;
  if (self._dtraceOp && self._dtraceId) {
    dtrace.fire('server-' + self._dtraceOp + '-done', function () {
      var c = self.connection || {ldap: {}};
      return [
        self._dtraceId || 0,
        (c.remoteAddress || ''),
        c.ldap.bindDN ? c.ldap.bindDN.toString() : '',
        (self.requestDN ? self.requestDN.toString() : ''),
        0,
        ''
      ];
    });
  }
};

UnbindResponse.prototype._json = function (j) {
  return j;
};


///--- Exports

module.exports = UnbindResponse;

},{"../dtrace":60,"../protocol":103,"./result":95,"assert-plus":112,"util":43}],102:[function(require,module,exports){
///--- Globals

var parseDN = require('./dn').parse;

var EntryChangeNotificationControl =
  require('./controls').EntryChangeNotificationControl;

///--- API

// Cache used to store connected persistent search clients
function PersistentSearch() {
  this.clientList = [];
}


PersistentSearch.prototype.addClient = function (req, res, callback) {
  if (typeof (req) !== 'object')
    throw new TypeError('req must be an object');
  if (typeof (res) !== 'object')
    throw new TypeError('res must be an object');
  if (callback && typeof (callback) !== 'function')
    throw new TypeError('callback must be a function');

  var log = req.log;

  var client = {};
  client.req = req;
  client.res = res;

  log.debug('%s storing client', req.logId);

  this.clientList.push(client);

  log.debug('%s stored client', req.logId);
  log.debug('%s total number of clients %s',
            req.logId, this.clientList.length);
  if (callback)
    callback(client);
};


PersistentSearch.prototype.removeClient = function (req, res, callback) {
  if (typeof (req) !== 'object')
    throw new TypeError('req must be an object');
  if (typeof (res) !== 'object')
    throw new TypeError('res must be an object');
  if (callback && typeof (callback) !== 'function')
    throw new TypeError('callback must be a function');

  var log = req.log;
  log.debug('%s removing client', req.logId);
  var client = {};
  client.req = req;
  client.res = res;

  // remove the client if it exists
  this.clientList.forEach(function (element, index, array) {
    if (element.req === client.req) {
      log.debug('%s removing client from list', req.logId);
      array.splice(index, 1);
    }
  });

  log.debug('%s number of persistent search clients %s',
            req.logId, this.clientList.length);
  if (callback)
    callback(client);
};


function getOperationType(requestType) {
  switch (requestType) {
    case 'AddRequest':
    case 'add':
      return 1;
    case 'DeleteRequest':
    case 'delete':
      return 2;
    case 'ModifyRequest':
    case 'modify':
      return 4;
    case 'ModifyDNRequest':
    case 'modrdn':
      return 8;
    default:
      throw new TypeError('requestType %s, is an invalid request type',
                          requestType);
  }
}


function getEntryChangeNotificationControl(req, obj, callback) {
  // if we want to return a ECNC
  if (req.persistentSearch.value.returnECs) {
    var attrs = obj.attributes;
    var value = {};
    value.changeType = getOperationType(attrs.changetype);
    // if it's a modDN request, fill in the previous DN
    if (value.changeType === 8 && attrs.previousDN) {
      value.previousDN = attrs.previousDN;
    }

    value.changeNumber = attrs.changenumber;
    return new EntryChangeNotificationControl({ value: value });
  } else {
    return false;
  }
}


function checkChangeType(req, requestType) {
  return (req.persistentSearch.value.changeTypes &
          getOperationType(requestType));
}


///--- Exports

module.exports = {
  PersistentSearchCache: PersistentSearch,
  checkChangeType: checkChangeType,
  getEntryChangeNotificationControl: getEntryChangeNotificationControl
};

},{"./controls":54,"./dn":59}],103:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.


module.exports = {

  // Misc
  LDAP_VERSION_3: 0x03,
  LBER_SET: 0x31,
  LDAP_CONTROLS: 0xa0,

  // Search
  SCOPE_BASE_OBJECT: 0,
  SCOPE_ONE_LEVEL: 1,
  SCOPE_SUBTREE: 2,

  NEVER_DEREF_ALIASES: 0,
  DEREF_IN_SEARCHING: 1,
  DEREF_BASE_OBJECT: 2,
  DEREF_ALWAYS: 3,

  FILTER_AND: 0xa0,
  FILTER_OR: 0xa1,
  FILTER_NOT: 0xa2,
  FILTER_EQUALITY: 0xa3,
  FILTER_SUBSTRINGS: 0xa4,
  FILTER_GE: 0xa5,
  FILTER_LE: 0xa6,
  FILTER_PRESENT: 0x87,
  FILTER_APPROX: 0xa8,
  FILTER_EXT: 0xa9,

  // Protocol Operations
  LDAP_REQ_BIND: 0x60,
  LDAP_REQ_UNBIND: 0x42,
  LDAP_REQ_SEARCH: 0x63,
  LDAP_REQ_MODIFY: 0x66,
  LDAP_REQ_ADD: 0x68,
  LDAP_REQ_DELETE: 0x4a,
  LDAP_REQ_MODRDN: 0x6c,
  LDAP_REQ_COMPARE: 0x6e,
  LDAP_REQ_ABANDON: 0x50,
  LDAP_REQ_EXTENSION: 0x77,

  LDAP_REP_BIND: 0x61,
  LDAP_REP_SEARCH_ENTRY: 0x64,
  LDAP_REP_SEARCH_REF: 0x73,
  LDAP_REP_SEARCH: 0x65,
  LDAP_REP_MODIFY: 0x67,
  LDAP_REP_ADD: 0x69,
  LDAP_REP_DELETE: 0x6b,
  LDAP_REP_MODRDN: 0x6d,
  LDAP_REP_COMPARE: 0x6f,
  LDAP_REP_EXTENSION: 0x78
};

},{}],104:[function(require,module,exports){
(function (Buffer){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var assert = require('assert');
var EventEmitter = require('events').EventEmitter;
var net = require('net');
var tls = require('tls');
var util = require('util');

var asn1 = require('asn1');
var VError = require('verror').VError;

var dn = require('./dn');
var dtrace = require('./dtrace');
var errors = require('./errors');
var Protocol = require('./protocol');

var Parser = require('./messages').Parser;
var AbandonResponse = require('./messages/abandon_response');
var AddResponse = require('./messages/add_response');
var BindResponse = require('./messages/bind_response');
var CompareResponse = require('./messages/compare_response');
var DeleteResponse = require('./messages/del_response');
var ExtendedResponse = require('./messages/ext_response');
var LDAPResult = require('./messages/result');
var ModifyResponse = require('./messages/modify_response');
var ModifyDNResponse = require('./messages/moddn_response');
var SearchRequest = require('./messages/search_request');
var SearchResponse = require('./messages/search_response');
var UnbindResponse = require('./messages/unbind_response');



///--- Globals

var Ber = asn1.Ber;
var BerReader = asn1.BerReader;
var DN = dn.DN;

var sprintf = util.format;


///--- Helpers

function mergeFunctionArgs(argv, start, end) {
  assert.ok(argv);

  if (!start)
    start = 0;
  if (!end)
    end = argv.length;

  var handlers = [];

  for (var i = start; i < end; i++) {
    if (argv[i] instanceof Array) {
      var arr = argv[i];
      for (var j = 0; j < arr.length; j++) {
        if (!(arr[j] instanceof Function)) {
          throw new TypeError('Invalid argument type: ' + typeof (arr[j]));
        }
        handlers.push(arr[j]);
      }
    } else if (argv[i] instanceof Function) {
      handlers.push(argv[i]);
    } else {
      throw new TypeError('Invalid argument type: ' + typeof (argv[i]));
    }
  }

  return handlers;
}


function getResponse(req) {
  assert.ok(req);

  var Response;

  switch (req.protocolOp) {
  case Protocol.LDAP_REQ_BIND:
    Response = BindResponse;
    break;
  case Protocol.LDAP_REQ_ABANDON:
    Response = AbandonResponse;
    break;
  case Protocol.LDAP_REQ_ADD:
    Response = AddResponse;
    break;
  case Protocol.LDAP_REQ_COMPARE:
    Response = CompareResponse;
    break;
  case Protocol.LDAP_REQ_DELETE:
    Response = DeleteResponse;
    break;
  case Protocol.LDAP_REQ_EXTENSION:
    Response = ExtendedResponse;
    break;
  case Protocol.LDAP_REQ_MODIFY:
    Response = ModifyResponse;
    break;
  case Protocol.LDAP_REQ_MODRDN:
    Response = ModifyDNResponse;
    break;
  case Protocol.LDAP_REQ_SEARCH:
    Response = SearchResponse;
    break;
  case Protocol.LDAP_REQ_UNBIND:
    Response = UnbindResponse;
    break;
  default:
    return null;
  }
  assert.ok(Response);

  var res = new Response({
    messageID: req.messageID,
    log: req.log,
    attributes: ((req instanceof SearchRequest) ? req.attributes : undefined)
  });
  res.connection = req.connection;
  res.logId = req.logId;

  return res;
}


function defaultHandler(req, res, next) {
  assert.ok(req);
  assert.ok(res);
  assert.ok(next);

  res.matchedDN = req.dn.toString();
  res.errorMessage = 'Server method not implemented';
  res.end(errors.LDAP_OTHER);
  return next();
}


function defaultNoOpHandler(req, res, next) {
  assert.ok(req);
  assert.ok(res);
  assert.ok(next);

  res.end();
  return next();
}


function noSuffixHandler(req, res, next) {
  assert.ok(req);
  assert.ok(res);
  assert.ok(next);

  res.errorMessage = 'No tree found for: ' + req.dn.toString();
  res.end(errors.LDAP_NO_SUCH_OBJECT);
  return next();
}


function noExOpHandler(req, res, next) {
  assert.ok(req);
  assert.ok(res);
  assert.ok(next);

  res.errorMessage = req.requestName + ' not supported';
  res.end(errors.LDAP_PROTOCOL_ERROR);
  return next();
}


function fireDTraceProbe(req, res) {
  assert.ok(req);

  req._dtraceId = res._dtraceId = dtrace._nextId();
  var probeArgs = [
    req._dtraceId,
    req.connection.remoteAddress || 'localhost',
    req.connection.ldap.bindDN.toString(),
    req.dn.toString()
  ];

  var op;
  switch (req.protocolOp) {
  case Protocol.LDAP_REQ_ABANDON:
    op = 'abandon';
    break;
  case Protocol.LDAP_REQ_ADD:
    op = 'add';
    probeArgs.push(req.attributes.length);
    break;
  case Protocol.LDAP_REQ_BIND:
    op = 'bind';
    break;
  case Protocol.LDAP_REQ_COMPARE:
    op = 'compare';
    probeArgs.push(req.attribute);
    probeArgs.push(req.value);
    break;
  case Protocol.LDAP_REQ_DELETE:
    op = 'delete';
    break;
  case Protocol.LDAP_REQ_EXTENSION:
    op = 'exop';
    probeArgs.push(req.name);
    probeArgs.push(req.value);
    break;
  case Protocol.LDAP_REQ_MODIFY:
    op = 'modify';
    probeArgs.push(req.changes.length);
    break;
  case Protocol.LDAP_REQ_MODRDN:
    op = 'modifydn';
    probeArgs.push(req.newRdn.toString());
    probeArgs.push((req.newSuperior ? req.newSuperior.toString() : ''));
    break;
  case Protocol.LDAP_REQ_SEARCH:
    op = 'search';
    probeArgs.push(req.scope);
    probeArgs.push(req.filter.toString());
    break;
  case Protocol.LDAP_REQ_UNBIND:
    op = 'unbind';
    break;
  default:
    break;
  }

  res._dtraceOp = op;
  dtrace.fire('server-' + op + '-start', function () {
    return probeArgs;
  });
}



///--- API

/**
 * Constructs a new server that you can call .listen() on, in the various
 * forms node supports.  You need to first assign some handlers to the various
 * LDAP operations however.
 *
 * The options object currently only takes a certificate/private key, and a
 * bunyan logger handle.
 *
 * This object exposes the following events:
 *  - 'error'
 *  - 'close'
 *
 * @param {Object} options (optional) parameterization object.
 * @throws {TypeError} on bad input.
 */
function Server(options) {
  if (options) {
    if (typeof (options) !== 'object')
      throw new TypeError('options (object) required');
    if (typeof (options.log) !== 'object')
      throw new TypeError('options.log must be an object');

    if (options.certificate || options.key) {
      if (!(options.certificate && options.key) ||
          (typeof (options.certificate) !== 'string' &&
          !Buffer.isBuffer(options.certificate)) ||
          (typeof (options.key) !== 'string' &&
          !Buffer.isBuffer(options.key))) {
        throw new TypeError('options.certificate and options.key ' +
                            '(string or buffer) are both required for TLS');
      }
    }
  } else {
    options = {};
  }
  var self = this;

  EventEmitter.call(this, options);

  this._chain = [];
  this.log = options.log;
  this.strictDN = (options.strictDN !== undefined) ? options.strictDN : true;

  var log = this.log;

  function setupConnection(c) {
    assert.ok(c);

    if (c.type === 'unix') {
      c.remoteAddress = self.server.path;
      c.remotePort = c.fd;
    } else if (c.socket) {
      // TLS
      c.remoteAddress = c.socket.remoteAddress;
      c.remotePort = c.socket.remotePort;
    }


    var rdn = new dn.RDN({cn: 'anonymous'});

    c.ldap = {
      id: c.remoteAddress + ':' + c.remotePort,
      config: options,
      _bindDN: new DN([rdn])
    };
    c.addListener('timeout', function () {
      log.trace('%s timed out', c.ldap.id);
      c.destroy();
    });
    c.addListener('end', function () {
      log.trace('%s shutdown', c.ldap.id);
    });
    c.addListener('error', function (err) {
      log.warn('%s unexpected connection error', c.ldap.id, err);
      self.emit('clientError', err);
      c.destroy();
    });
    c.addListener('close', function (had_err) {
      log.trace('%s close; had_err=%j', c.ldap.id, had_err);
      c.end();
    });

    c.ldap.__defineGetter__('bindDN', function () {
      return c.ldap._bindDN;
    });
    c.ldap.__defineSetter__('bindDN', function (val) {
      if (!(val instanceof DN))
        throw new TypeError('DN required');

      c.ldap._bindDN = val;
      return val;
    });
    return c;
  }

  function newConnection(c) {
    setupConnection(c);
    log.trace('new connection from %s', c.ldap.id);

    dtrace.fire('server-connection', function () {
      return [c.remoteAddress];
    });

    c.parser = new Parser({
      log: options.log
    });
    c.parser.on('message', function (req) {
      req.connection = c;
      req.logId = c.ldap.id + '::' + req.messageID;
      req.startTime = new Date().getTime();

      if (log.debug())
        log.debug('%s: message received: req=%j', c.ldap.id, req.json);

      var res = getResponse(req);
      if (!res) {
        log.warn('Unimplemented server method: %s', req.type);
        c.destroy();
        return false;
      }

      // parse string DNs for routing/etc
      try {
        switch (req.protocolOp) {
        case Protocol.LDAP_REQ_BIND:
          req.name = dn.parse(req.name);
          break;
        case Protocol.LDAP_REQ_ADD:
        case Protocol.LDAP_REQ_COMPARE:
        case Protocol.LDAP_REQ_DELETE:
          req.entry = dn.parse(req.entry);
          break;
        case Protocol.LDAP_REQ_MODIFY:
          req.object = dn.parse(req.object);
          break;
        case Protocol.LDAP_REQ_MODRDN:
          req.entry = dn.parse(req.entry);
          // TODO: handle newRdn/Superior
          break;
        case Protocol.LDAP_REQ_SEARCH:
          req.baseObject = dn.parse(req.baseObject);
          break;
        default:
          break;
        }
      } catch (e) {
        if (self.strictDN) {
          return res.end(errors.LDAP_INVALID_DN_SYNTAX);
        }
      }

      res.connection = c;
      res.logId = req.logId;
      res.requestDN = req.dn;

      var chain = self._getHandlerChain(req, res);

      var i = 0;
      return function (err) {
        function sendError(err) {
          res.status = err.code || errors.LDAP_OPERATIONS_ERROR;
          res.matchedDN = req.suffix ? req.suffix.toString() : '';
          res.errorMessage = err.message || '';
          return res.end();
        }

        function after() {
          if (!self._postChain || !self._postChain.length)
            return;

          function next() {} // stub out next for the post chain

          self._postChain.forEach(function (c) {
            c.call(self, req, res, next);
          });
        }

        if (err) {
          log.trace('%s sending error: %s', req.logId, err.stack || err);
          self.emit('clientError', err);
          sendError(err);
          return after();
        }

        try {
          var next = arguments.callee;
          if (chain.handlers[i])
            return chain.handlers[i++].call(chain.backend, req, res, next);

          if (req.protocolOp === Protocol.LDAP_REQ_BIND && res.status === 0)
            c.ldap.bindDN = req.dn;

          return after();
        } catch (e) {
          if (!e.stack)
            e.stack = e.toString();
          log.error('%s uncaught exception: %s', req.logId, e.stack);
          return sendError(new errors.OperationsError(e.message));
        }

      }();
    });

    c.parser.on('error', function (err, message) {
      self.emit('error', new VError(err, 'Parser error for %s', c.ldap.id));

      if (!message)
        return c.destroy();

      var res = getResponse(message);
      if (!res)
        return c.destroy();

      res.status = 0x02; // protocol error
      res.errorMessage = err.toString();
      return c.end(res.toBer());
    });

    c.on('data', function (data) {
      if (log.trace())
        log.trace('data on %s: %s', c.ldap.id, util.inspect(data));

      c.parser.write(data);
    });

  } // end newConnection

  this.routes = {};
  if ((options.cert || options.certificate) && options.key) {
    options.cert = options.cert || options.certificate;
    this.server = tls.createServer(options, newConnection);
  } else {
    this.server = net.createServer(newConnection);
  }
  this.server.log = options.log;
  this.server.ldap = {
    config: options
  };
  this.server.on('close', function () {
    self.emit('close');
  });
  this.server.on('error', function (err) {
    self.emit('error', err);
  });
}
util.inherits(Server, EventEmitter);
Object.defineProperties(Server.prototype, {
  maxConnections: {
    get: function getMaxConnections() {
      return this.server.maxConnections;
    },
    set: function setMaxConnections(val) {
      this.server.maxConnections = val;
    },
    configurable: false
  },
  connections: {
    get: function getConnections() {
      return this.server.connections;
    },
    configurable: false
  },
  name: {
    get: function getName() {
      return 'LDAPServer';
    },
    configurable: false
  },
  url: {
    get: function getURL() {
      var str;
      var addr = this.server.address();
      if (!addr) {
        return null;
      }
      if (!addr.family) {
        str = 'ldapi://';
        str += this.host.replace(new RegExp('/', 'g'), '%2f');
        return str;
      }
      if (this.server instanceof tls.Server) {
        str = 'ldaps://';
      } else {
        str = 'ldap://';
      }
      str += this.host + ':' + this.port;
      return str;
    },
    configurable: false
  }
});
module.exports = Server;


/**
 * Adds a handler (chain) for the LDAP add method.
 *
 * Note that this is of the form f(name, [function]) where the second...N
 * arguments can all either be functions or arrays of functions.
 *
 * @param {String} name the DN to mount this handler chain at.
 * @return {Server} this so you can chain calls.
 * @throws {TypeError} on bad input
 */
Server.prototype.add = function (name) {
  var args = Array.prototype.slice.call(arguments, 1);
  return this._mount(Protocol.LDAP_REQ_ADD, name, args);
};


/**
 * Adds a handler (chain) for the LDAP bind method.
 *
 * Note that this is of the form f(name, [function]) where the second...N
 * arguments can all either be functions or arrays of functions.
 *
 * @param {String} name the DN to mount this handler chain at.
 * @return {Server} this so you can chain calls.
 * @throws {TypeError} on bad input
 */
Server.prototype.bind = function (name) {
  var args = Array.prototype.slice.call(arguments, 1);
  return this._mount(Protocol.LDAP_REQ_BIND, name, args);
};


/**
 * Adds a handler (chain) for the LDAP compare method.
 *
 * Note that this is of the form f(name, [function]) where the second...N
 * arguments can all either be functions or arrays of functions.
 *
 * @param {String} name the DN to mount this handler chain at.
 * @return {Server} this so you can chain calls.
 * @throws {TypeError} on bad input
 */
Server.prototype.compare = function (name) {
  var args = Array.prototype.slice.call(arguments, 1);
  return this._mount(Protocol.LDAP_REQ_COMPARE, name, args);
};


/**
 * Adds a handler (chain) for the LDAP delete method.
 *
 * Note that this is of the form f(name, [function]) where the second...N
 * arguments can all either be functions or arrays of functions.
 *
 * @param {String} name the DN to mount this handler chain at.
 * @return {Server} this so you can chain calls.
 * @throws {TypeError} on bad input
 */
Server.prototype.del = function (name) {
  var args = Array.prototype.slice.call(arguments, 1);
  return this._mount(Protocol.LDAP_REQ_DELETE, name, args);
};


/**
 * Adds a handler (chain) for the LDAP exop method.
 *
 * Note that this is of the form f(name, [function]) where the second...N
 * arguments can all either be functions or arrays of functions.
 *
 * @param {String} name OID to assign this handler chain to.
 * @return {Server} this so you can chain calls.
 * @throws {TypeError} on bad input.
 */
Server.prototype.exop = function (name) {
  var args = Array.prototype.slice.call(arguments, 1);
  return this._mount(Protocol.LDAP_REQ_EXTENSION, name, args, true);
};


/**
 * Adds a handler (chain) for the LDAP modify method.
 *
 * Note that this is of the form f(name, [function]) where the second...N
 * arguments can all either be functions or arrays of functions.
 *
 * @param {String} name the DN to mount this handler chain at.
 * @return {Server} this so you can chain calls.
 * @throws {TypeError} on bad input
 */
Server.prototype.modify = function (name) {
  var args = Array.prototype.slice.call(arguments, 1);
  return this._mount(Protocol.LDAP_REQ_MODIFY, name, args);
};


/**
 * Adds a handler (chain) for the LDAP modifyDN method.
 *
 * Note that this is of the form f(name, [function]) where the second...N
 * arguments can all either be functions or arrays of functions.
 *
 * @param {String} name the DN to mount this handler chain at.
 * @return {Server} this so you can chain calls.
 * @throws {TypeError} on bad input
 */
Server.prototype.modifyDN = function (name) {
  var args = Array.prototype.slice.call(arguments, 1);
  return this._mount(Protocol.LDAP_REQ_MODRDN, name, args);
};


/**
 * Adds a handler (chain) for the LDAP search method.
 *
 * Note that this is of the form f(name, [function]) where the second...N
 * arguments can all either be functions or arrays of functions.
 *
 * @param {String} name the DN to mount this handler chain at.
 * @return {Server} this so you can chain calls.
 * @throws {TypeError} on bad input
 */
Server.prototype.search = function (name) {
  var args = Array.prototype.slice.call(arguments, 1);
  return this._mount(Protocol.LDAP_REQ_SEARCH, name, args);
};


/**
 * Adds a handler (chain) for the LDAP unbind method.
 *
 * This method is different than the others and takes no mount point, as unbind
 * is a connection-wide operation, not constrianed to part of the DIT.
 *
 * @return {Server} this so you can chain calls.
 * @throws {TypeError} on bad input
 */
Server.prototype.unbind = function () {
  var args = Array.prototype.slice.call(arguments, 0);
  return this._mount(Protocol.LDAP_REQ_UNBIND, 'unbind', args, true);
};


Server.prototype.use = function use() {
  var args = Array.prototype.slice.call(arguments);
  var chain = mergeFunctionArgs(args, 0, args.length);
  var self = this;
  chain.forEach(function (c) {
    self._chain.push(c);
  });
};


Server.prototype.after = function () {
  if (!this._postChain)
    this._postChain = [];

  var self = this;
  mergeFunctionArgs(arguments).forEach(function (h) {
    self._postChain.push(h);
  });
};


// All these just reexpose the requisite net.Server APIs
Server.prototype.listen = function (port, host, callback) {
  if (typeof (port) !== 'number' && typeof (port) !== 'string')
    throw new TypeError('port (number or path) required');

  if (typeof (host) === 'function') {
    callback = host;
    host = '0.0.0.0';
  }
  if (typeof (port) === 'string' && /^[0-9]+$/.test(port)) {
    // Disambiguate between string ports and file paths
    port = parseInt(port, 10);
  }
  var self = this;

  function cbListen() {
    if (typeof (port) === 'number') {
      self.host = self.address().address;
      self.port = self.address().port;
    } else {
      self.host = port;
      self.port = self.server.fd;
    }

    if (typeof (callback) === 'function')
      callback();
  }

  if (typeof (port) === 'number') {
    return this.server.listen(port, host, cbListen);
  } else {
    return this.server.listen(port, cbListen);
  }
};
Server.prototype.listenFD = function (fd) {
  this.host = 'unix-domain-socket';
  this.port = fd;
  return this.server.listenFD(fd);
};
Server.prototype.close = function () {
  return this.server.close();
};
Server.prototype.address = function () {
  return this.server.address();
};


Server.prototype._getRoute = function (_dn, backend) {
  assert.ok(dn);

  if (!backend)
    backend = this;

  var name;
  if (_dn instanceof dn.DN) {
    name = _dn.toString();
  } else {
    name = _dn;
  }

  if (!this.routes[name]) {
    this.routes[name] = {};
    this.routes[name].backend = backend;
    this.routes[name].dn = _dn;
    // Force regeneration of the route key cache on next request
    this._routeKeyCache = null;
  }

  return this.routes[name];
};


Server.prototype._sortedRouteKeys = function _sortedRouteKeys() {
  // The filtered/sorted route keys are cached to prevent needlessly
  // regenerating the list for every incoming request.
  if (!this._routeKeyCache) {
    var self = this;
    var reversedRDNsToKeys = {};
    // Generate mapping of reversedRDNs(DN) -> routeKey
    Object.keys(this.routes).forEach(function (key) {
      var _dn = self.routes[key].dn;
      // Ignore non-DN routes such as exop or unbind
      if (_dn instanceof dn.DN) {
        var reversed = _dn.clone();
        reversed.rdns.reverse();
        reversedRDNsToKeys[reversed.format()] = key;
      }
    });
    var output = [];
    // Reverse-sort on reversedRDS(DN) in order to output routeKey list.
    // This will place more specific DNs in front of their parents:
    // 1. dc=test, dc=domain, dc=sub
    // 2. dc=test, dc=domain
    // 3. dc=other, dc=foobar
    Object.keys(reversedRDNsToKeys).sort().reverse().forEach(function (_dn) {
      output.push(reversedRDNsToKeys[_dn]);
    });
    this._routeKeyCache = output;
  }
  return this._routeKeyCache;
};


Server.prototype._getHandlerChain = function _getHandlerChain(req, res) {
  assert.ok(req);

  fireDTraceProbe(req, res);

  // check anonymous bind
  if (req.protocolOp === Protocol.LDAP_REQ_BIND &&
      req.dn.toString() === '' &&
      req.credentials === '') {
    return {
      backend: self,
      handlers: [defaultNoOpHandler]
    };
  }

  var op = '0x' + req.protocolOp.toString(16);
  var self = this;
  var routes = this.routes;
  var route;

  // Special cases are exops, unbinds and abandons. Handle those first.
  if (req.protocolOp === Protocol.LDAP_REQ_EXTENSION) {
    route = routes[req.requestName];
    if (route) {
      return {
        backend: route.backend,
        handlers: (route[op] ? route[op] : [noExOpHandler])
      };
    } else {
      return {
        backend: self,
        handlers: [noExOpHandler]
      };
    }
  } else if (req.protocolOp === Protocol.LDAP_REQ_UNBIND) {
    route = routes['unbind'];
    if (route) {
      return {
        backend: route.backend,
        handlers: route[op]
      };
    } else {
      return {
        backend: self,
        handlers: [defaultNoOpHandler]
      };
    }
  } else if (req.protocolOp === Protocol.LDAP_REQ_ABANDON) {
    return {
      backend: self,
      handlers: [defaultNoOpHandler]
    };
  }

  // Otherwise, match via DN rules
  assert.ok(req.dn);
  var keys = this._sortedRouteKeys();
  var fallbackHandler = [noSuffixHandler];
  // invalid DNs in non-strict mode are routed to the default handler
  var testDN = (typeof (req.dn) === 'string') ? '' : req.dn;

  for (var i = 0; i < keys.length; i++) {
    var suffix = keys[i];
    route = routes[suffix];
    assert.ok(route.dn);
    // Match a valid route or the route wildcard ('')
    if (route.dn.equals(testDN) || route.dn.parentOf(testDN) || suffix === '') {
      if (route[op]) {
        // We should be good to go.
        req.suffix = route.dn;
        return {
          backend: route.backend,
          handlers: route[op]
        };
      } else {
        if (suffix === '') {
          break;
        } else {
          // We found a valid suffix but not a valid operation.
          // There might be a more generic suffix with a legitimate operation.
          fallbackHandler = [defaultHandler];
        }
      }
    }
  }
  return {
    backend: self,
    handlers: fallbackHandler
  };
};


Server.prototype._mount = function (op, name, argv, notDN) {
  assert.ok(op);
  assert.ok(name !== undefined);
  assert.ok(argv);

  if (typeof (name) !== 'string')
    throw new TypeError('name (string) required');
  if (!argv.length)
    throw new Error('at least one handler required');

  var backend = this;
  var index = 0;

  if (typeof (argv[0]) === 'object' && !Array.isArray(argv[0])) {
    backend = argv[0];
    index = 1;
  }
  var route = this._getRoute(notDN ? name : dn.parse(name), backend);

  var chain = this._chain.slice();
  argv.slice(index).forEach(function (a) {
    chain.push(a);
  });
  route['0x' + op.toString(16)] = mergeFunctionArgs(chain);

  return this;
};

}).call(this,{"isBuffer":require("../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js")})
},{"../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js":13,"./dn":59,"./dtrace":60,"./errors":62,"./messages":88,"./messages/abandon_response":77,"./messages/add_response":79,"./messages/bind_response":81,"./messages/compare_response":83,"./messages/del_response":85,"./messages/ext_response":87,"./messages/moddn_response":91,"./messages/modify_response":93,"./messages/result":95,"./messages/search_request":98,"./messages/search_response":99,"./messages/unbind_response":101,"./protocol":103,"asn1":111,"assert":2,"events":10,"net":1,"tls":1,"util":43,"verror":138}],105:[function(require,module,exports){
// Copyright 2011 Mark Cavage, Inc.  All rights reserved.

var querystring = require('querystring');
var url = require('url');
var util = require('util');

var dn = require('./dn');
var filter = require('./filters/index');


module.exports = {

  parse: function (urlStr, parseDN) {
    var u = url.parse(urlStr);
    if (!u.protocol || !(u.protocol === 'ldap:' || u.protocol === 'ldaps:'))
      throw new TypeError(urlStr + ' is an invalid LDAP url (protocol)');

    u.secure = (u.protocol === 'ldaps:');

    if (!u.hostname)
      u.hostname = 'localhost';

    if (!u.port) {
      u.port = (u.secure ? 636 : 389);
    } else {
      u.port = parseInt(u.port, 10);
    }

    if (u.pathname) {
      u.pathname = querystring.unescape(u.pathname.substr(1));
      u.DN = parseDN ? dn.parse(u.pathname) : u.pathname;
    }

    if (u.search) {
      u.attributes = [];
      var tmp = u.search.substr(1).split('?');
      if (tmp && tmp.length) {
        if (tmp[0]) {
          tmp[0].split(',').forEach(function (a) {
            u.attributes.push(querystring.unescape(a.trim()));
          });
        }
      }
      if (tmp[1]) {
        if (tmp[1] !== 'base' && tmp[1] !== 'one' && tmp[1] !== 'sub')
          throw new TypeError(urlStr + ' is an invalid LDAP url (scope)');
        u.scope = tmp[1];
      }
      if (tmp[2]) {
        u.filter = querystring.unescape(tmp[2]);
      }
      if (tmp[3]) {
        u.extensions = querystring.unescape(tmp[3]);
      }

      if (!u.scope)
        u.scope = 'base';
      if (!u.filter)
        u.filter = filter.parseString('(objectclass=*)');
      else
        u.filter = filter.parseString(u.filter);
    }

    return u;
  }

};

},{"./dn":59,"./filters/index":69,"querystring":21,"url":39,"util":43}],106:[function(require,module,exports){
// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.


module.exports = {

  newInvalidAsn1Error: function(msg) {
    var e = new Error();
    e.name = 'InvalidAsn1Error';
    e.message = msg || '';
    return e;
  }

};

},{}],107:[function(require,module,exports){
// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.

var errors = require('./errors');
var types = require('./types');

var Reader = require('./reader');
var Writer = require('./writer');


///--- Exports

module.exports = {

  Reader: Reader,

  Writer: Writer

};

for (var t in types) {
  if (types.hasOwnProperty(t))
    module.exports[t] = types[t];
}
for (var e in errors) {
  if (errors.hasOwnProperty(e))
    module.exports[e] = errors[e];
}

},{"./errors":106,"./reader":108,"./types":109,"./writer":110}],108:[function(require,module,exports){
(function (Buffer){
// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.

var assert = require('assert');

var ASN1 = require('./types');
var errors = require('./errors');


///--- Globals

var newInvalidAsn1Error = errors.newInvalidAsn1Error;



///--- API

function Reader(data) {
  if (!data || !Buffer.isBuffer(data))
    throw new TypeError('data must be a node Buffer');

  this._buf = data;
  this._size = data.length;

  // These hold the "current" state
  this._len = 0;
  this._offset = 0;
}

Object.defineProperty(Reader.prototype, 'length', {
  enumerable: true,
  get: function () { return (this._len); }
});

Object.defineProperty(Reader.prototype, 'offset', {
  enumerable: true,
  get: function () { return (this._offset); }
});

Object.defineProperty(Reader.prototype, 'remain', {
  get: function () { return (this._size - this._offset); }
});

Object.defineProperty(Reader.prototype, 'buffer', {
  get: function () { return (this._buf.slice(this._offset)); }
});


/**
 * Reads a single byte and advances offset; you can pass in `true` to make this
 * a "peek" operation (i.e., get the byte, but don't advance the offset).
 *
 * @param {Boolean} peek true means don't move offset.
 * @return {Number} the next byte, null if not enough data.
 */
Reader.prototype.readByte = function(peek) {
  if (this._size - this._offset < 1)
    return null;

  var b = this._buf[this._offset] & 0xff;

  if (!peek)
    this._offset += 1;

  return b;
};


Reader.prototype.peek = function() {
  return this.readByte(true);
};


/**
 * Reads a (potentially) variable length off the BER buffer.  This call is
 * not really meant to be called directly, as callers have to manipulate
 * the internal buffer afterwards.
 *
 * As a result of this call, you can call `Reader.length`, until the
 * next thing called that does a readLength.
 *
 * @return {Number} the amount of offset to advance the buffer.
 * @throws {InvalidAsn1Error} on bad ASN.1
 */
Reader.prototype.readLength = function(offset) {
  if (offset === undefined)
    offset = this._offset;

  if (offset >= this._size)
    return null;

  var lenB = this._buf[offset++] & 0xff;
  if (lenB === null)
    return null;

  if ((lenB & 0x80) == 0x80) {
    lenB &= 0x7f;

    if (lenB == 0)
      throw newInvalidAsn1Error('Indefinite length not supported');

    if (lenB > 4)
      throw newInvalidAsn1Error('encoding too long');

    if (this._size - offset < lenB)
      return null;

    this._len = 0;
    for (var i = 0; i < lenB; i++)
      this._len = (this._len << 8) + (this._buf[offset++] & 0xff);

  } else {
    // Wasn't a variable length
    this._len = lenB;
  }

  return offset;
};


/**
 * Parses the next sequence in this BER buffer.
 *
 * To get the length of the sequence, call `Reader.length`.
 *
 * @return {Number} the sequence's tag.
 */
Reader.prototype.readSequence = function(tag) {
  var seq = this.peek();
  if (seq === null)
    return null;
  if (tag !== undefined && tag !== seq)
    throw newInvalidAsn1Error('Expected 0x' + tag.toString(16) +
                              ': got 0x' + seq.toString(16));

  var o = this.readLength(this._offset + 1); // stored in `length`
  if (o === null)
    return null;

  this._offset = o;
  return seq;
};


Reader.prototype.readInt = function() {
  return this._readTag(ASN1.Integer);
};


Reader.prototype.readBoolean = function() {
  return (this._readTag(ASN1.Boolean) === 0 ? false : true);
};


Reader.prototype.readEnumeration = function() {
  return this._readTag(ASN1.Enumeration);
};


Reader.prototype.readString = function(tag, retbuf) {
  if (!tag)
    tag = ASN1.OctetString;

  var b = this.peek();
  if (b === null)
    return null;

  if (b !== tag)
    throw newInvalidAsn1Error('Expected 0x' + tag.toString(16) +
                              ': got 0x' + b.toString(16));

  var o = this.readLength(this._offset + 1); // stored in `length`

  if (o === null)
    return null;

  if (this.length > this._size - o)
    return null;

  this._offset = o;

  if (this.length === 0)
    return retbuf ? new Buffer(0) : '';

  var str = this._buf.slice(this._offset, this._offset + this.length);
  this._offset += this.length;

  return retbuf ? str : str.toString('utf8');
};

Reader.prototype.readOID = function(tag) {
  if (!tag)
    tag = ASN1.OID;

  var b = this.readString(tag, true);
  if (b === null)
    return null;

  var values = [];
  var value = 0;

  for (var i = 0; i < b.length; i++) {
    var byte = b[i] & 0xff;

    value <<= 7;
    value += byte & 0x7f;
    if ((byte & 0x80) == 0) {
      values.push(value);
      value = 0;
    }
  }

  value = values.shift();
  values.unshift(value % 40);
  values.unshift((value / 40) >> 0);

  return values.join('.');
};


Reader.prototype._readTag = function(tag) {
  assert.ok(tag !== undefined);

  var b = this.peek();

  if (b === null)
    return null;

  if (b !== tag)
    throw newInvalidAsn1Error('Expected 0x' + tag.toString(16) +
                              ': got 0x' + b.toString(16));

  var o = this.readLength(this._offset + 1); // stored in `length`
  if (o === null)
    return null;

  if (this.length > 4)
    throw newInvalidAsn1Error('Integer too long: ' + this.length);

  if (this.length > this._size - o)
    return null;
  this._offset = o;

  var fb = this._buf[this._offset];
  var value = 0;

  for (var i = 0; i < this.length; i++) {
    value <<= 8;
    value |= (this._buf[this._offset++] & 0xff);
  }

  if ((fb & 0x80) == 0x80 && i !== 4)
    value -= (1 << (i * 8));

  return value >> 0;
};



///--- Exported API

module.exports = Reader;

}).call(this,require("buffer").Buffer)
},{"./errors":106,"./types":109,"assert":2,"buffer":8}],109:[function(require,module,exports){
// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.


module.exports = {
  EOC: 0,
  Boolean: 1,
  Integer: 2,
  BitString: 3,
  OctetString: 4,
  Null: 5,
  OID: 6,
  ObjectDescriptor: 7,
  External: 8,
  Real: 9, // float
  Enumeration: 10,
  PDV: 11,
  Utf8String: 12,
  RelativeOID: 13,
  Sequence: 16,
  Set: 17,
  NumericString: 18,
  PrintableString: 19,
  T61String: 20,
  VideotexString: 21,
  IA5String: 22,
  UTCTime: 23,
  GeneralizedTime: 24,
  GraphicString: 25,
  VisibleString: 26,
  GeneralString: 28,
  UniversalString: 29,
  CharacterString: 30,
  BMPString: 31,
  Constructor: 32,
  Context: 128
};

},{}],110:[function(require,module,exports){
(function (Buffer){
// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.

var assert = require('assert');
var ASN1 = require('./types');
var errors = require('./errors');


///--- Globals

var newInvalidAsn1Error = errors.newInvalidAsn1Error;

var DEFAULT_OPTS = {
  size: 1024,
  growthFactor: 8
};


///--- Helpers

function merge(from, to) {
  assert.ok(from);
  assert.equal(typeof(from), 'object');
  assert.ok(to);
  assert.equal(typeof(to), 'object');

  var keys = Object.getOwnPropertyNames(from);
  keys.forEach(function(key) {
    if (to[key])
      return;

    var value = Object.getOwnPropertyDescriptor(from, key);
    Object.defineProperty(to, key, value);
  });

  return to;
}



///--- API

function Writer(options) {
  options = merge(DEFAULT_OPTS, options || {});

  this._buf = new Buffer(options.size || 1024);
  this._size = this._buf.length;
  this._offset = 0;
  this._options = options;

  // A list of offsets in the buffer where we need to insert
  // sequence tag/len pairs.
  this._seq = [];
}

Object.defineProperty(Writer.prototype, 'buffer', {
  get: function () {
    if (this._seq.length)
      throw new InvalidAsn1Error(this._seq.length + ' unended sequence(s)');

    return (this._buf.slice(0, this._offset));
  }
});

Writer.prototype.writeByte = function(b) {
  if (typeof(b) !== 'number')
    throw new TypeError('argument must be a Number');

  this._ensure(1);
  this._buf[this._offset++] = b;
};


Writer.prototype.writeInt = function(i, tag) {
  if (typeof(i) !== 'number')
    throw new TypeError('argument must be a Number');
  if (typeof(tag) !== 'number')
    tag = ASN1.Integer;

  var sz = 4;

  while ((((i & 0xff800000) === 0) || ((i & 0xff800000) === 0xff800000 >> 0)) &&
         (sz > 1)) {
    sz--;
    i <<= 8;
  }

  if (sz > 4)
    throw new InvalidAsn1Error('BER ints cannot be > 0xffffffff');

  this._ensure(2 + sz);
  this._buf[this._offset++] = tag;
  this._buf[this._offset++] = sz;

  while (sz-- > 0) {
    this._buf[this._offset++] = ((i & 0xff000000) >>> 24);
    i <<= 8;
  }

};


Writer.prototype.writeNull = function() {
  this.writeByte(ASN1.Null);
  this.writeByte(0x00);
};


Writer.prototype.writeEnumeration = function(i, tag) {
  if (typeof(i) !== 'number')
    throw new TypeError('argument must be a Number');
  if (typeof(tag) !== 'number')
    tag = ASN1.Enumeration;

  return this.writeInt(i, tag);
};


Writer.prototype.writeBoolean = function(b, tag) {
  if (typeof(b) !== 'boolean')
    throw new TypeError('argument must be a Boolean');
  if (typeof(tag) !== 'number')
    tag = ASN1.Boolean;

  this._ensure(3);
  this._buf[this._offset++] = tag;
  this._buf[this._offset++] = 0x01;
  this._buf[this._offset++] = b ? 0xff : 0x00;
};


Writer.prototype.writeString = function(s, tag) {
  if (typeof(s) !== 'string')
    throw new TypeError('argument must be a string (was: ' + typeof(s) + ')');
  if (typeof(tag) !== 'number')
    tag = ASN1.OctetString;

  var len = Buffer.byteLength(s);
  this.writeByte(tag);
  this.writeLength(len);
  if (len) {
    this._ensure(len);
    this._buf.write(s, this._offset);
    this._offset += len;
  }
};


Writer.prototype.writeBuffer = function(buf, tag) {
  if (typeof(tag) !== 'number')
    throw new TypeError('tag must be a number');
  if (!Buffer.isBuffer(buf))
    throw new TypeError('argument must be a buffer');

  this.writeByte(tag);
  this.writeLength(buf.length);
  this._ensure(buf.length);
  buf.copy(this._buf, this._offset, 0, buf.length);
  this._offset += buf.length;
};


Writer.prototype.writeStringArray = function(strings) {
  if ((!strings instanceof Array))
    throw new TypeError('argument must be an Array[String]');

  var self = this;
  strings.forEach(function(s) {
    self.writeString(s);
  });
};

// This is really to solve DER cases, but whatever for now
Writer.prototype.writeOID = function(s, tag) {
  if (typeof(s) !== 'string')
    throw new TypeError('argument must be a string');
  if (typeof(tag) !== 'number')
    tag = ASN1.OID;

  if (!/^([0-9]+\.){3,}[0-9]+$/.test(s))
    throw new Error('argument is not a valid OID string');

  function encodeOctet(bytes, octet) {
    if (octet < 128) {
        bytes.push(octet);
    } else if (octet < 16384) {
        bytes.push((octet >>> 7) | 0x80);
        bytes.push(octet & 0x7F);
    } else if (octet < 2097152) {
      bytes.push((octet >>> 14) | 0x80);
      bytes.push(((octet >>> 7) | 0x80) & 0xFF);
      bytes.push(octet & 0x7F);
    } else if (octet < 268435456) {
      bytes.push((octet >>> 21) | 0x80);
      bytes.push(((octet >>> 14) | 0x80) & 0xFF);
      bytes.push(((octet >>> 7) | 0x80) & 0xFF);
      bytes.push(octet & 0x7F);
    } else {
      bytes.push(((octet >>> 28) | 0x80) & 0xFF);
      bytes.push(((octet >>> 21) | 0x80) & 0xFF);
      bytes.push(((octet >>> 14) | 0x80) & 0xFF);
      bytes.push(((octet >>> 7) | 0x80) & 0xFF);
      bytes.push(octet & 0x7F);
    }
  }

  var tmp = s.split('.');
  var bytes = [];
  bytes.push(parseInt(tmp[0], 10) * 40 + parseInt(tmp[1], 10));
  tmp.slice(2).forEach(function(b) {
    encodeOctet(bytes, parseInt(b, 10));
  });

  var self = this;
  this._ensure(2 + bytes.length);
  this.writeByte(tag);
  this.writeLength(bytes.length);
  bytes.forEach(function(b) {
    self.writeByte(b);
  });
};


Writer.prototype.writeLength = function(len) {
  if (typeof(len) !== 'number')
    throw new TypeError('argument must be a Number');

  this._ensure(4);

  if (len <= 0x7f) {
    this._buf[this._offset++] = len;
  } else if (len <= 0xff) {
    this._buf[this._offset++] = 0x81;
    this._buf[this._offset++] = len;
  } else if (len <= 0xffff) {
    this._buf[this._offset++] = 0x82;
    this._buf[this._offset++] = len >> 8;
    this._buf[this._offset++] = len;
  } else if (len <= 0xffffff) {
    this._buf[this._offset++] = 0x83;
    this._buf[this._offset++] = len >> 16;
    this._buf[this._offset++] = len >> 8;
    this._buf[this._offset++] = len;
  } else {
    throw new InvalidAsn1ERror('Length too long (> 4 bytes)');
  }
};

Writer.prototype.startSequence = function(tag) {
  if (typeof(tag) !== 'number')
    tag = ASN1.Sequence | ASN1.Constructor;

  this.writeByte(tag);
  this._seq.push(this._offset);
  this._ensure(3);
  this._offset += 3;
};


Writer.prototype.endSequence = function() {
  var seq = this._seq.pop();
  var start = seq + 3;
  var len = this._offset - start;

  if (len <= 0x7f) {
    this._shift(start, len, -2);
    this._buf[seq] = len;
  } else if (len <= 0xff) {
    this._shift(start, len, -1);
    this._buf[seq] = 0x81;
    this._buf[seq + 1] = len;
  } else if (len <= 0xffff) {
    this._buf[seq] = 0x82;
    this._buf[seq + 1] = len >> 8;
    this._buf[seq + 2] = len;
  } else if (len <= 0xffffff) {
    this._shift(start, len, 1);
    this._buf[seq] = 0x83;
    this._buf[seq + 1] = len >> 16;
    this._buf[seq + 2] = len >> 8;
    this._buf[seq + 3] = len;
  } else {
    throw new InvalidAsn1Error('Sequence too long');
  }
};


Writer.prototype._shift = function(start, len, shift) {
  assert.ok(start !== undefined);
  assert.ok(len !== undefined);
  assert.ok(shift);

  this._buf.copy(this._buf, start + shift, start, start + len);
  this._offset += shift;
};

Writer.prototype._ensure = function(len) {
  assert.ok(len);

  if (this._size - this._offset < len) {
    var sz = this._size * this._options.growthFactor;
    if (sz - this._offset < len)
      sz += len;

    var buf = new Buffer(sz);

    this._buf.copy(buf, 0, 0, this._offset);
    this._buf = buf;
    this._size = sz;
  }
};



///--- Exported API

module.exports = Writer;

}).call(this,require("buffer").Buffer)
},{"./errors":106,"./types":109,"assert":2,"buffer":8}],111:[function(require,module,exports){
// Copyright 2011 Mark Cavage <mcavage@gmail.com> All rights reserved.

// If you have no idea what ASN.1 or BER is, see this:
// ftp://ftp.rsa.com/pub/pkcs/ascii/layman.asc

var Ber = require('./ber/index');



///--- Exported API

module.exports = {

  Ber: Ber,

  BerReader: Ber.Reader,

  BerWriter: Ber.Writer

};

},{"./ber/index":107}],112:[function(require,module,exports){
(function (Buffer,process){
// Copyright (c) 2012, Mark Cavage. All rights reserved.
// Copyright 2015 Joyent, Inc.

var assert = require('assert');
var Stream = require('stream').Stream;
var util = require('util');


///--- Globals

/* JSSTYLED */
var UUID_REGEXP = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;


///--- Internal

function _capitalize(str) {
    return (str.charAt(0).toUpperCase() + str.slice(1));
}

function _toss(name, expected, oper, arg, actual) {
    throw new assert.AssertionError({
        message: util.format('%s (%s) is required', name, expected),
        actual: (actual === undefined) ? typeof (arg) : actual(arg),
        expected: expected,
        operator: oper || '===',
        stackStartFunction: _toss.caller
    });
}

function _getClass(arg) {
    return (Object.prototype.toString.call(arg).slice(8, -1));
}

function noop() {
    // Why even bother with asserts?
}


///--- Exports

var types = {
    bool: {
        check: function (arg) { return typeof (arg) === 'boolean'; }
    },
    func: {
        check: function (arg) { return typeof (arg) === 'function'; }
    },
    string: {
        check: function (arg) { return typeof (arg) === 'string'; }
    },
    object: {
        check: function (arg) {
            return typeof (arg) === 'object' && arg !== null;
        }
    },
    number: {
        check: function (arg) {
            return typeof (arg) === 'number' && !isNaN(arg);
        }
    },
    finite: {
        check: function (arg) {
            return typeof (arg) === 'number' && !isNaN(arg) && isFinite(arg);
        }
    },
    buffer: {
        check: function (arg) { return Buffer.isBuffer(arg); },
        operator: 'Buffer.isBuffer'
    },
    array: {
        check: function (arg) { return Array.isArray(arg); },
        operator: 'Array.isArray'
    },
    stream: {
        check: function (arg) { return arg instanceof Stream; },
        operator: 'instanceof',
        actual: _getClass
    },
    date: {
        check: function (arg) { return arg instanceof Date; },
        operator: 'instanceof',
        actual: _getClass
    },
    regexp: {
        check: function (arg) { return arg instanceof RegExp; },
        operator: 'instanceof',
        actual: _getClass
    },
    uuid: {
        check: function (arg) {
            return typeof (arg) === 'string' && UUID_REGEXP.test(arg);
        },
        operator: 'isUUID'
    }
};

function _setExports(ndebug) {
    var keys = Object.keys(types);
    var out;

    /* re-export standard assert */
    if (process.env.NODE_NDEBUG) {
        out = noop;
    } else {
        out = function (arg, msg) {
            if (!arg) {
                _toss(msg, 'true', arg);
            }
        };
    }

    /* standard checks */
    keys.forEach(function (k) {
        if (ndebug) {
            out[k] = noop;
            return;
        }
        var type = types[k];
        out[k] = function (arg, msg) {
            if (!type.check(arg)) {
                _toss(msg, k, type.operator, arg, type.actual);
            }
        };
    });

    /* optional checks */
    keys.forEach(function (k) {
        var name = 'optional' + _capitalize(k);
        if (ndebug) {
            out[name] = noop;
            return;
        }
        var type = types[k];
        out[name] = function (arg, msg) {
            if (arg === undefined || arg === null) {
                return;
            }
            if (!type.check(arg)) {
                _toss(msg, k, type.operator, arg, type.actual);
            }
        };
    });

    /* arrayOf checks */
    keys.forEach(function (k) {
        var name = 'arrayOf' + _capitalize(k);
        if (ndebug) {
            out[name] = noop;
            return;
        }
        var type = types[k];
        var expected = '[' + k + ']';
        out[name] = function (arg, msg) {
            if (!Array.isArray(arg)) {
                _toss(msg, expected, type.operator, arg, type.actual);
            }
            var i;
            for (i = 0; i < arg.length; i++) {
                if (!type.check(arg[i])) {
                    _toss(msg, expected, type.operator, arg, type.actual);
                }
            }
        };
    });

    /* optionalArrayOf checks */
    keys.forEach(function (k) {
        var name = 'optionalArrayOf' + _capitalize(k);
        if (ndebug) {
            out[name] = noop;
            return;
        }
        var type = types[k];
        var expected = '[' + k + ']';
        out[name] = function (arg, msg) {
            if (arg === undefined || arg === null) {
                return;
            }
            if (!Array.isArray(arg)) {
                _toss(msg, expected, type.operator, arg, type.actual);
            }
            var i;
            for (i = 0; i < arg.length; i++) {
                if (!type.check(arg[i])) {
                    _toss(msg, expected, type.operator, arg, type.actual);
                }
            }
        };
    });

    /* re-export built-in assertions */
    Object.keys(assert).forEach(function (k) {
        if (k === 'AssertionError') {
            out[k] = assert[k];
            return;
        }
        if (ndebug) {
            out[k] = noop;
            return;
        }
        out[k] = assert[k];
    });

    /* export ourselves (for unit tests _only_) */
    out._setExports = _setExports;

    return out;
}

module.exports = _setExports(process.env.NODE_NDEBUG);

}).call(this,{"isBuffer":require("../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js")},require('_process'))
},{"../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js":13,"_process":17,"assert":2,"stream":37,"util":43}],113:[function(require,module,exports){
//      Copyright (c) 2012 Mathieu Turcotte
//      Licensed under the MIT license.

var Backoff = require('./lib/backoff');
var ExponentialBackoffStrategy = require('./lib/strategy/exponential');
var FibonacciBackoffStrategy = require('./lib/strategy/fibonacci');
var FunctionCall = require('./lib/function_call.js');

module.exports.Backoff = Backoff;
module.exports.FunctionCall = FunctionCall;
module.exports.FibonacciStrategy = FibonacciBackoffStrategy;
module.exports.ExponentialStrategy = ExponentialBackoffStrategy;

// Constructs a Fibonacci backoff.
module.exports.fibonacci = function(options) {
    return new Backoff(new FibonacciBackoffStrategy(options));
};

// Constructs an exponential backoff.
module.exports.exponential = function(options) {
    return new Backoff(new ExponentialBackoffStrategy(options));
};

// Constructs a FunctionCall for the given function and arguments.
module.exports.call = function(fn, vargs, callback) {
    var args = Array.prototype.slice.call(arguments);
    fn = args[0];
    vargs = args.slice(1, args.length - 1);
    callback = args[args.length - 1];
    return new FunctionCall(fn, vargs, callback);
};

},{"./lib/backoff":114,"./lib/function_call.js":115,"./lib/strategy/exponential":116,"./lib/strategy/fibonacci":117}],114:[function(require,module,exports){
//      Copyright (c) 2012 Mathieu Turcotte
//      Licensed under the MIT license.

var events = require('events');
var precond = require('precond');
var util = require('util');

// A class to hold the state of a backoff operation. Accepts a backoff strategy
// to generate the backoff delays.
function Backoff(backoffStrategy) {
    events.EventEmitter.call(this);

    this.backoffStrategy_ = backoffStrategy;
    this.maxNumberOfRetry_ = -1;
    this.backoffNumber_ = 0;
    this.backoffDelay_ = 0;
    this.timeoutID_ = -1;

    this.handlers = {
        backoff: this.onBackoff_.bind(this)
    };
}
util.inherits(Backoff, events.EventEmitter);

// Sets a limit, greater than 0, on the maximum number of backoffs. A 'fail'
// event will be emitted when the limit is reached.
Backoff.prototype.failAfter = function(maxNumberOfRetry) {
    precond.checkArgument(maxNumberOfRetry > 0,
        'Expected a maximum number of retry greater than 0 but got %s.',
        maxNumberOfRetry);

    this.maxNumberOfRetry_ = maxNumberOfRetry;
};

// Starts a backoff operation. Accepts an optional parameter to let the
// listeners know why the backoff operation was started.
Backoff.prototype.backoff = function(err) {
    precond.checkState(this.timeoutID_ === -1, 'Backoff in progress.');

    if (this.backoffNumber_ === this.maxNumberOfRetry_) {
        this.emit('fail', err);
        this.reset();
    } else {
        this.backoffDelay_ = this.backoffStrategy_.next();
        this.timeoutID_ = setTimeout(this.handlers.backoff, this.backoffDelay_);
        this.emit('backoff', this.backoffNumber_, this.backoffDelay_, err);
    }
};

// Handles the backoff timeout completion.
Backoff.prototype.onBackoff_ = function() {
    this.timeoutID_ = -1;
    this.emit('ready', this.backoffNumber_, this.backoffDelay_);
    this.backoffNumber_++;
};

// Stops any backoff operation and resets the backoff delay to its inital value.
Backoff.prototype.reset = function() {
    this.backoffNumber_ = 0;
    this.backoffStrategy_.reset();
    clearTimeout(this.timeoutID_);
    this.timeoutID_ = -1;
};

module.exports = Backoff;

},{"events":10,"precond":139,"util":43}],115:[function(require,module,exports){
//      Copyright (c) 2012 Mathieu Turcotte
//      Licensed under the MIT license.

var events = require('events');
var precond = require('precond');
var util = require('util');

var Backoff = require('./backoff');
var FibonacciBackoffStrategy = require('./strategy/fibonacci');

// Wraps a function to be called in a backoff loop.
function FunctionCall(fn, args, callback) {
    events.EventEmitter.call(this);

    precond.checkIsFunction(fn, 'Expected fn to be a function.');
    precond.checkIsArray(args, 'Expected args to be an array.');
    precond.checkIsFunction(callback, 'Expected callback to be a function.');

    this.function_ = fn;
    this.arguments_ = args;
    this.callback_ = callback;
    this.lastResult_ = [];
    this.numRetries_ = 0;

    this.backoff_ = null;
    this.strategy_ = null;
    this.failAfter_ = -1;
    this.retryPredicate_ = FunctionCall.DEFAULT_RETRY_PREDICATE_;

    this.state_ = FunctionCall.State_.PENDING;
}
util.inherits(FunctionCall, events.EventEmitter);

// States in which the call can be.
FunctionCall.State_ = {
    // Call isn't started yet.
    PENDING: 0,
    // Call is in progress.
    RUNNING: 1,
    // Call completed successfully which means that either the wrapped function
    // returned successfully or the maximal number of backoffs was reached.
    COMPLETED: 2,
    // The call was aborted.
    ABORTED: 3
};

// The default retry predicate which considers any error as retriable.
FunctionCall.DEFAULT_RETRY_PREDICATE_ = function(err) {
  return true;
};

// Checks whether the call is pending.
FunctionCall.prototype.isPending = function() {
    return this.state_ == FunctionCall.State_.PENDING;
};

// Checks whether the call is in progress.
FunctionCall.prototype.isRunning = function() {
    return this.state_ == FunctionCall.State_.RUNNING;
};

// Checks whether the call is completed.
FunctionCall.prototype.isCompleted = function() {
    return this.state_ == FunctionCall.State_.COMPLETED;
};

// Checks whether the call is aborted.
FunctionCall.prototype.isAborted = function() {
    return this.state_ == FunctionCall.State_.ABORTED;
};

// Sets the backoff strategy to use. Can only be called before the call is
// started otherwise an exception will be thrown.
FunctionCall.prototype.setStrategy = function(strategy) {
    precond.checkState(this.isPending(), 'FunctionCall in progress.');
    this.strategy_ = strategy;
    return this; // Return this for chaining.
};

// Sets the predicate which will be used to determine whether the errors
// returned from the wrapped function should be retried or not, e.g. a
// network error would be retriable while a type error would stop the
// function call.
FunctionCall.prototype.retryIf = function(retryPredicate) {
    precond.checkState(this.isPending(), 'FunctionCall in progress.');
    this.retryPredicate_ = retryPredicate;
    return this;
};

// Returns all intermediary results returned by the wrapped function since
// the initial call.
FunctionCall.prototype.getLastResult = function() {
    return this.lastResult_.concat();
};

// Returns the number of times the wrapped function call was retried.
FunctionCall.prototype.getNumRetries = function() {
    return this.numRetries_;
};

// Sets the backoff limit.
FunctionCall.prototype.failAfter = function(maxNumberOfRetry) {
    precond.checkState(this.isPending(), 'FunctionCall in progress.');
    this.failAfter_ = maxNumberOfRetry;
    return this; // Return this for chaining.
};

// Aborts the call.
FunctionCall.prototype.abort = function() {
    if (this.isCompleted() || this.isAborted()) {
      return;
    }

    if (this.isRunning()) {
        this.backoff_.reset();
    }

    this.state_ = FunctionCall.State_.ABORTED;
    this.lastResult_ = [new Error('Backoff aborted.')];
    this.emit('abort');
    this.doCallback_();
};

// Initiates the call to the wrapped function. Accepts an optional factory
// function used to create the backoff instance; used when testing.
FunctionCall.prototype.start = function(backoffFactory) {
    precond.checkState(!this.isAborted(), 'FunctionCall is aborted.');
    precond.checkState(this.isPending(), 'FunctionCall already started.');

    var strategy = this.strategy_ || new FibonacciBackoffStrategy();

    this.backoff_ = backoffFactory ?
        backoffFactory(strategy) :
        new Backoff(strategy);

    this.backoff_.on('ready', this.doCall_.bind(this, true /* isRetry */));
    this.backoff_.on('fail', this.doCallback_.bind(this));
    this.backoff_.on('backoff', this.handleBackoff_.bind(this));

    if (this.failAfter_ > 0) {
        this.backoff_.failAfter(this.failAfter_);
    }

    this.state_ = FunctionCall.State_.RUNNING;
    this.doCall_(false /* isRetry */);
};

// Calls the wrapped function.
FunctionCall.prototype.doCall_ = function(isRetry) {
    if (isRetry) {
        this.numRetries_++;
    }
    var eventArgs = ['call'].concat(this.arguments_);
    events.EventEmitter.prototype.emit.apply(this, eventArgs);
    var callback = this.handleFunctionCallback_.bind(this);
    this.function_.apply(null, this.arguments_.concat(callback));
};

// Calls the wrapped function's callback with the last result returned by the
// wrapped function.
FunctionCall.prototype.doCallback_ = function() {
    this.callback_.apply(null, this.lastResult_);
};

// Handles wrapped function's completion. This method acts as a replacement
// for the original callback function.
FunctionCall.prototype.handleFunctionCallback_ = function() {
    if (this.isAborted()) {
        return;
    }

    var args = Array.prototype.slice.call(arguments);
    this.lastResult_ = args; // Save last callback arguments.
    events.EventEmitter.prototype.emit.apply(this, ['callback'].concat(args));

    var err = args[0];
    if (err && this.retryPredicate_(err)) {
        this.backoff_.backoff(err);
    } else {
        this.state_ = FunctionCall.State_.COMPLETED;
        this.doCallback_();
    }
};

// Handles the backoff event by reemitting it.
FunctionCall.prototype.handleBackoff_ = function(number, delay, err) {
    this.emit('backoff', number, delay, err);
};

module.exports = FunctionCall;

},{"./backoff":114,"./strategy/fibonacci":117,"events":10,"precond":139,"util":43}],116:[function(require,module,exports){
//      Copyright (c) 2012 Mathieu Turcotte
//      Licensed under the MIT license.

var util = require('util');
var precond = require('precond');

var BackoffStrategy = require('./strategy');

// Exponential backoff strategy.
function ExponentialBackoffStrategy(options) {
    BackoffStrategy.call(this, options);
    this.backoffDelay_ = 0;
    this.nextBackoffDelay_ = this.getInitialDelay();
    this.factor_ = ExponentialBackoffStrategy.DEFAULT_FACTOR;

    if (options && options.factor !== undefined) {
        precond.checkArgument(options.factor > 1,
            'Exponential factor should be greater than 1 but got %s.',
            options.factor);
        this.factor_ = options.factor;
    }
}
util.inherits(ExponentialBackoffStrategy, BackoffStrategy);

// Default multiplication factor used to compute the next backoff delay from
// the current one. The value can be overridden by passing a custom factor as
// part of the options.
ExponentialBackoffStrategy.DEFAULT_FACTOR = 2;

ExponentialBackoffStrategy.prototype.next_ = function() {
    this.backoffDelay_ = Math.min(this.nextBackoffDelay_, this.getMaxDelay());
    this.nextBackoffDelay_ = this.backoffDelay_ * this.factor_;
    return this.backoffDelay_;
};

ExponentialBackoffStrategy.prototype.reset_ = function() {
    this.backoffDelay_ = 0;
    this.nextBackoffDelay_ = this.getInitialDelay();
};

module.exports = ExponentialBackoffStrategy;

},{"./strategy":118,"precond":139,"util":43}],117:[function(require,module,exports){
//      Copyright (c) 2012 Mathieu Turcotte
//      Licensed under the MIT license.

var util = require('util');

var BackoffStrategy = require('./strategy');

// Fibonacci backoff strategy.
function FibonacciBackoffStrategy(options) {
    BackoffStrategy.call(this, options);
    this.backoffDelay_ = 0;
    this.nextBackoffDelay_ = this.getInitialDelay();
}
util.inherits(FibonacciBackoffStrategy, BackoffStrategy);

FibonacciBackoffStrategy.prototype.next_ = function() {
    var backoffDelay = Math.min(this.nextBackoffDelay_, this.getMaxDelay());
    this.nextBackoffDelay_ += this.backoffDelay_;
    this.backoffDelay_ = backoffDelay;
    return backoffDelay;
};

FibonacciBackoffStrategy.prototype.reset_ = function() {
    this.nextBackoffDelay_ = this.getInitialDelay();
    this.backoffDelay_ = 0;
};

module.exports = FibonacciBackoffStrategy;

},{"./strategy":118,"util":43}],118:[function(require,module,exports){
//      Copyright (c) 2012 Mathieu Turcotte
//      Licensed under the MIT license.

var events = require('events');
var util = require('util');

function isDef(value) {
    return value !== undefined && value !== null;
}

// Abstract class defining the skeleton for the backoff strategies. Accepts an
// object holding the options for the backoff strategy:
//
//  * `randomisationFactor`: The randomisation factor which must be between 0
//     and 1 where 1 equates to a randomization factor of 100% and 0 to no
//     randomization.
//  * `initialDelay`: The backoff initial delay in milliseconds.
//  * `maxDelay`: The backoff maximal delay in milliseconds.
function BackoffStrategy(options) {
    options = options || {};

    if (isDef(options.initialDelay) && options.initialDelay < 1) {
        throw new Error('The initial timeout must be greater than 0.');
    } else if (isDef(options.maxDelay) && options.maxDelay < 1) {
        throw new Error('The maximal timeout must be greater than 0.');
    }

    this.initialDelay_ = options.initialDelay || 100;
    this.maxDelay_ = options.maxDelay || 10000;

    if (this.maxDelay_ <= this.initialDelay_) {
        throw new Error('The maximal backoff delay must be ' +
                        'greater than the initial backoff delay.');
    }

    if (isDef(options.randomisationFactor) &&
        (options.randomisationFactor < 0 || options.randomisationFactor > 1)) {
        throw new Error('The randomisation factor must be between 0 and 1.');
    }

    this.randomisationFactor_ = options.randomisationFactor || 0;
}

// Gets the maximal backoff delay.
BackoffStrategy.prototype.getMaxDelay = function() {
    return this.maxDelay_;
};

// Gets the initial backoff delay.
BackoffStrategy.prototype.getInitialDelay = function() {
    return this.initialDelay_;
};

// Template method that computes and returns the next backoff delay in
// milliseconds.
BackoffStrategy.prototype.next = function() {
    var backoffDelay = this.next_();
    var randomisationMultiple = 1 + Math.random() * this.randomisationFactor_;
    var randomizedDelay = Math.round(backoffDelay * randomisationMultiple);
    return randomizedDelay;
};

// Computes and returns the next backoff delay. Intended to be overridden by
// subclasses.
BackoffStrategy.prototype.next_ = function() {
    throw new Error('BackoffStrategy.next_() unimplemented.');
};

// Template method that resets the backoff delay to its initial value.
BackoffStrategy.prototype.reset = function() {
    this.reset_();
};

// Resets the backoff delay to its initial value. Intended to be overridden by
// subclasses.
BackoffStrategy.prototype.reset_ = function() {
    throw new Error('BackoffStrategy.reset_() unimplemented.');
};

module.exports = BackoffStrategy;

},{"events":10,"util":43}],119:[function(require,module,exports){
(function (Buffer,process){
/**
 * Copyright (c) 2017 Trent Mick.
 * Copyright (c) 2017 Joyent Inc.
 *
 * The bunyan logging library for node.js.
 *
 * -*- mode: js -*-
 * vim: expandtab:ts=4:sw=4
 */

var VERSION = '1.8.12';

/*
 * Bunyan log format version. This becomes the 'v' field on all log records.
 * This will be incremented if there is any backward incompatible change to
 * the log record format. Details will be in 'CHANGES.md' (the change log).
 */
var LOG_VERSION = 0;


var xxx = function xxx(s) {     // internal dev/debug logging
    var args = ['XX' + 'X: '+s].concat(
        Array.prototype.slice.call(arguments, 1));
    console.error.apply(this, args);
};
var xxx = function xxx() {};  // comment out to turn on debug logging


/*
 * Runtime environment notes:
 *
 * Bunyan is intended to run in a number of runtime environments. Here are
 * some notes on differences for those envs and how the code copes.
 *
 * - node.js: The primary target environment.
 * - NW.js: http://nwjs.io/  An *app* environment that feels like both a
 *   node env -- it has node-like globals (`process`, `global`) and
 *   browser-like globals (`window`, `navigator`). My *understanding* is that
 *   bunyan can operate as if this is vanilla node.js.
 * - browser: Failing the above, we sniff using the `window` global
 *   <https://developer.mozilla.org/en-US/docs/Web/API/Window/window>.
 *      - browserify: http://browserify.org/  A browser-targetting bundler of
 *        node.js deps. The runtime is a browser env, so can't use fs access,
 *        etc. Browserify's build looks for `require(<single-string>)` imports
 *        to bundle. For some imports it won't be able to handle, we "hide"
 *        from browserify with `require('frobshizzle' + '')`.
 * - Other? Please open issues if things are broken.
 */
var runtimeEnv;
if (typeof (process) !== 'undefined' && process.versions) {
    if (process.versions.nw) {
        runtimeEnv = 'nw';
    } else if (process.versions.node) {
        runtimeEnv = 'node';
    }
}
if (!runtimeEnv && typeof (window) !== 'undefined' &&
    window.window === window) {
    runtimeEnv = 'browser';
}
if (!runtimeEnv) {
    throw new Error('unknown runtime environment');
}


var os, fs, dtrace;
if (runtimeEnv === 'browser') {
    os = {
        hostname: function () {
            return window.location.host;
        }
    };
    fs = {};
    dtrace = null;
} else {
    os = require('os');
    fs = require('fs');
    try {
        dtrace = require('dtrace-provider' + '');
    } catch (e) {
        dtrace = null;
    }
}
var util = require('util');
var assert = require('assert');
var EventEmitter = require('events').EventEmitter;
var stream = require('stream');

try {
    var safeJsonStringify = require('safe-json-stringify');
} catch (e) {
    safeJsonStringify = null;
}
if (process.env.BUNYAN_TEST_NO_SAFE_JSON_STRINGIFY) {
    safeJsonStringify = null;
}

// The 'mv' module is required for rotating-file stream support.
try {
    var mv = require('mv' + '');
} catch (e) {
    mv = null;
}

try {
    var sourceMapSupport = require('source-map-support' + '');
} catch (_) {
    sourceMapSupport = null;
}


//---- Internal support stuff

/**
 * A shallow copy of an object. Bunyan logging attempts to never cause
 * exceptions, so this function attempts to handle non-objects gracefully.
 */
function objCopy(obj) {
    if (obj == null) {  // null or undefined
        return obj;
    } else if (Array.isArray(obj)) {
        return obj.slice();
    } else if (typeof (obj) === 'object') {
        var copy = {};
        Object.keys(obj).forEach(function (k) {
            copy[k] = obj[k];
        });
        return copy;
    } else {
        return obj;
    }
}

var format = util.format;
if (!format) {
    // If node < 0.6, then use its `util.format`:
    // <https://github.com/joyent/node/blob/master/lib/util.js#L22>:
    var inspect = util.inspect;
    var formatRegExp = /%[sdj%]/g;
    format = function format(f) {
        if (typeof (f) !== 'string') {
            var objects = [];
            for (var i = 0; i < arguments.length; i++) {
                objects.push(inspect(arguments[i]));
            }
            return objects.join(' ');
        }

        var i = 1;
        var args = arguments;
        var len = args.length;
        var str = String(f).replace(formatRegExp, function (x) {
            if (i >= len)
                return x;
            switch (x) {
                case '%s': return String(args[i++]);
                case '%d': return Number(args[i++]);
                case '%j': return fastAndSafeJsonStringify(args[i++]);
                case '%%': return '%';
                default:
                    return x;
            }
        });
        for (var x = args[i]; i < len; x = args[++i]) {
            if (x === null || typeof (x) !== 'object') {
                str += ' ' + x;
            } else {
                str += ' ' + inspect(x);
            }
        }
        return str;
    };
}


/**
 * Gather some caller info 3 stack levels up.
 * See <http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi>.
 */
function getCaller3Info() {
    if (this === undefined) {
        // Cannot access caller info in 'strict' mode.
        return;
    }
    var obj = {};
    var saveLimit = Error.stackTraceLimit;
    var savePrepare = Error.prepareStackTrace;
    Error.stackTraceLimit = 3;

    Error.prepareStackTrace = function (_, stack) {
        var caller = stack[2];
        if (sourceMapSupport) {
            caller = sourceMapSupport.wrapCallSite(caller);
        }
        obj.file = caller.getFileName();
        obj.line = caller.getLineNumber();
        var func = caller.getFunctionName();
        if (func)
            obj.func = func;
    };
    Error.captureStackTrace(this, getCaller3Info);
    this.stack;

    Error.stackTraceLimit = saveLimit;
    Error.prepareStackTrace = savePrepare;
    return obj;
}


function _indent(s, indent) {
    if (!indent) indent = '    ';
    var lines = s.split(/\r?\n/g);
    return indent + lines.join('\n' + indent);
}


/**
 * Warn about an bunyan processing error.
 *
 * @param msg {String} Message with which to warn.
 * @param dedupKey {String} Optional. A short string key for this warning to
 *      have its warning only printed once.
 */
function _warn(msg, dedupKey) {
    assert.ok(msg);
    if (dedupKey) {
        if (_warned[dedupKey]) {
            return;
        }
        _warned[dedupKey] = true;
    }
    process.stderr.write(msg + '\n');
}
function _haveWarned(dedupKey) {
    return _warned[dedupKey];
}
var _warned = {};


function ConsoleRawStream() {}
ConsoleRawStream.prototype.write = function (rec) {
    if (rec.level < INFO) {
        console.log(rec);
    } else if (rec.level < WARN) {
        console.info(rec);
    } else if (rec.level < ERROR) {
        console.warn(rec);
    } else {
        console.error(rec);
    }
};


//---- Levels

var TRACE = 10;
var DEBUG = 20;
var INFO = 30;
var WARN = 40;
var ERROR = 50;
var FATAL = 60;

var levelFromName = {
    'trace': TRACE,
    'debug': DEBUG,
    'info': INFO,
    'warn': WARN,
    'error': ERROR,
    'fatal': FATAL
};
var nameFromLevel = {};
Object.keys(levelFromName).forEach(function (name) {
    nameFromLevel[levelFromName[name]] = name;
});

// Dtrace probes.
var dtp = undefined;
var probes = dtrace && {};

/**
 * Resolve a level number, name (upper or lowercase) to a level number value.
 *
 * @param nameOrNum {String|Number} A level name (case-insensitive) or positive
 *      integer level.
 * @api public
 */
function resolveLevel(nameOrNum) {
    var level;
    var type = typeof (nameOrNum);
    if (type === 'string') {
        level = levelFromName[nameOrNum.toLowerCase()];
        if (!level) {
            throw new Error(format('unknown level name: "%s"', nameOrNum));
        }
    } else if (type !== 'number') {
        throw new TypeError(format('cannot resolve level: invalid arg (%s):',
            type, nameOrNum));
    } else if (nameOrNum < 0 || Math.floor(nameOrNum) !== nameOrNum) {
        throw new TypeError(format('level is not a positive integer: %s',
            nameOrNum));
    } else {
        level = nameOrNum;
    }
    return level;
}


function isWritable(obj) {
    if (obj instanceof stream.Writable) {
        return true;
    }
    return typeof (obj.write) === 'function';
}


//---- Logger class

/**
 * Create a Logger instance.
 *
 * @param options {Object} See documentation for full details. At minimum
 *    this must include a 'name' string key. Configuration keys:
 *      - `streams`: specify the logger output streams. This is an array of
 *        objects with these fields:
 *          - `type`: The stream type. See README.md for full details.
 *            Often this is implied by the other fields. Examples are
 *            'file', 'stream' and "raw".
 *          - `level`: Defaults to 'info'.
 *          - `path` or `stream`: The specify the file path or writeable
 *            stream to which log records are written. E.g.
 *            `stream: process.stdout`.
 *          - `closeOnExit` (boolean): Optional. Default is true for a
 *            'file' stream when `path` is given, false otherwise.
 *        See README.md for full details.
 *      - `level`: set the level for a single output stream (cannot be used
 *        with `streams`)
 *      - `stream`: the output stream for a logger with just one, e.g.
 *        `process.stdout` (cannot be used with `streams`)
 *      - `serializers`: object mapping log record field names to
 *        serializing functions. See README.md for details.
 *      - `src`: Boolean (default false). Set true to enable 'src' automatic
 *        field with log call source info.
 *    All other keys are log record fields.
 *
 * An alternative *internal* call signature is used for creating a child:
 *    new Logger(<parent logger>, <child options>[, <child opts are simple>]);
 *
 * @param _childSimple (Boolean) An assertion that the given `_childOptions`
 *    (a) only add fields (no config) and (b) no serialization handling is
 *    required for them. IOW, this is a fast path for frequent child
 *    creation.
 */
function Logger(options, _childOptions, _childSimple) {
    xxx('Logger start:', options)
    if (!(this instanceof Logger)) {
        return new Logger(options, _childOptions);
    }

    // Input arg validation.
    var parent;
    if (_childOptions !== undefined) {
        parent = options;
        options = _childOptions;
        if (!(parent instanceof Logger)) {
            throw new TypeError(
                'invalid Logger creation: do not pass a second arg');
        }
    }
    if (!options) {
        throw new TypeError('options (object) is required');
    }
    if (!parent) {
        if (!options.name) {
            throw new TypeError('options.name (string) is required');
        }
    } else {
        if (options.name) {
            throw new TypeError(
                'invalid options.name: child cannot set logger name');
        }
    }
    if (options.stream && options.streams) {
        throw new TypeError('cannot mix "streams" and "stream" options');
    }
    if (options.streams && !Array.isArray(options.streams)) {
        throw new TypeError('invalid options.streams: must be an array')
    }
    if (options.serializers && (typeof (options.serializers) !== 'object' ||
            Array.isArray(options.serializers))) {
        throw new TypeError('invalid options.serializers: must be an object')
    }

    EventEmitter.call(this);

    // Fast path for simple child creation.
    if (parent && _childSimple) {
        // `_isSimpleChild` is a signal to stream close handling that this child
        // owns none of its streams.
        this._isSimpleChild = true;

        this._level = parent._level;
        this.streams = parent.streams;
        this.serializers = parent.serializers;
        this.src = parent.src;
        var fields = this.fields = {};
        var parentFieldNames = Object.keys(parent.fields);
        for (var i = 0; i < parentFieldNames.length; i++) {
            var name = parentFieldNames[i];
            fields[name] = parent.fields[name];
        }
        var names = Object.keys(options);
        for (var i = 0; i < names.length; i++) {
            var name = names[i];
            fields[name] = options[name];
        }
        return;
    }

    // Start values.
    var self = this;
    if (parent) {
        this._level = parent._level;
        this.streams = [];
        for (var i = 0; i < parent.streams.length; i++) {
            var s = objCopy(parent.streams[i]);
            s.closeOnExit = false; // Don't own parent stream.
            this.streams.push(s);
        }
        this.serializers = objCopy(parent.serializers);
        this.src = parent.src;
        this.fields = objCopy(parent.fields);
        if (options.level) {
            this.level(options.level);
        }
    } else {
        this._level = Number.POSITIVE_INFINITY;
        this.streams = [];
        this.serializers = null;
        this.src = false;
        this.fields = {};
    }

    if (!dtp && dtrace) {
        dtp = dtrace.createDTraceProvider('bunyan');

        for (var level in levelFromName) {
            var probe;

            probes[levelFromName[level]] = probe =
                dtp.addProbe('log-' + level, 'char *');

            // Explicitly add a reference to dtp to prevent it from being GC'd
            probe.dtp = dtp;
        }

        dtp.enable();
    }

    // Handle *config* options (i.e. options that are not just plain data
    // for log records).
    if (options.stream) {
        self.addStream({
            type: 'stream',
            stream: options.stream,
            closeOnExit: false,
            level: options.level
        });
    } else if (options.streams) {
        options.streams.forEach(function (s) {
            self.addStream(s, options.level);
        });
    } else if (parent && options.level) {
        this.level(options.level);
    } else if (!parent) {
        if (runtimeEnv === 'browser') {
            /*
             * In the browser we'll be emitting to console.log by default.
             * Any console.log worth its salt these days can nicely render
             * and introspect objects (e.g. the Firefox and Chrome console)
             * so let's emit the raw log record. Are there browsers for which
             * that breaks things?
             */
            self.addStream({
                type: 'raw',
                stream: new ConsoleRawStream(),
                closeOnExit: false,
                level: options.level
            });
        } else {
            self.addStream({
                type: 'stream',
                stream: process.stdout,
                closeOnExit: false,
                level: options.level
            });
        }
    }
    if (options.serializers) {
        self.addSerializers(options.serializers);
    }
    if (options.src) {
        this.src = true;
    }
    xxx('Logger: ', self)

    // Fields.
    // These are the default fields for log records (minus the attributes
    // removed in this constructor). To allow storing raw log records
    // (unrendered), `this.fields` must never be mutated. Create a copy for
    // any changes.
    var fields = objCopy(options);
    delete fields.stream;
    delete fields.level;
    delete fields.streams;
    delete fields.serializers;
    delete fields.src;
    if (this.serializers) {
        this._applySerializers(fields);
    }
    if (!fields.hostname && !self.fields.hostname) {
        fields.hostname = os.hostname();
    }
    if (!fields.pid) {
        fields.pid = process.pid;
    }
    Object.keys(fields).forEach(function (k) {
        self.fields[k] = fields[k];
    });
}

util.inherits(Logger, EventEmitter);


/**
 * Add a stream
 *
 * @param stream {Object}. Object with these fields:
 *    - `type`: The stream type. See README.md for full details.
 *      Often this is implied by the other fields. Examples are
 *      'file', 'stream' and "raw".
 *    - `path` or `stream`: The specify the file path or writeable
 *      stream to which log records are written. E.g.
 *      `stream: process.stdout`.
 *    - `level`: Optional. Falls back to `defaultLevel`.
 *    - `closeOnExit` (boolean): Optional. Default is true for a
 *      'file' stream when `path` is given, false otherwise.
 *    See README.md for full details.
 * @param defaultLevel {Number|String} Optional. A level to use if
 *      `stream.level` is not set. If neither is given, this defaults to INFO.
 */
Logger.prototype.addStream = function addStream(s, defaultLevel) {
    var self = this;
    if (defaultLevel === null || defaultLevel === undefined) {
        defaultLevel = INFO;
    }

    s = objCopy(s);

    // Implicit 'type' from other args.
    if (!s.type) {
        if (s.stream) {
            s.type = 'stream';
        } else if (s.path) {
            s.type = 'file'
        }
    }
    s.raw = (s.type === 'raw');  // PERF: Allow for faster check in `_emit`.

    if (s.level !== undefined) {
        s.level = resolveLevel(s.level);
    } else {
        s.level = resolveLevel(defaultLevel);
    }
    if (s.level < self._level) {
        self._level = s.level;
    }

    switch (s.type) {
    case 'stream':
        assert.ok(isWritable(s.stream),
                  '"stream" stream is not writable: ' + util.inspect(s.stream));

        if (!s.closeOnExit) {
            s.closeOnExit = false;
        }
        break;
    case 'file':
        if (s.reemitErrorEvents === undefined) {
            s.reemitErrorEvents = true;
        }
        if (!s.stream) {
            s.stream = fs.createWriteStream(s.path,
                                            {flags: 'a', encoding: 'utf8'});
            if (!s.closeOnExit) {
                s.closeOnExit = true;
            }
        } else {
            if (!s.closeOnExit) {
                s.closeOnExit = false;
            }
        }
        break;
    case 'rotating-file':
        assert.ok(!s.stream,
                  '"rotating-file" stream should not give a "stream"');
        assert.ok(s.path);
        assert.ok(mv, '"rotating-file" stream type is not supported: '
                      + 'missing "mv" module');
        s.stream = new RotatingFileStream(s);
        if (!s.closeOnExit) {
            s.closeOnExit = true;
        }
        break;
    case 'raw':
        if (!s.closeOnExit) {
            s.closeOnExit = false;
        }
        break;
    default:
        throw new TypeError('unknown stream type "' + s.type + '"');
    }

    if (s.reemitErrorEvents && typeof (s.stream.on) === 'function') {
        // TODO: When we have `<logger>.close()`, it should remove event
        //      listeners to not leak Logger instances.
        s.stream.on('error', function onStreamError(err) {
            self.emit('error', err, s);
        });
    }

    self.streams.push(s);
    delete self.haveNonRawStreams;  // reset
}


/**
 * Add serializers
 *
 * @param serializers {Object} Optional. Object mapping log record field names
 *    to serializing functions. See README.md for details.
 */
Logger.prototype.addSerializers = function addSerializers(serializers) {
    var self = this;

    if (!self.serializers) {
        self.serializers = {};
    }
    Object.keys(serializers).forEach(function (field) {
        var serializer = serializers[field];
        if (typeof (serializer) !== 'function') {
            throw new TypeError(format(
                'invalid serializer for "%s" field: must be a function',
                field));
        } else {
            self.serializers[field] = serializer;
        }
    });
}



/**
 * Create a child logger, typically to add a few log record fields.
 *
 * This can be useful when passing a logger to a sub-component, e.g. a
 * 'wuzzle' component of your service:
 *
 *    var wuzzleLog = log.child({component: 'wuzzle'})
 *    var wuzzle = new Wuzzle({..., log: wuzzleLog})
 *
 * Then log records from the wuzzle code will have the same structure as
 * the app log, *plus the component='wuzzle' field*.
 *
 * @param options {Object} Optional. Set of options to apply to the child.
 *    All of the same options for a new Logger apply here. Notes:
 *      - The parent's streams are inherited and cannot be removed in this
 *        call. Any given `streams` are *added* to the set inherited from
 *        the parent.
 *      - The parent's serializers are inherited, though can effectively be
 *        overwritten by using duplicate keys.
 *      - Can use `level` to set the level of the streams inherited from
 *        the parent. The level for the parent is NOT affected.
 * @param simple {Boolean} Optional. Set to true to assert that `options`
 *    (a) only add fields (no config) and (b) no serialization handling is
 *    required for them. IOW, this is a fast path for frequent child
 *    creation. See 'tools/timechild.js' for numbers.
 */
Logger.prototype.child = function (options, simple) {
    return new (this.constructor)(this, options || {}, simple);
}


/**
 * A convenience method to reopen 'file' streams on a logger. This can be
 * useful with external log rotation utilities that move and re-open log files
 * (e.g. logrotate on Linux, logadm on SmartOS/Illumos). Those utilities
 * typically have rotation options to copy-and-truncate the log file, but
 * you may not want to use that. An alternative is to do this in your
 * application:
 *
 *      var log = bunyan.createLogger(...);
 *      ...
 *      process.on('SIGUSR2', function () {
 *          log.reopenFileStreams();
 *      });
 *      ...
 *
 * See <https://github.com/trentm/node-bunyan/issues/104>.
 */
Logger.prototype.reopenFileStreams = function () {
    var self = this;
    self.streams.forEach(function (s) {
        if (s.type === 'file') {
            if (s.stream) {
                // Not sure if typically would want this, or more immediate
                // `s.stream.destroy()`.
                s.stream.end();
                s.stream.destroySoon();
                delete s.stream;
            }
            s.stream = fs.createWriteStream(s.path,
                {flags: 'a', encoding: 'utf8'});
            s.stream.on('error', function (err) {
                self.emit('error', err, s);
            });
        }
    });
};


/* BEGIN JSSTYLED */
/**
 * Close this logger.
 *
 * This closes streams (that it owns, as per 'endOnClose' attributes on
 * streams), etc. Typically you **don't** need to bother calling this.
Logger.prototype.close = function () {
    if (this._closed) {
        return;
    }
    if (!this._isSimpleChild) {
        self.streams.forEach(function (s) {
            if (s.endOnClose) {
                xxx('closing stream s:', s);
                s.stream.end();
                s.endOnClose = false;
            }
        });
    }
    this._closed = true;
}
 */
/* END JSSTYLED */


/**
 * Get/set the level of all streams on this logger.
 *
 * Get Usage:
 *    // Returns the current log level (lowest level of all its streams).
 *    log.level() -> INFO
 *
 * Set Usage:
 *    log.level(INFO)       // set all streams to level INFO
 *    log.level('info')     // can use 'info' et al aliases
 */
Logger.prototype.level = function level(value) {
    if (value === undefined) {
        return this._level;
    }
    var newLevel = resolveLevel(value);
    var len = this.streams.length;
    for (var i = 0; i < len; i++) {
        this.streams[i].level = newLevel;
    }
    this._level = newLevel;
}


/**
 * Get/set the level of a particular stream on this logger.
 *
 * Get Usage:
 *    // Returns an array of the levels of each stream.
 *    log.levels() -> [TRACE, INFO]
 *
 *    // Returns a level of the identified stream.
 *    log.levels(0) -> TRACE      // level of stream at index 0
 *    log.levels('foo')           // level of stream with name 'foo'
 *
 * Set Usage:
 *    log.levels(0, INFO)         // set level of stream 0 to INFO
 *    log.levels(0, 'info')       // can use 'info' et al aliases
 *    log.levels('foo', WARN)     // set stream named 'foo' to WARN
 *
 * Stream names: When streams are defined, they can optionally be given
 * a name. For example,
 *       log = new Logger({
 *         streams: [
 *           {
 *             name: 'foo',
 *             path: '/var/log/my-service/foo.log'
 *             level: 'trace'
 *           },
 *         ...
 *
 * @param name {String|Number} The stream index or name.
 * @param value {Number|String} The level value (INFO) or alias ('info').
 *    If not given, this is a 'get' operation.
 * @throws {Error} If there is no stream with the given name.
 */
Logger.prototype.levels = function levels(name, value) {
    if (name === undefined) {
        assert.equal(value, undefined);
        return this.streams.map(
            function (s) { return s.level });
    }
    var stream;
    if (typeof (name) === 'number') {
        stream = this.streams[name];
        if (stream === undefined) {
            throw new Error('invalid stream index: ' + name);
        }
    } else {
        var len = this.streams.length;
        for (var i = 0; i < len; i++) {
            var s = this.streams[i];
            if (s.name === name) {
                stream = s;
                break;
            }
        }
        if (!stream) {
            throw new Error(format('no stream with name "%s"', name));
        }
    }
    if (value === undefined) {
        return stream.level;
    } else {
        var newLevel = resolveLevel(value);
        stream.level = newLevel;
        if (newLevel < this._level) {
            this._level = newLevel;
        }
    }
}


/**
 * Apply registered serializers to the appropriate keys in the given fields.
 *
 * Pre-condition: This is only called if there is at least one serializer.
 *
 * @param fields (Object) The log record fields.
 * @param excludeFields (Object) Optional mapping of keys to `true` for
 *    keys to NOT apply a serializer.
 */
Logger.prototype._applySerializers = function (fields, excludeFields) {
    var self = this;

    xxx('_applySerializers: excludeFields', excludeFields);

    // Check each serializer against these (presuming number of serializers
    // is typically less than number of fields).
    Object.keys(this.serializers).forEach(function (name) {
        if (fields[name] === undefined ||
            (excludeFields && excludeFields[name]))
        {
            return;
        }
        xxx('_applySerializers; apply to "%s" key', name)
        try {
            fields[name] = self.serializers[name](fields[name]);
        } catch (err) {
            _warn(format('bunyan: ERROR: Exception thrown from the "%s" '
                + 'Bunyan serializer. This should never happen. This is a bug '
                + 'in that serializer function.\n%s',
                name, err.stack || err));
            fields[name] = format('(Error in Bunyan log "%s" serializer '
                + 'broke field. See stderr for details.)', name);
        }
    });
}


/**
 * Emit a log record.
 *
 * @param rec {log record}
 * @param noemit {Boolean} Optional. Set to true to skip emission
 *      and just return the JSON string.
 */
Logger.prototype._emit = function (rec, noemit) {
    var i;

    // Lazily determine if this Logger has non-'raw' streams. If there are
    // any, then we need to stringify the log record.
    if (this.haveNonRawStreams === undefined) {
        this.haveNonRawStreams = false;
        for (i = 0; i < this.streams.length; i++) {
            if (!this.streams[i].raw) {
                this.haveNonRawStreams = true;
                break;
            }
        }
    }

    // Stringify the object (creates a warning str on error).
    var str;
    if (noemit || this.haveNonRawStreams) {
        str = fastAndSafeJsonStringify(rec) + '\n';
    }

    if (noemit)
        return str;

    var level = rec.level;
    for (i = 0; i < this.streams.length; i++) {
        var s = this.streams[i];
        if (s.level <= level) {
            xxx('writing log rec "%s" to "%s" stream (%d <= %d): %j',
                rec.msg, s.type, s.level, level, rec);
            s.stream.write(s.raw ? rec : str);
        }
    };

    return str;
}


/**
 * Build a record object suitable for emitting from the arguments
 * provided to the a log emitter.
 */
function mkRecord(log, minLevel, args) {
    var excludeFields, fields, msgArgs;
    if (args[0] instanceof Error) {
        // `log.<level>(err, ...)`
        fields = {
            // Use this Logger's err serializer, if defined.
            err: (log.serializers && log.serializers.err
                ? log.serializers.err(args[0])
                : Logger.stdSerializers.err(args[0]))
        };
        excludeFields = {err: true};
        if (args.length === 1) {
            msgArgs = [fields.err.message];
        } else {
            msgArgs = args.slice(1);
        }
    } else if (typeof (args[0]) !== 'object' || Array.isArray(args[0])) {
        // `log.<level>(msg, ...)`
        fields = null;
        msgArgs = args.slice();
    } else if (Buffer.isBuffer(args[0])) {  // `log.<level>(buf, ...)`
        // Almost certainly an error, show `inspect(buf)`. See bunyan
        // issue #35.
        fields = null;
        msgArgs = args.slice();
        msgArgs[0] = util.inspect(msgArgs[0]);
    } else {  // `log.<level>(fields, msg, ...)`
        fields = args[0];
        if (fields && args.length === 1 && fields.err &&
            fields.err instanceof Error)
        {
            msgArgs = [fields.err.message];
        } else {
            msgArgs = args.slice(1);
        }
    }

    // Build up the record object.
    var rec = objCopy(log.fields);
    var level = rec.level = minLevel;
    var recFields = (fields ? objCopy(fields) : null);
    if (recFields) {
        if (log.serializers) {
            log._applySerializers(recFields, excludeFields);
        }
        Object.keys(recFields).forEach(function (k) {
            rec[k] = recFields[k];
        });
    }
    rec.msg = format.apply(log, msgArgs);
    if (!rec.time) {
        rec.time = (new Date());
    }
    // Get call source info
    if (log.src && !rec.src) {
        rec.src = getCaller3Info()
    }
    rec.v = LOG_VERSION;

    return rec;
};


/**
 * Build an array that dtrace-provider can use to fire a USDT probe. If we've
 * already built the appropriate string, we use it. Otherwise, build the
 * record object and stringify it.
 */
function mkProbeArgs(str, log, minLevel, msgArgs) {
    return [ str || log._emit(mkRecord(log, minLevel, msgArgs), true) ];
}


/**
 * Build a log emitter function for level minLevel. I.e. this is the
 * creator of `log.info`, `log.error`, etc.
 */
function mkLogEmitter(minLevel) {
    return function () {
        var log = this;
        var str = null;
        var rec = null;

        if (!this._emit) {
            /*
             * Show this invalid Bunyan usage warning *once*.
             *
             * See <https://github.com/trentm/node-bunyan/issues/100> for
             * an example of how this can happen.
             */
            var dedupKey = 'unbound';
            if (!_haveWarned[dedupKey]) {
                var caller = getCaller3Info();
                _warn(format('bunyan usage error: %s:%s: attempt to log '
                    + 'with an unbound log method: `this` is: %s',
                    caller.file, caller.line, util.inspect(this)),
                    dedupKey);
            }
            return;
        } else if (arguments.length === 0) {   // `log.<level>()`
            return (this._level <= minLevel);
        }

        var msgArgs = new Array(arguments.length);
        for (var i = 0; i < msgArgs.length; ++i) {
            msgArgs[i] = arguments[i];
        }

        if (this._level <= minLevel) {
            rec = mkRecord(log, minLevel, msgArgs);
            str = this._emit(rec);
        }

        if (probes) {
            probes[minLevel].fire(mkProbeArgs, str, log, minLevel, msgArgs);
        }
    }
}


/**
 * The functions below log a record at a specific level.
 *
 * Usages:
 *    log.<level>()  -> boolean is-trace-enabled
 *    log.<level>(<Error> err, [<string> msg, ...])
 *    log.<level>(<string> msg, ...)
 *    log.<level>(<object> fields, <string> msg, ...)
 *
 * where <level> is the lowercase version of the log level. E.g.:
 *
 *    log.info()
 *
 * @params fields {Object} Optional set of additional fields to log.
 * @params msg {String} Log message. This can be followed by additional
 *    arguments that are handled like
 *    [util.format](http://nodejs.org/docs/latest/api/all.html#util.format).
 */
Logger.prototype.trace = mkLogEmitter(TRACE);
Logger.prototype.debug = mkLogEmitter(DEBUG);
Logger.prototype.info = mkLogEmitter(INFO);
Logger.prototype.warn = mkLogEmitter(WARN);
Logger.prototype.error = mkLogEmitter(ERROR);
Logger.prototype.fatal = mkLogEmitter(FATAL);



//---- Standard serializers
// A serializer is a function that serializes a JavaScript object to a
// JSON representation for logging. There is a standard set of presumed
// interesting objects in node.js-land.

Logger.stdSerializers = {};

// Serialize an HTTP request.
Logger.stdSerializers.req = function (req) {
    if (!req || !req.connection)
        return req;
    return {
        method: req.method,
        url: req.url,
        headers: req.headers,
        remoteAddress: req.connection.remoteAddress,
        remotePort: req.connection.remotePort
    };
    // Trailers: Skipping for speed. If you need trailers in your app, then
    // make a custom serializer.
    //if (Object.keys(trailers).length > 0) {
    //  obj.trailers = req.trailers;
    //}
};

// Serialize an HTTP response.
Logger.stdSerializers.res = function (res) {
    if (!res || !res.statusCode)
        return res;
    return {
        statusCode: res.statusCode,
        header: res._header
    }
};


/*
 * This function dumps long stack traces for exceptions having a cause()
 * method. The error classes from
 * [verror](https://github.com/davepacheco/node-verror) and
 * [restify v2.0](https://github.com/mcavage/node-restify) are examples.
 *
 * Based on `dumpException` in
 * https://github.com/davepacheco/node-extsprintf/blob/master/lib/extsprintf.js
 */
function getFullErrorStack(ex)
{
    var ret = ex.stack || ex.toString();
    if (ex.cause && typeof (ex.cause) === 'function') {
        var cex = ex.cause();
        if (cex) {
            ret += '\nCaused by: ' + getFullErrorStack(cex);
        }
    }
    return (ret);
}

// Serialize an Error object
// (Core error properties are enumerable in node 0.4, not in 0.6).
var errSerializer = Logger.stdSerializers.err = function (err) {
    if (!err || !err.stack)
        return err;
    var obj = {
        message: err.message,
        name: err.name,
        stack: getFullErrorStack(err),
        code: err.code,
        signal: err.signal
    }
    return obj;
};


// A JSON stringifier that handles cycles safely - tracks seen values in a Set.
function safeCyclesSet() {
    var seen = new Set();
    return function (key, val) {
        if (!val || typeof (val) !== 'object') {
            return val;
        }
        if (seen.has(val)) {
            return '[Circular]';
        }
        seen.add(val);
        return val;
    };
}

/**
 * A JSON stringifier that handles cycles safely - tracks seen vals in an Array.
 *
 * Note: This approach has performance problems when dealing with large objects,
 * see trentm/node-bunyan#445, but since this is the only option for node 0.10
 * and earlier (as Set was introduced in Node 0.12), it's used as a fallback
 * when Set is not available.
 */
function safeCyclesArray() {
    var seen = [];
    return function (key, val) {
        if (!val || typeof (val) !== 'object') {
            return val;
        }
        if (seen.indexOf(val) !== -1) {
            return '[Circular]';
        }
        seen.push(val);
        return val;
    };
}

/**
 * A JSON stringifier that handles cycles safely.
 *
 * Usage: JSON.stringify(obj, safeCycles())
 *
 * Choose the best safe cycle function from what is available - see
 * trentm/node-bunyan#445.
 */
var safeCycles = typeof (Set) !== 'undefined' ? safeCyclesSet : safeCyclesArray;

/**
 * A fast JSON.stringify that handles cycles and getter exceptions (when
 * safeJsonStringify is installed).
 *
 * This function attempts to use the regular JSON.stringify for speed, but on
 * error (e.g. JSON cycle detection exception) it falls back to safe stringify
 * handlers that can deal with cycles and/or getter exceptions.
 */
function fastAndSafeJsonStringify(rec) {
    try {
        return JSON.stringify(rec);
    } catch (ex) {
        try {
            return JSON.stringify(rec, safeCycles());
        } catch (e) {
            if (safeJsonStringify) {
                return safeJsonStringify(rec);
            } else {
                var dedupKey = e.stack.split(/\n/g, 3).join('\n');
                _warn('bunyan: ERROR: Exception in '
                    + '`JSON.stringify(rec)`. You can install the '
                    + '"safe-json-stringify" module to have Bunyan fallback '
                    + 'to safer stringification. Record:\n'
                    + _indent(format('%s\n%s', util.inspect(rec), e.stack)),
                    dedupKey);
                return format('(Exception in JSON.stringify(rec): %j. '
                    + 'See stderr for details.)', e.message);
            }
        }
    }
}


var RotatingFileStream = null;
if (mv) {

RotatingFileStream = function RotatingFileStream(options) {
    this.path = options.path;

    this.count = (options.count == null ? 10 : options.count);
    assert.equal(typeof (this.count), 'number',
        format('rotating-file stream "count" is not a number: %j (%s) in %j',
            this.count, typeof (this.count), this));
    assert.ok(this.count >= 0,
        format('rotating-file stream "count" is not >= 0: %j in %j',
            this.count, this));

    // Parse `options.period`.
    if (options.period) {
        // <number><scope> where scope is:
        //    h   hours (at the start of the hour)
        //    d   days (at the start of the day, i.e. just after midnight)
        //    w   weeks (at the start of Sunday)
        //    m   months (on the first of the month)
        //    y   years (at the start of Jan 1st)
        // with special values 'hourly' (1h), 'daily' (1d), "weekly" (1w),
        // 'monthly' (1m) and 'yearly' (1y)
        var period = {
            'hourly': '1h',
            'daily': '1d',
            'weekly': '1w',
            'monthly': '1m',
            'yearly': '1y'
        }[options.period] || options.period;
        var m = /^([1-9][0-9]*)([hdwmy]|ms)$/.exec(period);
        if (!m) {
            throw new Error(format('invalid period: "%s"', options.period));
        }
        this.periodNum = Number(m[1]);
        this.periodScope = m[2];
    } else {
        this.periodNum = 1;
        this.periodScope = 'd';
    }

    var lastModified = null;
    try {
        var fileInfo = fs.statSync(this.path);
        lastModified = fileInfo.mtime.getTime();
    }
    catch (err) {
        // file doesn't exist
    }
    var rotateAfterOpen = false;
    if (lastModified) {
        var lastRotTime = this._calcRotTime(0);
        if (lastModified < lastRotTime) {
            rotateAfterOpen = true;
        }
    }

    // TODO: template support for backup files
    // template: <path to which to rotate>
    //      default is %P.%n
    //      '/var/log/archive/foo.log'  -> foo.log.%n
    //      '/var/log/archive/foo.log.%n'
    //      codes:
    //          XXX support strftime codes (per node version of those)
    //              or whatever module. Pick non-colliding for extra
    //              codes
    //          %P      `path` base value
    //          %n      integer number of rotated log (1,2,3,...)
    //          %d      datetime in YYYY-MM-DD_HH-MM-SS
    //                      XXX what should default date format be?
    //                          prior art? Want to avoid ':' in
    //                          filenames (illegal on Windows for one).

    this.stream = fs.createWriteStream(this.path,
        {flags: 'a', encoding: 'utf8'});

    this.rotQueue = [];
    this.rotating = false;
    if (rotateAfterOpen) {
        this._debug('rotateAfterOpen -> call rotate()');
        this.rotate();
    } else {
        this._setupNextRot();
    }
}

util.inherits(RotatingFileStream, EventEmitter);

RotatingFileStream.prototype._debug = function () {
    // Set this to `true` to add debug logging.
    if (false) {
        if (arguments.length === 0) {
            return true;
        }
        var args = Array.prototype.slice.call(arguments);
        args[0] = '[' + (new Date().toISOString()) + ', '
            + this.path + '] ' + args[0];
        console.log.apply(this, args);
    } else {
        return false;
    }
};

RotatingFileStream.prototype._setupNextRot = function () {
    this.rotAt = this._calcRotTime(1);
    this._setRotationTimer();
}

RotatingFileStream.prototype._setRotationTimer = function () {
    var self = this;
    var delay = this.rotAt - Date.now();
    // Cap timeout to Node's max setTimeout, see
    // <https://github.com/joyent/node/issues/8656>.
    var TIMEOUT_MAX = 2147483647; // 2^31-1
    if (delay > TIMEOUT_MAX) {
        delay = TIMEOUT_MAX;
    }
    this.timeout = setTimeout(
        function () {
            self._debug('_setRotationTimer timeout -> call rotate()');
            self.rotate();
        },
        delay);
    if (typeof (this.timeout.unref) === 'function') {
        this.timeout.unref();
    }
}

RotatingFileStream.prototype._calcRotTime =
function _calcRotTime(periodOffset) {
    this._debug('_calcRotTime: %s%s', this.periodNum, this.periodScope);
    var d = new Date();

    this._debug('  now local: %s', d);
    this._debug('    now utc: %s', d.toISOString());
    var rotAt;
    switch (this.periodScope) {
    case 'ms':
        // Hidden millisecond period for debugging.
        if (this.rotAt) {
            rotAt = this.rotAt + this.periodNum * periodOffset;
        } else {
            rotAt = Date.now() + this.periodNum * periodOffset;
        }
        break;
    case 'h':
        if (this.rotAt) {
            rotAt = this.rotAt + this.periodNum * 60 * 60 * 1000 * periodOffset;
        } else {
            // First time: top of the next hour.
            rotAt = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(),
                d.getUTCDate(), d.getUTCHours() + periodOffset);
        }
        break;
    case 'd':
        if (this.rotAt) {
            rotAt = this.rotAt + this.periodNum * 24 * 60 * 60 * 1000
                * periodOffset;
        } else {
            // First time: start of tomorrow (i.e. at the coming midnight) UTC.
            rotAt = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(),
                d.getUTCDate() + periodOffset);
        }
        break;
    case 'w':
        // Currently, always on Sunday morning at 00:00:00 (UTC).
        if (this.rotAt) {
            rotAt = this.rotAt + this.periodNum * 7 * 24 * 60 * 60 * 1000
                * periodOffset;
        } else {
            // First time: this coming Sunday.
            var dayOffset = (7 - d.getUTCDay());
            if (periodOffset < 1) {
                dayOffset = -d.getUTCDay();
            }
            if (periodOffset > 1 || periodOffset < -1) {
                dayOffset += 7 * periodOffset;
            }
            rotAt = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(),
                d.getUTCDate() + dayOffset);
        }
        break;
    case 'm':
        if (this.rotAt) {
            rotAt = Date.UTC(d.getUTCFullYear(),
                d.getUTCMonth() + this.periodNum * periodOffset, 1);
        } else {
            // First time: the start of the next month.
            rotAt = Date.UTC(d.getUTCFullYear(),
                d.getUTCMonth() + periodOffset, 1);
        }
        break;
    case 'y':
        if (this.rotAt) {
            rotAt = Date.UTC(d.getUTCFullYear() + this.periodNum * periodOffset,
                0, 1);
        } else {
            // First time: the start of the next year.
            rotAt = Date.UTC(d.getUTCFullYear() + periodOffset, 0, 1);
        }
        break;
    default:
        assert.fail(format('invalid period scope: "%s"', this.periodScope));
    }

    if (this._debug()) {
        this._debug('  **rotAt**: %s (utc: %s)', rotAt,
            new Date(rotAt).toUTCString());
        var now = Date.now();
        this._debug('        now: %s (%sms == %smin == %sh to go)',
            now,
            rotAt - now,
            (rotAt-now)/1000/60,
            (rotAt-now)/1000/60/60);
    }
    return rotAt;
};

RotatingFileStream.prototype.rotate = function rotate() {
    // XXX What about shutdown?
    var self = this;

    // If rotation period is > ~25 days, we have to break into multiple
    // setTimeout's. See <https://github.com/joyent/node/issues/8656>.
    if (self.rotAt && self.rotAt > Date.now()) {
        return self._setRotationTimer();
    }

    this._debug('rotate');
    if (self.rotating) {
        throw new TypeError('cannot start a rotation when already rotating');
    }
    self.rotating = true;

    self.stream.end();  // XXX can do moves sync after this? test at high rate

    function del() {
        var toDel = self.path + '.' + String(n - 1);
        if (n === 0) {
            toDel = self.path;
        }
        n -= 1;
        self._debug('  rm %s', toDel);
        fs.unlink(toDel, function (delErr) {
            //XXX handle err other than not exists
            moves();
        });
    }

    function moves() {
        if (self.count === 0 || n < 0) {
            return finish();
        }
        var before = self.path;
        var after = self.path + '.' + String(n);
        if (n > 0) {
            before += '.' + String(n - 1);
        }
        n -= 1;
        fs.exists(before, function (exists) {
            if (!exists) {
                moves();
            } else {
                self._debug('  mv %s %s', before, after);
                mv(before, after, function (mvErr) {
                    if (mvErr) {
                        self.emit('error', mvErr);
                        finish(); // XXX finish here?
                    } else {
                        moves();
                    }
                });
            }
        })
    }

    function finish() {
        self._debug('  open %s', self.path);
        self.stream = fs.createWriteStream(self.path,
            {flags: 'a', encoding: 'utf8'});
        var q = self.rotQueue, len = q.length;
        for (var i = 0; i < len; i++) {
            self.stream.write(q[i]);
        }
        self.rotQueue = [];
        self.rotating = false;
        self.emit('drain');
        self._setupNextRot();
    }

    var n = this.count;
    del();
};

RotatingFileStream.prototype.write = function write(s) {
    if (this.rotating) {
        this.rotQueue.push(s);
        return false;
    } else {
        return this.stream.write(s);
    }
};

RotatingFileStream.prototype.end = function end(s) {
    this.stream.end();
};

RotatingFileStream.prototype.destroy = function destroy(s) {
    this.stream.destroy();
};

RotatingFileStream.prototype.destroySoon = function destroySoon(s) {
    this.stream.destroySoon();
};

} /* if (mv) */



/**
 * RingBuffer is a Writable Stream that just stores the last N records in
 * memory.
 *
 * @param options {Object}, with the following fields:
 *
 *    - limit: number of records to keep in memory
 */
function RingBuffer(options) {
    this.limit = options && options.limit ? options.limit : 100;
    this.writable = true;
    this.records = [];
    EventEmitter.call(this);
}

util.inherits(RingBuffer, EventEmitter);

RingBuffer.prototype.write = function (record) {
    if (!this.writable)
        throw (new Error('RingBuffer has been ended already'));

    this.records.push(record);

    if (this.records.length > this.limit)
        this.records.shift();

    return (true);
};

RingBuffer.prototype.end = function () {
    if (arguments.length > 0)
        this.write.apply(this, Array.prototype.slice.call(arguments));
    this.writable = false;
};

RingBuffer.prototype.destroy = function () {
    this.writable = false;
    this.emit('close');
};

RingBuffer.prototype.destroySoon = function () {
    this.destroy();
};


//---- Exports

module.exports = Logger;

module.exports.TRACE = TRACE;
module.exports.DEBUG = DEBUG;
module.exports.INFO = INFO;
module.exports.WARN = WARN;
module.exports.ERROR = ERROR;
module.exports.FATAL = FATAL;
module.exports.resolveLevel = resolveLevel;
module.exports.levelFromName = levelFromName;
module.exports.nameFromLevel = nameFromLevel;

module.exports.VERSION = VERSION;
module.exports.LOG_VERSION = LOG_VERSION;

module.exports.createLogger = function createLogger(options) {
    return new Logger(options);
};

module.exports.RingBuffer = RingBuffer;
module.exports.RotatingFileStream = RotatingFileStream;

// Useful for custom `type == 'raw'` streams that may do JSON stringification
// of log records themselves. Usage:
//    var str = JSON.stringify(rec, bunyan.safeCycles());
module.exports.safeCycles = safeCycles;

}).call(this,{"isBuffer":require("../../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js")},require('_process'))
},{"../../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js":13,"_process":17,"assert":2,"events":10,"fs":1,"os":15,"safe-json-stringify":142,"stream":37,"util":43}],120:[function(require,module,exports){
(function (process){
var DTraceProvider;

function DTraceProviderStub() {}
DTraceProviderStub.prototype.addProbe = function(name) {
    var p = { 'fire': function () {} };
    this[name] = p;
    return (p);
};
DTraceProviderStub.prototype.enable = function() {};
DTraceProviderStub.prototype.fire = function() {};
DTraceProviderStub.prototype.disable = function() {};

var builds = ['Release', 'default', 'Debug'];
var err = null;

for (var i = 0; i < builds.length; i++) {
    try {
        var binding = require('./src/build/' + builds[i] + '/DTraceProviderBindings');
        DTraceProvider = binding.DTraceProvider;
        break;
    } catch (e) {
        if (err === null) {
            err = e;
        }
    }
}

if (!DTraceProvider) {
    if (process.env.NODE_DTRACE_PROVIDER_REQUIRE === 'hard') {
        throw err;
    } else {
        DTraceProvider = DTraceProviderStub;
    }
}

exports.DTraceProvider = DTraceProvider;
exports.createDTraceProvider = function(name, module) {
    if (arguments.length == 2)
        return (new exports.DTraceProvider(name, module));
    return (new exports.DTraceProvider(name));
};

}).call(this,require('_process'))
},{"_process":17}],121:[function(require,module,exports){
(function (process){
/*
 * extsprintf.js: extended POSIX-style sprintf
 */

var mod_assert = require('assert');
var mod_util = require('util');

/*
 * Public interface
 */
exports.sprintf = jsSprintf;
exports.printf = jsPrintf;

/*
 * Stripped down version of s[n]printf(3c).  We make a best effort to throw an
 * exception when given a format string we don't understand, rather than
 * ignoring it, so that we won't break existing programs if/when we go implement
 * the rest of this.
 *
 * This implementation currently supports specifying
 *	- field alignment ('-' flag),
 * 	- zero-pad ('0' flag)
 *	- always show numeric sign ('+' flag),
 *	- field width
 *	- conversions for strings, decimal integers, and floats (numbers).
 *	- argument size specifiers.  These are all accepted but ignored, since
 *	  Javascript has no notion of the physical size of an argument.
 *
 * Everything else is currently unsupported, most notably precision, unsigned
 * numbers, non-decimal numbers, and characters.
 */
function jsSprintf(fmt)
{
	var regex = [
	    '([^%]*)',				/* normal text */
	    '%',				/* start of format */
	    '([\'\\-+ #0]*?)',			/* flags (optional) */
	    '([1-9]\\d*)?',			/* width (optional) */
	    '(\\.([1-9]\\d*))?',		/* precision (optional) */
	    '[lhjztL]*?',			/* length mods (ignored) */
	    '([diouxXfFeEgGaAcCsSp%jr])'	/* conversion */
	].join('');

	var re = new RegExp(regex);
	var args = Array.prototype.slice.call(arguments, 1);
	var flags, width, precision, conversion;
	var left, pad, sign, arg, match;
	var ret = '';
	var argn = 1;

	mod_assert.equal('string', typeof (fmt));

	while ((match = re.exec(fmt)) !== null) {
		ret += match[1];
		fmt = fmt.substring(match[0].length);

		flags = match[2] || '';
		width = match[3] || 0;
		precision = match[4] || '';
		conversion = match[6];
		left = false;
		sign = false;
		pad = ' ';

		if (conversion == '%') {
			ret += '%';
			continue;
		}

		if (args.length === 0)
			throw (new Error('too few args to sprintf'));

		arg = args.shift();
		argn++;

		if (flags.match(/[\' #]/))
			throw (new Error(
			    'unsupported flags: ' + flags));

		if (precision.length > 0)
			throw (new Error(
			    'non-zero precision not supported'));

		if (flags.match(/-/))
			left = true;

		if (flags.match(/0/))
			pad = '0';

		if (flags.match(/\+/))
			sign = true;

		switch (conversion) {
		case 's':
			if (arg === undefined || arg === null)
				throw (new Error('argument ' + argn +
				    ': attempted to print undefined or null ' +
				    'as a string'));
			ret += doPad(pad, width, left, arg.toString());
			break;

		case 'd':
			arg = Math.floor(arg);
			/*jsl:fallthru*/
		case 'f':
			sign = sign && arg > 0 ? '+' : '';
			ret += sign + doPad(pad, width, left,
			    arg.toString());
			break;

		case 'x':
			ret += doPad(pad, width, left, arg.toString(16));
			break;

		case 'j': /* non-standard */
			if (width === 0)
				width = 10;
			ret += mod_util.inspect(arg, false, width);
			break;

		case 'r': /* non-standard */
			ret += dumpException(arg);
			break;

		default:
			throw (new Error('unsupported conversion: ' +
			    conversion));
		}
	}

	ret += fmt;
	return (ret);
}

function jsPrintf() {
	process.stdout.write(jsSprintf.apply(this, arguments));
}

function doPad(chr, width, left, str)
{
	var ret = str;

	while (ret.length < width) {
		if (left)
			ret += chr;
		else
			ret = chr + ret;
	}

	return (ret);
}

/*
 * This function dumps long stack traces for exceptions having a cause() method.
 * See node-verror for an example.
 */
function dumpException(ex)
{
	var ret;

	if (!(ex instanceof Error))
		throw (new Error(jsSprintf('invalid type for %%r: %j', ex)));

	/* Note that V8 prepends "ex.stack" with ex.toString(). */
	ret = 'EXCEPTION: ' + ex.constructor.name + ': ' + ex.stack;

	if (ex.cause && typeof (ex.cause) === 'function') {
		var cex = ex.cause();
		if (cex) {
			ret += '\nCaused by: ' + dumpException(cex);
		}
	}

	return (ret);
}

}).call(this,require('_process'))
},{"_process":17,"assert":2,"util":43}],122:[function(require,module,exports){
// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2014 Patrick Mooney.  All rights reserved.

var util = require('util');

var assert = require('assert-plus');

var helpers = require('./helpers');


///--- API

function AndFilter(options) {
  if (typeof (options) === 'object') {
    assert.arrayOfObject(options.filters, 'options.filters');
  } else {
    options = {};
  }

  this.__defineGetter__('type', function () { return 'and'; });
  this.filters = options.filters ? options.filters.slice() : [];

  var self = this;
  this.__defineGetter__('json', function () {
    return {
      type: 'And',
      filters: self.filters
    };
  });
}
util.inherits(AndFilter, helpers.Filter);


AndFilter.prototype.toString = function () {
  var str = '(&';
  this.filters.forEach(function (f) {
    str += f.toString();
  });
  str += ')';

  return str;
};


AndFilter.prototype.matches = function (target, strictAttrCase) {
  assert.object(target, 'target');

  if (this.filters.length === 0) {
    /* true per RFC4526 */
    return true;
  }

  for (var i = 0; i < this.filters.length; i++) {
    if (!this.filters[i].matches(target, strictAttrCase))
      return false;
  }

  return true;
};


AndFilter.prototype.addFilter = function (filter) {
  assert.object(filter, 'filter');

  this.filters.push(filter);
};


///--- Exports

module.exports = AndFilter;

},{"./helpers":127,"assert-plus":134,"util":43}],123:[function(require,module,exports){
// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2014 Patrick Mooney.  All rights reserved.

var util = require('util');

var assert = require('assert-plus');

var helpers = require('./helpers');


///--- API

function ApproximateFilter(options) {
  if (typeof (options) === 'object') {
    assert.string(options.attribute, 'options.attribute');
    assert.string(options.value, 'options.value');
    this.attribute = options.attribute;
    this.value = options.value;
  }

  var self = this;
  this.__defineGetter__('type', function () { return 'approx'; });
  this.__defineGetter__('json', function () {
    return {
      type: 'ApproximateMatch',
      attribute: self.attribute,
      value: self.value
    };
  });
}
util.inherits(ApproximateFilter, helpers.Filter);


ApproximateFilter.prototype.toString = function () {
  return ('(' + helpers.escape(this.attribute) +
          '~=' + helpers.escape(this.value) + ')');
};


ApproximateFilter.prototype.matches = function () {
  // Consumers must implement this themselves
  throw new Error('approx match implementation missing');
};


///--- Exports

module.exports = ApproximateFilter;

},{"./helpers":127,"assert-plus":134,"util":43}],124:[function(require,module,exports){
(function (Buffer){
// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2014 Patrick Mooney.  All rights reserved.

var util = require('util');

var assert = require('assert-plus');

var helpers = require('./helpers');


///--- API

function EqualityFilter(options) {
  if (typeof (options) === 'object') {
    assert.string(options.attribute, 'options.attribute');
    this.attribute = options.attribute;
    // Prefer Buffers over strings to make filter cloning easier
    if (options.raw) {
      this.raw = options.raw;
    } else {
      this.raw = new Buffer(options.value);
    }
  } else {
    this.raw = new Buffer(0);
  }

  var self = this;
  this.__defineGetter__('type', function () { return 'equal'; });
  this.__defineGetter__('value', function () {
    return (Buffer.isBuffer(self.raw)) ? self.raw.toString() : self.raw;
  });
  this.__defineSetter__('value', function (data) {
    if (typeof (data) === 'string') {
      self.raw = new Buffer(data);
    } else if (Buffer.isBuffer(data)) {
      self.raw = new Buffer(data.length);
      data.copy(self.raw);
    } else {
      self.raw = data;
    }
  });
  this.__defineGetter__('json', function () {
    return {
      type: 'EqualityMatch',
      attribute: self.attribute,
      value: self.value
    };
  });
}
util.inherits(EqualityFilter, helpers.Filter);


EqualityFilter.prototype.toString = function () {
  return ('(' + helpers.escape(this.attribute) +
          '=' + helpers.escape(this.value) + ')');
};


EqualityFilter.prototype.matches = function (target, strictAttrCase) {
  assert.object(target, 'target');

  var tv = helpers.getAttrValue(target, this.attribute, strictAttrCase);
  var value = this.value;

  return helpers.testValues(function (v) {
    return value === v;
  }, tv);
};


///--- Exports

module.exports = EqualityFilter;

}).call(this,require("buffer").Buffer)
},{"./helpers":127,"assert-plus":134,"buffer":8,"util":43}],125:[function(require,module,exports){
// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2014 Patrick Mooney.  All rights reserved.

var util = require('util');

var assert = require('assert-plus');

var helpers = require('./helpers');


///--- API

function ExtensibleFilter(options) {
  if (typeof (options) === 'object') {
    assert.optionalString(options.rule, 'options.rule');
    assert.optionalString(options.matchType, 'options.matchType');
    assert.optionalString(options.attribute, 'options.attribute');
    assert.optionalString(options.value, 'options.value');
  } else {
    options = {};
  }

  if (options.matchType !== undefined) {
    this.matchType = options.matchType;
  } else {
    this.matchType = options.attribute;
  }
  this.dnAttributes = options.dnAttributes || false;
  this.rule = options.rule;
  this.value = (options.value !== undefined) ? options.value : '';

  var self = this;
  this.__defineGetter__('type', function () { return 'ext'; });
  this.__defineGetter__('json', function () {
    return {
      type: 'ExtensibleMatch',
      matchRule: self.rule,
      matchType: self.matchType,
      matchValue: self.value,
      dnAttributes: self.dnAttributes
    };
  });
  this.__defineGetter__('matchingRule', function () {
    return self.rule;
  });
  this.__defineGetter__('matchValue', function () {
    return self.value;
  });
  this.__defineGetter__('attribute', function () {
    return this.matchType;
  });
  this.__defineSetter__('attribute', function (value) {
    this.matchType = value;
  });

}
util.inherits(ExtensibleFilter, helpers.Filter);


ExtensibleFilter.prototype.toString = function () {
  var str = '(';

  if (this.matchType)
    str += this.matchType;

  str += ':';

  if (this.dnAttributes)
    str += 'dn:';

  if (this.rule)
    str += this.rule + ':';

  return (str + '=' + this.value + ')');
};


ExtensibleFilter.prototype.matches = function () {
  // Consumers must implement this themselves
  throw new Error('ext match implementation missing');
};


///--- Exports

module.exports = ExtensibleFilter;

},{"./helpers":127,"assert-plus":134,"util":43}],126:[function(require,module,exports){
// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2014 Patrick Mooney.  All rights reserved.

var util = require('util');

var assert = require('assert-plus');

var helpers = require('./helpers');


///--- API

function GreaterThanEqualsFilter(options) {
  if (typeof (options) === 'object') {
    assert.string(options.attribute, 'options.attribute');
    assert.string(options.value, 'options.value');
    this.attribute = options.attribute;
    this.value = options.value;
  }

  var self = this;
  this.__defineGetter__('type', function () { return 'ge'; });
  this.__defineGetter__('json', function () {
    return {
      type: 'GreaterThanEqualsMatch',
      attribute: self.attribute,
      value: self.value
    };
  });
}
util.inherits(GreaterThanEqualsFilter, helpers.Filter);


GreaterThanEqualsFilter.prototype.toString = function () {
  return ('(' + helpers.escape(this.attribute) +
          '>=' + helpers.escape(this.value) + ')');
};


GreaterThanEqualsFilter.prototype.matches = function (target, strictAttrCase) {
  assert.object(target, 'target');

  var tv = helpers.getAttrValue(target, this.attribute, strictAttrCase);
  var value = this.value;

  return helpers.testValues(function (v) {
    return value <= v;
  }, tv);
};


///--- Exports

module.exports = GreaterThanEqualsFilter;

},{"./helpers":127,"assert-plus":134,"util":43}],127:[function(require,module,exports){
// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2014 Patrick Mooney.  All rights reserved.

var assert = require('assert-plus');


///--- API

/**
 * RFC 2254 Escaping of filter strings
 *
 * Raw                     Escaped
 * (o=Parens (R Us))       (o=Parens \28R Us\29)
 * (cn=star*)              (cn=star\2A)
 * (filename=C:\MyFile)    (filename=C:\5cMyFile)
 *
 * Use substr_filter to avoid having * ecsaped.
 *
 * @author [Austin King](https://github.com/ozten)
 */
function _escape(inp) {
  if (typeof (inp) === 'string') {
    var esc = '';
    for (var i = 0; i < inp.length; i++) {
      switch (inp[i]) {
        case '*':
          esc += '\\2a';
          break;
        case '(':
          esc += '\\28';
          break;
        case ')':
          esc += '\\29';
          break;
        case '\\':
          esc += '\\5c';
          break;
        case '\0':
          esc += '\\00';
          break;
        default:
          esc += inp[i];
          break;
      }
    }
    return esc;

  } else {
    return inp;
  }
}


/**
 * Check value or array with test function.
 *
 * @param {Function} rule test function.
 * @param value value or array of values.
 * @param {Boolean} allMatch require all array values to match. default: false
 */
function testValues(rule, value, allMatch) {
  if (Array.isArray(value)) {
    var i;
    if (allMatch) {
      // Do all entries match rule?
      for (i = 0; i < value.length; i++) {
        if (!rule(value[i])) {
          return false;
        }
      }
      return true;
    } else {
      // Do any entries match rule?
      for (i = 0; i < value.length; i++) {
        if (rule(value[i])) {
          return true;
        }
      }
      return false;
    }
  } else {
    return rule(value);
  }
}


/**
 * Fetch value for named object attribute.
 *
 * @param {Object} obj object to fetch value from
 * @param {String} attr name of attribute to fetch
 * @param {Boolean} strictCase attribute name is case-sensitive. default: false
 */
function getAttrValue(obj, attr, strictCase) {
  assert.object(obj);
  assert.string(attr);
  // Check for exact case match first
  if (obj.hasOwnProperty(attr)) {
    return obj[attr];
  } else if (strictCase) {
    return undefined;
  }

  // Perform case-insensitive enumeration after that
  var lower = attr.toLowerCase();
  var result;
  Object.getOwnPropertyNames(obj).some(function (name) {
    if (name.toLowerCase() === lower) {
      result = obj[name];
      return true;
    }
    return false;
  });
  return result;
}


/**
 * Filter base class
 */
function Filter() {
}


/**
 * Depth-first filter traversal
 */
Filter.prototype.forEach = function forEach(cb) {
  if (this.filter) {
    // not
    this.filter.forEach(cb);
  } else if (this.filters) {
    // and/or
    this.filters.forEach(function (item) {
      item.forEach(cb);
    });
  }
  cb(this);
};

/**
 * Depth-first map traversal.
 */
Filter.prototype.map = function map(cb) {
  var child;
  if (this.filter) {
    child = this.filter.map(cb);
    if (child === null) {
      // empty NOT not allowed
      return null;
    } else {
      this.filter = child;
    }
  } else if (this.filters) {
    child = this.filters.map(function (item) {
      return item.map(cb);
    }).filter(function (item) {
      return (item !== null);
    });
    if (child.length === 0) {
      // empty and/or not allowed
      return null;
    } else {
      this.filters = child;
    }
  }
  return cb(this);
};


///--- Exports

module.exports = {
  escape: _escape,
  testValues: testValues,
  getAttrValue: getAttrValue,
  Filter: Filter
};

},{"assert-plus":134}],128:[function(require,module,exports){
// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2014 Patrick Mooney.  All rights reserved.

var assert = require('assert-plus');

var helpers = require('./helpers.js');

var AndFilter = require('./and_filter');
var ApproximateFilter = require('./approx_filter');
var EqualityFilter = require('./equality_filter');
var ExtensibleFilter = require('./ext_filter');
var GreaterThanEqualsFilter = require('./ge_filter');
var LessThanEqualsFilter = require('./le_filter');
var NotFilter = require('./not_filter');
var OrFilter = require('./or_filter');
var PresenceFilter = require('./presence_filter');
var SubstringFilter = require('./substr_filter');



///--- Internal Parsers

// expression parsing
// returns the index of the closing parenthesis matching the open paren
// specified by openParenIndex
function matchParens(str, openParenIndex) {
  var stack = [];
  var esc = false;
  for (var i = openParenIndex || 0; i < str.length; i++) {
    var c = str[i];

    if (c === '\\') {
      if (!esc)
        esc = true;
      continue;
    } else if (c === '(' && !esc) {
      stack.push(1);
    } else if (c === ')' && !esc) {
      stack.pop();
      if (stack.length === 0)
        return i;
    }

    esc = false;
  }

  var ndx = str.length - 1;
  if (str.charAt(ndx) !== ')')
    throw new Error(str + ' has unbalanced parentheses');

  return ndx;
}


function parse_substr(tree) {
  // Effectively a hand-rolled .shift() to support \* sequences
  var clean = true;
  var esc = false;
  var obj = {};
  var split = [];
  var substrNdx = 0;

  split[substrNdx] = '';

  for (var i = 0; i < tree.value.length; i++) {
    var c = tree.value[i];
    if (esc) {
      split[substrNdx] += c;
      esc = false;
    } else if (c === '*') {
      split[++substrNdx] = '';
    } else if (c === '\\') {
      esc = true;
    } else {
      split[substrNdx] += c;
    }
  }

  if (split.length > 1) {
    obj.tag = 'substrings';
    clean = true;

    // if the value string doesn't start with a * then theres no initial
    // value else split will have an empty string in its first array
    // index...
    // we need to remove that empty string
    if (tree.value.indexOf('*') !== 0) {
      obj.initial = split.shift();
    } else {
      split.shift();
    }

    // if the value string doesn't end with a * then theres no final
    // value also same split stuff as the initial stuff above
    if (tree.value.lastIndexOf('*') !== tree.value.length - 1) {
      obj.final = split.pop();
    } else {
      split.pop();
    }
    obj.any = split;
  } else {
    obj.value = split[0]; // pick up the cleaned version
  }

  obj.clean = clean;
  obj.esc = esc;

  return obj;
}

// recursive function that builds a filter tree from a string expression
// the filter tree is an intermediary step between the incoming expression and
// the outgoing Filter Class structure.
function _buildFilterTree(expr) {
  var c;
  var child;
  var clean = false;
  var endParen;
  var esc = false;
  var i = 0;
  var obj;
  var tree = {};
  var split;
  var val = '';

  if (expr.length === 0)
    return tree;

  // Chop the parens (the call to matchParens below gets rid of the trailer)
  if (expr.charAt(0) == '(')
    expr = expr.substring(1, expr.length - 1);

  //store prefix operator
  if (expr.charAt(0) === '&') {
    tree.op = 'and';
    expr = expr.substring(1);
  } else if (expr.charAt(0) === '|') {
    tree.op = 'or';
    expr = expr.substring(1);
  } else if (expr.charAt(0) === '!') {
    tree.op = 'not';
    expr = expr.substring(1);
  } else if (expr.charAt(0) === '(') {
    throw new Error('invalid nested parens');
  } else {
    tree.op = 'expr';
  }

  if (tree.op != 'expr') {
    tree.children = [];

    // logical operators are k-ary, so we go until our expression string runs
    // out (at least for this recursion level)
    while (expr.length !== 0) {
      endParen = matchParens(expr);

      if (endParen == expr.length - 1) {
        tree.children[i] = _buildFilterTree(expr);
        expr = '';
      } else {
        child = expr.slice(0, endParen + 1);
        expr = expr.substring(endParen + 1);
        tree.children[i] = _buildFilterTree(child);
      }
      i++;
    }
  } else {
    //else its some sort of non-logical expression, parse and return as such
    var operatorStr = '';
    tree.name = '';
    tree.value = '';


    // This parses and enforces filter syntax, which is an AttributeDescription
    // plus a filter operator, followed by (for ldapjs), anything.  Note
    // that ldapjs additionally allows the '_' character in the AD, as many
    // users rely on it, even though it's non-standard
    //
    // From 4.1.5 of RFC251
    //
    //  AttributeDescription ::= LDAPString
    //
    //  A value of AttributeDescription is based on the following BNF:
    //
    //    <AttributeDescription> ::= <AttributeType> [ ";" <options> ]
    //
    //    <options>  ::= <option> | <option> ";" <options>
    //
    //    <option>   ::= <opt-char> <opt-char>*
    //
    //    <opt-char> ::=  ASCII-equivalent letters, numbers and hyphen
    //
    // Examples of valid AttributeDescription:
    //
    //    cn
    //    userCertificate;binary

    /* JSSTYLED */
    if (!/[a-zA-Z0-9;_\-]+[~><:]?=.+/.test(expr))
      throw new Error(expr + ' is invalid');

    if (expr.indexOf('~=') !== -1) {
      operatorStr = '~=';
      tree.tag = 'approxMatch';
    } else if (expr.indexOf('>=') !== -1) {
      operatorStr = '>=';
      tree.tag = 'greaterOrEqual';
    } else if (expr.indexOf('<=') !== -1) {
      operatorStr = '<=';
      tree.tag = 'lessOrEqual';
    } else if (expr.indexOf(':=') !== -1) {
      operatorStr = ':=';
      tree.tag = 'extensibleMatch';
    } else if (expr.indexOf('=') !== -1) {
      operatorStr = '=';
      tree.tag = 'equalityMatch';
    } else {
      // tree.tag = 'present';
      throw new Error('invalid filter syntax');
    }

    if (operatorStr === '') {
      tree.name = expr;
    } else {
      // pull out lhs and rhs of equality operator
      var splitAry = expr.split(operatorStr);
      tree.name = splitAry.shift();
      tree.value = splitAry.join(operatorStr);

      // substrings fall into the equality bin in the
      // switch above so we need more processing here
      if (tree.tag === 'equalityMatch') {
        if (tree.value === '*') {
          tree.tag = 'present';
        } else {
          obj = parse_substr(tree);
          tree.initial = obj.initial;
          tree.any = obj.any;
          tree.final = obj.final;
          tree.tag = obj.tag || tree.tag;
          tree.value = obj.value;
          esc = obj.esc;
          clean = obj.clean;
        }
      } else if (tree.tag == 'extensibleMatch') {
        split = tree.name.split(':');
        tree.extensible = {
          matchType: split[0],
          value: tree.value
        };

        switch (split.length) {
        case 1:
          break;
        case 2:
          if (split[1].toLowerCase() === 'dn') {
            tree.extensible.dnAttributes = true;
          } else {
            tree.extensible.rule = split[1];
          }
          break;
        case 3:
          tree.extensible.dnAttributes = true;
          tree.extensible.rule = split[2];
          break;
        default:
          throw new Error('Invalid extensible filter');
        }

        switch (tree.extensible.rule) {
        case '2.5.13.4':
        case 'caseIgnoreSubstringsMatch':
          tree.extensible.attribute = tree.extensible.matchType;
          obj = parse_substr(tree);
          tree.extensible.initial = obj.initial;
          tree.extensible.any = obj.any;
          tree.extensible.final = obj.final;
          tree.value = obj.value;
          esc = obj.esc;
          clean = obj.clean;
          break;

        case '2.5.13.2':
        case 'caseIgnoreMatch':
          tree.extensible.attribute = tree.extensible.matchType;
          break;
        default:
          // noop
          break;
        }
      }
    }

    // Cleanup any escape sequences
    if (!clean) {

      for (i = 0; i < tree.value.length; i++) {
        c = tree.value[i];
        if (esc) {
          val += c;
          esc = false;
        } else if (c === '\\') {
          esc = true;
        } else {
          val += c;
        }
      }
      tree.value = val;
    }
  }

  return tree;
}


function serializeTree(tree, filter) {
  if (tree === undefined || tree.length === 0)
    return;

  // if the current tree object is not an expression then its a logical
  // operator (ie an internal node in the tree)
  var current = null;
  if (tree.op !== 'expr') {
    switch (tree.op) {
    case 'and':
      current = new AndFilter();
      break;
    case 'or':
      current = new OrFilter();
      break;
    case 'not':
      current = new NotFilter();
      break;
    default:
      break;
    }

    filter.addFilter(current || filter);
    if (current || tree.children.length) {
      tree.children.forEach(function (child) {
        serializeTree(child, current);
      });
    }
  } else {
    // else its a leaf node in the tree, and represents some type of
    // non-logical expression
    var tmp;

    // convert the tag name to a filter class type
    switch (tree.tag) {
    case 'approxMatch':
      tmp = new ApproximateFilter({
        attribute: tree.name,
        value: tree.value
      });
      break;
    case 'extensibleMatch':
      tmp = new ExtensibleFilter(tree.extensible);
      break;
    case 'greaterOrEqual':
      tmp = new GreaterThanEqualsFilter({
        attribute: tree.name,
        value: tree.value
      });
      break;
    case 'lessOrEqual':
      tmp = new LessThanEqualsFilter({
        attribute: tree.name,
        value: tree.value
      });
      break;
    case 'equalityMatch':
      tmp = new EqualityFilter({
        attribute: tree.name,
        value: tree.value
      });
      break;
    case 'substrings':
      tmp = new SubstringFilter({
        attribute: tree.name,
        initial: tree.initial,
        any: tree.any,
        final: tree.final
      });
      break;
    case 'present':
      tmp = new PresenceFilter({
        attribute: tree.name
      });
      break;
    default:
      break;
    }
    if (tmp)
      filter.addFilter(tmp);
  }
}


function _parseString(str) {
  assert.ok(str);

  // create a blank object to pass into treeToObjs
  // since its recursive we have to prime it ourselves.
  // this gets stripped off before the filter structure is returned
  // at the bottom of this function.
  var filterObj = new AndFilter({
    filters: []
  });

  serializeTree(_buildFilterTree(str), filterObj);
  return filterObj.filters[0];
}


///--- Exports

module.exports = {
  parse: function (filter) {
    assert.string(filter);

    return _parseString(filter);
  },

  // Helper utilties for writing custom matchers
  testValues: helpers.testValues,
  getAttrValue: helpers.getAttrValue,

  // Filter definitions
  AndFilter: AndFilter,
  ApproximateFilter: ApproximateFilter,
  EqualityFilter: EqualityFilter,
  ExtensibleFilter: ExtensibleFilter,
  GreaterThanEqualsFilter: GreaterThanEqualsFilter,
  LessThanEqualsFilter: LessThanEqualsFilter,
  NotFilter: NotFilter,
  OrFilter: OrFilter,
  PresenceFilter: PresenceFilter,
  SubstringFilter: SubstringFilter
};

},{"./and_filter":122,"./approx_filter":123,"./equality_filter":124,"./ext_filter":125,"./ge_filter":126,"./helpers.js":127,"./le_filter":129,"./not_filter":130,"./or_filter":131,"./presence_filter":132,"./substr_filter":133,"assert-plus":134}],129:[function(require,module,exports){
// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2014 Patrick Mooney.  All rights reserved.

var util = require('util');

var assert = require('assert-plus');

var helpers = require('./helpers');


///--- API

function LessThanEqualsFilter(options) {
  if (typeof (options) === 'object') {
    assert.string(options.attribute, 'options.attribute');
    assert.string(options.value, 'options.attribute');
    this.attribute = options.attribute;
    this.value = options.value;
  }

  var self = this;
  this.__defineGetter__('type', function () { return 'le'; });
  this.__defineGetter__('json', function () {
    return {
      type: 'LessThanEqualsMatch',
      attribute: self.attribute,
      value: self.value
    };
  });
}
util.inherits(LessThanEqualsFilter, helpers.Filter);


LessThanEqualsFilter.prototype.toString = function () {
  return ('(' + helpers.escape(this.attribute) +
          '<=' + helpers.escape(this.value) + ')');
};


LessThanEqualsFilter.prototype.matches = function (target, strictAttrCase) {
  assert.object(target, 'target');

  var tv = helpers.getAttrValue(target, this.attribute, strictAttrCase);
  var value = this.value;

  return helpers.testValues(function (v) {
    return value >= v;
  }, tv);
};


///--- Exports

module.exports = LessThanEqualsFilter;

},{"./helpers":127,"assert-plus":134,"util":43}],130:[function(require,module,exports){
// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2014 Patrick Mooney.  All rights reserved.

var util = require('util');

var assert = require('assert-plus');

var helpers = require('./helpers');


///--- API

function NotFilter(options) {
  if (typeof (options) === 'object') {
    assert.object(options.filter, 'options.filter');
  } else {
    options = {};
  }

  this.filter = options.filter || {};

  var self = this;
  this.__defineGetter__('type', function () { return 'not'; });
  this.__defineGetter__('json', function () {
    return {
      type: 'Not',
      filter: self.filter
    };
  });
}
util.inherits(NotFilter, helpers.Filter);


NotFilter.prototype.addFilter = function (filter) {
  assert.object(filter, 'filter');
  this.filter = filter;
};


NotFilter.prototype.toString = function () {
  return '(!' + this.filter.toString() + ')';
};


NotFilter.prototype.matches = function (target, strictAttrCase) {
  return !this.filter.matches(target, strictAttrCase);
};


///--- Exports

module.exports = NotFilter;

},{"./helpers":127,"assert-plus":134,"util":43}],131:[function(require,module,exports){
// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2014 Patrick Mooney.  All rights reserved.

var util = require('util');

var assert = require('assert-plus');

var helpers = require('./helpers');


///--- API

function OrFilter(options) {
  if (typeof (options) === 'object') {
    assert.arrayOfObject(options.filters, 'options.filters');
  } else {
    options = {};
  }

  this.filters = options.filters ? options.filters.slice() : [];

  var self = this;
  this.__defineGetter__('type', function () { return 'or'; });
  this.__defineGetter__('json', function () {
    return {
      type: 'Or',
      filters: self.filters
    };
  });
}
util.inherits(OrFilter, helpers.Filter);


OrFilter.prototype.toString = function () {
  var str = '(|';
  this.filters.forEach(function (f) {
    str += f.toString();
  });
  str += ')';

  return str;
};


OrFilter.prototype.matches = function (target, strictAttrCase) {
  assert.object(target, 'target');

  for (var i = 0; i < this.filters.length; i++) {
    if (this.filters[i].matches(target, strictAttrCase))
      return true;
  }

  return false;
};


OrFilter.prototype.addFilter = function (filter) {
  assert.object(filter, 'filter');

  this.filters.push(filter);
};


///--- Exports

module.exports = OrFilter;

},{"./helpers":127,"assert-plus":134,"util":43}],132:[function(require,module,exports){
// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2014 Patrick Mooney.  All rights reserved.

var util = require('util');

var assert = require('assert-plus');

var helpers = require('./helpers');


///--- API

function PresenceFilter(options) {
  if (typeof (options) === 'object') {
    assert.string(options.attribute, 'options.attribute');
    this.attribute = options.attribute;
  }


  var self = this;
  this.__defineGetter__('type', function () { return 'present'; });
  this.__defineGetter__('json', function () {
    return {
      type: 'PresenceMatch',
      attribute: self.attribute
    };
  });
}
util.inherits(PresenceFilter, helpers.Filter);


PresenceFilter.prototype.toString = function () {
  return '(' + helpers.escape(this.attribute) + '=*)';
};


PresenceFilter.prototype.matches = function (target, strictAttrCase) {
  assert.object(target, 'target');

  var value = helpers.getAttrValue(target, this.attribute, strictAttrCase);

  return (value !== undefined && value !== null);
};


///--- Exports

module.exports = PresenceFilter;

},{"./helpers":127,"assert-plus":134,"util":43}],133:[function(require,module,exports){
// Copyright 2014 Mark Cavage, Inc.  All rights reserved.
// Copyright 2014 Patrick Mooney.  All rights reserved.

var util = require('util');

var assert = require('assert-plus');

var helpers = require('./helpers');


///--- Helpers

function escapeRegExp(str) {
  /* JSSTYLED */
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}


///--- API

function SubstringFilter(options) {
  if (typeof (options) === 'object') {
    assert.string(options.attribute, 'options.attribute');

    this.attribute = options.attribute;
    this.initial = options.initial;
    this.any = options.any ? options.any.slice(0) : [];
    this.final = options.final;
  } else {
    this.any = [];
  }

  var self = this;
  this.__defineGetter__('type', function () { return 'substring'; });
  this.__defineGetter__('json', function () {
    return {
      type: 'SubstringMatch',
      initial: self.initial,
      any: self.any,
      final: self.final
    };
  });
}
util.inherits(SubstringFilter, helpers.Filter);


SubstringFilter.prototype.toString = function () {
  var str = '(' + helpers.escape(this.attribute) + '=';

  if (this.initial)
    str += helpers.escape(this.initial);

  str += '*';

  this.any.forEach(function (s) {
    str += helpers.escape(s) + '*';
  });

  if (this.final)
    str += helpers.escape(this.final);

  str += ')';

  return str;
};


SubstringFilter.prototype.matches = function (target, strictAttrCase) {
  assert.object(target, 'target');

  var tv = helpers.getAttrValue(target, this.attribute, strictAttrCase);

  if (tv !== undefined && tv !== null) {
    var re = '';

    if (this.initial)
      re += '^' + escapeRegExp(this.initial) + '.*';
    this.any.forEach(function (s) {
      re += escapeRegExp(s) + '.*';
    });
    if (this.final)
      re += escapeRegExp(this.final) + '$';

    var matcher = new RegExp(re);
    return helpers.testValues(function (v) {
      return matcher.test(v);
    }, tv);
  }

  return false;
};


///--- Exports

module.exports = SubstringFilter;

},{"./helpers":127,"assert-plus":134,"util":43}],134:[function(require,module,exports){
(function (Buffer,process){
// Copyright (c) 2012, Mark Cavage. All rights reserved.

var assert = require('assert');
var Stream = require('stream').Stream;
var util = require('util');



///--- Globals

var NDEBUG = process.env.NODE_NDEBUG || false;
var UUID_REGEXP = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;



///--- Messages

var ARRAY_TYPE_REQUIRED = '%s ([%s]) required';
var TYPE_REQUIRED = '%s (%s) is required';



///--- Internal

function capitalize(str) {
        return (str.charAt(0).toUpperCase() + str.slice(1));
}

function uncapitalize(str) {
        return (str.charAt(0).toLowerCase() + str.slice(1));
}

function _() {
        return (util.format.apply(util, arguments));
}


function _assert(arg, type, name, stackFunc) {
        if (!NDEBUG) {
                name = name || type;
                stackFunc = stackFunc || _assert.caller;
                var t = typeof (arg);

                if (t !== type) {
                        throw new assert.AssertionError({
                                message: _(TYPE_REQUIRED, name, type),
                                actual: t,
                                expected: type,
                                operator: '===',
                                stackStartFunction: stackFunc
                        });
                }
        }
}


function _instanceof(arg, type, name, stackFunc) {
        if (!NDEBUG) {
                name = name || type;
                stackFunc = stackFunc || _instanceof.caller;

                if (!(arg instanceof type)) {
                        throw new assert.AssertionError({
                                message: _(TYPE_REQUIRED, name, type.name),
                                actual: _getClass(arg),
                                expected: type.name,
                                operator: 'instanceof',
                                stackStartFunction: stackFunc
                        });
                }
        }
}

function _getClass(object) {
        return (Object.prototype.toString.call(object).slice(8, -1));
};



///--- API

function array(arr, type, name) {
        if (!NDEBUG) {
                name = name || type;

                if (!Array.isArray(arr)) {
                        throw new assert.AssertionError({
                                message: _(ARRAY_TYPE_REQUIRED, name, type),
                                actual: typeof (arr),
                                expected: 'array',
                                operator: 'Array.isArray',
                                stackStartFunction: array.caller
                        });
                }

                for (var i = 0; i < arr.length; i++) {
                        _assert(arr[i], type, name, array);
                }
        }
}


function bool(arg, name) {
        _assert(arg, 'boolean', name, bool);
}


function buffer(arg, name) {
        if (!Buffer.isBuffer(arg)) {
                throw new assert.AssertionError({
                        message: _(TYPE_REQUIRED, name || '', 'Buffer'),
                        actual: typeof (arg),
                        expected: 'buffer',
                        operator: 'Buffer.isBuffer',
                        stackStartFunction: buffer
                });
        }
}


function func(arg, name) {
        _assert(arg, 'function', name);
}


function number(arg, name) {
        _assert(arg, 'number', name);
        if (!NDEBUG && (isNaN(arg) || !isFinite(arg))) {
                throw new assert.AssertionError({
                        message: _(TYPE_REQUIRED, name, 'number'),
                        actual: arg,
                        expected: 'number',
                        operator: 'isNaN',
                        stackStartFunction: number
                });
        }
}


function object(arg, name) {
        _assert(arg, 'object', name);
}


function stream(arg, name) {
        _instanceof(arg, Stream, name);
}


function date(arg, name) {
        _instanceof(arg, Date, name);
}

function regexp(arg, name) {
        _instanceof(arg, RegExp, name);
}


function string(arg, name) {
        _assert(arg, 'string', name);
}


function uuid(arg, name) {
        string(arg, name);
        if (!NDEBUG && !UUID_REGEXP.test(arg)) {
                throw new assert.AssertionError({
                        message: _(TYPE_REQUIRED, name, 'uuid'),
                        actual: 'string',
                        expected: 'uuid',
                        operator: 'test',
                        stackStartFunction: uuid
                });
        }
}


///--- Exports

module.exports = {
        bool: bool,
        buffer: buffer,
        date: date,
        func: func,
        number: number,
        object: object,
        regexp: regexp,
        stream: stream,
        string: string,
        uuid: uuid
};


Object.keys(module.exports).forEach(function (k) {
        if (k === 'buffer')
                return;

        var name = 'arrayOf' + capitalize(k);

        if (k === 'bool')
                k = 'boolean';
        if (k === 'func')
                k = 'function';
        module.exports[name] = function (arg, name) {
                array(arg, k, name);
        };
});

Object.keys(module.exports).forEach(function (k) {
        var _name = 'optional' + capitalize(k);
        var s = uncapitalize(k.replace('arrayOf', ''));
        if (s === 'bool')
                s = 'boolean';
        if (s === 'func')
                s = 'function';

        if (k.indexOf('arrayOf') !== -1) {
          module.exports[_name] = function (arg, name) {
                  if (!NDEBUG && arg !== undefined) {
                          array(arg, s, name);
                  }
          };
        } else {
          module.exports[_name] = function (arg, name) {
                  if (!NDEBUG && arg !== undefined) {
                          _assert(arg, s, name);
                  }
          };
        }
});


// Reexport built-in assertions
Object.keys(assert).forEach(function (k) {
        if (k === 'AssertionError') {
                module.exports[k] = assert[k];
                return;
        }

        module.exports[k] = function () {
                if (!NDEBUG) {
                        assert[k].apply(assert[k], arguments);
                }
        };
});

}).call(this,{"isBuffer":require("../../../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js")},require('_process'))
},{"../../../../../../../../software/nvm/v8.11.0/node_modules/browserify/node_modules/is-buffer/index.js":13,"_process":17,"assert":2,"stream":37,"util":43}],135:[function(require,module,exports){
var wrappy = require('wrappy')
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}

},{"wrappy":143}],136:[function(require,module,exports){
(function (global,setImmediate){
/*
 * vasync.js: utilities for observable asynchronous control flow
 */

var mod_assert = require('assert');
var mod_events = require('events');
var mod_util = require('util');
var mod_verror = require('verror');

/*
 * Public interface
 */
exports.parallel = parallel;
exports.forEachParallel = forEachParallel;
exports.pipeline = pipeline;
exports.forEachPipeline = forEachPipeline;
exports.queue = queue;
exports.queuev = queuev;
exports.barrier = barrier;
exports.waterfall = waterfall;

if (!global.setImmediate) {
	global.setImmediate = function (func) {
		var args = Array.prototype.slice.call(arguments, 1);
		args.unshift(0);
		args.unshift(func);
		setTimeout.apply(this, args);
	};
}

/*
 * This is incorporated here from jsprim because jsprim ends up pulling in a lot
 * of dependencies.  If we end up needing more from jsprim, though, we should
 * add it back and rip out this function.
 */
function isEmpty(obj)
{
	var key;
	for (key in obj)
		return (false);
	return (true);
}

/*
 * Given a set of functions that complete asynchronously using the standard
 * callback(err, result) pattern, invoke them all and merge the results.  See
 * README.md for details.
 */
function parallel(args, callback)
{
	var funcs, rv, doneOne, i;

	mod_assert.equal(typeof (args), 'object', '"args" must be an object');
	mod_assert.ok(Array.isArray(args['funcs']),
	    '"args.funcs" must be specified and must be an array');
	mod_assert.equal(typeof (callback), 'function',
	    'callback argument must be specified and must be a function');

	funcs = args['funcs'].slice(0);

	rv = {
	    'operations': new Array(funcs.length),
	    'successes': [],
	    'ndone': 0,
	    'nerrors': 0
	};

	if (funcs.length === 0) {
		setImmediate(function () { callback(null, rv); });
		return (rv);
	}

	doneOne = function (entry) {
		return (function (err, result) {
			mod_assert.equal(entry['status'], 'pending');

			entry['err'] = err;
			entry['result'] = result;
			entry['status'] = err ? 'fail' : 'ok';

			if (err)
				rv['nerrors']++;
			else
				rv['successes'].push(result);

			if (++rv['ndone'] < funcs.length)
				return;

			var errors = rv['operations'].filter(function (ent) {
				return (ent['status'] == 'fail');
			}).map(function (ent) { return (ent['err']); });

			if (errors.length > 0)
				callback(new mod_verror.MultiError(errors), rv);
			else
				callback(null, rv);
		});
	};

	for (i = 0; i < funcs.length; i++) {
		rv['operations'][i] = {
			'func': funcs[i],
			'funcname': funcs[i].name || '(anon)',
			'status': 'pending'
		};

		funcs[i](doneOne(rv['operations'][i]));
	}

	return (rv);
}

/*
 * Exactly like parallel, except that the input is specified as a single
 * function to invoke on N different inputs (rather than N functions).  "args"
 * must have the following fields:
 *
 *	func		asynchronous function to invoke on each input value
 *
 *	inputs		array of input values
 */
function forEachParallel(args, callback)
{
	var func, funcs;

	mod_assert.equal(typeof (args), 'object', '"args" must be an object');
	mod_assert.equal(typeof (args['func']), 'function',
	    '"args.func" must be specified and must be a function');
	mod_assert.ok(Array.isArray(args['inputs']),
	    '"args.inputs" must be specified and must be an array');

	func = args['func'];
	funcs = args['inputs'].map(function (input) {
		return (function (subcallback) {
			return (func(input, subcallback));
		});
	});

	return (parallel({ 'funcs': funcs }, callback));
}

/*
 * Like parallel, but invokes functions in sequence rather than in parallel
 * and aborts if any function exits with failure.  Arguments include:
 *
 *    funcs	invoke the functions in parallel
 *
 *    arg	first argument to each pipeline function
 */
function pipeline(args, callback)
{
	var funcs, uarg, rv, next;

	mod_assert.equal(typeof (args), 'object', '"args" must be an object');
	mod_assert.ok(Array.isArray(args['funcs']),
	    '"args.funcs" must be specified and must be an array');

	funcs = args['funcs'].slice(0);
	uarg = args['arg'];

	rv = {
	    'operations': funcs.map(function (func) {
		return ({
		    'func': func,
		    'funcname': func.name || '(anon)',
		    'status': 'waiting'
		});
	    }),
	    'successes': [],
	    'ndone': 0,
	    'nerrors': 0
	};

	if (funcs.length === 0) {
		setImmediate(function () { callback(null, rv); });
		return (rv);
	}

	next = function (err, result) {
		if (rv['nerrors'] > 0 ||
		    rv['ndone'] >= rv['operations'].length) {
			throw new mod_verror.VError('pipeline callback ' +
			    'invoked after the pipeline has already ' +
			    'completed (%j)', rv);
		}

		var entry = rv['operations'][rv['ndone']++];

		mod_assert.equal(entry['status'], 'pending');

		entry['status'] = err ? 'fail' : 'ok';
		entry['err'] = err;
		entry['result'] = result;

		if (err)
			rv['nerrors']++;
		else
			rv['successes'].push(result);

		if (err || rv['ndone'] == funcs.length) {
			callback(err, rv);
		} else {
			var nextent = rv['operations'][rv['ndone']];
			nextent['status'] = 'pending';

			/*
			 * We invoke the next function on the next tick so that
			 * the caller (stage N) need not worry about the case
			 * that the next stage (stage N + 1) runs in its own
			 * context.
			 */
			setImmediate(function () {
				nextent['func'](uarg, next);
			});
		}
	};

	rv['operations'][0]['status'] = 'pending';
	funcs[0](uarg, next);

	return (rv);
}

/*
 * Exactly like pipeline, except that the input is specified as a single
 * function to invoke on N different inputs (rather than N functions).  "args"
 * must have the following fields:
 *
 *	func		asynchronous function to invoke on each input value
 *
 *	inputs		array of input values
 */
function forEachPipeline(args, callback) {
    mod_assert.equal(typeof (args), 'object', '"args" must be an object');
    mod_assert.equal(typeof (args['func']), 'function',
		'"args.func" must be specified and must be a function');
    mod_assert.ok(Array.isArray(args['inputs']),
		'"args.inputs" must be specified and must be an array');
    mod_assert.equal(typeof (callback), 'function',
		'callback argument must be specified and must be a function');

    var func = args['func'];

    var funcs = args['inputs'].map(function (input) {
		return (function (_, subcallback) {
			return (func(input, subcallback));
		});
    });

    return (pipeline({'funcs': funcs}, callback));
}


/*
 * async-compatible "queue" function.
 */
function queue(worker, concurrency)
{
	return (new WorkQueue({
	    'worker': worker,
	    'concurrency': concurrency
	}));
}

function queuev(args)
{
	return (new WorkQueue(args));
}

function WorkQueue(args)
{
	mod_assert.ok(args.hasOwnProperty('worker'));
	mod_assert.equal(typeof (args['worker']), 'function');
	mod_assert.ok(args.hasOwnProperty('concurrency'));
	mod_assert.equal(typeof (args['concurrency']), 'number');
	mod_assert.equal(Math.floor(args['concurrency']), args['concurrency']);
	mod_assert.ok(args['concurrency'] > 0);

	mod_events.EventEmitter.call(this);

	this.nextid = 0;
	this.worker = args['worker'];
	this.worker_name = args['worker'].name || 'anon';
	this.npending = 0;
	this.pending = {};
	this.queued = [];
	this.closed = false;
	this.ended = false;

	/* user-settable fields inherited from "async" interface */
	this.concurrency = args['concurrency'];
	this.saturated = undefined;
	this.empty = undefined;
	this.drain = undefined;
}

mod_util.inherits(WorkQueue, mod_events.EventEmitter);

WorkQueue.prototype.push = function (tasks, callback)
{
	if (!Array.isArray(tasks))
		return (this.pushOne(tasks, callback));

	var wq = this;
	return (tasks.map(function (task) {
	    return (wq.pushOne(task, callback));
	}));
};

WorkQueue.prototype.updateConcurrency = function (concurrency)
{
	if (this.closed)
		throw new mod_verror.VError(
			'update concurrency invoked after queue closed');
	this.concurrency = concurrency;
	this.dispatchNext();
};

WorkQueue.prototype.close = function ()
{
	var wq = this;

	if (wq.closed)
		return;
	wq.closed = true;

	/*
	 * If the queue is already empty, just fire the "end" event on the
	 * next tick.
	 */
	if (wq.npending === 0 && wq.queued.length === 0) {
		setImmediate(function () {
			if (!wq.ended) {
				wq.ended = true;
				wq.emit('end');
			}
		});
	}
};

/* private */
WorkQueue.prototype.pushOne = function (task, callback)
{
	if (this.closed)
		throw new mod_verror.VError('push invoked after queue closed');

	var id = ++this.nextid;
	var entry = { 'id': id, 'task': task, 'callback': callback };

	this.queued.push(entry);
	this.dispatchNext();

	return (id);
};

/* private */
WorkQueue.prototype.dispatchNext = function ()
{
	var wq = this;
	if (wq.npending === 0 && wq.queued.length === 0) {
		if (wq.drain)
			wq.drain();
		wq.emit('drain');
		/*
		 * The queue is closed; emit the final "end"
		 * event before we come to rest:
		 */
		if (wq.closed) {
			wq.ended = true;
			wq.emit('end');
		}
	} else if (wq.queued.length > 0) {
		while (wq.queued.length > 0 && wq.npending < wq.concurrency) {
			var next = wq.queued.shift();
			wq.dispatch(next);

			if (wq.queued.length === 0) {
				if (wq.empty)
					wq.empty();
				wq.emit('empty');
			}
		}
	}
};

WorkQueue.prototype.dispatch = function (entry)
{
	var wq = this;

	mod_assert.ok(!this.pending.hasOwnProperty(entry['id']));
	mod_assert.ok(this.npending < this.concurrency);
	mod_assert.ok(!this.ended);

	this.npending++;
	this.pending[entry['id']] = entry;

	if (this.npending === this.concurrency) {
		if (this.saturated)
			this.saturated();
		this.emit('saturated');
	}

	/*
	 * We invoke the worker function on the next tick so that callers can
	 * always assume that the callback is NOT invoked during the call to
	 * push() even if the queue is not at capacity.  It also avoids O(n)
	 * stack usage when used with synchronous worker functions.
	 */
	setImmediate(function () {
		wq.worker(entry['task'], function (err) {
			--wq.npending;
			delete (wq.pending[entry['id']]);

			if (entry['callback'])
				entry['callback'].apply(null, arguments);

			wq.dispatchNext();
		});
	});
};

WorkQueue.prototype.length = function ()
{
	return (this.queued.length);
};

WorkQueue.prototype.kill = function ()
{
	this.killed = true;
	this.queued = [];
	this.drain = undefined;
	this.close();
};

/*
 * Barriers coordinate multiple concurrent operations.
 */
function barrier(args)
{
	return (new Barrier(args));
}

function Barrier(args)
{
	mod_assert.ok(!args || !args['nrecent'] ||
	    typeof (args['nrecent']) == 'number',
	    '"nrecent" must have type "number"');

	mod_events.EventEmitter.call(this);

	var nrecent = args && args['nrecent'] ? args['nrecent'] : 10;

	if (nrecent > 0) {
		this.nrecent = nrecent;
		this.recent = [];
	}

	this.pending = {};
	this.scheduled = false;
}

mod_util.inherits(Barrier, mod_events.EventEmitter);

Barrier.prototype.start = function (name)
{
	mod_assert.ok(!this.pending.hasOwnProperty(name),
	    'operation "' + name + '" is already pending');
	this.pending[name] = Date.now();
};

Barrier.prototype.done = function (name)
{
	mod_assert.ok(this.pending.hasOwnProperty(name),
	    'operation "' + name + '" is not pending');

	if (this.recent) {
		this.recent.push({
		    'name': name,
		    'start': this.pending[name],
		    'done': Date.now()
		});

		if (this.recent.length > this.nrecent)
			this.recent.shift();
	}

	delete (this.pending[name]);

	/*
	 * If we executed at least one operation and we're now empty, we should
	 * emit "drain".  But most code doesn't deal well with events being
	 * processed while they're executing, so we actually schedule this event
	 * for the next tick.
	 *
	 * We use the "scheduled" flag to avoid emitting multiple "drain" events
	 * on consecutive ticks if the user starts and ends another task during
	 * this tick.
	 */
	if (!isEmpty(this.pending) || this.scheduled)
		return;

	this.scheduled = true;

	var self = this;

	setImmediate(function () {
		self.scheduled = false;

		/*
		 * It's also possible that the user has started another task on
		 * the previous tick, in which case we really shouldn't emit
		 * "drain".
		 */
		if (isEmpty(self.pending))
			self.emit('drain');
	});
};

/*
 * waterfall([ funcs ], callback): invoke each of the asynchronous functions
 * "funcs" in series.  Each function is passed any values emitted by the
 * previous function (none for the first function), followed by the callback to
 * invoke upon completion.  This callback must be invoked exactly once,
 * regardless of success or failure.  As conventional in Node, the first
 * argument to the callback indicates an error (if non-null).  Subsequent
 * arguments are passed to the next function in the "funcs" chain.
 *
 * If any function fails (i.e., calls its callback with an Error), then the
 * remaining functions are not invoked and "callback" is invoked with the error.
 *
 * The only difference between waterfall() and pipeline() are the arguments
 * passed to each function in the chain.  pipeline() always passes the same
 * argument followed by the callback, while waterfall() passes whatever values
 * were emitted by the previous function followed by the callback.
 */
function waterfall(funcs, callback)
{
	var rv, current, next;

	mod_assert.ok(Array.isArray(funcs));
	mod_assert.ok(arguments.length == 1 || typeof (callback) == 'function');
	funcs = funcs.slice(0);

	rv = {
	    'operations': funcs.map(function (func) {
	        return ({
		    'func': func,
		    'funcname': func.name || '(anon)',
		    'status': 'waiting'
		});
	    }),
	    'successes': [],
	    'ndone': 0,
	    'nerrors': 0
	};

	if (funcs.length === 0) {
		if (callback)
			setImmediate(function () { callback(null, rv); });
		return (rv);
	}

	next = function (idx, err) {
		var args, entry, nextentry;

		if (err === undefined)
			err = null;

		if (idx != current) {
			throw (new mod_verror.VError(
			    'vasync.waterfall: function %d ("%s") invoked ' +
			    'its callback twice', idx,
			    rv['operations'][idx].funcname));
		}

		mod_assert.equal(idx, rv['ndone']);
		entry = rv['operations'][rv['ndone']++];
		args = Array.prototype.slice.call(arguments, 2);

		mod_assert.equal(entry['status'], 'pending');
		entry['status'] = err ? 'fail' : 'ok';
		entry['err'] = err;
		entry['results'] = args;

		if (err)
			rv['nerrors']++;
		else
			rv['successes'].push(args);

		if (err || rv['ndone'] == funcs.length) {
			if (callback) {
				args.unshift(err);
				callback.apply(null, args);
			}
		} else {
			nextentry = rv['operations'][rv['ndone']];
			nextentry['status'] = 'pending';
			current++;
			args.push(next.bind(null, current));
			setImmediate(function () {
				nextentry['func'].apply(null, args);
			});
		}
	};

	rv['operations'][0]['status'] = 'pending';
	current = 0;
	funcs[0](next.bind(null, current));
	return (rv);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {},require("timers").setImmediate)
},{"assert":2,"events":10,"timers":38,"util":43,"verror":137}],137:[function(require,module,exports){
/*
 * verror.js: richer JavaScript errors
 */

var mod_assert = require('assert');
var mod_util = require('util');

var mod_extsprintf = require('extsprintf');

/*
 * Public interface
 */

/* So you can 'var VError = require('verror')' */
module.exports = VError;
/* For compatibility */
VError.VError = VError;
/* Other exported classes */
VError.SError = SError;
VError.WError = WError;
VError.MultiError = MultiError;

/*
 * VError([cause], fmt[, arg...]): Like JavaScript's built-in Error class, but
 * supports a "cause" argument (another error) and a printf-style message.  The
 * cause argument can be null or omitted entirely.
 *
 * Examples:
 *
 * CODE                                    MESSAGE
 * new VError('something bad happened')    "something bad happened"
 * new VError('missing file: "%s"', file)  "missing file: "/etc/passwd"
 *   with file = '/etc/passwd'
 * new VError(err, 'open failed')          "open failed: file not found"
 *   with err.message = 'file not found'
 */
function VError(options)
{
	var args, obj, causedBy, ctor, tailmsg;

	/*
	 * This is a regrettable pattern, but JavaScript's built-in Error class
	 * is defined to work this way, so we allow the constructor to be called
	 * without "new".
	 */
	if (!(this instanceof VError)) {
		args = Array.prototype.slice.call(arguments, 0);
		obj = Object.create(VError.prototype);
		VError.apply(obj, arguments);
		return (obj);
	}

	if (options instanceof Error || typeof (options) === 'object') {
		args = Array.prototype.slice.call(arguments, 1);
	} else {
		args = Array.prototype.slice.call(arguments, 0);
		options = undefined;
	}

	/*
	 * extsprintf (which we invoke here with our caller's arguments in order
	 * to construct this Error's message) is strict in its interpretation of
	 * values to be processed by the "%s" specifier.  The value passed to
	 * extsprintf must actually be a string or something convertible to a
	 * String using .toString().  Passing other values (notably "null" and
	 * "undefined") is considered a programmer error.  The assumption is
	 * that if you actually want to print the string "null" or "undefined",
	 * then that's easy to do that when you're calling extsprintf; on the
	 * other hand, if you did NOT want that (i.e., there's actually a bug
	 * where the program assumes some variable is non-null and tries to
	 * print it, which might happen when constructing a packet or file in
	 * some specific format), then it's better to stop immediately than
	 * produce bogus output.
	 *
	 * However, sometimes the bug is only in the code calling VError, and a
	 * programmer might prefer to have the error message contain "null" or
	 * "undefined" rather than have the bug in the error path crash the
	 * program (making the first bug harder to identify).  For that reason,
	 * by default VError converts "null" or "undefined" arguments to their
	 * string representations and passes those to extsprintf.  Programmers
	 * desiring the strict behavior can use the SError class or pass the
	 * "strict" option to the VError constructor.
	 */
	if (!options || !options.strict) {
		args = args.map(function (a) {
			return (a === null ? 'null' :
			    a === undefined ? 'undefined' : a);
		});
	}

	tailmsg = args.length > 0 ?
	    mod_extsprintf.sprintf.apply(null, args) : '';
	this.jse_shortmsg = tailmsg;
	this.jse_summary = tailmsg;

	if (options) {
		causedBy = options.cause;

		if (!causedBy || !(options.cause instanceof Error))
			causedBy = options;

		if (causedBy && (causedBy instanceof Error)) {
			this.jse_cause = causedBy;
			this.jse_summary += ': ' + causedBy.message;
		}
	}

	this.message = this.jse_summary;
	Error.call(this, this.jse_summary);

	if (Error.captureStackTrace) {
		ctor = options ? options.constructorOpt : undefined;
		ctor = ctor || arguments.callee;
		Error.captureStackTrace(this, ctor);
	}

	return (this);
}

mod_util.inherits(VError, Error);
VError.prototype.name = 'VError';

VError.prototype.toString = function ve_toString()
{
	var str = (this.hasOwnProperty('name') && this.name ||
		this.constructor.name || this.constructor.prototype.name);
	if (this.message)
		str += ': ' + this.message;

	return (str);
};

VError.prototype.cause = function ve_cause()
{
	return (this.jse_cause);
};


/*
 * SError is like VError, but stricter about types.  You cannot pass "null" or
 * "undefined" as string arguments to the formatter.  Since SError is only a
 * different function, not really a different class, we don't set
 * SError.prototype.name.
 */
function SError()
{
	var fmtargs, opts, key, args;

	opts = {};
	opts.constructorOpt = SError;

	if (arguments[0] instanceof Error) {
		opts.cause = arguments[0];
		fmtargs = Array.prototype.slice.call(arguments, 1);
	} else if (typeof (arguments[0]) == 'object') {
		for (key in arguments[0])
			opts[key] = arguments[0][key];
		fmtargs = Array.prototype.slice.call(arguments, 1);
	} else {
		fmtargs = Array.prototype.slice.call(arguments, 0);
	}

	opts.strict = true;
	args = [ opts ].concat(fmtargs);
	VError.apply(this, args);
}

mod_util.inherits(SError, VError);


/*
 * Represents a collection of errors for the purpose of consumers that generally
 * only deal with one error.  Callers can extract the individual errors
 * contained in this object, but may also just treat it as a normal single
 * error, in which case a summary message will be printed.
 */
function MultiError(errors)
{
	mod_assert.ok(errors.length > 0);
	this.ase_errors = errors;

	VError.call(this, errors[0], 'first of %d error%s',
	    errors.length, errors.length == 1 ? '' : 's');
}

mod_util.inherits(MultiError, VError);


/*
 * Like JavaScript's built-in Error class, but supports a "cause" argument which
 * is wrapped, not "folded in" as with VError.	Accepts a printf-style message.
 * The cause argument can be null.
 */
function WError(options)
{
	Error.call(this);

	var args, cause, ctor;
	if (typeof (options) === 'object') {
		args = Array.prototype.slice.call(arguments, 1);
	} else {
		args = Array.prototype.slice.call(arguments, 0);
		options = undefined;
	}

	if (args.length > 0) {
		this.message = mod_extsprintf.sprintf.apply(null, args);
	} else {
		this.message = '';
	}

	if (options) {
		if (options instanceof Error) {
			cause = options;
		} else {
			cause = options.cause;
			ctor = options.constructorOpt;
		}
	}

	Error.captureStackTrace(this, ctor || this.constructor);
	if (cause)
		this.cause(cause);

}

mod_util.inherits(WError, Error);
WError.prototype.name = 'WError';


WError.prototype.toString = function we_toString()
{
	var str = (this.hasOwnProperty('name') && this.name ||
		this.constructor.name || this.constructor.prototype.name);
	if (this.message)
		str += ': ' + this.message;
	if (this.we_cause && this.we_cause.message)
		str += '; caused by ' + this.we_cause.toString();

	return (str);
};

WError.prototype.cause = function we_cause(c)
{
	if (c instanceof Error)
		this.we_cause = c;

	return (this.we_cause);
};

},{"assert":2,"extsprintf":121,"util":43}],138:[function(require,module,exports){
/*
 * verror.js: richer JavaScript errors
 */

var mod_assertplus = require('assert-plus');
var mod_util = require('util');

var mod_extsprintf = require('extsprintf');
var mod_isError = require('core-util-is').isError;
var sprintf = mod_extsprintf.sprintf;

/*
 * Public interface
 */

/* So you can 'var VError = require('verror')' */
module.exports = VError;
/* For compatibility */
VError.VError = VError;
/* Other exported classes */
VError.SError = SError;
VError.WError = WError;
VError.MultiError = MultiError;

/*
 * Common function used to parse constructor arguments for VError, WError, and
 * SError.  Named arguments to this function:
 *
 *     strict		force strict interpretation of sprintf arguments, even
 *     			if the options in "argv" don't say so
 *
 *     argv		error's constructor arguments, which are to be
 *     			interpreted as described in README.md.  For quick
 *     			reference, "argv" has one of the following forms:
 *
 *          [ sprintf_args... ]           (argv[0] is a string)
 *          [ cause, sprintf_args... ]    (argv[0] is an Error)
 *          [ options, sprintf_args... ]  (argv[0] is an object)
 *
 * This function normalizes these forms, producing an object with the following
 * properties:
 *
 *    options           equivalent to "options" in third form.  This will never
 *    			be a direct reference to what the caller passed in
 *    			(i.e., it may be a shallow copy), so it can be freely
 *    			modified.
 *
 *    shortmessage      result of sprintf(sprintf_args), taking options.strict
 *    			into account as described in README.md.
 */
function parseConstructorArguments(args)
{
	var argv, options, sprintf_args, shortmessage, k;

	mod_assertplus.object(args, 'args');
	mod_assertplus.bool(args.strict, 'args.strict');
	mod_assertplus.array(args.argv, 'args.argv');
	argv = args.argv;

	/*
	 * First, figure out which form of invocation we've been given.
	 */
	if (argv.length === 0) {
		options = {};
		sprintf_args = [];
	} else if (mod_isError(argv[0])) {
		options = { 'cause': argv[0] };
		sprintf_args = argv.slice(1);
	} else if (typeof (argv[0]) === 'object') {
		options = {};
		for (k in argv[0]) {
			options[k] = argv[0][k];
		}
		sprintf_args = argv.slice(1);
	} else {
		mod_assertplus.string(argv[0],
		    'first argument to VError, SError, or WError ' +
		    'constructor must be a string, object, or Error');
		options = {};
		sprintf_args = argv;
	}

	/*
	 * Now construct the error's message.
	 *
	 * extsprintf (which we invoke here with our caller's arguments in order
	 * to construct this Error's message) is strict in its interpretation of
	 * values to be processed by the "%s" specifier.  The value passed to
	 * extsprintf must actually be a string or something convertible to a
	 * String using .toString().  Passing other values (notably "null" and
	 * "undefined") is considered a programmer error.  The assumption is
	 * that if you actually want to print the string "null" or "undefined",
	 * then that's easy to do that when you're calling extsprintf; on the
	 * other hand, if you did NOT want that (i.e., there's actually a bug
	 * where the program assumes some variable is non-null and tries to
	 * print it, which might happen when constructing a packet or file in
	 * some specific format), then it's better to stop immediately than
	 * produce bogus output.
	 *
	 * However, sometimes the bug is only in the code calling VError, and a
	 * programmer might prefer to have the error message contain "null" or
	 * "undefined" rather than have the bug in the error path crash the
	 * program (making the first bug harder to identify).  For that reason,
	 * by default VError converts "null" or "undefined" arguments to their
	 * string representations and passes those to extsprintf.  Programmers
	 * desiring the strict behavior can use the SError class or pass the
	 * "strict" option to the VError constructor.
	 */
	mod_assertplus.object(options);
	if (!options.strict && !args.strict) {
		sprintf_args = sprintf_args.map(function (a) {
			return (a === null ? 'null' :
			    a === undefined ? 'undefined' : a);
		});
	}

	if (sprintf_args.length === 0) {
		shortmessage = '';
	} else {
		shortmessage = sprintf.apply(null, sprintf_args);
	}

	return ({
	    'options': options,
	    'shortmessage': shortmessage
	});
}

/*
 * See README.md for reference documentation.
 */
function VError()
{
	var args, obj, parsed, cause, ctor, message, k;

	args = Array.prototype.slice.call(arguments, 0);

	/*
	 * This is a regrettable pattern, but JavaScript's built-in Error class
	 * is defined to work this way, so we allow the constructor to be called
	 * without "new".
	 */
	if (!(this instanceof VError)) {
		obj = Object.create(VError.prototype);
		VError.apply(obj, arguments);
		return (obj);
	}

	/*
	 * For convenience and backwards compatibility, we support several
	 * different calling forms.  Normalize them here.
	 */
	parsed = parseConstructorArguments({
	    'argv': args,
	    'strict': false
	});

	/*
	 * If we've been given a name, apply it now.
	 */
	if (parsed.options.name) {
		mod_assertplus.string(parsed.options.name,
		    'error\'s "name" must be a string');
		this.name = parsed.options.name;
	}

	/*
	 * For debugging, we keep track of the original short message (attached
	 * this Error particularly) separately from the complete message (which
	 * includes the messages of our cause chain).
	 */
	this.jse_shortmsg = parsed.shortmessage;
	message = parsed.shortmessage;

	/*
	 * If we've been given a cause, record a reference to it and update our
	 * message appropriately.
	 */
	cause = parsed.options.cause;
	if (cause) {
		mod_assertplus.ok(mod_isError(cause), 'cause is not an Error');
		this.jse_cause = cause;

		if (!parsed.options.skipCauseMessage) {
			message += ': ' + cause.message;
		}
	}

	/*
	 * If we've been given an object with properties, shallow-copy that
	 * here.  We don't want to use a deep copy in case there are non-plain
	 * objects here, but we don't want to use the original object in case
	 * the caller modifies it later.
	 */
	this.jse_info = {};
	if (parsed.options.info) {
		for (k in parsed.options.info) {
			this.jse_info[k] = parsed.options.info[k];
		}
	}

	this.message = message;
	Error.call(this, message);

	if (Error.captureStackTrace) {
		ctor = parsed.options.constructorOpt || this.constructor;
		Error.captureStackTrace(this, ctor);
	}

	return (this);
}

mod_util.inherits(VError, Error);
VError.prototype.name = 'VError';

VError.prototype.toString = function ve_toString()
{
	var str = (this.hasOwnProperty('name') && this.name ||
		this.constructor.name || this.constructor.prototype.name);
	if (this.message)
		str += ': ' + this.message;

	return (str);
};

/*
 * This method is provided for compatibility.  New callers should use
 * VError.cause() instead.  That method also uses the saner `null` return value
 * when there is no cause.
 */
VError.prototype.cause = function ve_cause()
{
	var cause = VError.cause(this);
	return (cause === null ? undefined : cause);
};

/*
 * Static methods
 *
 * These class-level methods are provided so that callers can use them on
 * instances of Errors that are not VErrors.  New interfaces should be provided
 * only using static methods to eliminate the class of programming mistake where
 * people fail to check whether the Error object has the corresponding methods.
 */

VError.cause = function (err)
{
	mod_assertplus.ok(mod_isError(err), 'err must be an Error');
	return (mod_isError(err.jse_cause) ? err.jse_cause : null);
};

VError.info = function (err)
{
	var rv, cause, k;

	mod_assertplus.ok(mod_isError(err), 'err must be an Error');
	cause = VError.cause(err);
	if (cause !== null) {
		rv = VError.info(cause);
	} else {
		rv = {};
	}

	if (typeof (err.jse_info) == 'object' && err.jse_info !== null) {
		for (k in err.jse_info) {
			rv[k] = err.jse_info[k];
		}
	}

	return (rv);
};

VError.findCauseByName = function (err, name)
{
	var cause;

	mod_assertplus.ok(mod_isError(err), 'err must be an Error');
	mod_assertplus.string(name, 'name');
	mod_assertplus.ok(name.length > 0, 'name cannot be empty');

	for (cause = err; cause !== null; cause = VError.cause(cause)) {
		mod_assertplus.ok(mod_isError(cause));
		if (cause.name == name) {
			return (cause);
		}
	}

	return (null);
};

VError.hasCauseWithName = function (err, name)
{
	return (VError.findCauseByName(err, name) !== null);
};

VError.fullStack = function (err)
{
	mod_assertplus.ok(mod_isError(err), 'err must be an Error');

	var cause = VError.cause(err);

	if (cause) {
		return (err.stack + '\ncaused by: ' + VError.fullStack(cause));
	}

	return (err.stack);
};

VError.errorFromList = function (errors)
{
	mod_assertplus.arrayOfObject(errors, 'errors');

	if (errors.length === 0) {
		return (null);
	}

	errors.forEach(function (e) {
		mod_assertplus.ok(mod_isError(e));
	});

	if (errors.length == 1) {
		return (errors[0]);
	}

	return (new MultiError(errors));
};

VError.errorForEach = function (err, func)
{
	mod_assertplus.ok(mod_isError(err), 'err must be an Error');
	mod_assertplus.func(func, 'func');

	if (err instanceof MultiError) {
		err.errors().forEach(function iterError(e) { func(e); });
	} else {
		func(err);
	}
};


/*
 * SError is like VError, but stricter about types.  You cannot pass "null" or
 * "undefined" as string arguments to the formatter.
 */
function SError()
{
	var args, obj, parsed, options;

	args = Array.prototype.slice.call(arguments, 0);
	if (!(this instanceof SError)) {
		obj = Object.create(SError.prototype);
		SError.apply(obj, arguments);
		return (obj);
	}

	parsed = parseConstructorArguments({
	    'argv': args,
	    'strict': true
	});

	options = parsed.options;
	VError.call(this, options, '%s', parsed.shortmessage);

	return (this);
}

/*
 * We don't bother setting SError.prototype.name because once constructed,
 * SErrors are just like VErrors.
 */
mod_util.inherits(SError, VError);


/*
 * Represents a collection of errors for the purpose of consumers that generally
 * only deal with one error.  Callers can extract the individual errors
 * contained in this object, but may also just treat it as a normal single
 * error, in which case a summary message will be printed.
 */
function MultiError(errors)
{
	mod_assertplus.array(errors, 'list of errors');
	mod_assertplus.ok(errors.length > 0, 'must be at least one error');
	this.ase_errors = errors;

	VError.call(this, {
	    'cause': errors[0]
	}, 'first of %d error%s', errors.length, errors.length == 1 ? '' : 's');
}

mod_util.inherits(MultiError, VError);
MultiError.prototype.name = 'MultiError';

MultiError.prototype.errors = function me_errors()
{
	return (this.ase_errors.slice(0));
};


/*
 * See README.md for reference details.
 */
function WError()
{
	var args, obj, parsed, options;

	args = Array.prototype.slice.call(arguments, 0);
	if (!(this instanceof WError)) {
		obj = Object.create(WError.prototype);
		WError.apply(obj, args);
		return (obj);
	}

	parsed = parseConstructorArguments({
	    'argv': args,
	    'strict': false
	});

	options = parsed.options;
	options['skipCauseMessage'] = true;
	VError.call(this, options, '%s', parsed.shortmessage);

	return (this);
}

mod_util.inherits(WError, VError);
WError.prototype.name = 'WError';

WError.prototype.toString = function we_toString()
{
	var str = (this.hasOwnProperty('name') && this.name ||
		this.constructor.name || this.constructor.prototype.name);
	if (this.message)
		str += ': ' + this.message;
	if (this.jse_cause && this.jse_cause.message)
		str += '; caused by ' + this.jse_cause.toString();

	return (str);
};

/*
 * For purely historical reasons, WError's cause() function allows you to set
 * the cause.
 */
WError.prototype.cause = function we_cause(c)
{
	if (mod_isError(c))
		this.jse_cause = c;

	return (this.jse_cause);
};

},{"assert-plus":112,"core-util-is":45,"extsprintf":121,"util":43}],139:[function(require,module,exports){
/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

module.exports = require('./lib/checks');
},{"./lib/checks":140}],140:[function(require,module,exports){
/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var util = require('util');

var errors = module.exports = require('./errors');

function failCheck(ExceptionConstructor, callee, messageFormat, formatArgs) {
    messageFormat = messageFormat || '';
    var message = util.format.apply(this, [messageFormat].concat(formatArgs));
    var error = new ExceptionConstructor(message);
    Error.captureStackTrace(error, callee);
    throw error;
}

function failArgumentCheck(callee, message, formatArgs) {
    failCheck(errors.IllegalArgumentError, callee, message, formatArgs);
}

function failStateCheck(callee, message, formatArgs) {
    failCheck(errors.IllegalStateError, callee, message, formatArgs);
}

module.exports.checkArgument = function(value, message) {
    if (!value) {
        failArgumentCheck(arguments.callee, message,
            Array.prototype.slice.call(arguments, 2));
    }
};

module.exports.checkState = function(value, message) {
    if (!value) {
        failStateCheck(arguments.callee, message,
            Array.prototype.slice.call(arguments, 2));
    }
};

module.exports.checkIsDef = function(value, message) {
    if (value !== undefined) {
        return value;
    }

    failArgumentCheck(arguments.callee, message ||
        'Expected value to be defined but was undefined.',
        Array.prototype.slice.call(arguments, 2));
};

module.exports.checkIsDefAndNotNull = function(value, message) {
    // Note that undefined == null.
    if (value != null) {
        return value;
    }

    failArgumentCheck(arguments.callee, message ||
        'Expected value to be defined and not null but got "' +
        typeOf(value) + '".', Array.prototype.slice.call(arguments, 2));
};

// Fixed version of the typeOf operator which returns 'null' for null values
// and 'array' for arrays.
function typeOf(value) {
    var s = typeof value;
    if (s == 'object') {
        if (!value) {
            return 'null';
        } else if (value instanceof Array) {
            return 'array';
        }
    }
    return s;
}

function typeCheck(expect) {
    return function(value, message) {
        var type = typeOf(value);

        if (type == expect) {
            return value;
        }

        failArgumentCheck(arguments.callee, message ||
            'Expected "' + expect + '" but got "' + type + '".',
            Array.prototype.slice.call(arguments, 2));
    };
}

module.exports.checkIsString = typeCheck('string');
module.exports.checkIsArray = typeCheck('array');
module.exports.checkIsNumber = typeCheck('number');
module.exports.checkIsBoolean = typeCheck('boolean');
module.exports.checkIsFunction = typeCheck('function');
module.exports.checkIsObject = typeCheck('object');

},{"./errors":141,"util":43}],141:[function(require,module,exports){
/*
 * Copyright (c) 2012 Mathieu Turcotte
 * Licensed under the MIT license.
 */

var util = require('util');

function IllegalArgumentError(message) {
    Error.call(this, message);
    this.message = message;
}
util.inherits(IllegalArgumentError, Error);

IllegalArgumentError.prototype.name = 'IllegalArgumentError';

function IllegalStateError(message) {
    Error.call(this, message);
    this.message = message;
}
util.inherits(IllegalStateError, Error);

IllegalStateError.prototype.name = 'IllegalStateError';

module.exports.IllegalStateError = IllegalStateError;
module.exports.IllegalArgumentError = IllegalArgumentError;
},{"util":43}],142:[function(require,module,exports){
var hasProp = Object.prototype.hasOwnProperty;

function throwsMessage(err) {
	return '[Throws: ' + (err ? err.message : '?') + ']';
}

function safeGetValueFromPropertyOnObject(obj, property) {
	if (hasProp.call(obj, property)) {
		try {
			return obj[property];
		}
		catch (err) {
			return throwsMessage(err);
		}
	}

	return obj[property];
}

function ensureProperties(obj) {
	var seen = [ ]; // store references to objects we have seen before

	function visit(obj) {
		if (obj === null || typeof obj !== 'object') {
			return obj;
		}

		if (seen.indexOf(obj) !== -1) {
			return '[Circular]';
		}
		seen.push(obj);

		if (typeof obj.toJSON === 'function') {
			try {
				var fResult = visit(obj.toJSON());
				seen.pop();
				return fResult;
			} catch(err) {
				return throwsMessage(err);
			}
		}

		if (Array.isArray(obj)) {
			var aResult = obj.map(visit);
			seen.pop();
			return aResult;
		}

		var result = Object.keys(obj).reduce(function(result, prop) {
			// prevent faulty defined getter properties
			result[prop] = visit(safeGetValueFromPropertyOnObject(obj, prop));
			return result;
		}, {});
		seen.pop();
		return result;
	};

	return visit(obj);
}

module.exports = function(data, replacer, space) {
	return JSON.stringify(ensureProperties(data), replacer, space);
}

module.exports.ensureProperties = ensureProperties;

},{}],143:[function(require,module,exports){
// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}

},{}]},{},[44]);
