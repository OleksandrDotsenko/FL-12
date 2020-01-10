// Task 1
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

// console.log(convert('1', 2, 3, '4'));

// Additional tests
/*
(function test_convert() {
  console.log('Test 00:', convert('1', 2, 3, '4'));
  console.log('Test 01:', convert('1', '2', '3'));
  console.log('Test 02:', convert(1, 2, 3));
  console.log('Test 03:', convert(1.1, 2.2, 3.3));
  console.log('Test 04:', convert('1.1', '2.2', '3.3'));
  console.log('Test 05:', convert(1.1111, 2.2222, 3.3333));
  console.log('Test 06:', convert('1.1111', '2.2222', '3.3333'));
  console.log('Test 07:', convert([], [], '-100.01'));
  console.log('Test 08:', convert([], [], -100.01));
  console.log('Test 09:', convert([], []));
  console.log('Test 10:', convert({}, {}));
  console.log('Test 11:', convert());
})();
*/

// Task 2
function executeforEach(arr, callback) {
  arr.forEach(callback);
}

// executeforEach([1, 2, 3], function(el) {
//   console.log(el * 2);
// });

// Task 3
function mapArray(arr, callback) {
  executeforEach(arr, callback);
  return arr;
}

// function mapArrayCallback(el, index, arr) {
//   arr[index] = +arr[index] + 3;
// }

// Additional tests
/*
(function test_convert() {
  console.log('Test 00:', mapArray([2, '5', 8], mapArrayCallback));
  console.log('Test 01:', mapArray(['0', '1', '2', '3'], mapArrayCallback));
  console.log('Test 02:', mapArray([0, 1, 2, 3], mapArrayCallback));
  console.log('Test 03:', mapArray([0, -1, -2, -3, -4], mapArrayCallback));
  console.log('Test 04:', mapArray(['0', '-1', '-2', '-3', '-4'], mapArrayCallback));
  console.log('Test 05:', mapArray([0, -1.1, -2.2, -3.3, -4.4], mapArrayCallback));
  console.log('Test 06:', mapArray(['0', '-1.1', '-2.2', '-3.3', '-4.4'], mapArrayCallback));
  console.log('Test 07:', mapArray([0, 1.1111, 2.2222, 3.3333, 4.4444], mapArrayCallback));
  console.log('Test 08:', mapArray(['0', '1.1111', '2.2222', '3.3333', '4.4444'], mapArrayCallback));
  console.log('Test 09:', mapArray([0, -110.1111, -220.2222, -330.3333, -440.4444], mapArrayCallback));
  console.log('Test 10:', mapArray(['0', '-110.1111', '-220.2222', '-330.3333', '-440.4444'], mapArrayCallback));
  console.log('Test 11:', mapArray([' ', '0000', ' 0 ', '-', 'qwe'], mapArrayCallback));
  console.log('Test 12:', mapArray([], mapArrayCallback));
})();
*/
