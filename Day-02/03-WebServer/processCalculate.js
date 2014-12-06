var calculator = require("./calculator");

function processCalculate(req,res, next){
	if (req.url.pathname === "/calculator"){
		var data = req.data;
		var	number1 = parseInt(data.number1,10);
		var number2 = parseInt(data.number2,10);
		if (typeof calculator[data.operation] === "function"){
			var result = calculator[data.operation](number1,number2);
			res.write(result.toString());
		}
		res.end();
	} else{
		next();
	} 
}
module.exports = processCalculate;

