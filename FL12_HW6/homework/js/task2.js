const a = Number(prompt('Enter the length of side A', 1));
const b = Number(prompt('Enter the length of side B', 1));
const c = Number(prompt('Enter the length of side C', 1));

if (!Number.isInteger(a) || !Number.isInteger(b) || !Number.isInteger(c)) {
  alert('Input values should be ONLY numbers.');
} else if (a <= 0 || b <= 0 || c <= 0) {
  alert('A triangle must have 3 sides with a positive definite length.');
} else if (!(a + b > c && a + c > b && b + c > a)) {
  alert('Triangle doesn’t exist.');
} else {
  if (a === b && a === c) {
    console.log('Equilateral triangle');
  } else if (a === b || a === c || b === c) {
    console.log('Isosceles triangle');
  } else {
    console.log('Scalene triangle');
  }
}
