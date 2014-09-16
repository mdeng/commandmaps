var express = require('express');
var pg      = require('pg');

var router = express.Router();

router.put('/trials', processTrial);
router.put('/prefs', processPref);
router.put('/tlx', processTLX);

/* structure of request object:
	* userID as string
	* interfaceType as either 'R' or 'C'
	* commandSetId as int
	* parentIsDiff as bool
	* time as int
	* correct as bool
	* commandID as int
*/
function processTrial(req, res) {
	var trialData = req.body;
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var queryString = "INSERT INTO trials VALUES ('"
						   + trialData.userID + "', '"
						   + trialData.interfaceType + "', "
						   + trialData.commandSetId + ", "
						   + trialData.parentIsDiff + ", "
						   + trialData.time + ", "
						   + trialData.correct + ", "
						   + trialData.commandID + ");";
		console.log(queryString);
		client.query(queryString, function(err, result) {
			done();
			if (err) {
				console.error(err);
				res.status(501).send(err);
			} else {
				res.send(204);
			}
		});
	});
}

/* structure of request object:
   * userID as string
   * pref as 'R' or 'C'
*/
function processPref(req, res) {
	var prefData = req.body;
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var queryString = "INSERT INTO preferences VALUES ('" +
						   + prefData.userID + "', '"
						   + prefData.pref + "');";
		client.query(queryString, function(err, result) {
			done();
			if (err) {
				console.error(err);
				res.status(501).send(err);
			} else {
				res.send(204);
			}
		});
	});
}

function processTLX(req, res) {

}

router.get('/db', function(req, res) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM trials', function(err, result) {
			done();
			if (err) {
				console.error(err); res.send("Error " + err);
			} else {
				res.send(result.rows);
			}
		});
	});
});

module.exports = router;