var express = require('express');
var shortid = require('shortid');
var pg      = require('pg');

var router = express.Router();

router.get('/new', newUser);

function newUser(req, res) {
	var ord;
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		var pgQuery = Q.nbind(client.query);
		var text = 'SELECT * FROM "order" WHERE id = 0 FOR UPDATE;';
		client.query(text, function(err, result) {
			ord = result.rows[0].lastorder;
			var id = shortid.generate();
			var returnObject = {
				order: ord,
				id: id
			};
			if (ord == 4) ord = 1; else ord++;
			text = 'UPDATE "order" SET lastorder=($1) WHERE id=0;';
			client.query(text, [ord], function(err, result2) {
				done();
				if (err) {
					console.error(err);
					res.status(500).send(err);
				} else {
					res.status(200).send(returnObject);
				}

				client.query("COMMIT;");
			});
		});
	});
}

module.exports = router;
