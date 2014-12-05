
var calc = require('./calculator.js');

var number1 = 100,
	number2 = 200;

console.log("Add Result = ", calc.add(number1, number2));
console.log("Subtract Result = ", calc.subtract(number1, number2));
console.log("Multiply Result = ", calc.multiply(number1, number2));
console.log("Divide Result = ", calc.divide(number1, number2));