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
  const buffer = [];

  arr.forEach(function(el, index, arr) {
    const res = callback(el);

    if (typeof res === 'boolean' && res === true) {
      buffer.push(arr[index]);
    }

    if (typeof res !== 'undefined' && typeof res !== 'boolean') {
      buffer[index] = res;
    }
  });

  if (buffer) {
    return buffer;
  }
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
