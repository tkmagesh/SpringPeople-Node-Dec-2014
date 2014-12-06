var fs = require("fs"),
	path = require("path");

var staticResourceExtns = [".html", ".htm", ".css", ".js", ".txt", ".ico", ".jpg", ".png", ".xml", ".json"];

var isStaticResource = function(resourceName){
	return staticResourceExtns.indexOf(path.extname(resourceName)) !== -1;
}

function serveStatic(req,res, next){
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
	} else {
		next();
	}
}
module.exports = serveStatic;