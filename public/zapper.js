/*
 * MYOBLatencyZapper
 *
 * The client side Javascript file that runs the echo tests to the servers.
 *
 */

var smallPayload = [];
var mediumPayload = [];
var largePayload = [];
var results = "";
var run = 0;
var gaToken;
var nextServer;
var nextPort;
var _gaq;

// Change this to modifiy the number of runs of each test
var runs = [ 
	smallTest, smallTest, smallTest, smallTest, smallTest,
	smallTest, smallTest, smallTest, smallTest, smallTest,
	smallTest, smallTest, smallTest, smallTest, smallTest,
	smallTest, smallTest, smallTest, smallTest, smallTest,
	mediumTest, mediumTest, mediumTest, mediumTest,
	largeTest
];

function zapRun() {
	// run through each of the tests
	if (run < runs.length) {
		runs[run](); // run the test
	} else {
		// redirect to the next test, or show the end
		run = 0;

		if (nextServer == "EOL") {
			$("#start").css("display", "none");
			$("#during").css("display", "none");
			$("#after").css("display", "inline");
		} else {
			window.location.replace("http://" + nextServer + ":" + nextPort + "/?z");
		}
	}
}

function smallTest() 	{ zap(smallPayload, 	"small payload"); }
function mediumTest() 	{ zap(mediumPayload, 	"medium payload"); }
function largeTest() 	{ zap(largePayload, 	"large payload"); }

function zap(payload, title) {
	var time1 = new Date().getTime();
	$.post("/zap",{startTime: time1, data: payload}, function(result){
		var time2 = new Date().getTime() - result.startTime;
		results += title  + ": " + time2 + " milliseconds</br>";
		$("#result").html(results); 
		if (gaToken) {
			$.trackEvent(window.location.hostname, title, "zap", time2);
		}
		run += 1;
		zapRun();
	});
}

$(document).ready(function() {
	// Load the arrays with random data of the appropriate size
	var i;
	for (i = 0; i < 100; smallPayload[i++] = Math.random()*255) {}		// 2k
	for (i = 0; i < 3072; mediumPayload[i++] = Math.random()*255) {} 	// 60k
	for (i = 0; i < 51500; largePayload[i++] = Math.random()*255) {}	// 1MB
	
	// load the zap config items
	$.get("/zapconfig", function(result) {
		nextServer = result.server;
		nextPort = result.port;		
		gaToken = result.gaToken;

		// initialize GA (using the github projects)
$.fn.track.defaults.debug = true;
		if (gaToken) $.trackPage('UA-33225197-1');
		
		if (!window.location.search) {
			$("#start").css("display", "inline");
		} else {
			// a query string is a signal that we are not the first in the zap loop so
			// run the tests automatically. Its on the first that the user must choose.
			$("#during").css("display", "inline");
			zapRun();
		}			
	});
});