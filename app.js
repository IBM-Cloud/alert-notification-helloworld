/* Sample Alert Notification Application */

var express = require('express')
  , request = require('superagent')
  , config = require('./config.js').readGlobalConfig();

var alert = {
	"What": "sample alert",
	"Where": "someserver.ibm.com",
	"Severity": "Critical"  // Critical = 5
}

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve test button
app.get('/send', function (req, res) {
	request
        .post(config.alertnotification.url)
		.auth(config.alertnotification.name, config.alertnotification.password)
		.set('Content-Type', 'application/json')
		.send(JSON.stringify(alert))
		.end(function(err, result) {
			if (err) {
				console.log("Error sending alert: " +err);
			} else {
				console.log("Successfully sent alert");
			}
        });
	res.sendStatus(204);
});

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, function() {
	console.log("Server starting on " + appEnv.url);
});
