var http = require("http"),
	fs = require("fs"),
	url = require("url"),
	calculator = require("./calculator"),
	qs = require("querystring"),
	path = require("path");

var staticResourceExtns = [".html", ".htm", ".css", ".js", ".txt", ".ico", ".jpg", ".png", ".xml", ".json"];

var isStaticResource = function(resourceName){
	return staticResourceExtns.indexOf(path.extname(resourceName)) !== -1;
}

var server = http.createServer(function(req,res){
	console.log(req.method);
	var resource = req.url === "/" ? "/index.html" : req.url;
	//parse the requrl 
	req.url = url.parse(req.url, true);
	var reqPathName = req.url.pathname;
	if (isStaticResource(reqPathName)){
		var resourcePath = path.join(__dirname, reqPathName);
		var fileExists = fs.existsSync(resourcePath);
		if (fileExists){
			var stream = fs.createReadStream(resourcePath, {encoding : "utf8"});
			stream.pipe(res);
		} else {
			res.statusCode = 404;
			res.end();
		}
	} else if (reqPathName === "/calculator"){
		if (req.method==="GET"){
			var data = req.url.query,
				number1 = parseInt(data.number1,10),
				number2 = parseInt(data.number2,10);
			if (typeof calculator[data.operation] === "function"){
				var result = calculator[data.operation](number1,number2);
				res.write(result.toString());
			}
			res.end();
		} else if (req.method === "POST"){
			var inputData = '';
			req.on("data", function(chunk){
				inputData += chunk;
			});
			req.on("end", function(){
				var data = qs.parse(inputData),
					number1 = parseInt(data.number1,10),
					number2 = parseInt(data.number2,10);
				if (typeof calculator[data.operation] === "function"){
					var result = calculator[data.operation](number1,number2);
					res.write(result.toString());
				}
				res.end();
			});
		}

	}
});
server.listen(8080);
console.log("Server listening on port 8080!");