var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Study' });
});

router.get('/experiment', function(req, res) {
  res.render('experiment', { title: 'command maps wat' });
});

module.exports = router;
