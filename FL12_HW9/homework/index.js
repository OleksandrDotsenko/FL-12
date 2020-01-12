/**
 * Task 1
 */
function convert() {
  const result = [];
  for (let i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] === 'string') {
      result.push(Number(arguments[i]));
    }
    if (typeof arguments[i] === 'number') {
      result.push(String(arguments[i]));
    }
  }
  return result;
}

const a = '1';
const b = 2;
const c = 3;
const d = '4';
convert(a, b, c, d);

/**
 * Task 2
 */
function executeforEach(arr, callback) {
  if (typeof arr === 'object' && typeof callback === 'function') {
    for (let i = 0; i < arr.length; i++) {
      callback(arr[i], i, arr);
    }
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
function mapArray(arr, action) {
  executeforEach(arr, function(el, index, arr) {
    arr[index] = action(el);
  });

  return arr;
}

const h = 2;
const i = '5';
const j = 8;
const term = 3;
mapArray([h, i, j], function(el) {
  return Number(el) + term;
});

/**
 * Task 4
 */
function filterArray(arr, action) {
  const filteredArr = [];

  executeforEach(arr, function(el) {
    if (action(el)) {
      filteredArr.push(el);
    }
  });

  return filteredArr;
}

const k = 2;
const l = 5;
const m = 8;
const divider = 2;
filterArray([k, l, m], function(el) {
  return el % divider === 0;
});

/**
 * Task 5
 */
function flipOver(str) {
  let result = '';
  if (typeof str === 'string') {
    for (let i = str.length - 1; i >= 0; i--) {
      result += str[i];
    }
  }
  return result;
}

flipOver('hey world');

/**
 * Task 6
 */
function makeListFromRange(range) {
  let result = [];

  if (range && !isNaN(range[0]) && !isNaN(range[1])) {
    for (let i = Number(range[0]); i <= range[1]; i++) {
      result.push(i);
    }
  }

  return result;
}

const start = 2;
const end = 7;
makeListFromRange([start, end]);

/**
 * Task 7
 */
function getArrayOfKeys(dataset, keyName) {
  const arr = [];

  executeforEach(dataset, function(obj) {
    if (obj[keyName]) {
      arr.push(obj[keyName]);
    }
  });

  return arr;
}

const actors = [
  { name: 'tommy', age: 36 },
  { name: 'lee', age: 28 }
];
getArrayOfKeys(actors, 'name');

/**
 * Task 8
 */
function substitute(arr) {
  const limit = 30;
  const resultArr = [];

  mapArray(arr, function(el) {
    if (typeof el === 'number') {
      resultArr.push(el < limit ? '*' : el);
    }
  });

  return resultArr;
}

const n = 58;
const o = 14;
const p = 48;
const q = 2;
const r = 31;
const s = 29;
substitute([n, o, p, q, r, s]);

/**
 * Task 9
 */
function getPastDay(date, daysAgo) {
  const milliseconds = 86400000;
  const timestamp = Date.parse(date);
  const pastDate = new Date(timestamp - milliseconds * daysAgo);
  return pastDate.getDate();
}

const dateYear = 2019;
const dateMonth = 0;
const dateDay = 2;
const date = new Date(dateYear, dateMonth, dateDay);

const dayA = 1;
const dayB = 2;
const dayC = 365;
getPastDay(date, dayA);
getPastDay(date, dayB);
getPastDay(date, dayC);

/**
 * Task 10
 */
function formatDate(date) {
  const PAD = 10;
  const YYYY = date.getFullYear();
  const M = date.getMonth() + 1;
  const d = date.getDate();
  let HH = date.getHours();
  let mm = date.getMinutes();

  if (HH < PAD) {
    HH = '0' + HH;
  }
  if (mm < PAD) {
    mm = '0' + mm;
  }

  return YYYY + '/' + M + '/' + d + ' ' + HH + ':' + mm;
}

formatDate(new Date('6/15/2018 09:15:00'));
formatDate(new Date());
