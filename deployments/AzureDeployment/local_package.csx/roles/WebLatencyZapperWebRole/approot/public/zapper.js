	// create a big array
	var smallPayload = [];
	var mediumPayload = [];
	var largePayload = [];
	var results = "";
	var run = 0;
	var gaToken;
        var nextServer;
	var nextPort;
	
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
			$.get("/zapconfig", function(result) {
			nextServer = result.server;
			nextPort = result.port;		
			gaToken = result.gaToken;});
			if (nextServer == "EOL") {
				alert("We are all zapped out. Thank you for helping us to make business life easier.");
			} else {
				alert("Redirecting to the next server in the zap loop");
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
				_gaq.push(['_trackEvent', window.location.hostname, title, time2]);
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
			if (gaToken) initGoogleAnalytics(gaToken);

			if (!window.location.search) {
				$("#start").css("visibility", "visible");
			} else {
				// a query string is a signal that we are not the first in the zap loop so
				// run the tests automatically. Its on the first that the user must choose.
				zapRun();
			}			
		});
	});
	//UA-32857811-1
	function initGoogleAnalytics(gaToken) {
alert("about to configure GA wiht: " + gaToken);
		var _gaq = _gaq || [];
		_gaq.push(['_setAccount', gaToken]);
		_gaq.push(['_trackPageview']);

		(function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		})();
	}