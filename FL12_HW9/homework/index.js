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
const square = 2;
executeforEach([e, f, g], function(el) {
  console.log(el * square);
});

/**
 * Task 3
 */
function mapArray(arr, callback) {
  executeforEach(arr, callback);
  return arr;
}

const h = 2;
const i = '5';
const j = 8;
const cube = 3;
console.log(
  mapArray([h, i, j], function(el, index, arr) {
    arr[index] = +arr[index] + cube;
  })
);
