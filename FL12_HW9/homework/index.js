/**
 * Task 1
 */
function convert() {
  const result = [];
  for (let i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] === 'string') {
      result.push(arguments[i] * 1);
    }
    if (typeof arguments[i] === 'number') {
      result.push(arguments[i] + '');
    }
  }
  return result;
}

const a = '1';
const b = 2;
const c = 3;
const d = '4';
console.log(convert(a, b, c, d));

/**
 * Task 2
 */
function executeforEach(arr, callback) {
  arr.forEach(callback);
}

const e = 1;
const f = 2;
const g = 3;
const factor = 2;
executeforEach([e, f, g], function(el) {
  console.log(el * factor);
});

/**
 * Task 3
 */
function mapArray(arr, callback) {
  return executeforEach(arr, callback);
}

const h = 2;
const i = '5';
const j = 8;
const term = 3;
console.log(
  mapArray([h, i, j], function(el) {
    return +el + term;
  })
);

/**
 * Task 4
 */
function filterArray(arr, callback) {
  return executeforEach(arr, callback);
}

const k = 2;
const l = 5;
const m = 8;
const divider = 2;
console.log(
  filterArray([k, l, m], function(el) {
    return el % divider === 0;
  })
);

/**
 * Task 5
 */
function flipOver(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}

console.log(flipOver('hey world'));

/**
 * Task 6
 */
function makeListFromRange(range) {
  let result = [];

  if (range && range[0] && range[1]) {
    for (let i = range[0]; i <= range[1]; i++) {
      result.push(i);
    }
  }

  if (range && range.length === 1) {
    for (let i = 0; i <= range[0]; i++) {
      result.push(i);
    }
  }

  return result;
}

const start = 2;
const end = 7;
console.log(makeListFromRange([start, end]));

/**
 * Task 7
 */
function getArrayOfKeys(arr, keyName) {
  return executeforEach(arr, function(el) {
    return el[keyName];
  });
}

const actors = [
  { name: 'tommy', age: 36 },
  { name: 'lee', age: 28 }
];
console.log(getArrayOfKeys(actors, 'name'));

/**
 * Task 8
 */
function substitute(arr) {
  const limit = 30;

  return mapArray(arr, function(el) {
    return el < limit ? '*' : el;
  });
}

const n = 58;
const o = 14;
const p = 48;
const q = 2;
const r = 31;
const s = 29;
console.log(substitute([n, o, p, q, r, s]));
