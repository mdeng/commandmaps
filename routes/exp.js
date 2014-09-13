var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/experiment', function(req, res) {
  res.render('index', { title: 'command maps wat' });
});

module.exports = router;
