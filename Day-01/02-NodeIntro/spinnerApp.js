var spinner = require('./spinner.js').getSpinner();

console.log(spinner.up()); //=> 1
console.log(spinner.up()); //=> 2
console.log(spinner.up()); //=> 3
console.log(spinner.up()); //=> 4

console.log(spinner.down()); //=> 3
console.log(spinner.down()); //=> 2
console.log(spinner.down()); //=> 1
console.log(spinner.down()); //=> 0
console.log(spinner.down()); //=> -1

