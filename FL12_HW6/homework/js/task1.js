let a = prompt('Enter A number', 1);
let b = prompt('Enter B number', 1);
let c = prompt('Enter C number', 1);
a = a === null || a.trim().length <= 0 ? NaN : Number(a);
b = b === null || b.trim().length <= 0 ? NaN : Number(b);
c = c === null || c.trim().length <= 0 ? NaN : Number(c);

if (isNaN(a + b + c) || a === 0) {
  alert('Invalid input data');
} else {
  const SQUARE = 2;
  const FACTOR1 = 4;
  const FACTOR2 = 2;

  const discriminant = Math.pow(b, SQUARE) - FACTOR1 * a * c;

  if (discriminant > 0) {
    const x1 = Math.round((-b - Math.sqrt(discriminant)) / (FACTOR2 * a));
    const x2 = Math.round((-b + Math.sqrt(discriminant)) / (FACTOR2 * a));

    console.log(`x1 = ${x1} and x2 = ${x2}`);
  } else if (discriminant === 0) {
    const x = Math.round(-b / (FACTOR2 * a));

    console.log(`x = ${x}`);
  } else {
    console.log(`no solution`);
  }
}
