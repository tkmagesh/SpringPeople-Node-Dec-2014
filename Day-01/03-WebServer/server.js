var http = require("http"),
	fs = require("fs"),
	path = require("path");

console.log("current folder = ", __dirname);
var server = http.createServer(function(req,res){
	var resource = req.url === "/" ? "/index.html" : req.url;
	var resourcePath = path.join(__dirname, resource);
	var fileExists = fs.existsSync(resourcePath);
	if (fileExists){
		fs.readFile(resourcePath, {encoding : "utf8"}, function(err,fileContents){
			if (err){
				res.statusCode = 500;
				res.end();
			} else {
				res.write(fileContents);
				res.end();
			}
		});
	} else {
		res.statusCode = 404;
		res.end();
	}
	
});
server.listen(8080);
console.log("Server listening on port 8080!");