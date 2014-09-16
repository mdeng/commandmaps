var express = require('express');
var shortid = require('shortid');
var router = express.Router();

router.get('/new', newUser);

function newUser(req, res) {
	res.status(200).send(shortid.generate());
}

/* GET users listing. *//*
router.get('/', function(req, res) {
  res.send('respond with a resource');
});
*/
module.exports = router;
