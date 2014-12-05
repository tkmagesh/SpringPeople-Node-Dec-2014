var http = require("http"),
	fs = require("fs"),
	path = require("path");

var server = http.createServer(function(req,res){
	var resource = req.url === "/" ? "/index.html" : req.url;
	var resourcePath = path.join(__dirname, resource);
	var fileExists = fs.existsSync(resourcePath);
	if (fileExists){
		/*fs.readFile(resourcePath, {encoding : "utf8"}, function(err,fileContents){
			if (err){
				res.statusCode = 500;
				res.end();
			} else {
				res.write(fileContents);
				res.end();
			}
		});*/
		//The above code unnecessirily caches the file contents before invoking your callback.  instead 'streams' can be used to write the file contents (chunk) to the response as and when they are read from the file
		var stream = fs.createReadStream(resourcePath, {encoding : "utf8"});
		/*stream.on("data", function(chunk){
			res.write(chunk);
		});
		stream.on("end", function(){
			res.end();
		});		*/
		stream.pipe(res);
	} else {
		res.statusCode = 404;
		res.end();
	}
	
});
server.listen(8080);
console.log("Server listening on port 8080!");