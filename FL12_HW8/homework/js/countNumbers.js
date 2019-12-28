function countNumbers(str) {
  const symbols = str.split('');
  let result = {};
  let n;

  for (let i = 0; i < symbols.length; i++) {
    n = symbols[i];
    if (!isNaN(Number(n))) {
      result[n] = result[n] ? result[n] + 1 : (result[n] = 1);
    }
  }
  return result;
}

console.log(countNumbers('erer384jj4444666888jfd123'));
console.log(countNumbers('jdjjka000466588kkkfs662555'));
console.log(countNumbers(''));
