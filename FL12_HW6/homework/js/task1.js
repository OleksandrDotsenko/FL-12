const a = parseInt(prompt('Enter A number', 1));
const b = parseInt(prompt('Enter B number', 1));
const c = parseInt(prompt('Enter C number', 1));

if (isNaN(a + b + c)) {
  console.log('Invalid input data');
} else {
  const DIGITS = 2;
  const SQUARE = 2;
  const FACTOR1 = 4;
  const FACTOR2 = 2;

  const discriminant = Math.pow(b, SQUARE) - FACTOR1 * a * c;

  let x1;
  let x2;

  if (discriminant > 0) {
    x1 = ((-b - Math.sqrt(discriminant)) / (FACTOR2 * a)).toFixed(DIGITS);
    x2 = ((-b + Math.sqrt(discriminant)) / (FACTOR2 * a)).toFixed(DIGITS);
  } else if (discriminant === 0) {
    x1 = (-b / (FACTOR2 * a)).toFixed(DIGITS);
  }

  if (x1 && x2) {
    console.log(`x1 = ${x1} and x2 = ${x2}`);
  } else if (x1) {
    console.log(`x = ${x1}`);
  } else {
    console.log(`no solution`);
  }
}
