/* 
 * MYOB Latency Zapper Server for node.js.
 *
 * Usage: node zapapp.js <local_port_number> <next_server_name> <next_server_port>
 * Environment variables are:
 *		SERVER_PORT			- the port this local server runs on (default: 8000)
 *		NEXT_SERVER_PORT	- the port of the next server to go to in the list
 *		NEXT_SERVER_NAME	- the name of the next server to go to in the list
 *		GA_TOKEN			- the Google Analytics token you want to use (if any)
 */

// Current port of this server
SERVER_PORT = process.env.SERVER_PORT || process.env.port || 1337; // to allow running multiple server on the same machine.

// Name and port of the NEXT server come from the command line. EOL=End of the line
NEXT_SERVER_NAME = process.env.NEXT_SERVER_NAME || "EOL";
NEXT_SERVER_PORT = process.env.NEXT_SERVER_PORT || "EOL";

GA_TOKEN = process.env.GA_TOKEN;

// Load the http module to create an http server.
var express = require('express');
var server	= express.createServer();
server.use(express.bodyParser());

// open the public directory
server.use(express.static(__dirname + '/public')); 

// Receive a payload, and echo it right back in the response
server.post('/zap', function (request, response) {
	response.send(request.body);
});

// Serve up the public pages
server.get('/', function (req, res) { res.sendfile(__dirname + '/public/index.html'); });
server.get('/zapconfig', function (req, res) { res.send(
	{
	server: 	NEXT_SERVER_NAME, 
	port: 		NEXT_SERVER_PORT,
	gaToken: 	GA_TOKEN
	}
)});
	
// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(SERVER_PORT);

// Put a friendly message on the terminal
console.log("Zapper running on port " + SERVER_PORT);
console.log("Next Zapper is http://" + NEXT_SERVER_NAME + ":" + NEXT_SERVER_PORT);
if (GA_TOKEN) { console.log("GA token is: " + GA_TOKEN); } else { console.log("Not logging to Google Analytics")}
