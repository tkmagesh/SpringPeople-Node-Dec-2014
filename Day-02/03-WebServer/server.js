var http = require("http"),
	extractData = require('./extractData'),
	serveStatic = require('./serveStatic'),
	processCalculate = require('./processCalculate'),
	appEngine = require('./appEngine');

appEngine.add(function(req,res,next){
	req.url === "/" ? "/index.html" : req.url;
	next();
});
appEngine.add(extractData);
appEngine.add(serveStatic);
appEngine.add(processCalculate);
appEngine.add(function(){
	res.statusCode = 404;
	res.end();
});

http.createServer(appEngine.start()).listen(8080);
console.log("Server listening on port 8080!");