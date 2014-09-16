var express = require('express');
var shortid = require('shortid');
var router = express.Router();

router.get('/new', newUser);

var ord = 1;

function newUser(req, res) {
	var returnObject = {
		order: ord,
		id: shortid.generate();
	}
	res.status(200).send(returnObject);
	if (ord == 6) ord = 1;
	else ord++;
}

module.exports = router;
