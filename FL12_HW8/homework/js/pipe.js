function addOne(x) {
  return x + 1;
}

function pipe() {
  let arg = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    arg = arguments[i](arg);
  }
  return arg;
}

console.log(pipe(1, addOne));
console.log(pipe(1, addOne, addOne));
