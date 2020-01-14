// Task 1
function convert() {
  const resultArr = [];
  for (let i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] === 'string') {
      resultArr.push(Number(arguments[i]));
    }
    if (typeof arguments[i] === 'number') {
      resultArr.push(String(arguments[i]));
    }
  }
  return resultArr;
}

// Task 2
function executeforEach(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    callback(arr[i], i, arr);
  }
}

// Task 3
function mapArray(arr, action) {
  executeforEach(arr, function(el, index, arr) {
    arr[index] = action(+el);
  });

  return arr;
}

// Task 4
function filterArray(arr, action) {
  const filteredArr = [];

  executeforEach(arr, function(el) {
    return action(el) ? filteredArr.push(el) : undefined;
  });

  return filteredArr;
}

// Task 5
function flipOver(str) {
  let resultStr = '';
  str = str ? String(str) : '';

  for (let i = 0; i < str.length; i++) {
    resultStr = str[i] + resultStr;
  }

  return resultStr;
}

// Task 6
function makeListFromRange(range) {
  let resultArr = [];

  if (range) {
    for (let i = parseInt(range[0]); i <= parseInt(range[1]); i++) {
      resultArr.push(i);
    }
  }

  return resultArr;
}

// Task 7
function getArrayOfKeys(dataset, keyName) {
  const resultArr = [];

  executeforEach(dataset, function(obj) {
    return obj[keyName] ? resultArr.push(obj[keyName]) : undefined;
  });

  return resultArr;
}

// Task 8
function substitute(arr) {
  const sblimiter = 30;
  const resultArr = [];

  mapArray(arr, function(el) {
    resultArr.push(el < sblimiter ? '*' : el);
  });

  return resultArr;
}

// Task 9
function getPastDay(date, daysAgo) {
  const milliseconds = 86400000;
  const pastDate = new Date(date.getTime() - milliseconds * daysAgo);
  return pastDate.getDate();
}

// Task 10
function formatDate(date) {
  let HH = date.getHours();
  let mm = date.getMinutes();

  const PAD = 10;
  if (HH < PAD) {
    HH = '0' + HH;
  }
  if (mm < PAD) {
    mm = '0' + mm;
  }

  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${HH}:${mm}`;
}
