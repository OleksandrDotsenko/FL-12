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
