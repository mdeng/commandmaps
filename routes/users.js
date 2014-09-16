var express = require('express');
var shortid = require('shortid');
var router = express.Router();

router.get('/new', newUser);

function newUser(req, res) {
	res.status(200).send(shortid.generate());
}

module.exports = router;
