import calc from "../calc-js";

const a = calc.plus(1, 2, 3, 4);
const b = calc.minus(a, 4);
calc.divide(b, 3);
calc.multiply(1, 2, 3, 4);
console.log(a, b);
