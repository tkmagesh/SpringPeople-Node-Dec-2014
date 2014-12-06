var	url = require("url"),
	qs = require("querystring");

function extractData(req,res, next){
	req.url = url.parse(req.url, true);

	if (req.method==="GET"){
		req.data = req.url.query;
		next();
	} else {
		var inputData = '';
		req.on("data", function(chunk){
			inputData += chunk;
		});
		req.on("end", function(){
			req.data = qs.parse(inputData),
			next();
		});
	}
}
module.exports = extractData;