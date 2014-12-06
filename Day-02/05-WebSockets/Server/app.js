var nodeJsWebSocket = require("nodejs-websocket");
var server = nodeJsWebSocket.createServer(function(connection){
	console.log("A new connection is established");
	connection.on("text", function(msg){
		console.log("msg received from client - ", msg);
		server.connections.forEach(function(con){
			con.sendText(msg);
		});
	});
});
server.listen(9090);
console.log("Chat server listening on port 9090!");