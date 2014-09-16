var express = require('express');
var pg      = require('pg');

var router = express.Router();

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