function makeNumber(str) {
  const symbols = str.split('');
  str = '';
  for (let i = 0; i < symbols.length; i++) {
    if (!isNaN(Number(symbols[i])) && symbols[i].trim().length) {
      str += symbols[i];
    }
  }
  return str;
}

console.log(makeNumber('erer384jjjfd123'));
console.log(makeNumber('123098h76gfdd'));
console.log(makeNumber('ijifjgdj'));
