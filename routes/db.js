var express = require('express');
var pg      = require('pg');

var router = express.Router();

router.put('/trials', processTrial);
router.put('/prefs', processUsers);

/* structure of request object:
	* userID as string
	* interfaceType as either 'R' or 'C'
	* commandSetID as int
	* needsRibbonSwitch as int
	* time as int
	* numCommandErrors as int
	* commandID as int
	* numRibbonErrors as int
*/
function processTrial(req, res) {
	var trialData = req.body;
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var queryString = "INSERT INTO trials VALUES ('"
						   + trialData.userID + "', '"
						   + trialData.interfaceType + "', "
						   + trialData.commandSetID + ", "
						   + trialData.needsRibbonSwitch + ", "
						   + trialData.time + ", "
						   + trialData.numCommandErrors + ", "
						   + trialData.commandID + ", "
						   + trialData.numRibbonErrors + ");"; 
		console.log(queryString);
		client.query(queryString, function(err, result) {
			done();
			if (err) {
				console.error(err);
				res.status(500).send(err);
			} else {
				res.send(204);
			}
		});
	});
}

/* structure of request object:
   * userID as string
   * interfaceType as 'R' or 'C'
   * gender as 'M', 'F', 'N'
   * age as an integer
*/
function processUsers(req, res) {
	var prefData = req.body;
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var queryString = "INSERT INTO users VALUES ('"
						   + prefData.userID + "', '"
						   + prefData.interfaceType + "', '"
						   + prefData.gender + "', "
						   + prefData.age + ");";
		console.log(queryString);
		client.query(queryString, function(err, result) {
			done();
			if (err) {
				console.error(err);
				res.status(500).send(err);
			} else {
				res.send(204);
			}
		});
	});
}

module.exports = router;
