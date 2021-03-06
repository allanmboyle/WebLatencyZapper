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
var rawResults = [];
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
	// Disable the start button
	$("#startbutton").val("Test running. Please wait..");
	$('#startbutton').attr("disabled", true);
	
	// run through each of the tests
	if (run < runs.length) {
		runs[run](); // run the test
	} else {
		// send the results to the server, then
		// redirect to the next test, or show the end.
		run = 0;

		// Post the json version of the results back to the server
		$.ajax({
			type: 'POST',
			url: "/zapresults",
			data: JSON.stringify({results: rawResults}),
			success: function() {
				if (nextServer == "EOL") {
					$("#start").css("display", "none");
					$("#during").css("display", "none");
					$("#after").css("display", "inline");
				} else {
					window.location.replace("http://" + nextServer + ":" + nextPort + "/?z");
				}
			},
			error: function() { 
				// todo: send a message to the server.
				$("#start").css("display", "none");
				$("#during").css("display", "none");
				$("#after").css("display", "inline");
				alert("An error has occurred. Sorry for the inconvenience. Thanks for your help."); 
			},
			contentType: "application/json"
			// Removing because it causes the browser ajax call to not be successful
			// dataType: "json"
		});		
	}
}

function smallTest() 	{ zap(smallPayload, 	"small payload"); }
function mediumTest() 	{ zap(mediumPayload, 	"medium payload"); }
function largeTest() 	{ zap(largePayload, 	"large payload"); }

function zap(payload, title) {
	var beforeTime = new Date().getTime();
	$.post("/zap",{startTime: beforeTime, data: payload}, function(result){
		var timeTaken = new Date().getTime() - result.startTime;
		
		rawResults.push([window.location.hostname, title, timeTaken]);
		
		if (gaToken) {
			$.trackEvent(window.location.hostname, title, "zap", timeTaken);
		} else {
			// report results inline - only if you are not using GA
			results += title  + ": " + timeTaken + " milliseconds</br>";
			$("#result").html(results); 
		}
		
		run += 1;
		setTimeout(zapRun, 10); // no need to wait, I just feel better about it.
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
		//$.fn.track.defaults.debug = true;
		if (gaToken) $.trackPage(gaToken, {onload: false});
		
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